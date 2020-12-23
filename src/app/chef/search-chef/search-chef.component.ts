import { Component, OnInit } from '@angular/core';
import {Chef} from "../../dto/chef";
import {ChefService} from "../../shared/services/chef.service";
import {Router} from "@angular/router";
import {DataService} from "../../shared/services/data.service";

@Component({
  selector: 'app-search-chef',
  templateUrl: './search-chef.component.html',
  styleUrls: ['./search-chef.component.css']
})
export class SearchChefComponent implements OnInit {

  query: string;
  chefs: Chef[];

  constructor(private chefService: ChefService, private dataService: DataService, private router: Router) { }

  ngOnInit() {
    this.getAllChefs();
  }

  getAllChefs() {
    this.chefService.getAllChefs().subscribe(result => {
      this.chefs = result.filter(chef => chef.id !== this.dataService.getChefId());
    })
  }

  navigateToChef(chefId: number) {
    this.router.navigate(['/chefs/' + chefId])
  }

  navigateBack() {
    this.router.navigate(['cookbook']);
  }

}
