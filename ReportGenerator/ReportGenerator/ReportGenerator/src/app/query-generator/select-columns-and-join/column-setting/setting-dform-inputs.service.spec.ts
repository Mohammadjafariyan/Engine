import { TestBed } from '@angular/core/testing';

import { SettingDFormInputsService } from './setting-dform-inputs.service';

describe('SettingDFormInputsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SettingDFormInputsService = TestBed.get(SettingDFormInputsService);
    expect(service).toBeTruthy();
  });
});
