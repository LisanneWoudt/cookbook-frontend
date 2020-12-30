import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../dto/recipe";
import {Router} from "@angular/router";
import {Cookbook} from "../../dto/cookbook";

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {

  @Input() recipes: Recipe[];
  @Input() cookbook: Cookbook;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  toRecipeDetail(recipeId: number) {
    this.router.navigate(['/recipes/' + this.cookbook.id + '/' + recipeId]);
  }
}
