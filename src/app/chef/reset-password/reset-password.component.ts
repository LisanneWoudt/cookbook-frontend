import { Component, OnInit } from '@angular/core';
import {Chef} from "../../dto/chef";
import {ChefService} from "../../shared/services/chef.service";
import {MyErrorHandler} from "../../shared/error/my-error-handler";
import {DataService} from "../../shared/services/data.service";
import {Router} from "@angular/router";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css', '../../app.component.css']
})
export class ResetPasswordComponent extends MyErrorHandler implements OnInit {

  loading = false;
  chef: Chef = new Chef();

  constructor(private chefService: ChefService, private router: Router, private dataService: DataService,
              private dialog: MatDialog) {
    super();
  }

  ngOnInit() {}

  resetPassword(formvalid: any) {
    if (!formvalid) {
      return;
    }
    this.loading = true;
    this.chef.passwordReset = true;
    this.chefService.resetPassword(this.chef).subscribe(() => {
      this.responseSuccess();
    }, error => {
      super.handleError(error, this.router, this.dataService);
    });
  }

  responseSuccess() {
    this.loading = false;
    this.dataService.setChef(this.chef);
    this.openDialog('Password reset',
      'Password has been reset. You will receive an email on the specified email address ' +
      'within a few minutes');
  }

  openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title, message}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.goBack();
    });
  }

  goBack() {
    this.router.navigate(['/login']);
  }

}
