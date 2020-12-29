import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {JoinCookbookRequest} from "../../dto/join-cookbook-request";

@Injectable({
  providedIn: 'root'
})
export class JoinCookbookRequestService {

  baseUrl = 'requests/';

  constructor(private http: HttpClient) { }

  addRequest(request: JoinCookbookRequest): Observable<JoinCookbookRequest> {
    return this.http.post<JoinCookbookRequest>(environment.host + this.baseUrl + 'save', request);
  }

  checkRequestSent(chefId: number, cookbookId: number): Observable<boolean> {
    return this.http.get<boolean>(environment.host + this.baseUrl + 'check?chefId=' + chefId + '&cookbookId=' + cookbookId);
  }

  getRequestCount(chefId: number): Observable<number> {
    return this.http.get<number>(environment.host + this.baseUrl + 'count?chefId=' + chefId);
  }

  getRequestsByChefId(chefId: number): Observable<JoinCookbookRequest[]> {
    return this.http.get<JoinCookbookRequest[]>(environment.host + this.baseUrl + 'by-chefId?chefId=' + chefId);
  }
}
