import { SharedMaterialModule } from './material.module';

describe('MaterialModule', () => {
  let materialModule: SharedMaterialModule;

  beforeEach(() => {
    materialModule = new SharedMaterialModule();
  });

  it('should create an instance', () => {
    expect(materialModule).toBeTruthy();
  });
});
