import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cookbook} from "../../../dto/cookbook";
import {Chef} from "../../../dto/chef";
import {Router} from "@angular/router";
import {JoinCookbookRequestService} from "../../services/join-cookbook-request.service";
import {ChefService} from "../../services/chef.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-toolbar-cookbook',
  templateUrl: './toolbar-cookbook.component.html',
  styleUrls: ['./toolbar-cookbook.component.css']
})
export class ToolbarCookbookComponent implements OnInit {

  @Input() cookbook: Cookbook;
  @Input() chef: Chef;

  @Output() joinCookbook = new EventEmitter();
  @Output() logout = new EventEmitter();
  @Output() toCookbook = new EventEmitter<number>();

  requestCount: number = 0;
  cookbooks = [];

  constructor(private router: Router, private joinCookbookRequestService: JoinCookbookRequestService,
              private chefService: ChefService, private dataService: DataService) { }

  ngOnInit() {
    this.getRequestCount();
    this.getCookbooks();
  }

  addCookbook() {
    this.router.navigate(['/cookbook/add']);
  }

  addRecipe() {
    this.router.navigate(['/recipes/add']);
  }

  editCookbook() {
    this.router.navigate(['/cookbook/edit']);
  }

  toSearchChefs() {
    this.router.navigate(['/cookbook/search']);
  }

  toJoinRequests() {
    this.router.navigate(['/requests']);
  }

  toProfile() {
    this.router.navigate(['/chefs/' + this.dataService.getChef().id])
  }

  goToCookbook(cookbookId: number) {
    this.chef.lastSelectedCookbookId = cookbookId;
    this.chefService.setLastSelectedCookbookId(this.chef).subscribe(result => {
      this.dataService.setChef(result);
    });
    this.toCookbook.next(cookbookId);
  }

  getCookbooks() {
    this.chefService.getChef(this.dataService.getChef().id).subscribe(result => {
      this.cookbooks = result.cookbooks;
    });
  }

  getRequestCount() {
    this.joinCookbookRequestService.getRequestCount(this.dataService.getChef().id).subscribe(result => {
      this.requestCount = result;
    })
  }

  toLogout() {
    this.logout.next();
  }

}
