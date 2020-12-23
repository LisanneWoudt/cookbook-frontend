import { Injectable } from '@angular/core';
import {Cookbook} from "../../dto/cookbook";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Chef} from "../../dto/chef";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  baseUrl = 'chefs/';

  constructor(private http: HttpClient) { }

  getAllChefs(): Observable<Chef[]> {
    return this.http.get<Chef[]>(environment.host + this.baseUrl + 'all');
  }

  getChef(id: number): Observable<Chef> {
    return this.http.get<Chef>(environment.host + this.baseUrl + id);
  }

  setLastSelectedCookbookId(chef: Chef): Observable<Chef> {
    return this.http.put<Chef>(environment.host + this.baseUrl + 'set-cookbook-id', chef);
  }

  addCookbookToChef(chefId: number, cookbookId: number): Observable<Chef> {
    return this.http.get<Chef>(environment.host + this.baseUrl + 'add-cookbook?chefId=' + chefId + '&cookbookId=' + cookbookId);
  }
}
