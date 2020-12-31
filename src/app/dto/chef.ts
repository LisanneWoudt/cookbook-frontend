import {Cookbook} from "./cookbook";

export class Chef {
  id: number;
  username: string;
  email: string;
  password: string;
  lastSelectedCookbookId: number;
  emailNotifications: boolean;
  passwordReset: boolean;
  cookbooks: Cookbook[];
}
