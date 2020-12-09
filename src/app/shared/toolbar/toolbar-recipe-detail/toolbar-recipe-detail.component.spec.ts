import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarRecipeDetailComponent } from './toolbar-recipe-detail.component';

describe('ToolbarRecipeDetailComponent', () => {
  let component: ToolbarRecipeDetailComponent;
  let fixture: ComponentFixture<ToolbarRecipeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarRecipeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarRecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
