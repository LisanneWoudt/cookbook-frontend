import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {SESSION_STORAGE, WebStorageService} from "ngx-webstorage-service";
import {Observable} from "rxjs";
import {Chef} from "../../dto/chef";

@Injectable()
export class HttpCustomClient {

  constructor(private http: HttpClient, @Inject(SESSION_STORAGE) private storage: WebStorageService) {}

  get(url): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.storage.get('access_token'));
    return this.http.get<any>(url, {headers});
  }

  getWithResponseTypeBlob(url) {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.storage.get('access_token'));
    return this.http.get(url, {responseType: 'blob', headers});
  }

  post(url, data): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.storage.get('access_token'));
    return this.http.post(url, data, {headers});
  }

  put(url, data): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.storage.get('access_token'));
    return this.http.put(url, data, {headers});
  }

  delete(url): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.storage.get('access_token'));
    return this.http.delete(url, {headers});
  }
}
