import { TestBed } from '@angular/core/testing';

import { JoinCookbookRequestService } from './join-cookbook-request.service';

describe('JoinCookbookRequestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JoinCookbookRequestService = TestBed.get(JoinCookbookRequestService);
    expect(service).toBeTruthy();
  });
});
