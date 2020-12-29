import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCookbookComponent } from './search-cookbook.component';

describe('SearchChefComponent', () => {
  let component: SearchCookbookComponent;
  let fixture: ComponentFixture<SearchCookbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCookbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCookbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
