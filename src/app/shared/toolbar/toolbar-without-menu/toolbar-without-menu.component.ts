import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-toolbar-without-menu',
  templateUrl: './toolbar-without-menu.component.html',
  styleUrls: ['./toolbar-without-menu.component.css']
})
export class ToolbarWithoutMenuComponent implements OnInit {

  @Output() goBack = new EventEmitter();
  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

  toGoBack() {
    this.goBack.next();
  }

}
