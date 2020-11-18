import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Cookbook} from "../../dto/cookbook";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  sub: any;
  title: string;

  @Input() cookbooks: Cookbook[];

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(data => {
        this.title = data.title;
      });
  }

  addCookbook() {
    this.router.navigate(['/cookbook/add']);
  }
}
