const BEERS = [
  {
    id: 1,
    name: "Pripps Blå",
    brewery: "Carlsberg Sverige",
    style: "Swedish Lager",
    color: "light",
    container: "pint",
    abv: 3.5,
    calories: 150,
    stepsToBurn: 3500,
    keywords: ["blonde", "pale", "light", "lager", "swedish", "pripps", "yellow"],
    emoji: "🍺"
  },
  {
    id: 2,
    name: "Pripps Blå 5.0",
    brewery: "Carlsberg Sverige",
    style: "Swedish Lager",
    color: "light",
    container: "pint",
    abv: 5.0,
    calories: 180,
    stepsToBurn: 4200,
    keywords: ["blonde", "pale", "lager", "swedish", "pripps", "yellow"],
    emoji: "🍺"
  },
  {
    id: 3,
    name: "Carlsberg Hof",
    brewery: "Carlsberg",
    style: "Danish Lager",
    color: "light",
    container: "pint",
    abv: 4.8,
    calories: 170,
    stepsToBurn: 3950,
    keywords: ["blonde", "pale", "lager", "danish", "carlsberg", "yellow"],
    emoji: "🍺"
  },
  {
    id: 4,
    name: "Eriksberg Karaktär",
    brewery: "Carlsberg Sverige",
    style: "Swedish Lager",
    color: "light",
    container: "pint",
    abv: 5.2,
    calories: 185,
    stepsToBurn: 4300,
    keywords: ["amber", "lager", "swedish", "eriksberg", "karaktär"],
    emoji: "🍺"
  },
  {
    id: 5,
    name: "Spendrups",
    brewery: "Spendrups",
    style: "Swedish Lager",
    color: "light",
    container: "pint",
    abv: 5.0,
    calories: 175,
    stepsToBurn: 4100,
    keywords: ["blonde", "pale", "lager", "swedish", "spendrups", "yellow"],
    emoji: "🍺"
  },
  {
    id: 6,
    name: "Mariestads",
    brewery: "Spendrups",
    style: "Swedish Lager",
    color: "light",
    container: "pint",
    abv: 5.3,
    calories: 190,
    stepsToBurn: 4450,
    keywords: ["amber", "lager", "swedish", "mariestads", "yellow"],
    emoji: "🍺"
  },
  {
    id: 7,
    name: "Carnegie Lager",
    brewery: "Carlsberg Sverige",
    style: "Swedish Lager",
    color: "amber",
    container: "pint",
    abv: 5.4,
    calories: 195,
    stepsToBurn: 4550,
    keywords: ["amber", "lager", "swedish", "carnegie", "yellow"],
    emoji: "🍺"
  },
  {
    id: 8,
    name: "Heineken",
    brewery: "Heineken",
    style: "Dutch Lager",
    color: "light",
    container: "pint",
    abv: 5.0,
    calories: 175,
    stepsToBurn: 4100,
    keywords: ["blonde", "pale", "lager", "dutch", "heineken", "green bottle", "yellow"],
    emoji: "🍺"
  },
  {
    id: 9,
    name: "Amstel",
    brewery: "Heineken",
    style: "Dutch Lager",
    color: "light",
    container: "pint",
    abv: 4.8,
    calories: 165,
    stepsToBurn: 3850,
    keywords: ["blonde", "pale", "lager", "dutch", "amstel", "yellow"],
    emoji: "🍺"
  },
  {
    id: 10,
    name: "Carlsberg Export",
    brewery: "Carlsberg",
    style: "Danish Lager",
    color: "light",
    container: "pint",
    abv: 5.0,
    calories: 175,
    stepsToBurn: 4100,
    keywords: ["blonde", "pale", "lager", "danish", "carlsberg", "export", "yellow"],
    emoji: "🍺"
  },
  {
    id: 11,
    name: "Carnegie 100 Watt IPA",
    brewery: "Carlsberg Sverige",
    style: "IPA",
    color: "amber",
    container: "pint",
    abv: 6.2,
    calories: 220,
    stepsToBurn: 5150,
    keywords: ["ipa", "hoppy", "bitter", "amber", "swedish", "carnegie", "craft"],
    emoji: "🍻"
  },
  {
    id: 12,
    name: "Brooklyn Stonewall IPA",
    brewery: "Brooklyn Brewery",
    style: "American IPA",
    color: "amber",
    container: "pint",
    abv: 5.0,
    calories: 180,
    stepsToBurn: 4200,
    keywords: ["ipa", "hoppy", "bitter", "american", "brooklyn", "stonewall"],
    emoji: "🍻"
  },
  {
    id: 13,
    name: "Brooklyn The Stonewall Session IPA",
    brewery: "Brooklyn Brewery",
    style: "Session IPA",
    color: "amber",
    container: "pint",
    abv: 5.0,
    calories: 180,
    stepsToBurn: 4200,
    keywords: ["ipa", "hoppy", "session", "american", "brooklyn", "stonewall"],
    emoji: "🍻"
  },
  {
    id: 14,
    name: "Nya Carnegiebryggeriet APA",
    brewery: "Nya Carnegiebryggeriet",
    style: "American Pale Ale",
    color: "amber",
    container: "pint",
    abv: 5.5,
    calories: 200,
    stepsToBurn: 4650,
    keywords: ["apa", "pale ale", "hoppy", "swedish", "carnegiebryggeriet", "craft"],
    emoji: "🍻"
  },
  {
    id: 15,
    name: "Gästkran Nya Carnegiebryggeriet",
    brewery: "Nya Carnegiebryggeriet",
    style: "Craft Lager",
    color: "light",
    container: "pint",
    abv: 5.0,
    calories: 180,
    stepsToBurn: 4200,
    keywords: ["lager", "craft", "swedish", "carnegiebryggeriet", "gästkran"],
    emoji: "🍻"
  },
  {
    id: 16,
    name: "St Eriks IPA",
    brewery: "St Eriks Bryggeri",
    style: "IPA",
    color: "amber",
    container: "pint",
    abv: 5.6,
    calories: 205,
    stepsToBurn: 4800,
    keywords: ["ipa", "hoppy", "swedish", "st eriks", "craft"],
    emoji: "🍻"
  },
  {
    id: 17,
    name: "Carnegie Porter",
    brewery: "Carlsberg Sverige",
    style: "Swedish Porter",
    color: "dark",
    container: "pint",
    abv: 7.0,
    calories: 260,
    stepsToBurn: 6050,
    keywords: ["porter", "dark", "black", "swedish", "carnegie", "roasty", "chocolate"],
    emoji: "🍫"
  },
  {
    id: 18,
    name: "Guinness",
    brewery: "Guinness",
    style: "Irish Stout",
    color: "dark",
    container: "pint",
    abv: 4.2,
    calories: 170,
    stepsToBurn: 3950,
    keywords: ["stout", "guinness", "dark", "black", "irish", "creamy", "foam"],
    emoji: "🖤"
  },
  {
    id: 19,
    name: "Brooklyn Dry Irish Stout",
    brewery: "Brooklyn Brewery",
    style: "Stout",
    color: "dark",
    container: "pint",
    abv: 4.5,
    calories: 160,
    stepsToBurn: 3750,
    keywords: ["stout", "dry", "dark", "brooklyn", "irish"],
    emoji: "🖤"
  },
  {
    id: 20,
    name: "Kronenbourg 1664 Blanc",
    brewery: "Kronenbourg",
    style: "Wheat Beer",
    color: "light",
    container: "bottle",
    abv: 5.0,
    calories: 165,
    stepsToBurn: 3850,
    keywords: ["wheat", "blanc", "white", "kronenbourg", "french", "citrus", "cloudy"],
    emoji: "🍊"
  },
  {
    id: 21,
    name: "Kronenbourg Lager",
    brewery: "Kronenbourg",
    style: "French Lager",
    color: "light",
    container: "bottle",
    abv: 5.0,
    calories: 170,
    stepsToBurn: 3950,
    keywords: ["lager", "kronenbourg", "french", "yellow"],
    emoji: "🍺"
  },
  {
    id: 22,
    name: "Galipette",
    brewery: "Brasserie Galipette",
    style: "French Cider",
    color: "amber",
    container: "bottle",
    abv: 4.5,
    calories: 200,
    stepsToBurn: 4650,
    keywords: ["cider", "apple", "french", "galipette", "sweet"],
    emoji: "🍎"
  },
  {
    id: 23,
    name: "Bulmers",
    brewery: "Bulmers",
    style: "Irish Cider",
    color: "amber",
    container: "bottle",
    abv: 4.5,
    calories: 210,
    stepsToBurn: 4900,
    keywords: ["cider", "apple", "irish", "bulmers", "sweet"],
    emoji: "🍎"
  },
  {
    id: 24,
    name: "Grimbergen Blond",
    brewery: "Carlsberg Sverige",
    style: "Belgian Blonde",
    color: "amber",
    container: "pint",
    abv: 6.7,
    calories: 230,
    stepsToBurn: 5350,
    keywords: ["belgian", "blonde", "grimbergen", "amber", "spicy", "fruity"],
    emoji: "🍺"
  },
  {
    id: 25,
    name: "Grimbergen Dubbel",
    brewery: "Carlsberg Sverige",
    style: "Belgian Dubbel",
    color: "dark",
    container: "pint",
    abv: 6.5,
    calories: 245,
    stepsToBurn: 5700,
    keywords: ["belgian", "dubbel", "dark", "grimbergen", "malty", "fruity"],
    emoji: "🍫"
  }
];

const getBeersByColor = (color) => {
  return BEERS.filter(beer => beer.color === color);
};

const getBeersByStyle = (style) => {
  return BEERS.filter(beer => 
    beer.style.toLowerCase().includes(style.toLowerCase())
  );
};

const findBeerByName = (name) => {
  return BEERS.find(beer => 
    beer.name.toLowerCase().includes(name.toLowerCase())
  );
};

const getRandomBeer = () => {
  return BEERS[Math.floor(Math.random() * BEERS.length)];
};

window.BEERS = BEERS;
window.getBeersByColor = getBeersByColor;
window.getBeersByStyle = getBeersByStyle;
window.findBeerByName = findBeerByName;
window.getRandomBeer = getRandomBeer;
