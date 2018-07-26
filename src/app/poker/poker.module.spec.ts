import { PokerModule } from './poker.module';

describe('PokerModule', () => {
  let pokerModule: PokerModule;

  beforeEach(() => {
    pokerModule = new PokerModule();
  });

  it('should create an instance', () => {
    expect(pokerModule).toBeTruthy();
  });
});
