import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {RecipeService} from "../../shared/services/recipe.service";
import {ImageHelper} from "../../shared/helper/image.helper";
import {MyErrorHandler} from "../../shared/error/my-error-handler";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent extends MyErrorHandler implements OnInit {

  sub: any;
  toolbarEditEnabled = false;
  cookbookId: number;
  recipeId: number;

  @ViewChild('recipeInputFields', {static: false}) child;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService,
              private imageHelper: ImageHelper, private router: Router) {
    super();
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.cookbookId = +params.cookbookId;
      this.recipeId = +params.id;
    });
  }

  editRecipe() {
    this.child.setEditDisabled(false);
    this.toolbarEditEnabled = true;
  }

  confirmCancel() {
    this.child.confirmCancelRecipe();
  }

  cancelEdit() {
    this.child.getRecipe(this.recipeId);
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
