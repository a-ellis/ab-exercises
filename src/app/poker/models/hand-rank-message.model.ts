import { CardRank } from '../constants/card-rank.constants';

export class HandRankMessage {
  message: string;

  private getMessage(handRank: number, ...cardRanks: number[]) {
    const messages = {
      0: `High Card ( ${CardRank[cardRanks[0]]} )`,
      1: `Pair of ${CardRank[cardRanks[0]]}s`,
      2: `Two Pair ( ${CardRank[cardRanks[0]]}s and ${CardRank[cardRanks[1]]}s )`,
      3: `Three of a Kind ( ${CardRank[cardRanks[0]]}s )`,
      4: `Straight`,
      5: `Flush`,
      6: `Full House ( ${CardRank[cardRanks[0]]}s over ${CardRank[cardRanks[1]]}s )`,
      7: `Four of a Kind ( ${CardRank[cardRanks[0]]}s )`,
      8: `Straight Flush`,
      9: `Royal Flush`
    };

    return messages[handRank];
  }

  constructor(handRank: number, cardRanks?: number[]) {
    this.message = this.getMessage(handRank, ...cardRanks);
  }
}
