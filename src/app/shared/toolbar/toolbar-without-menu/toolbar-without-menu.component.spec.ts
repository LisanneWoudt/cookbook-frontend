import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarWithoutMenuComponent } from './toolbar-without-menu.component';

describe('ToolbarWithoutMenuComponent', () => {
  let component: ToolbarWithoutMenuComponent;
  let fixture: ComponentFixture<ToolbarWithoutMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarWithoutMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarWithoutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
