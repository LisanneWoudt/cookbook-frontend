import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cookbook} from "../../../dto/cookbook";
import {Chef} from "../../../dto/chef";
import {ActivatedRoute, Router} from "@angular/router";
import {JoinCookbookRequestService} from "../../services/join-cookbook-request.service";

@Component({
  selector: 'app-toolbar-cookbook-other-chef',
  templateUrl: './toolbar-cookbook-other-chef.component.html',
  styleUrls: ['./toolbar-cookbook-other-chef.component.css', '../../../app.component.css']
})
export class ToolbarCookbookOtherChefComponent implements OnInit {

  @Input() cookbook: Cookbook;
  @Input() chef: Chef;

  @Output() joinCookbook = new EventEmitter();

  requestSent = false;
  requestStatus: string;

  constructor(private router: Router, private joinCookbookRequestService: JoinCookbookRequestService) { }

  ngOnInit() {
    this.hasSentJoinRequest();
  }

  tojoinCookbook() {
    this.joinCookbook.next();
  }

  toSearchCookbook() {
    this.router.navigate(['/cookbook/search']);
  }

  hasSentJoinRequest() {
    this.joinCookbookRequestService.checkRequestSent(this.chef.id, this.cookbook.id).subscribe(result => {
      if (result) {
        this.requestSent = true;
        this.requestStatus = result.status;
      }
    })
  }

  goToCookbook(cookbookId: number) {
    this.router.navigate(['/cookbooks/' + cookbookId]);
  }

}
