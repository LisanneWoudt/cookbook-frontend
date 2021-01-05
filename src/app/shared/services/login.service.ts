import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Chef} from "../../dto/chef";
import {HttpCustomClient} from "./http-custom-client";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpCustomClient) {}

  login(chef: Chef): Observable<Chef> {
    return this.http.post(environment.host + 'auth/signin', chef);
  }

  register(chef: Chef): Observable<Chef> {
    return this.http.post(environment.host + 'auth/register', chef);
  }
}
