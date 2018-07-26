import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class AppPage {
  introElem: ElementFinder;
  inputElem: ElementFinder;
  errorElem: ElementFinder;
  submitBtnElem: ElementFinder;
  cardElems: ElementArrayFinder;
  rankText: ElementFinder;

  constructor() {
    this.introElem = element(by.css('ab-root h1'));
    this.inputElem = element(by.css('input[type="text"]'));
    this.errorElem = element(by.css('.mat-error'));
    this.submitBtnElem = element(by.css('button[type="submit"]'));
    this.cardElems = element.all(by.css('ab-poker-card'));
    this.rankText = element(by.css('.rank'));
  }

  navigateTo() {
    return browser.get('/');
  }

  getIntroMessage() {
    browser.sleep(1500);
    return element(by.css('ab-root h1')).getText();
  }
}
