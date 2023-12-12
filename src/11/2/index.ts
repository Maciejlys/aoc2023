import { Galaxy } from "../galaxy";

export default function testing(input: string) {
  return new Galaxy(input).extractGalaxiesPositionAfterExpansion(1000000).getGalaxiesDistancesSum();
}
