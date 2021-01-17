import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {JoinCookbookRequest} from "../../dto/join-cookbook-request";
import {HttpCustomClient} from "./http-custom-client";

@Injectable({
  providedIn: 'root'
})
export class JoinCookbookRequestService {

  baseUrl = 'requests/';

  constructor(private http: HttpCustomClient) { }

  saveRequest(request: JoinCookbookRequest): Observable<JoinCookbookRequest> {
    return this.http.post(environment.host + this.baseUrl + 'save', request);
  }

  checkRequestSent(chefId: number, cookbookId: number): Observable<JoinCookbookRequest> {
    return this.http.get(environment.host + this.baseUrl + 'check?id=' + chefId + '&cookbookId=' + cookbookId);
  }

  getRequestCount(chefId: number): Observable<number> {
    return this.http.get(environment.host + this.baseUrl + 'count?id=' + chefId);
  }

  getRequestsByChefId(chefId: number): Observable<JoinCookbookRequest[]> {
    return this.http.get(environment.host + this.baseUrl + 'by-chefId?id=' + chefId);
  }
}
