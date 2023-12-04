import { parseCardsData, times } from "../utils";

const getAmount = ([winning, numbers]: number[][]) => times(winning, numbers);

class Cards extends Map<number, { instances: number; won: number }> {
  private _sumOfCardsWithCopies = 0;

  get sumOfCardsWithCopies() {
    return this._sumOfCardsWithCopies;
  }

  constructor(cards: number[][][]) {
    super();

    cards.forEach((card, i) => {
      this.set(i, {
        instances: 1,
        won: getAmount(card),
      });
    });
  }

  private increseInstanceByAmount(cardNumber: number, amount: number) {
    if (this.has(cardNumber)) {
      const card = this.get(cardNumber)!;
      this.set(cardNumber, {
        ...card,
        instances: card.instances + amount,
      });
    }
  }

  calculateSumOfCardsWonWithCopies() {
    this.forEach((card, cardNumber) => {
      for (let offset = 1; offset <= card.won; offset++) {
        this.increseInstanceByAmount(cardNumber + offset, card.instances);
      }
      this._sumOfCardsWithCopies += card.instances;
    });
    return this;
  }
}

const part2 = (input: string) =>
  new Cards(parseCardsData(input)).calculateSumOfCardsWonWithCopies().sumOfCardsWithCopies;

export default part2;
