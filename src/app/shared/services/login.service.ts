import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Chef} from "../../dto/chef";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {}

  login(chef: Chef): Observable<any> {
    return this.http.post(environment.host + 'auth/signin', chef);
  }

  register(chef: Chef): Observable<any> {
    return this.http.post(environment.host + 'auth/register', chef);
  }
}
