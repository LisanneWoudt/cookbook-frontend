import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Recipe} from "../../dto/recipe";
import {RecipeService} from "../../shared/services/recipe.service";
import {ImageService} from "../../shared/services/image.service";
import {DataService} from "../../shared/services/data.service";
import {FormControl, NgModel} from "@angular/forms";
import {DialogWithCancelButtonComponent} from "../../shared/dialog/dialog-with-cancel-button/dialog-with-cancel-button.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-recipe-input-fields',
  templateUrl: './recipe-input-fields.component.html',
  styleUrls: ['./recipe-input-fields.component.css', '../../app.component.css']
})
export class RecipeInputFieldsComponent implements OnInit {

  @Input() recipe: Recipe = new Recipe();
  @Input() loading: boolean = true;
  @Input() editDisabled: boolean = true;
  @Output() recipeSuccesfullySaved = new EventEmitter<string>();
  @Output() cancelEdit = new EventEmitter();

  imageFile: File;
  categories = new FormControl();
  categoryList: string[] = ['Dinner', 'Lunch', 'Breakfast', 'Healthy', 'Easy'];

  constructor(private recipeService: RecipeService, private imageService: ImageService,
              private dataService: DataService, private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
  }


  setEditDisabled(value: boolean) {
    this.editDisabled = value;
  }

  saveRecipe(formValid: any) {
    if (!formValid) {
      return;
    }
    if (this.categories.value) {
      this.recipe.categories = this.categories.value;
    }
    this.recipe.cookbookId = this.dataService.getCookbook().id;

    this.recipeService.saveRecipe(this.recipe).subscribe(data => {
      if (this.imageFile) {
        this.uploadImage(data.id.toString());
      } else {
        this.responseSuccess();
      }
    })
  }

  confirmDelete() {
    const dialogRef = this.dialog.open(DialogWithCancelButtonComponent, {
      width: '250px',
      data: {title : 'Delete recipe', message: 'Are you sure you want to delete this recipe?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.recipeService.deleteRecipe(this.recipe.id).subscribe(() => {
          this.goToHome();
        }, error => {
          console.error('error!');
          console.error(error);
        });
      }
    });
  }

  //TODO: Choice to save recipe
  confirmCancelRecipe() {
    const dialogRef = this.dialog.open(DialogWithCancelButtonComponent, {
      width: '250px',
      data: {title : 'Cancel', message: 'Are you sure you want to cancel? Your recipe will not be saved.'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        if (this.recipe.id === null) {
          this.goToHome()
        } else {
          this.toCancelEdit();
        }
      }
    });
  }

  uploadImage(recipeId: string) {
    this.imageService.uploadImage(recipeId, this.imageFile)
      .subscribe(() => {
        this.responseSuccess();
      }, error => {
        this.responseError(error);
      });
  }

  processImage(file: File) {
    this.imageFile = file;
    const reader = new FileReader();

    reader.onload = () => {
      this.recipe.image = reader.result;
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.imageFile = undefined;
    this.recipe.image = undefined;
  }

  responseSuccess() {
    this.loading = false;
    this.editDisabled = true;
    this.recipeSuccesfullySaved.next(this.recipe.title);
  }

  responseError(error: Error) {
    this.loading = false;
    //super.handleError(error, this.router, this.dataService);
  }

  toCancelEdit() {
    this.cancelEdit.next();
  }

  goToLink() {
    if (this.recipe !== undefined && this.recipe.url !== undefined && this.editDisabled) {
      window.open(this.recipe.url, "_blank");
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

}
