import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Cookbook} from "../../dto/cookbook";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  @Input() cookbookName: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addCookbook() {
    this.router.navigate(['/cookbook/add']);
  }
}
