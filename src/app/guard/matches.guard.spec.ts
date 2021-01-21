import { TestBed } from '@angular/core/testing';

import { MatchesGuard } from './matches.guard';

describe('MatchesGuard', () => {
  let guard: MatchesGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MatchesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
