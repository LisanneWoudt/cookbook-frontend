import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  baseUrl = 'images/';

  constructor(private http: HttpClient) { }

  uploadImage(filename: string, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, filename);
    formData.append('name', filename);
    return this.http.post(environment.host + this.baseUrl + 'upload', formData);
  }

  downloadThumbnail(imageId: number): Observable<Blob> {
    return this.getWithResponseTypeBlob(environment.host + this.baseUrl + 'download/thumbnail?image=' + imageId);
  }

  downloadImage(imageId: number): Observable<Blob> {
    return this.getWithResponseTypeBlob(environment.host + this.baseUrl + 'download?image=' + imageId);
  }

  getWithResponseTypeBlob(url) {
    const headers = new HttpHeaders();
    return this.http.get(url, {responseType: 'blob', headers});
  }

}
