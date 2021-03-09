import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpCustomClient} from "./http-custom-client";

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  baseUrl = 'images/';

  constructor(private http: HttpCustomClient) { }

  uploadImages(filename: string, files: File[]): Observable<any> {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i], filename);
    }
    formData.append('name', filename);

    return this.http.post(environment.host + this.baseUrl + 'upload/multiple', formData);
  }

  downloadThumbnail(imageId: string): Observable<Blob> {
    return this.getWithResponseTypeBlob(environment.host + this.baseUrl + 'download/thumbnail?image=' + imageId);
  }

  downloadImage(imageId: string): Observable<Blob> {
    return this.getWithResponseTypeBlob(environment.host + this.baseUrl + 'download?image=' + imageId);
  }

  getWithResponseTypeBlob(url) {
    return this.http.getWithResponseTypeBlob(url);
  }

}
