import { ComputeDesignModule } from './compute-design.module';

describe('ComputeDesignModule', () => {
  let computeDesignModule: ComputeDesignModule;

  beforeEach(() => {
    computeDesignModule = new ComputeDesignModule();
  });

  it('should create an instance', () => {
    expect(computeDesignModule).toBeTruthy();
  });
});
