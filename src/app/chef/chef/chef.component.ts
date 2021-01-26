import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChefService} from "../../shared/services/chef.service";
import {Chef} from "../../dto/chef";
import {MyErrorHandler} from "../../shared/error/my-error-handler";
import {DataService} from "../../shared/services/data.service";

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css', '../../app.component.css']
})
export class ChefComponent extends MyErrorHandler implements OnInit {

  chefName: string;
  chef: Chef;
  sub: any;
  loading = true;

  constructor(private route: ActivatedRoute, private router: Router, private chefService: ChefService,
              private dataService: DataService) {
    super();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getChef(+params.id);
    });
  }

  getChef(chefId: number) {
    this.chefService.getChef(chefId).subscribe(result => {
      this.chef = result;
      this.chefName = result.username;
      this.loading = false;
    });
  }

  toggleReceiveEmails() {
    this.chef.emailNotifications = !this.chef.emailNotifications;
    this.chefService.setEmailNotifications(this.chef).subscribe(() => {
      console.info("email notifications set")
    }, error => {
      this.handleError(error, this.router, this.dataService);
    });
  }

  goToCookbook(cookbookId: number) {
    this.router.navigate(['cookbooks/' + cookbookId]);
  }

  goBack() {
    this.router.navigate(['/cookbook']);
  }
}
