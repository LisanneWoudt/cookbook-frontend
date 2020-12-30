import {Component, OnInit} from '@angular/core';
import {Cookbook} from "../../dto/cookbook";
import {CookbookService} from "../../shared/services/cookbook.service";
import {DataService} from "../../shared/services/data.service";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../../shared/dialog/dialog.component";
import {ChefService} from "../../shared/services/chef.service";

@Component({
  selector: 'app-add-cookbook',
  templateUrl: './add-cookbook.component.html',
  styleUrls: ['./add-cookbook.component.css']
})
export class AddCookbookComponent implements OnInit {

  cookbook: Cookbook = new Cookbook();
  loading: boolean;
  userId: number;

  constructor(private cookbookService: CookbookService, private dataService: DataService,
              private chefService: ChefService,
              private router: Router, public dialog: MatDialog) { }

  ngOnInit() {
    this.userId = this.dataService.getChefId();
  }

  addCookbook(formValid: any) {
    if (!formValid) {
      return;
    }
    this.cookbook.chefId = this.userId;

    this.cookbookService.addCookbook(this.cookbook).subscribe(result => {
      this.responseSuccess(result);
    })
  }

  responseSuccess(newCookbook: Cookbook) {
    this.dataService.setCookbook(newCookbook);

    const chef = this.dataService.getChef();
    chef.lastSelectedCookbookId = newCookbook.id;
    this.dataService.setChef(chef);

    this.chefService.addCookbookToChef(chef.id, newCookbook.id).subscribe(() => {
      this.openDialog('Cookbook created',
        'You have created cookbook "' + this.cookbook.name + '"!');
    });

    this.chefService.setLastSelectedCookbookId(chef).subscribe(result => {
      this.dataService.setChef(result);
    });
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

  navigateToHome() {
    this.router.navigate(['/cookbook']);
  }

}
