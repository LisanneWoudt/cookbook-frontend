import {Component, OnInit} from '@angular/core';
import {DataService} from "../../shared/services/data.service";
import {Cookbook} from "../../dto/cookbook";
import {CookbookService} from "../../shared/services/cookbook.service";
import {Recipe} from "../../dto/recipe";
import {Chef} from "../../dto/chef";
import {ChefService} from "../../shared/services/chef.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.css']
})
export class AllRecipesComponent implements OnInit {

  recipes: Recipe[];
  chef: Chef;
  cookbook: Cookbook;

  constructor(private dataService: DataService, private chefService: ChefService,
              private cookbookService: CookbookService, private router: Router) { }

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
    });
  }

  addRecipe() {
    this.router.navigate(['/recipes/add']);
  }
}
