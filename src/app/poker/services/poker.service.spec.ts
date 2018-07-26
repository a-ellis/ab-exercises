import { inject, TestBed } from '@angular/core/testing';
import { CardRank } from '../constants/card-rank.constants';
import { HandRank } from '../constants/hand-rank.constants';
import { Card } from '../interfaces/card.interface';
import { Hand } from '../interfaces/hand.interface';
import { HandRankMessage } from '../models/hand-rank-message.model';
import { PokerService } from './poker.service';


describe('PokerService', () => {
  let service: PokerService;
  let validHandString;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PokerService]
    });
  });

  beforeEach(inject([PokerService], (pokerService: PokerService) => service = pokerService));

  it('should provide a method for parsing a cardString into Card[]', () => {
    validHandString = '2s 3s 4s 5s 6s';
    const expectedOutput: Card[] = [
      { rank: 0, suite: 3 },
      { rank: 1, suite: 3 },
      { rank: 2, suite: 3 },
      { rank: 3, suite: 3 },
      { rank: 4, suite: 3 }
    ];

    expect(service['parseCards'](validHandString)).toEqual(expectedOutput);
  });

  it('should provide a method for determining if a Hand is a Flush', () => {
    const handIsFlush: Hand = [
      { rank: 0, suite: 3 },
      { rank: 1, suite: 3 },
      { rank: 2, suite: 3 },
      { rank: 3, suite: 3 },
      { rank: 4, suite: 3 }
    ];

    expect(service['isFlush'](handIsFlush)).toBeTruthy();

    // break the flush
    const notFlush = handIsFlush;
    notFlush[0].suite = 1;

    expect(service['isFlush'](notFlush)).toBeFalsy();
  });

  it('should provide a method for determining if a Hand is a Straight', () => {
    const handIsStraight: Hand = [
      { rank: 0, suite: 3 },
      { rank: 1, suite: 1 },
      { rank: 2, suite: 2 },
      { rank: 3, suite: 3 },
      { rank: 4, suite: 3 }
    ];

    expect(service['isStraight'](handIsStraight)).toBeTruthy();

    // break the straight
    const notStraight = handIsStraight;
    notStraight[0].rank = 12;

    expect(service['isStraight'](notStraight)).toBeFalsy();
  });

  it('should provide a method for determining if a Hand is a Royal (Straight)', () => {
    const handIsRoyal: Hand = [
      { rank: 8, suite: 3 },
      { rank: 9, suite: 2 },
      { rank: 10, suite: 1 },
      { rank: 11, suite: 0 },
      { rank: 12, suite: 3 }
    ];

    expect(service['isRoyal'](handIsRoyal)).toBeTruthy();

    const notRoyal = handIsRoyal;
    notRoyal[0].rank = 0;

    expect(service['isRoyal'](notRoyal)).toBeFalsy();
  });

  it('should provide a method of notifying of evaluated Hand ranks', () => {
    const evaluatedHand: Hand = [
      { rank: 8, suite: 3 },
      { rank: 8, suite: 2 },
      { rank: 10, suite: 1 },
      { rank: 11, suite: 0 },
      { rank: 12, suite: 3 }
    ];

    service.rank$.subscribe((rank: HandRankMessage) => {
      expect(rank).toEqual(jasmine.any(HandRankMessage));
      expect(rank.message).toBe('Pair of Tens');
    });

    service.hand$.subscribe((hand: Hand) => {
      expect(hand).toEqual(evaluatedHand);
    });

    service['emitHandRank'](evaluatedHand, HandRank.Pair, [evaluatedHand[0].rank]);
  });

  describe('evaluateHandRank', () => {

    beforeEach(() => {
      // the <any> is to access private methods via spyOn without compiler error
      spyOn<any>(service, 'emitHandRank').and.callThrough();
    });

    it('should trigger notifyRank when evaluating a valid hand', () => {
      validHandString = '2s 3s 4s 5s 6s';

      service.evaluateHandRank(validHandString);

      expect(service['emitHandRank']).toHaveBeenCalled();
    });

    it('should notify of a Royal Flush', () => {
      validHandString = '10s js qs ks as';

      service.evaluateHandRank(validHandString);
      expect(service['emitHandRank']).toHaveBeenCalledWith(jasmine.any(Array), HandRank.RoyalFlush);
    });

    it('should notify of a Straight Flush', () => {
      validHandString = '9s 10s js qs ks';

      service.evaluateHandRank(validHandString);
      expect(service['emitHandRank']).toHaveBeenCalledWith(jasmine.any(Array), HandRank.StraightFlush);
    });

    it('should notify of a Flush', () => {
      validHandString = '9s 2s js qs ks';

      service.evaluateHandRank(validHandString);
      expect(service['emitHandRank']).toHaveBeenCalledWith(jasmine.any(Array), HandRank.Flush);
    });

    it('should notify of a Straight', () => {
      validHandString = '9c 10d js qs ks';

      service.evaluateHandRank(validHandString);
      expect(service['emitHandRank']).toHaveBeenCalledWith(jasmine.any(Array), HandRank.Straight);
    });

    it('should notify of Four of a Kind', () => {
      validHandString = '9s 9c 9h 9d ks';

      service.evaluateHandRank(validHandString);
      expect(service['emitHandRank']).toHaveBeenCalledWith(jasmine.any(Array), HandRank.FourKind, [CardRank.Nine]);
    });

    it('should notify of a Full House', () => {
      validHandString = '7s 7c 7h 9d 9s';

      service.evaluateHandRank(validHandString);
      expect(service['emitHandRank']).toHaveBeenCalledWith(jasmine.any(Array), HandRank.FullHouse, [CardRank.Seven, CardRank.Nine]);
    });

    it('should notify of Three of a Kind', () => {
      validHandString = '7s 7c 7h 9d ks';

      service.evaluateHandRank(validHandString);
      expect(service['emitHandRank']).toHaveBeenCalledWith(jasmine.any(Array), HandRank.ThreeKind, [CardRank.Seven]);
    });

    it('should notify of Two Pair', () => {
      validHandString = '2s 2c 7h 7d ks';

      service.evaluateHandRank(validHandString);
      expect(service['emitHandRank']).toHaveBeenCalledWith(jasmine.any(Array), HandRank.TwoPair, [CardRank.Seven, CardRank.Two]);
    });

    it('should notify of a Pair', () => {
      validHandString = '2s 2c 7h 10d ks';

      service.evaluateHandRank(validHandString);
      expect(service['emitHandRank']).toHaveBeenCalledWith(jasmine.any(Array), HandRank.Pair, [CardRank.Two]);
    });

    it('should notify of High Card', () => {
      validHandString = 'as 2c 7h 10d ks';

      service.evaluateHandRank(validHandString);
      expect(service['emitHandRank']).toHaveBeenCalledWith(jasmine.any(Array), HandRank.HighCard, [CardRank.Ace]);
    });
  });

  it('should provide a method for emitting a null rank when a hand value is changing', () => {
    spyOn(service['_rank$'], 'next').and.callThrough();
    spyOn(service['_hand$'], 'next').and.callThrough();

    service.rank$.subscribe((rank: HandRankMessage) => {
      expect(rank).toBeNull();
    });

    service.hand$.subscribe((hand: Hand) => {
      expect(hand).toBeNull();
    });

    expect(service['_rank$'].next).not.toHaveBeenCalled();
    expect(service['_hand$'].next).not.toHaveBeenCalled();

    service.handIsChanging();

    expect(service['_rank$'].next).toHaveBeenCalledWith(null);
    expect(service['_hand$'].next).toHaveBeenCalledWith(null);
  });

});
