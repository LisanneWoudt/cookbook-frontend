import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {Cookbook} from "../../dto/cookbook";
import {CookbookService} from "../../shared/services/cookbook.service";
import {Recipe} from "../../dto/recipe";
import {Chef} from "../../dto/chef";
import {ChefService} from "../../shared/services/chef.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ImageService} from "../../shared/services/image.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageHelper} from "../../shared/helper/image.helper";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {JoinCookbookRequestService} from "../../shared/services/join-cookbook-request.service";
import {JoinCookbookRequest} from "../../dto/join-cookbook-request";
import {SESSION_STORAGE, WebStorageService} from "ngx-webstorage-service";
import {MyErrorHandler} from "../../shared/error/my-error-handler";

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css', '../../app.component.css']
})
export class CookbookComponent extends MyErrorHandler implements OnInit {

  recipes: Recipe[] = [];
  chef: Chef;
  cookbook: Cookbook;
  loading: boolean = true;
  promises: Array<any> = [];
  sub: any;
  requestSent: boolean;
  requestStatus: string;

  constructor(private dataService: DataService, private chefService: ChefService,
              private cookbookService: CookbookService, private imageService: ImageService,
              private router: Router, private route: ActivatedRoute,
              private sanitizer: DomSanitizer, private imageHelper: ImageHelper,
              public dialog: MatDialog, private joinCookbookRequestService: JoinCookbookRequestService,
              @Inject(SESSION_STORAGE) private storage: WebStorageService) {
    super();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (+params.id) {
        this.getCookbook(+params.id);
        this.getChef();
        this.hasSentJoinRequest(+params.id);
      } else {
        this.getCookbookByChef();
      }
    });
  }

  getChef() {
    this.chefService.getChef(this.dataService.getChef().id).subscribe(result => {
      this.dataService.setChef(result);
      this.chef = result;
    }, error => {
      super.handleError(error, this.router, this.dataService);
    });
  }

  getCookbookByChef() {
    this.chefService.getChef(this.dataService.getChef().id).subscribe(result => {
      this.dataService.setChef(result);
      this.chef = result;

      if (result.cookbooks.length === 0) {
        this.cookbook = new Cookbook();
        this.loading = false;
      } else {
        if (result.cookbooks.length > 1) {
          this.cookbook = result.cookbooks.find(cookbook => cookbook.id === this.chef.lastSelectedCookbookId);
        } else {
          this.cookbook = result.cookbooks[0];
        }
        this.getRecipes(this.cookbook.id);
      }
      this.dataService.setCookbook(this.cookbook);
    }, error => {
      super.handleError(error, this.router, this.dataService);
    });
  }

  getCookbook(cookbookId: number) {
    this.cookbookService.getCookbook(cookbookId).subscribe(result => {
      this.cookbook = result;
      this.dataService.setCookbook(result);
      this.getRecipes(result.id);
    }, error => {
      super.handleError(error, this.router, this.dataService);
    });
  }

  getRecipes(cookbookId: number) {
    this.cookbookService.getCookbook(cookbookId).subscribe(result => {
      this.recipes = result.recipes;
      this.getRecipeImages(result.recipes);
    }, error => {
      super.handleError(error, this.router, this.dataService);
    });
  }

  getRecipeImages(recipeList: Recipe[]) {
    let garmentCount = 0;
    for (const int in recipeList) {
      garmentCount = +int;
      this.promises.push(this.imageHelper.getImage(recipeList[garmentCount], true));
    }

    Promise.all(this.promises)
      .then(() => {
        this.loading = false;
      }, error => {
        this.loading = false;
        console.error(error);
      });
  }

  hasSentJoinRequest(cookbookId: any) {
    this.joinCookbookRequestService.checkRequestSent(this.dataService.getChef().id, cookbookId).subscribe(result => {
      if (result) {
        this.requestSent = true;
        this.requestStatus = result.status;
      }
    }, error => {
      console.error(error);
    })
  }

  requestToJoinCookbook() {
    const request = new JoinCookbookRequest();
    request.chefId = this.chef.id;
    request.cookbookId = this.cookbook.id;
    request.cookbookName = this.cookbook.name;
    request.status = 'NEW';
    this.loading = true;
    this.joinCookbookRequestService.saveRequest(request).subscribe(() => {
      this.loading = false;
      this.hasSentJoinRequest(this.cookbook.id);
      this.openDialog('Request send', 'Request to join this cookbook has been send', request.cookbookId);
    });
  }

  openDialog(title: string, message: string, cookbookId: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title, message}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.goToCookbook(cookbookId);
    });
  }

  ownCookbook() {
    return this.dataService.isOwnCookbook();
  }

  goToCookbook(cookbookId) {
    if (!this.router.url.endsWith('/cookbooks/' + cookbookId)) {
      this.loading = true;
    }
    this.router.navigate(['/cookbooks/' + cookbookId]);
  }

  logout() {
    this.dataService.setChef(new Chef());
    this.storage.set('loggedIn', false);
    this.storage.set('userId', undefined);
    this.router.navigate(['login']);
  }
}
