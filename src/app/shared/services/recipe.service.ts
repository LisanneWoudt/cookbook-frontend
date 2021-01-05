import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Recipe} from "../../dto/recipe";
import {HttpCustomClient} from "./http-custom-client";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  baseUrl = 'recipes/';

  constructor(private http: HttpCustomClient) { }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get(environment.host + this.baseUrl + id);
  }

  saveRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post(environment.host + this.baseUrl + 'save', recipe);
  }

  deleteRecipe(id: number): Observable<Recipe> {
    return this.http.delete(environment.host + this.baseUrl + id);
  }

  getRecipeCategories(cookbookId: number): Observable<String[]> {
    return this.http.get(environment.host + this.baseUrl + 'categories?cookbookId=' + cookbookId);
  }

}
