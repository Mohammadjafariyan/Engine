import { TestBed } from '@angular/core/testing';

import { WorkplacesService } from './workplaces.service';

describe('WorkplacesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WorkplacesService = TestBed.get(WorkplacesService);
    expect(service).toBeTruthy();
  });
});
