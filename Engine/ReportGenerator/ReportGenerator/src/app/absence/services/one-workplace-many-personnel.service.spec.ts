import { TestBed } from '@angular/core/testing';

import { OneWorkplaceManyPersonnelService } from './one-workplace-many-personnel.service';

describe('OneWorkplaceManyPersonnelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OneWorkplaceManyPersonnelService = TestBed.get(OneWorkplaceManyPersonnelService);
    expect(service).toBeTruthy();
  });
});
