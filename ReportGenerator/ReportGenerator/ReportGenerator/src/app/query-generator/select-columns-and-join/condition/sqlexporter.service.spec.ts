import { TestBed } from '@angular/core/testing';

import { SQLExporterService } from './sqlexporter.service';

describe('SQLExporterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SQLExporterService = TestBed.get(SQLExporterService);
    expect(service).toBeTruthy();
  });
});
