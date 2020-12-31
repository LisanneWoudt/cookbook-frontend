import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css', '../../app.component.css']
})
export class AddCategoryComponent implements OnInit {

  category: string;
  existingCategory: boolean = false;

  @Input() currentCategories: string[];
  @Output() addCategory = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  toAddCategory(valid: any) {
    if (!valid) {
      return;
    }
    if (this.checkCategoryExists()) {
      this.existingCategory = true;
      return;
    }
    this.addCategory.next(this.category);
  }

  checkCategoryExists() {
    return this.category && this.currentCategories.includes(this.category.toLowerCase());
  }
}
