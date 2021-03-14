import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarEditCookbookComponent } from './toolbar-edit-cookbook.component';

describe('ToolbarEditCookbookComponent', () => {
  let component: ToolbarEditCookbookComponent;
  let fixture: ComponentFixture<ToolbarEditCookbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarEditCookbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarEditCookbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
