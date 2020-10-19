import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  baseUrl = 'recipes/';

  constructor(private http: HttpClient) { }

  getRecipe(id: number): Observable<any> {
    return this.http.get(environment.host + this.baseUrl + id);
  }
}
