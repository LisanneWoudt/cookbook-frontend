import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogWithCancelButtonComponent } from './dialog-with-cancel-button.component';

describe('DialogWithCancelButtonComponent', () => {
  let component: DialogWithCancelButtonComponent;
  let fixture: ComponentFixture<DialogWithCancelButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogWithCancelButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogWithCancelButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
