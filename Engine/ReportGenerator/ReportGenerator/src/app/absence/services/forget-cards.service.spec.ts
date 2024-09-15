import { TestBed } from '@angular/core/testing';

import { ForgetCardsService } from './forget-cards.service';

describe('ForgetCardsService', () => {
  let service: ForgetCardsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ForgetCardsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
