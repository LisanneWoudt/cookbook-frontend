import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarCheckComponent } from './toolbar-check.component';

describe('ToolbarCheckComponent', () => {
  let component: ToolbarCheckComponent;
  let fixture: ComponentFixture<ToolbarCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
