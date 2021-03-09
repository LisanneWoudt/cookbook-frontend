import {EstimatedTime} from "./estimated-time";

export class Recipe {
  id: number;
  title: string;
  description: string;
  calories: number;
  cookbookId: number;
  image: any;
  ingredientList: string;
  directions: string;
  servingSize: number;
  url: string;
  categories: string[];
  estimatedTime: EstimatedTime = new EstimatedTime();
  images: Map<number, any>; // this map is used to store resourceURL from image blobs for showing images in views
  imageFiles: Map<number, File>;  // this map is used to store the image blobs as Files
  imageCount: number;
}
