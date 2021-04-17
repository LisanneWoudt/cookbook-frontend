import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {DialogWithCancelButtonComponent} from "../../shared/dialog/dialog-with-cancel-button/dialog-with-cancel-button.component";
import {MatDialog} from "@angular/material/dialog";
import {RecipeInputFieldsComponent} from "../recipe-input-fields/recipe-input-fields.component";

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {

  recipeCreated = false;
  toolbarTitle = 'Create recipe';

  @ViewChild(RecipeInputFieldsComponent, {static: true}) child: RecipeInputFieldsComponent;

  constructor(private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }

  confirmCancel() {
    if (this.child.getAddingCategory()) { // Go back to recipe, chef cancels adding a category
      this.child.toggleAddingCategory();
    } else {
      const dialogRef = this.dialog.open(DialogWithCancelButtonComponent, {
        width: '250px',
        data: {title : 'Cancel', message: 'Are you sure you want to cancel? Your recipe will not be saved.'}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === true) {
          this.goBack()
        }
      });
    }

  }

  setRecipeCreated() {
    this.recipeCreated = true;
    this.toolbarTitle = '';
  }

  goBack() {
    this.router.navigate(['/cookbook']);
  }

}
