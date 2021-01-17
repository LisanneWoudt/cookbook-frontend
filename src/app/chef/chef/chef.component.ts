import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ChefService} from "../../shared/services/chef.service";
import {Chef} from "../../dto/chef";

@Component({
  selector: 'app-chef',
  templateUrl: './chef.component.html',
  styleUrls: ['./chef.component.css']
})
export class ChefComponent implements OnInit {

  chefName: string;
  chef: Chef;
  sub: any;

  constructor(private route: ActivatedRoute, private router: Router, private chefService: ChefService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.getChef(+params.id);
    });
  }

  getChef(chefId: number) {
    this.chefService.getChef(chefId).subscribe(result => {
      this.chef = result;
      this.chefName = result.username;
    });
  }

  goToCookbook(cookbookId: number) {
    this.router.navigate(['cookbooks/' + cookbookId]);
  }

  navigateBack() {
    this.router.navigate(['chefs/search']);
  }
}
