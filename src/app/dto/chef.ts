import {Cookbook} from "./cookbook";

export class Chef {
  id: number;
  lastSelectedCookbookId: number;
  cookbooks: Cookbook[];
}
