import { Cosmos } from "../cosmos";

export default function testing(input: string) {
  return new Cosmos(input).extractGalaxiesPositionAfterExpansion(1000000).getGalaxiesDistancesSum();
}
