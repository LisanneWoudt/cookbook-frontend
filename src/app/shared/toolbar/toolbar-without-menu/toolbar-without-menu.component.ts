import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-toolbar-without-menu',
  templateUrl: './toolbar-without-menu.component.html',
  styleUrls: ['./toolbar-without-menu.component.css']
})
export class ToolbarWithoutMenuComponent implements OnInit {

  @Output() goBack = new EventEmitter();

  sub: any;
  title: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.sub = this.route
      .data
      .subscribe(data => {
        this.title = data.title;
      });
  }

  toGoBack() {
    this.goBack.next();
  }

}
