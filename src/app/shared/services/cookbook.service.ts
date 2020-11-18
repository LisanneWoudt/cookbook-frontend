import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Cookbook} from "../../dto/cookbook";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CookbookService {

  baseUrl = 'cookbooks/';

  constructor(private http: HttpClient) { }

  addCookbook(cookbook: Cookbook): Observable<any> {
    return this.http.post(environment.host + this.baseUrl + 'add', cookbook);
  }

  getCookbook(id: number): Observable<Cookbook> {
    return this.http.get<Cookbook>(environment.host + this.baseUrl + id);
  }

  getCookbookByChefId(chefId: number): Observable<Cookbook[]> {
    return this.http.get<Cookbook[]>(environment.host + this.baseUrl + 'by-chefId?chefId=' + chefId);
  }

}
