import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Recipe} from "../../dto/recipe";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  baseUrl = 'recipes/';

  constructor(private http: HttpClient) { }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(environment.host + this.baseUrl + id);
  }

  addRecipe(recipe: Recipe): Observable<Recipe> {
    return this.http.post<Recipe>(environment.host + this.baseUrl + 'add', recipe);
  }
}
