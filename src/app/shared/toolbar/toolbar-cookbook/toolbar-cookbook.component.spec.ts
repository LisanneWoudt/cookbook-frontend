import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarCookbookComponent } from './toolbar-cookbook.component';

describe('ToolbarCookbookComponent', () => {
  let component: ToolbarCookbookComponent;
  let fixture: ComponentFixture<ToolbarCookbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarCookbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarCookbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
