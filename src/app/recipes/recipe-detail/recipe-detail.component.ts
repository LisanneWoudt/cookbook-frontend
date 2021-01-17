import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Recipe} from "../../dto/recipe";
import {RecipeService} from "../../shared/services/recipe.service";
import {ImageHelper} from "../../shared/helper/image.helper";
import {EstimatedTime} from "../../dto/estimated-time";
import {MyErrorHandler} from "../../shared/error/my-error-handler";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent extends MyErrorHandler implements OnInit, AfterViewInit {

  sub: any;
  recipe: Recipe;
  promises: Array<any> = [];
  toolbarEditEnabled = false;
  cookbookId: number;

  @ViewChild('recipeInputFields', {static: false}) child;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
              private imageHelper: ImageHelper, private router: Router) {
    super();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.cookbookId = +params.cookbookId;
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
      this.initializeEstimatedTime(data);
      this.child.categories.setValue(this.recipe.categories);
      this.promises.push(this.imageHelper.getImage(this.recipe, false));
    });
  }

  initializeEstimatedTime(recipe: Recipe) {
    if (recipe.estimatedTime === null) {
      recipe.estimatedTime = new EstimatedTime();
    }
  }

  editRecipe() {
    this.child.setEditDisabled(false);
    this.toolbarEditEnabled = true;
  }

  confirmCancel() {
    this.child.confirmCancelRecipe();
  }

  cancelEdit() {
    this.getRecipe(this.recipe.id);
    this.child.setEditDisabled(true);
    this.toolbarEditEnabled = false;
  }

  deleteRecipe() {
    this.child.confirmDelete();
  }

  saveRecipe() {
    this.child.saveRecipe();
  }

  setToolbarEditDisabled() {
    this.toolbarEditEnabled = false;
  }

  goBack() {
    if (this.cookbookId) {
      this.router.navigate(['/cookbooks/' + this.cookbookId]);
    } else {
      this.router.navigate(['/cookbook']);
    }
  }

}
