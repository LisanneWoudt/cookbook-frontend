import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../../dto/recipe";
import {RecipeService} from "../../shared/services/recipe.service";
import {ImageHelper} from "../../shared/helper/image.helper";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, AfterViewInit {

  sub: any;
  recipe: Recipe;
  promises: Array<any> = [];

  @ViewChild('recipeInputFields', {static: false}) child;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
              private imageHelper: ImageHelper, private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.getRecipe(+params.id);
    });
  }

  ngAfterViewInit() {
    Promise.all(this.promises)
      .then(() => {
        this.child.loading = false;
      }, error => {
         this.child.loading = false;
        console.error(error);
      });
  }

  getRecipe(recipeId: number) {
    this.recipeService.getRecipe(recipeId).subscribe(data => {
      this.recipe = data;
      this.child.categories.setValue(this.recipe.categories);
      this.promises.push(this.imageHelper.getImage(this.recipe, false));
    });
  }

  editRecipe() {
    this.child.setEditDisabled(false);
   // this.toolbarEditEnabled = true;
  }

  cancelEdit() {
    this.child.setEditDisabled(true);
    //this.toolbarEditEnabled = false;
  }

  deleteRecipe() {
    this.child.confirmDelete();
  }

  goBack() {
    this.router.navigate(['/home']);
  }

}
