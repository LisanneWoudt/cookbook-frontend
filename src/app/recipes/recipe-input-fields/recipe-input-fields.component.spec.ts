import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeInputFieldsComponent } from './recipe-input-fields.component';

describe('RecipeInputFieldsComponent', () => {
  let component: RecipeInputFieldsComponent;
  let fixture: ComponentFixture<RecipeInputFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipeInputFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeInputFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
