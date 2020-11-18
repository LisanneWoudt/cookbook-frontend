import { Component, OnInit } from '@angular/core';
import {Recipe} from "../../dto/recipe";

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  loading: boolean;
  recipe: Recipe = new Recipe();

  constructor() { }

  ngOnInit() {
  }

  addRecipe(formValid: any) {
    // add recipe
}

}
