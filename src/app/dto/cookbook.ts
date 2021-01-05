import {Recipe} from "./recipe";

export class Cookbook {
  id: number;
  name: string;
  creatorId: number;
  recipes: Recipe[];
}
