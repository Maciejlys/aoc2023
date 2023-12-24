import { Cosmos } from "../cosmos";

export default function testing(input: string) {
  return new Cosmos(input).extractGalaxiesPositionAfterExpansion().getGalaxiesDistancesSum();
}
