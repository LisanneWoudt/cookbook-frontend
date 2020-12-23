import {Cookbook} from "./cookbook";

export class Chef {
  id: number;
  name: string;
  lastSelectedCookbookId: number;
  cookbooks: Cookbook[];
}
