import {Component, EventEmitter, OnInit, Output} from '@angular/core';
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

@Component({
  selector: 'app-cookbook',
  templateUrl: './cookbook.component.html',
  styleUrls: ['./cookbook.component.css', '../../app.component.css']
})
export class CookbookComponent implements OnInit {

  recipes: Recipe[];
  chef: Chef;
  cookbook: Cookbook;
  loading: boolean = true;
  promises: Array<any> = [];
  sub: any;

  constructor(private dataService: DataService, private chefService: ChefService,
              private cookbookService: CookbookService, private imageService: ImageService,
              private router: Router, private route: ActivatedRoute,
              private sanitizer: DomSanitizer, private imageHelper: ImageHelper,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (+params.id) {
        this.getCookbook(+params.id);
        this.getChef();
      } else {
        this.getCookbookByChef();
      }
    });
  }

  getChef() {
    this.chefService.getChef(this.dataService.getChefId()).subscribe(result => {
      this.dataService.setChef(result);
      this.chef = result;
    });
  }

  getCookbookByChef() {

    this.chefService.getChef(this.dataService.getChefId()).subscribe(result => {
      this.dataService.setChef(result);
      this.chef = result;

      this.getCookbookByChefId(result.id);
    });
  }

  getCookbook(cookbookId: number) {
    this.cookbookService.getCookbook(cookbookId).subscribe(result => {
      this.cookbook = result;
      this.dataService.setCookbook(result);
      this.getRecipes(result.id);
    });
  }

  getCookbookByChefId(chefId: number) {
    this.cookbookService.getCookbookByChefId(chefId).subscribe(result => {
      if (result.length > 1) {
        this.cookbook = result.find(cookbook => cookbook.id === this.chef.lastSelectedCookbookId);
      } else {
        this.cookbook = result[0];
      }
      this.dataService.setCookbook(this.cookbook);
      this.getRecipes(this.cookbook.id);
    })
  }

  getRecipes(cookbookId: number) {
    this.cookbookService.getCookbook(cookbookId).subscribe(result => {
      this.recipes = result.recipes;
      this.getRecipeImages(result.recipes);
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

  addRecipe() {
    this.router.navigate(['/recipes/add']);
  }

  addCookbookToChef() {
    this.chefService.addCookbookToChef(this.chef.id, this.cookbook.id).subscribe(result => {
      this.openDialog('Cookbook joined', 'You have succesfully joined this cookbook');
    });
  }

  openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title, message}
    });

    dialogRef.afterClosed().subscribe(() => {
      window.location.reload()
    });

  }

  ownCookbook() {
    return this.dataService.isOwnCookbook();
  }

}
