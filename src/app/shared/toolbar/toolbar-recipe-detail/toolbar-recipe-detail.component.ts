import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-toolbar-recipe-detail',
  templateUrl: './toolbar-recipe-detail.component.html',
  styleUrls: ['./toolbar-recipe-detail.component.css']
})
export class ToolbarRecipeDetailComponent implements OnInit {

  @Output() editRecipe = new EventEmitter();
  @Output() deleteRecipe = new EventEmitter();
  @Output() goBack = new EventEmitter();

  constructor(private dataService: DataService) { }

  ngOnInit() {}

  toEditRecipe() {
    this.editRecipe.next();
  }

  toDeleteRecipe() {
    this.deleteRecipe.next();
  }

  toGoBack() {
    this.goBack.next();
  }

  ownCookbook() {
    return this.dataService.isOwnCookbook();
  }

}
