# 🍺 Beer Brain Rot Calculator

A stupid fun website that tells you how many calories are in your beer and how many steps you need to walk to burn them off.

## What It Does

1. You take a photo of your beer
2. Upload it to the website
3. It goes FAAAHHH
4. Tells you the calories
5. Tells you how many steps to walk to burn it off
6. You cry a little

## How It Works

- **Photo Analysis** - Analyzes your beer photo using:
  - TensorFlow.js MobileNet for image classification
  - Canvas color extraction for precise beer color detection
- **Local Processing** - Everything runs in your browser (100% free, no API keys needed)
- **Stockholm Focus** - Database of common draft beers served at Stockholm bars
- **Smart Matching** - Extracts dominant color from photo, matches to beer styles

## Tech Stack

- HTML, CSS, JavaScript (vanilla)
- TensorFlow.js with MobileNet v2 (image classification in browser)
- Canvas API (color extraction from uploaded images)
- No backend required - runs as a single static page

## How To Run

1. Download/clone this project
2. Open `index.html` in any modern browser
3. Upload a beer photo and enjoy your existential crisis

## Beer Database

Focused on draft beers commonly served in Stockholm bars:
- **Swedish Lagers:** Pripps Blå, Mariestads, Spendrups, Eriksberg
- **IPAs & Craft:** Carnegie 100 Watt IPA, Brooklyn Stonewall, Nya Carnegiebryggeriet
- **Dark Beers:** Carnegie Porter, porters, stouts

## Important Files

- `index.html` - Main page with upload UI
- `style.css` - Brain-rot styling
- `app.js` - TensorFlow.js + color analysis + matching logic
- `beers.js` - Stockholm beer database with calories

## Known Issues

- MobileNet is a general AI model, may need help identifying specific beer brands
- Color extraction works best with clear beer photos
- Use "Try Another Match" button if the first guess isn't right
- Will make you feel bad about your drinking habits

## Why I Made This

Just for fun honestly. Brain rot content deserves brain rot tools.

---

Made with 🍺 in Stockholm
