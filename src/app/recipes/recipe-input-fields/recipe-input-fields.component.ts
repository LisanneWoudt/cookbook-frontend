import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Recipe} from "../../dto/recipe";
import {RecipeService} from "../../shared/services/recipe.service";
import {ImageService} from "../../shared/services/image.service";
import {DataService} from "../../shared/services/data.service";
import {FormControl} from "@angular/forms";
import {DialogWithCancelButtonComponent} from "../../shared/dialog/dialog-with-cancel-button/dialog-with-cancel-button.component";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MyErrorHandler} from "../../shared/error/my-error-handler";
import {EstimatedTime} from "../../dto/estimated-time";
import {ImageHelper} from "../../shared/helper/image.helper";
import {forkJoin} from "rxjs";
import {DomSanitizer} from "@angular/platform-browser";
import {DialogComponent} from "../../shared/dialog/dialog.component";

@Component({
  selector: 'app-recipe-input-fields',
  templateUrl: './recipe-input-fields.component.html',
  styleUrls: ['./recipe-input-fields.component.css', '../../app.component.css']
})
export class RecipeInputFieldsComponent extends MyErrorHandler implements OnInit {

  @Input() recipeId: number;
  @Input() editDisabled: boolean = true;
  @Output() recipeSuccesfullySaved = new EventEmitter<string>();
  @Output() cancelEdit = new EventEmitter();

  @ViewChild('recipeInputForm', {static: false}) recipeInputForm;

  imageList: any[] = [];
  imageFiles: File[] = [];
  categories = new FormControl();
  categoryList: String[] = ['Dinner', 'Lunch', 'Breakfast'];
  categoryListLowerCase: String[] = [];
  addingCategory: boolean;
  overImgLimit = false;
  recipe: Recipe = new Recipe();
  loading: boolean;

  constructor(private recipeService: RecipeService, private imageService: ImageService,
              private dataService: DataService, private router: Router, public dialog: MatDialog,
              private imageHelper: ImageHelper, private sanitizer: DomSanitizer) {
    super();
  }

  ngOnInit() {
    this.loading = true;
    if (this.recipeId) {
      this.getRecipe(this.recipeId);
    }
    this.getCustomCategories();
  }

  getRecipe(recipeId: number) {
    this.recipeService.getRecipe(recipeId).subscribe(data => {
      this.recipe = data;
      this.categories.setValue(data.categories);
      this.initializeEstimatedTime(data);

      forkJoin(this.getDownloadImageObservableList()).subscribe(
        imageData => {
          this.imageList = [];
          for (let i = 0; i < imageData.length; i++) {
            if (imageData[i].size > 0) {
              const blob = new Blob([imageData[i]], {type: 'application/octet-stream'});
              this.imageFiles.push(this.blobToFile(blob, this.recipe.id + '_' + (i + 1)));
              this.imageList.push(this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob)));
            }
          }
          this.loading = false;
        },
        error => {
          this.responseError(error);
        });
    });
  }

  getCustomCategories() {
    for (let i = 0; i < this.categoryList.length; i++) {
      this.categoryListLowerCase.push(this.categoryList[i].toLowerCase());
    }
    this.recipeService.getRecipeCategories(this.dataService.getCookbook().id).subscribe(result => {
      for (let i = 0; i < result.length; i++) {
        if (!this.categoryListLowerCase.includes(result[i].toLowerCase())) {
          this.categoryList.push(result[i]);
          this.categoryListLowerCase.push(result[i].toLowerCase())
        }
      }
      this.categoryList.sort();
    });
    this.loading = false;
  }

  getDownloadImageObservableList() {
    const observableList = [];
    for (let i = 0; i < this.recipe.imageCount; i++) {
      const observable = this.imageService.downloadImage(this.recipe.id + '_' + (i + 1));
      observableList.push(observable);
    }
    return observableList;
  }

  private blobToFile = (theBlob: Blob, fileName: string): File => {
    const b: any = theBlob;
    b.lastModifiedDate = new Date();
    b.name = fileName;
    return theBlob as File;
  };

  initializeEstimatedTime(recipe: Recipe) {
    if (recipe.estimatedTime === null) {
      recipe.estimatedTime = new EstimatedTime();
    }
  }

  setEditDisabled(value: boolean) {
    this.editDisabled = value;
  }

  saveRecipe() {
    if (!this.recipeInputForm || !this.recipeInputForm.valid || this.imageList.length > 3) {
      return;
    }
    this.loading = true;
    if (this.categories.value) {
      this.recipe.categories = this.categories.value;
    }
    this.recipe.cookbookId = this.dataService.getCookbook().id;
    this.recipe.imageCount = this.imageList.length;

    this.recipeService.saveRecipe(this.recipe).subscribe(data => {
      if (this.imageFiles) {
        this.uploadImages(data.id.toString());
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
          this.responseError(error);
        });
      }
    });
  }

  //TODO: Choice to save recipe
  confirmCancelRecipe() {
    if (this.addingCategory) { // Go back to recipe, chef cancels adding a category
      this.addingCategory = false;
    } else {
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
  }

  uploadImages(recipeId: string) {
    this.imageService.uploadImages(recipeId, this.imageFiles).subscribe(() => {
        this.responseSuccess();
      }, error => {
        this.responseError(error);
      });
  }

  processImage(files: FileList) {
    this.overImgLimit = false;
    if (files.length + this.imageList.length > 3) {
      this.overImgLimit = true;
      return;
    }

    for (let i = 0; i < files.length ; i++) {
      this.imageFiles.push(files[i]);
      const reader = new FileReader();
      reader.onload = () => {
        this.imageList.push(reader.result);
      };
      reader.readAsDataURL(files[i]);
    }
  }

  removeImage(image: any) {
    const index = this.imageList.indexOf(image, 0);
    if (index > -1) {
      this.imageList.splice(index, 1);
      this.imageFiles.splice(index, 1);
    }
  }

  responseSuccess() {
    this.loading = false;
    this.editDisabled = true;
    this.recipeSuccesfullySaved.next(this.recipe.title);

    this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title : 'Recipe updated', message: 'Your recipe has been saved'}
    });
  }

  responseError(error: Error) {
    this.loading = false;
    super.handleError(error, this.router, this.dataService);
  }

  toCancelEdit() {
    this.cancelEdit.next();
  }

  toggleAddingCategory() {
    this.addingCategory = this.addingCategory !== true;
  }

  getAddingCategory() {
    return this.addingCategory;
  }

  addCategory(category: string) {
    this.categoryList.push(category);
    if (!this.categories.value) {
      this.categories.setValue([category]);
    } else {
      this.categories.value.push(category);
    }
    this.addingCategory = false;
  }

  goToLink() {
    if (this.recipe !== undefined && this.recipe.url !== undefined && this.editDisabled) {
      window.open(this.recipe.url, "_blank");
    }
  }

  goToHome() {
    this.router.navigate(['/cookbook']);
  }

}
