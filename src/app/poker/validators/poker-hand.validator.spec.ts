import { ValidatorFn } from '@angular/forms';
import { pokerHandValidator } from './poker-hand.validator';

describe('pokerHandValidator', () => {
  let validator: ValidatorFn;
  let expectedError: any;

  beforeEach(() => {
    validator = pokerHandValidator;
    expectedError = {pokerHandFormat: 'invalid'};
  });

  it('should return null if value passes validation', () => {
    const mockControl = { value: '2s 3s 4s 5s 6s' } as any;
    expect(validator(mockControl)).toBeNull();
  });

  it('should return error object if there are duplicates of the same card in value', () => {
    const mockControl = { value: '2s 2s 3s 4s 5s' } as any;
    expect(validator(mockControl)).toEqual(expectedError);
  });

  it('should return error object if control value fails RegEx', () => {
    const mockControl = { value: 'totally-bogus' } as any;
    expect(validator(mockControl)).toEqual(expectedError);
  });
});
