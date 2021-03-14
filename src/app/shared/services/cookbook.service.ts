import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Cookbook} from "../../dto/cookbook";
import {HttpCustomClient} from "./http-custom-client";

@Injectable({
  providedIn: 'root'
})
export class CookbookService {

  baseUrl = 'cookbooks/';

  constructor(private http: HttpCustomClient) { }

  saveCookbook(cookbook: Cookbook): Observable<any> {
    return this.http.post(environment.host + this.baseUrl + 'save', cookbook);
  }

  getCookbook(id: number): Observable<Cookbook> {
    return this.http.get(environment.host + this.baseUrl + id);
  }

  deleteCookbook(id: number): Observable<void> {
    return this.http.delete(environment.host + this.baseUrl + id);
  }
}
