import { QueryGeneratorModule } from './query-generator.module';

describe('QueryGeneratorModule', () => {
  let queryGeneratorModule: QueryGeneratorModule;

  beforeEach(() => {
    queryGeneratorModule = new QueryGeneratorModule();
  });

  it('should create an instance', () => {
    expect(queryGeneratorModule).toBeTruthy();
  });
});
