import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-toolbar-edit-cookbook',
  templateUrl: './toolbar-edit-cookbook.component.html',
  styleUrls: ['./toolbar-edit-cookbook.component.css']
})
export class ToolbarEditCookbookComponent implements OnInit {

  @Output() goBack = new EventEmitter();
  @Output() deleteCookbook = new EventEmitter();

  isCookbookCreator: boolean;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.isCookbookCreator = this.dataService.isCookbookCreator();
  }

  goToHome() {
    this.goBack.next();
  }

  toDeleteCookbook() {
    this.deleteCookbook.next();
  }

}
