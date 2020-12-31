import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Chef} from "../../dto/chef";
import {Cookbook} from "../../dto/cookbook";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  chef: Chef;
  chefId: number;
  cookbook: Cookbook;

  constructor() { }

  getChefId() {
    if (!environment.production) {
      return this.getMockChefId();
    } else {
        return this.chefId;
    }
  }

  getMockChefId() {
    return 5;
  }

  getChef() {
    return this.chef;
  }

  setChef(chef: Chef) {
    this.chef = chef;
  }

  getCookbook() {
    if (!environment.production) {
      return this.getMockCookbook();
    } else {
      return this.cookbook;
    }
  }

  setCookbook(cookbook: Cookbook) {
    this.cookbook = cookbook;
  }

  getMockCookbook() {
    if (this.cookbook) {
      return this.cookbook;
    } else {
      this.cookbook = new Cookbook();
      this.cookbook.id = 1;
      return this.cookbook;
    }
  }

  isOwnCookbook() {
    if (this.chef && this.chef.cookbooks) {
      if (this.chef.cookbooks.length === 0) { // chef without cookbooks
        return true;
      }
      for (let i = 0; i < this.chef.cookbooks.length; i++) {
        if (this.chef.cookbooks[i] && this.getCookbook() && this.chef.cookbooks[i].id === this.getCookbook().id) {
          return true;
        }
      }
    }
    return false;
  }
}
