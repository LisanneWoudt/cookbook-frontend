import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {JoinCookbookRequest} from "../dto/join-cookbook-request";
import {JoinCookbookRequestService} from "../shared/services/join-cookbook-request.service";
import {DataService} from "../shared/services/data.service";
import {CookbookService} from "../shared/services/cookbook.service";
import {Cookbook} from "../dto/cookbook";
import {ChefService} from "../shared/services/chef.service";
import {DialogWithCancelButtonComponent} from "../shared/dialog/dialog-with-cancel-button/dialog-with-cancel-button.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-join-requests',
  templateUrl: './join-requests.component.html',
  styleUrls: ['./join-requests.component.css', '../app.component.css']
})
export class JoinRequestsComponent implements OnInit {

  sub: any;
  cookbookId: number;
  requests: JoinCookbookRequest[];
  cookbooks: Cookbook[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private dialog: MatDialog,
              private joinCookbookRequestService: JoinCookbookRequestService, private dataService: DataService,
              private cookbookService: CookbookService, private chefService: ChefService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.cookbookId = +params.cookbookId;
      this.getRequests();
    });
  }

  goBack() {
    if (this.cookbookId) {
      this.router.navigate(['/cookbooks/' + this.cookbookId]);
    } else {
      this.router.navigate(['/cookbook']);
    }
  }

  getRequests() {
    this.joinCookbookRequestService.getRequestsByChefId(this.dataService.getChefId()).subscribe(result => {
      this.requests = result;
      for(let i=0; i < this.requests.length; i++){
        this.getCookbookName(this.requests[i]);
        this.getChefName(this.requests[i]);
      }
    })
  }

  getCookbookName(request: JoinCookbookRequest) {
    this.cookbookService.getCookbook(request.cookbookId).subscribe(result => {
      request.cookbookName = result.name;
    })
  }

  getChefName(request: JoinCookbookRequest) {
    this.chefService.getChef(request.chefId).subscribe(result => {
      request.chefName = result.username;
    })
  }

  confirm(request: JoinCookbookRequest, accept: boolean) {
    const acceptOrReject = accept ? 'accept' : 'reject';
    const dialogRef = this.dialog.open(DialogWithCancelButtonComponent, {
      width: '250px',
      data: {title : acceptOrReject.charAt(0).toUpperCase() + acceptOrReject.slice(1) + ' request',
        message: 'Are you sure you want to ' + acceptOrReject + ' this request?'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        request.status = accept ? 'ACCEPTED' : 'REJECTED';
        this.saveRequest(request);
      }
    });
  }

  saveRequest(request: JoinCookbookRequest) {
    this.joinCookbookRequestService.saveRequest(request).subscribe(() => {
      window.location.reload();
    });
  }

}
