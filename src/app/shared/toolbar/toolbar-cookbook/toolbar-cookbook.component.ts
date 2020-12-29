import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cookbook} from "../../../dto/cookbook";
import {Chef} from "../../../dto/chef";
import {Router} from "@angular/router";
import {JoinCookbookRequestService} from "../../services/join-cookbook-request.service";

@Component({
  selector: 'app-toolbar-cookbook',
  templateUrl: './toolbar-cookbook.component.html',
  styleUrls: ['./toolbar-cookbook.component.css']
})
export class ToolbarCookbookComponent implements OnInit {

  @Input() cookbook: Cookbook;
  @Input() chef: Chef;

  @Output() joinCookbook = new EventEmitter();

  requestCount: number = 0;

  constructor(private router: Router, private joinCookbookRequestService: JoinCookbookRequestService) { }

  ngOnInit() {
    this.getRequestCount();
  }

  addCookbook() {
    this.router.navigate(['/cookbook/add']);
  }

  toSearchChefs() {
    this.router.navigate(['/cookbook/search']);
  }

  toJoinRequests() {
    this.router.navigate(['/requests']);
  }

  goToCookbook(cookbookId: number) {
    this.router.navigate(['/cookbooks/' + cookbookId]);
  }

  getRequestCount() {
    console.log(this.chef.id);
    this.joinCookbookRequestService.getRequestCount(this.chef.id).subscribe(result => {
      this.requestCount = result;
    })
  }

}
