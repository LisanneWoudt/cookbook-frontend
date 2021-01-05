import {Inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {Chef} from "../../dto/chef";
import {Cookbook} from "../../dto/cookbook";
import {SESSION_STORAGE, WebStorageService} from "ngx-webstorage-service";
import {ChefService} from "./chef.service";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  chef: Chef;
  cookbook: Cookbook;

  constructor(private chefService: ChefService, @Inject(SESSION_STORAGE) private storage: WebStorageService) { }

  getMockChef() {
    const chef = new Chef();
    chef.id = 5;
    chef.cookbooks = [];
    return chef;
  }

  getChef() {
    if (!this.chef && !environment.production) {
      return this.getMockChef();
    } else {
      if (this.chef === undefined && this.storage.get('loggedIn') === true) {
        this.chefService.getChef(this.storage.get('userId')).subscribe(data => {
          if (data != null) {
            this.setChef(data);
            return data;
          }
        });
      } else {
        return this.chef;
      }
    }
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
