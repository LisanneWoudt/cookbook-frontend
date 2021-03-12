import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Cookbook} from "../../../dto/cookbook";
import {Chef} from "../../../dto/chef";
import {ActivatedRoute, Router} from "@angular/router";
import {JoinCookbookRequestService} from "../../services/join-cookbook-request.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-toolbar-cookbook-other-chef',
  templateUrl: './toolbar-cookbook-other-chef.component.html',
  styleUrls: ['./toolbar-cookbook-other-chef.component.css', '../../../app.component.css']
})
export class ToolbarCookbookOtherChefComponent implements OnInit {

  @Input() cookbook: Cookbook;
  @Input() chef: Chef;
  @Input() requestSent: boolean;
  @Input() requestStatus: string;

  @Output() joinCookbook = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {}

  tojoinCookbook() {
    this.joinCookbook.next();
  }

  toSearchCookbook() {
    this.router.navigate(['/cookbook/search']);
  }

  goToCookbook(cookbookId: number) {
    this.router.navigate(['/cookbooks/' + cookbookId]);
  }

}
