import { AbsenceModule } from './absence.module';

describe('AbsenceModule', () => {
  let absenceModule: AbsenceModule;

  beforeEach(() => {
    absenceModule = new AbsenceModule();
  });

  it('should create an instance', () => {
    expect(absenceModule).toBeTruthy();
  });
});
