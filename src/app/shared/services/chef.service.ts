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

  updateChef(chef: Chef): Observable<Chef> {
    return this.http.put(environment.host + this.baseUrl + 'update', chef);
}

  setLastSelectedCookbookId(chef: Chef): Observable<Chef> {
    return this.http.put(environment.host + this.baseUrl + 'set-cookbook-id', chef);
  }

  setEmailNotifications(chef: Chef): Observable<void> {
    return this.http.put(environment.host + this.baseUrl + 'set-email-notifications', chef);
  }

  addCookbookToChef(chefId: number, cookbookId: number): Observable<Chef> {
    return this.http.get(environment.host + this.baseUrl + 'add-cookbook?id=' + chefId + '&cookbookId=' + cookbookId);
  }

  resetPassword(chef: Chef): Observable<void> {
    return this.http.post(environment.host + this.baseUrl + 'reset-password', chef);
  }
}
