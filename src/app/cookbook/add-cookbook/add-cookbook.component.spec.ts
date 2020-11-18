import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCookbookComponent } from './add-cookbook.component';

describe('AddCookbookComponent', () => {
  let component: AddCookbookComponent;
  let fixture: ComponentFixture<AddCookbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCookbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCookbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
