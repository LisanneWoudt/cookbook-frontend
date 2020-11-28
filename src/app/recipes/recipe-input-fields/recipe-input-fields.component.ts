import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Recipe} from "../../dto/recipe";
import {RecipeService} from "../../shared/services/recipe.service";
import {ImageService} from "../../shared/services/image.service";
import {DataService} from "../../shared/services/data.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-recipe-input-fields',
  templateUrl: './recipe-input-fields.component.html',
  styleUrls: ['./recipe-input-fields.component.css', '../../app.component.css']
})
export class RecipeInputFieldsComponent implements OnInit {

  @Input() recipe: Recipe = new Recipe();
  @Input() loading: boolean = true;

  imageFile: File;
  categories = new FormControl();
  categoryList: string[] = ['Dinner', 'Lunch', 'Breakfast', 'Healthy', 'Easy'];

  constructor(private recipeService: RecipeService, private imageService: ImageService,
              private dataService: DataService) { }

  ngOnInit() {
  }

  editDisabled(): boolean {
    return this.recipe.id !== undefined;
  }

  addRecipe(formValid: any) {
    if (!formValid) {
      return;
    }
    if (this.categories.value) {
      this.recipe.categories = this.categories.value;
    }
    this.recipe.cookbookId = this.dataService.getCookbook().id;

    this.recipeService.addRecipe(this.recipe).subscribe(data => {
      if (this.imageFile) {
        this.uploadImage(data.id.toString());
      } else {
        this.responseSuccess();
      }
    })
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
    //this.showSuccessDialog.emit();
  }

  responseError(error: Error) {
    this.loading = false;
    //super.handleError(error, this.router, this.dataService);
  }

}
