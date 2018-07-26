export enum CardRank {
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
  Nine,
  Ten,
  Jack,
  Queen,
  King,
  Ace
}

export const cardRankObj = {
  '2': CardRank.Two,
  '3': CardRank.Three,
  '4': CardRank.Four,
  '5': CardRank.Five,
  '6': CardRank.Six,
  '7': CardRank.Seven,
  '8': CardRank.Eight,
  '9': CardRank.Nine,
  '10': CardRank.Ten,
  'j': CardRank.Jack,
  'q': CardRank.Queen,
  'k': CardRank.King,
  'a': CardRank.Ace
};

export const royalCardRank = (CardRank.Ten + CardRank.Jack + CardRank.Queen + CardRank.King + CardRank.Ace);
