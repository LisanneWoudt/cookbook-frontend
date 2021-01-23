import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../dto/recipe";
import {Router} from "@angular/router";
import {Cookbook} from "../../dto/cookbook";
import {RecipeService} from "../../shared/services/recipe.service";

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {

  @Input() recipes: Recipe[];
  @Input() cookbook: Cookbook;

  categoryMap : Map<String, number[]> = new Map();
  categories : String[] = [];
  categoryLabel: String = "Categories";
  filteredRecipes: Recipe[] = [];
  showSelectedCategory: boolean = false;
  recipeIds: number[] = [];

  constructor(private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.categories = [];
  }

  getRecipeIdsPerCategory(cookbookId: number) {
    if (this.categories.length == 0) {
      this.recipeService.getRecipeIdsPerCategory(cookbookId).subscribe(result => {
        for (const key in result) {
          this.categories.push(key);
        }
        this.categoryMap = result;
      })
    }
  }

  toRecipeDetail(recipeId: number) {
    this.router.navigate(['/recipes/' + this.cookbook.id + '/' + recipeId]);
  }

  selectCategory(category: string) {
    this.recipeIds = this.categoryMap[category];
    this.filteredRecipes = this.recipes.filter(recipe => this.recipeIds.includes(recipe.id));
    this.categoryLabel = category;
    this.showSelectedCategory = true;
  }

  showCategoryList() {
    this.showSelectedCategory = false;
  }
}
