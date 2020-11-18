import {Recipe} from "./recipe";

export class Cookbook {
  id: number;
  name: string;
  description: string;
  chefId: number;
  recipes: Recipe[];
}
