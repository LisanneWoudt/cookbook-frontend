import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Chef} from "../../dto/chef";
import {HttpCustomClient} from "./http-custom-client";

@Injectable({
  providedIn: 'root'
})
export class ChefService {

  baseUrl = 'chefs/';

  constructor(private http: HttpCustomClient) { }

  getAllChefs(): Observable<Chef[]> {
    return this.http.get(environment.host + this.baseUrl + 'minimal');
  }

  getChef(id: number): Observable<Chef> {
    return this.http.get(environment.host + this.baseUrl + id);
  }

  getMinimalChef(id: number): Observable<Chef> {
    return this.http.get(environment.host + this.baseUrl + 'minimal/' + id);
  }

  setLastSelectedCookbookId(chef: Chef): Observable<Chef> {
    return this.http.put(environment.host + this.baseUrl + 'set-cookbook-id', chef);
  }

  addCookbookToChef(chefId: number, cookbookId: number): Observable<Chef> {
    return this.http.get(environment.host + this.baseUrl + 'add-cookbook?id=' + chefId + '&cookbookId=' + cookbookId);
  }
}
