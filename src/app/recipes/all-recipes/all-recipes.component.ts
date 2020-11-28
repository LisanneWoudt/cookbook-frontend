import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {Cookbook} from "../../dto/cookbook";
import {CookbookService} from "../../shared/services/cookbook.service";
import {Recipe} from "../../dto/recipe";
import {Chef} from "../../dto/chef";
import {ChefService} from "../../shared/services/chef.service";
import {Router} from "@angular/router";
import {ImageService} from "../../shared/services/image.service";
import {DomSanitizer} from "@angular/platform-browser";
import {ImageHelper} from "../../shared/helper/image.helper";

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css', '../../app.component.css']
})
export class AllRecipesComponent implements OnInit {

  recipes: Recipe[];
  chef: Chef;
  cookbook: Cookbook;
  loading: boolean = true;
  promises: Array<any> = [];

  constructor(private dataService: DataService, private chefService: ChefService,
              private cookbookService: CookbookService, private imageService: ImageService,
              private router: Router, private sanitizer: DomSanitizer, private imageHelper: ImageHelper) { }

  ngOnInit() {
    this.chefService.getChef(this.dataService.getChefId()).subscribe(result => {
      this.dataService.setChef(result);
      this.chef = result;

      this.getCookbookByChefId(result.id);
    });
  }

  getCookbookByChefId(chefId: number) {
    this.cookbookService.getCookbookByChefId(chefId).subscribe(result => {
      console.log(result);
      if (result.length > 1) {
        this.cookbook = result.find(cookbook => cookbook.id === this.chef.lastSelectedCookbookId);
      } else {
        this.cookbook = result[0];
      }
      this.getRecipes(this.cookbook.id);
    })
  }

  getRecipes(cookbookId: number) {
    this.cookbookService.getCookbook(cookbookId).subscribe(result => {
      this.recipes = result.recipes;
      this.getRecipeImages(result.recipes);
    });
  }

  getRecipeImages(recipeList: Recipe[]) {
    let garmentCount = 0;
    for (const int in recipeList) {
      garmentCount = +int;
      this.promises.push(this.imageHelper.getImage(recipeList[garmentCount], true));
    }

    Promise.all(this.promises)
      .then(() => {
        this.loading = false;
      }, error => {
        this.loading = false;
        console.error(error);
      });
  }

  addRecipe() {
    this.router.navigate(['/recipes/add']);
  }

  toRecipeDetail(recipeId: number) {
    this.router.navigate(['/recipes/' + recipeId]);
  }
}
