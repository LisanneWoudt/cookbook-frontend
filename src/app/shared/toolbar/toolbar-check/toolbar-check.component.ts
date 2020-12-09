import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-toolbar-check',
  templateUrl: './toolbar-check.component.html',
  styleUrls: ['./toolbar-check.component.css']
})
export class ToolbarCheckComponent implements OnInit {

  @Output() saveRecipe = new EventEmitter();
  @Output() goBack = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  toSaveRecipe() {
    this.saveRecipe.next();
  }

  toGoBack() {
    this.goBack.next();
  }

}
