import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Recipe} from "../../dto/recipe";
import {RecipeService} from "../../shared/services/recipe.service";
import {ImageHelper} from "../../shared/helper/image.helper";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  sub: any;
  recipe: Recipe;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
              private imageHelper: ImageHelper) { }

  ngOnInit() {
    console.log('hallo?');
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.getRecipe(+params.id);
    });
  }

  getRecipe(recipeId: number) {
    this.recipeService.getRecipe(recipeId).subscribe(data => {
      this.recipe = data;
      this.imageHelper.getImage(data, false);
    })
  }

}
