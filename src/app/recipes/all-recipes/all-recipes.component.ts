import { Component, OnInit } from '@angular/core';
import {RecipeService} from "../../shared/services/recipe.service";

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {

  recipes: [];
  chefId: number;

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.chefId = 1;
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getRecipe(this.chefId).subscribe(result => {
      console.log(result);
    });
  }
}
