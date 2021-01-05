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

  addCookbook(cookbook: Cookbook): Observable<any> {
    return this.http.post(environment.host + this.baseUrl + 'add', cookbook);
  }

  getCookbook(id: number): Observable<Cookbook> {
    return this.http.get(environment.host + this.baseUrl + id);
  }

}
