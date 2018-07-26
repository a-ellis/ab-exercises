import { FormControl, ValidationErrors } from '@angular/forms';

export function pokerHandValidator (control: FormControl): ValidationErrors | null {
  const hand: string = control.value;
  const regex: RegExp = /^(((?:[2-9jqka]|10)[shdc])\s){4}((?:[2-9jqka]|10)[shdc])$/i;
  const error: ValidationErrors = { pokerHandFormat: 'invalid' };

  if (hand && regex.test(hand)) {
    const cardArray: string[] = hand.split(' ');
    if (cardArray.length === new Set(cardArray).size) {
      return null;
    } else {
      return error;
    }
  } else if (hand) {
    return error;
  }
}
