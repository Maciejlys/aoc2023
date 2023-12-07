enum HandStrenght {
  HighCard = 1,
  OnePair = 2,
  TwoPair = 3,
  ThreeOfAKind = 4,
  FullHouse = 5,
  FourOfKind = 6,
  FiveOfKind = 7,
}

const cards = ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"].reverse();

const getCardStrenght = (card: string) => cards.findIndex((x) => x === card);

const lrs = (s: string) => {
  const result: Map<string, number> = new Map();

  for (let i = 0; i < s.length; i++) {
    let previous = "";
    for (let j = i + 1; j < s.length; j++) {
      if (s[i] === s[j] && s[i] != previous) {
        result.set(s[i], (result.get(s[i]) || 1) + 1);
        previous = s[i];
      }
    }
  }
  return result;
};

class Hand {
  private handStrenght: HandStrenght;

  constructor(private cards: string, private bid: number) {
    this.evaluateStrenght();
  }

  private evaluateStrenght() {
    const matchingCards = lrs(this.cards);
    if (matchingCards.size === 2) {
      const [one, two] = matchingCards.values();

      if ((one === 3 && two === 2) || (one === 2 && two === 3)) {
        this.handStrenght = HandStrenght.FullHouse;
      } else {
        this.handStrenght = HandStrenght.TwoPair;
      }
    } else {
      const [amount] = matchingCards.values();
      switch (amount) {
        case 5:
          this.handStrenght = HandStrenght.FiveOfKind;
          break;
        case 4:
          this.handStrenght = HandStrenght.FourOfKind;
          break;
        case 3:
          this.handStrenght = HandStrenght.ThreeOfAKind;
          break;
        case 2:
          this.handStrenght = HandStrenght.OnePair;
          break;
        default:
          this.handStrenght = HandStrenght.HighCard;
          break;
      }
    }
  }

  getStrenght() {
    return this.handStrenght;
  }

  getCards() {
    return this.cards;
  }

  getBid() {
    return this.bid;
  }
}

class Hands {
  private ranks: Hand[] = [];
  private winnings: number = 0;

  constructor(private hands: Hand[]) {
    this.sortByStr();
    this.calculateWinnings();
  }

  private calculateWinnings() {
    this.winnings = this.ranks.reduce((acc, curr, index) => acc + curr.getBid() * ++index, 0);
  }

  private sortByStr() {
    this.ranks = this.hands.sort((a, b) => {
      const aCards = a.getCards();
      const bCards = b.getCards();

      if (a.getStrenght() === b.getStrenght()) {
        for (let index = 0; index < aCards.length; index++) {
          if (aCards[index] != bCards[index]) {
            return getCardStrenght(aCards[index]) - getCardStrenght(bCards[index]);
          }
        }
      }

      return a.getStrenght() - b.getStrenght();
    });
  }

  getRanks() {
    return this.ranks;
  }

  getWinnings() {
    return this.winnings;
  }
}

export default function testing(input: string) {
  const parsed = input.split(/\n/).map((pair) => pair.split(/\s+/));
  const hands = new Hands(parsed.map(([card, bid]) => new Hand(card, Number(bid))));
  return hands.getWinnings();
}
