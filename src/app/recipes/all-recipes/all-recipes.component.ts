import {Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../dto/recipe";
import {Router} from "@angular/router";
import {Cookbook} from "../../dto/cookbook";
import {RecipeService} from "../../shared/services/recipe.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {

  @Input() recipes: Recipe[];
  @Input() cookbook: Cookbook;

  categoriesFormControl = new FormControl();
  categoryMap : Map<String, number[]> = new Map();
  categories : String[] = [];
  allSelectedRecipes: Recipe[] = [];
  noCategoriesChecked: boolean;

  constructor(private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.categories = [];
    this.getCategoriesForAllRecipes(this.cookbook.id);
    this.allSelectedRecipes = this.recipes;
  }

  getCategoriesForAllRecipes(cookbookId: number) {
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

  updateSelectedCategories(selectedCategory: string) {
    // no categories previously selected
    if (!this.categoriesFormControl.value || this.noCategoriesChecked) {
      this.noCategoriesChecked = false;
      this.allSelectedRecipes = this.getRecipiesByCategory(selectedCategory);
    } else { // previous categories selected (1 or more)
      // no more categories checked
      if (Object.keys(this.categoriesFormControl.value).length == 1 && selectedCategory == this.categoriesFormControl.value[0]) {
        this.allSelectedRecipes = this.recipes;
        this.noCategoriesChecked = true;
      } else {
        // 1 or more categories selected
        let prevSelectedCategories = [];
        for (let i = 0; i < Object.keys(this.categoriesFormControl.value).length; i++) {
          const prevSelectedCategory = Object.values(this.categoriesFormControl.value)[i];
          prevSelectedCategories.push(prevSelectedCategory);
        }

        let allSelectedCategories;
        const index = prevSelectedCategories.indexOf(selectedCategory, 0);
        if (index > -1) {
          //Category is checked for the second time, so unchecked
          allSelectedCategories = prevSelectedCategories.filter(cat => cat != selectedCategory);
        } else {
          // New category selected
          prevSelectedCategories.push(selectedCategory);
          allSelectedCategories = prevSelectedCategories;
        }
        this.allSelectedRecipes = this.getRecipesByCategories(allSelectedCategories);
      }
    }
    this.allSelectedRecipes = this.allSelectedRecipes.sort((a,b) => a.title.localeCompare(b.title));
  }

  getRecipiesByCategory(category: string): Recipe[] {
    return this.recipes.filter(recipe => recipe.categories.includes(category));
  }

  getRecipesByCategories(categories: string[]): Recipe[] {
    let filteredRecipes = this.recipes;
    for (let i = 0; i < categories.length; i++) {
      filteredRecipes = filteredRecipes.filter(recipe => recipe.categories.includes(categories[i]));
    }
    return filteredRecipes;
  }

}
