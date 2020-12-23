import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchChefComponent } from './search-chef.component';

describe('SearchChefComponent', () => {
  let component: SearchChefComponent;
  let fixture: ComponentFixture<SearchChefComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchChefComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchChefComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
