import {EventEmitter, Injectable, Output} from '@angular/core';
import {Recipe} from "../../dto/recipe";
import {ImageService} from "../services/image.service";
import {DomSanitizer} from "@angular/platform-browser";

@Injectable({
  providedIn: 'root'
})
export class ImageHelper {

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer) { }

  getImage(recipe: Recipe, isThumbnail: boolean) {
    if (isThumbnail) {
      this.imageService.downloadThumbnail(recipe.id).subscribe(
        data => {
          this.setRecipeImage(recipe, data);
        },
        error => {
          console.error(error);
        }
      );
    } else {
      this.imageService.downloadImage(recipe.id).subscribe(
        data => {
          this.setRecipeImage(recipe, data);
        },
        error => {
          console.error(error);
        }
      );
    }

  }

  setRecipeImage(recipe: Recipe, blobParts: any) {
    const blob = new Blob([blobParts], { type: 'application/octet-stream' });
    recipe.image = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

}
