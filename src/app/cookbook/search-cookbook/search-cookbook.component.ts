import { Component, OnInit } from '@angular/core';
import {Chef} from "../../dto/chef";
import {ChefService} from "../../shared/services/chef.service";
import {Router} from "@angular/router";
import {DataService} from "../../shared/services/data.service";
import {MyErrorHandler} from "../../shared/error/my-error-handler";

@Component({
  selector: 'app-search-chef',
  templateUrl: './search-cookbook.component.html',
  styleUrls: ['./search-cookbook.component.css']
})
export class SearchCookbookComponent extends MyErrorHandler implements OnInit {

  chefQuery: string;
  cookbookQuery: string;
  chefs: Chef[];

  constructor(private chefService: ChefService, private dataService: DataService, private router: Router) {
    super();
  }

  ngOnInit() {
    this.getAllChefs();
  }

  getAllChefs() {
    this.chefService.getAllChefs().subscribe(result => {
      this.chefs = result.filter(chef => chef.id !== this.dataService.getChef().id);
    }, error => {
      super.handleError(error, this.router, this.dataService);
    });
  }

  hasJoinedCookbook(cookbookId: number) {
    return this.dataService.getChef().cookbooks.find(cookbook => cookbook.id === cookbookId);
  }

  navigateToCookbook(chefId: number) {
    this.router.navigate(['/cookbooks/' + chefId])
  }

  navigateBack() {
    this.router.navigate(['cookbook']);
  }

}
