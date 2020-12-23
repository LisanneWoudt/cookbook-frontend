import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Cookbook} from "../../dto/cookbook";
import {Chef} from "../../dto/chef";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() cookbook: Cookbook;
  @Input() chef: Chef;

  @Output() joinCookbook = new EventEmitter();

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addCookbook() {
    this.router.navigate(['/cookbook/add']);
  }

  tojoinCookbook() {
    this.joinCookbook.next();
  }

  ownCookbook() {
    if (this.chef && this.chef.cookbooks) {
      for (let i = 0; i < this.chef.cookbooks.length; i++){
        if (this.chef.cookbooks[i].id === this.cookbook.id) {
          return true;
        }
      }
    }
  }
}
