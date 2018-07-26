import { CardRank } from '../constants/card-rank.constants';
import { HandRank } from '../constants/hand-rank.constants';
import { HandRankMessage } from './hand-rank-message.model';

describe('HandRankMessage', () => {
  let service: HandRankMessage;

  it('should return a message for High Card', () => {
    service = new HandRankMessage(HandRank.HighCard, [CardRank.Ace]);
    expect(service.message).toBe('High Card ( Ace )');
  });

  it('should return a message for Pairs', () => {
    service = new HandRankMessage(HandRank.Pair, [CardRank.Ace]);
    expect(service.message).toBe('Pair of Aces');
  });

  it('should return a message for Two Pair', () => {
    service = new HandRankMessage(HandRank.TwoPair, [CardRank.Ace, CardRank.Two]);
    expect(service.message).toBe('Two Pair ( Aces and Twos )');
  });

  it('should return a message for Three of a Kind', () => {
    service = new HandRankMessage(HandRank.ThreeKind, [CardRank.Ace]);
    expect(service.message).toBe('Three of a Kind ( Aces )');
  });

  it('should return a message for a Straight', () => {
    service = new HandRankMessage(HandRank.Straight);
    expect(service.message).toBe('Straight');
  });

  it('should return a message for a Flush', () => {
    service = new HandRankMessage(HandRank.Flush);
    expect(service.message).toBe('Flush');
  });

  it('should return a message for a Full House', () => {
    service = new HandRankMessage(HandRank.FullHouse, [CardRank.Seven, CardRank.Two]);
    expect(service.message).toBe('Full House ( Sevens over Twos )');
  });

  it('should return a message for Four of a Kind', () => {
    service = new HandRankMessage(HandRank.FourKind, [CardRank.Ace]);
    expect(service.message).toBe('Four of a Kind ( Aces )');
  });

  it('should return a message for a Straight Flush', () => {
    service = new HandRankMessage(HandRank.StraightFlush);
    expect(service.message).toBe('Straight Flush');
  });

  it('should return a message for a Royal Flush', () => {
    service = new HandRankMessage(HandRank.RoyalFlush);
    expect(service.message).toBe('Royal Flush');
  });

});
