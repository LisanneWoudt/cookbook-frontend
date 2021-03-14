import { Component, OnInit } from '@angular/core';
import {Cookbook} from "../../dto/cookbook";
import {CookbookService} from "../../shared/services/cookbook.service";
import {DataService} from "../../shared/services/data.service";
import {ChefService} from "../../shared/services/chef.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {MyErrorHandler} from "../../shared/error/my-error-handler";
import {DialogWithCancelButtonComponent} from "../../shared/dialog/dialog-with-cancel-button/dialog-with-cancel-button.component";

@Component({
  selector: 'app-edit-cookbook',
  templateUrl: './edit-cookbook.component.html',
  styleUrls: ['./edit-cookbook.component.css']
})
export class EditCookbookComponent extends MyErrorHandler implements OnInit {

  cookbook: Cookbook = new Cookbook();
  loading: boolean;
  isCookbookCreator: boolean;

  constructor(private cookbookService: CookbookService, private dataService: DataService,
              private chefService: ChefService,
              private router: Router, public dialog: MatDialog) {
    super();
  }

  ngOnInit() {
    this.cookbook = this.dataService.getCookbook();
    this.isCookbookCreator = this.dataService.isCookbookCreator();
  }

  saveCookbook(formValid: any) {
    if (!formValid) {
      return;
    }

    this.cookbookService.saveCookbook(this.cookbook).subscribe(result => {
      this.responseSuccess(result);
    }, error => {
      super.handleError(error, this.router, this.dataService);
    });
  }

  responseSuccess(newCookbook: Cookbook) {
    this.dataService.setCookbook(newCookbook);
    this.openDialog('Cookbook saved', 'You have updated your cookbook');
  }

  openDialog(title: string, message: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {title, message}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.navigateToHome();
    });
  }

  confirmDeleteCookbook() {
    const dialogRef = this.dialog.open(DialogWithCancelButtonComponent, {
      width: '250px',
      data: {title : 'Delete cookbook', message: 'Are you sure you want to delete this cookbook? All your recipes will be deleted'}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.loading = true;
        this.deleteCookbook();
      }
    });
  }

  deleteCookbook() {
    this.cookbookService.deleteCookbook(this.cookbook.id).subscribe(() => {
      this.dataService.setCookbook(new Cookbook());
      this.openDialog('Cookbook deleted', 'You have deleted your cookbook');
    }, error => {
      super.handleError(error, this.router, this.dataService);
    });
  }


  navigateToHome() {
    this.router.navigate(['/cookbook']);
  }

}
