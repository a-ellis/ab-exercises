import { CardRank } from '../constants/card-rank.constants';
import { CardSuite } from '../constants/card-suite.constants';

export interface Card {
  rank: CardRank;
  suite: CardSuite;
}
