import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarCookbookOtherChefComponent } from './toolbar-cookbook-other-chef.component';

describe('ToolbarCookbookOtherChefComponent', () => {
  let component: ToolbarCookbookOtherChefComponent;
  let fixture: ComponentFixture<ToolbarCookbookOtherChefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarCookbookOtherChefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarCookbookOtherChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
