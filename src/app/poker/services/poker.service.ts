import { Injectable } from '@angular/core';
import { groupBy, reverse, sortBy, values } from 'lodash';
import { Observable, Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { CardRank, cardRankObj, royalCardRank } from '../constants/card-rank.constants';
import { CardSuiteObj } from '../constants/card-suite.constants';
import { HandRank } from '../constants/hand-rank.constants';
import { Card } from '../interfaces/card.interface';
import { Hand } from '../interfaces/hand.interface';
import { HandRankMessage } from '../models/hand-rank-message.model';

@Injectable({
  providedIn: 'root'
})
export class PokerService {
  private _rank$: Subject<HandRankMessage> = new Subject();
  private _hand$: Subject<Hand> = new Subject();

  // Check for a Flush by comparing every Card's suite to that of the first card
  private isFlush(hand: Hand): boolean {
    return hand.every((card: Card, i: number, self: Hand) => card.suite === self[0].suite);
  }

  // Check for a Straight by evaluating whether each Card, after the first, has a rank +1 from previous card
  private isStraight(hand: Hand): boolean {
    return hand.every((card: Card, i: number, self: Hand) => i > 0 ? card.rank === self[i - 1].rank + 1 : true);
  }

  // Check if total hand rank equals that of a Royal Straight (50)
  private isRoyal(hand: Hand): boolean {
    return hand.map((card: Card) => card.rank).reduce((total: number, currRank: number) => total + currRank) === royalCardRank;
  }

  // Parse string representation of cards into a Hand
  private parseCards(cardStr: string): Card[] {
    const parsedCards: Card[] = cardStr.split(' ').map((str: string) => {
      const rankKey = str.slice(0, str.length - 1);
      const suiteKey = str.slice(-1);
      return { rank: cardRankObj[rankKey], suite: CardSuiteObj[suiteKey] };
    });

    return parsedCards;
  }

  // Parse and emit Rank message and matching Hand
  private emitHandRank(hand: Hand, handRank: number, cardRanks?: CardRank[]): void {
    const handRankMessage: HandRankMessage = new HandRankMessage(handRank, cardRanks);
    this._hand$.next(hand);
    this._rank$.next(handRankMessage);
  }

  // return asObservable for readonly public stream; only emit new values
  get rank$(): Observable<HandRankMessage> {
    return this._rank$.asObservable().pipe(distinctUntilChanged());
  }

  // return asObservable for readonly public stream; only emit new values
  get hand$(): Observable<Hand> {
    return this._hand$.asObservable().pipe(distinctUntilChanged());
  }

  evaluateHandRank(cardStr: string): void {
    // Parsed Hand is equivalent to Card[]
    let hand: Hand = this.parseCards(cardStr);

    // Using lodash sortBy to sort hand by each card's rank, ascending
    hand = sortBy(hand, 'rank');

    const handIsFlush = this.isFlush(hand);
    const handIsStraight = this.isStraight(hand);

    if (handIsFlush && handIsStraight) {
      // isRoyal evaluates the total rank, not the suite; in this context we already
      // know the hand is a Flush, so isRoyal = true means a Royal Flush
      const handIsRoyal = this.isRoyal(hand);

      if (handIsRoyal) {
        this.emitHandRank(hand, HandRank.RoyalFlush);
        return;
      } else {
        this.emitHandRank(hand, HandRank.StraightFlush);
        return;
      }
    } else if (handIsFlush) {
      this.emitHandRank(hand, HandRank.Flush);
      return;
    } else if (handIsStraight) {
      this.emitHandRank(hand, HandRank.Straight);
      return;
    } else {
      // Out of Straight/Flush territory; time to start looking for groups of ranks
      // Using lodash's groupBy and values here to simplify generating the cardGroup
      let cardGroup: Array<Card[]> = values(groupBy(hand, 'rank'));
      // Sort cardGroup by length of each group, descending
      cardGroup = reverse(sortBy(cardGroup, (group: Card[]) => group.length));

      // Reverse hand to descending so high cards read left-to-right
      hand.reverse();

      const highCard = cardGroup[0];

      // If the group's length is 2, the hand is either 4 of a Kind or a Full House
      if (cardGroup.length === 2) {
        // const fourKind = cardGroup.filter((group: Card[]) => group.length === 4);
        // if (cardGroup.some((group: Card[]) => group.length === 4)) {
        if (highCard.length === 4) {
          this.emitHandRank(hand, HandRank.FourKind, [highCard[0].rank]);
          return;
        } else {
          this.emitHandRank(hand, HandRank.FullHouse, [highCard[0].rank, cardGroup[1][0].rank]);
          return;
        }
      } else if (cardGroup.length === 3) {
        if (cardGroup.some((group: Card[]) => group.length === 3)) {
          this.emitHandRank(hand, HandRank.ThreeKind, [highCard[0].rank]);
          return;
        } else {
          this.emitHandRank(hand, HandRank.TwoPair, [highCard[0].rank, cardGroup[1][0].rank]);
          return;
        }
      } else if (cardGroup.length === 4) { // Gets pretty straightforward at this point
        this.emitHandRank(hand, HandRank.Pair, [highCard[0].rank]);
        return;
      } else {
        this.emitHandRank(hand, HandRank.HighCard, [highCard[0].rank]);
      }
    }
  }

  // null out rank$ when a hand change is being emitted from service user
  handIsChanging(): void {
    this._rank$.next(null);
    this._hand$.next(null);
  }
}
