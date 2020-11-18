import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {Chef} from "../../dto/chef";
import {Cookbook} from "../../dto/cookbook";
import {ChefService} from "./chef.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  chef: Chef;
  chefId: number;
  cookbook: Cookbook;

  constructor(private chefService: ChefService) { }

  getChefId() {
    if (!environment.production) {
      return this.getMockChefId();
    } else {
        return this.chefId;
    }
  }

  getMockChefId() {
    return 1;
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
    this.cookbook = new Cookbook();
    this.cookbook.id = 1;
    return this.cookbook;
  }
}
