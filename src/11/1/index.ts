import { Galaxy } from "../galaxy";

export default function testing(input: string) {
  return new Galaxy(input).extractGalaxiesPositionAfterExpansion().getGalaxiesDistancesSum();
}
