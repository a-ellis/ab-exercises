import { browser } from '../../node_modules/protractor';
import { AppPage } from './app.po';

describe('Poker Ranking App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display intro message', () => {
    page.navigateTo();
    expect(page.getIntroMessage()).toEqual('Enter a Poker hand below to learn its Rank');
  });

  it('should not display any card ranks or cards when form is empty', () => {
    expect(page.rankText.isPresent()).toBeFalsy();
    expect(page.cardElems.isPresent()).toBeFalsy();
  });

  it('should disable submit button while there is no valid input', () => {
    expect(page.inputElem.getAttribute('value')).toBeFalsy();
    expect(page.submitBtnElem.getAttribute('disabled')).toBeTruthy();
  });

  it('should enable submit button when valid input is entered', () => {
    const validInput = '2s 3s 4s 5s 6s';
    page.inputElem.sendKeys(validInput);

    expect(page.submitBtnElem.getAttribute('disabled')).toBeFalsy();
  });

  it('should evaluate rank of poker hand when submitting valid input', () => {
    page.submitBtnElem.click();
    browser.sleep(400); // wait for some animations

    expect(page.cardElems.count()).toBe(5);
    expect(page.rankText.getText()).toBe('Straight Flush');
  });

  it('should clear rank and cards when new input is being entered into field', () => {
    page.inputElem.sendKeys(' ');
    browser.sleep(400);
    expect(page.cardElems.isPresent()).toBeFalsy();
    expect(page.rankText.isPresent()).toBeFalsy();
  });

  it('should mark form invalid and display error message when entering invalid input', () => {
    const invalidInput = 'nope, definitely not';
    page.inputElem.sendKeys(invalidInput);

    expect(page.inputElem.getAttribute('class')).toContain('ng-invalid');
    expect(page.errorElem.isPresent()).toBeTruthy();
    expect(page.errorElem.getText()).toBe('Poker hand format is invalid');
    expect(page.submitBtnElem.getAttribute('disabled')).toBeTruthy();
  });

  it('should mark form invalid when there is no input value once form isDirty', () => {
    page.inputElem.clear();
    expect(page.inputElem.getAttribute('class')).toContain('ng-invalid');
    expect(page.submitBtnElem.getAttribute('disabled')).toBeTruthy();
  });
});
