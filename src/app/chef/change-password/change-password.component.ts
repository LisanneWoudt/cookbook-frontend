import { Component, OnInit } from '@angular/core';
import {Chef} from "../../dto/chef";
import {ChefService} from "../../shared/services/chef.service";
import {DataService} from "../../shared/services/data.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {MyErrorHandler} from "../../shared/error/my-error-handler";

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css', '../../app.component.css']
})
export class ChangePasswordComponent extends MyErrorHandler implements OnInit {

  loading: boolean;
  chef: Chef;

  constructor(private router: Router, public dialog: MatDialog,
              private dataService: DataService, private chefService: ChefService) {
    super();
  }

  ngOnInit() {
    this.chef = this.dataService.getChef();
    this.chef.password = '';
  }

  updateChef(formvalid: any) {
    if (!formvalid) {
      return;
    }

    this.loading = true;
    this.chefService.getChef(this.chef.id).subscribe(data => {
      const chef: Chef = data;
      chef.password = this.chef.password;
      chef.passwordReset = false;
      this.chefService.updateChef(chef).subscribe(() => {
        this.responseSuccess();
      }, error => {
        super.handleError(error, this.router, this.dataService);
      });
    }, error => {
      super.handleError(error, this.router, this.dataService);
    });
  }

  responseSuccess() {
    this.loading = false;
    this.dataService.setChef(this.chef);
    this.openDialog('Password changed',
      'You have successfully changed your password');
  }

  openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title, message}
    });

    dialogRef.afterClosed().subscribe(() => {
        this.goToHome();
    });
  }

  goToHome() {
    this.router.navigate(['/cookbook']);
  }
}
