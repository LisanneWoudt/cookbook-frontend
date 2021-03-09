import {EventEmitter, Injectable, Output} from '@angular/core';
import {Recipe} from "../../dto/recipe";
import {ImageService} from "../services/image.service";
import {DomSanitizer} from "@angular/platform-browser";
import {forkJoin, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImageHelper {

  constructor(private imageService: ImageService, private sanitizer: DomSanitizer) { }

  getImage(recipe: Recipe, isThumbnail: boolean) {
    if (isThumbnail) {
      this.imageService.downloadThumbnail(recipe.id + "_1").subscribe(
        data => {
          if (data.size != 0) {
            this.setRecipeImage(recipe, data);
          }
        },
        error => {
          console.error(error);
        }
      );
    } else {
      this.imageService.downloadImage(recipe.id.toString()).subscribe(
        data => {
          if (data.size != 0) {
            this.setRecipeImage(recipe, data);
          }
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
