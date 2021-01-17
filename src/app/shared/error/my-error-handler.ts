import {Router} from "@angular/router";
import {DataService} from "../services/data.service";
import {HttpErrorResponse} from "@angular/common/http";

export class MyErrorHandler {

  constructor() {
  }

  handleError(error: Error, router: Router, dataService: DataService) {
    console.error(error);
    dataService.setError(error);
    if (error instanceof HttpErrorResponse && error.status === 403) {
      router.navigate(['/login']);
    } else {
      router.navigate(['/error']);
    }
  }
}
