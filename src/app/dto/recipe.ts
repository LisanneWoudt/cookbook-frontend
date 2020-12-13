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
}
