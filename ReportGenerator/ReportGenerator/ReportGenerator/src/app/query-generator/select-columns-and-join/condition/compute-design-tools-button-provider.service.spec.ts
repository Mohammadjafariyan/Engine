import { TestBed } from '@angular/core/testing';

import { ComputeDesignToolsButtonProviderService } from './compute-design-tools-button-provider.service';

describe('ComputeDesignToolsButtonProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComputeDesignToolsButtonProviderService = TestBed.get(ComputeDesignToolsButtonProviderService);
    expect(service).toBeTruthy();
  });
});
