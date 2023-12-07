enum MapNames {
  SeedToSoil = "seed-to-soil map",
  SoilToFerilizer = "soil-to-fertilizer map",
  FertilizerToWater = "fertilizer-to-water map",
  WaterToLight = "water-to-light map",
  LightToTemperature = "light-to-temperature map",
  TemperatureToHumidity = "temperature-to-humidity map",
  HumidityToLocation = "humidity-to-location map",
}

type ArrayTuple = Array<[number, number, number]>;

export const mapSeed = (value: number, [destination, source, length]: [number, number, number]) => {
  if (value >= source && value <= source + length - 1) {
    return value - source + destination;
  } else {
    return value;
  }
};

const getSeeds = (input: string[]) => input[0].split(/:|\s+/).splice(2).map(Number);
const getMaps = (input: string[]) =>
  input
    .splice(1)
    .map((map) => map.split(/:|\n/).filter(String))
    .reduce((acc, curr) => {
      acc[curr.shift()!] = curr.map((map) => map.split(/\s+/).map(Number));
      return acc;
    }, {});

export const mapSeedMultipleMaps = (value: number, ranges: ArrayTuple) => {
  let result = value;
  for (let index = 0; index < ranges.length; index++) {
    result = mapSeed(value, ranges[index]);
    if (result != value) {
      return result;
    }
  }

  return value;
};

const findLowestLocation = (seeds: number[], maps: Object) => {
  const locations: number[] = [];

  seeds.forEach((seed) => {
    let mapped = seed;
    Object.values(MapNames).forEach((mapName) => {
      const map: ArrayTuple = maps[mapName];
      mapped = mapSeedMultipleMaps(mapped, map);
    });

    locations.push(mapped);
  });

  return Math.min(...locations);
};

export default function testing(input: string) {
  const parsed = input.split(/\n\n/);
  const seeds = getSeeds(parsed);
  const maps = getMaps(parsed);

  return findLowestLocation(seeds, maps);
}
