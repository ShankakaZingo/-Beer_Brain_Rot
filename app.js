let model = null;
let isModelLoading = false;
let selectedFile = null;
let audio = new Audio();
let currentTopMatches = [];
let currentMatchIndex = 0;

const uploadArea = document.getElementById('upload-area');
const fileInput = document.getElementById('file-input');
const previewContainer = document.getElementById('preview-container');
const previewImage = document.getElementById('preview-image');
const removeBtn = document.getElementById('remove-btn');
const analyzeBtn = document.getElementById('analyze-btn');
const loading = document.getElementById('loading');
const results = document.getElementById('results');
const retryBtn = document.getElementById('retry-btn');
const randomBtn = document.getElementById('random-btn');
const tryAnotherBtn = document.getElementById('try-another-btn');

const resultEmoji = document.getElementById('result-emoji');
const resultName = document.getElementById('result-name');
const resultStyle = document.getElementById('result-style');
const resultCalories = document.getElementById('result-calories');
const resultSteps = document.getElementById('result-steps');
const confidencePercent = document.getElementById('confidence-percent');
const confidenceFill = document.getElementById('confidence-fill');

const COLOR_KEYWORDS = {
  dark: ['black', 'dark', 'brown', 'porter', 'stout', 'espresso', 'chocolate', 'coffee'],
  light: ['light', 'pale', 'blonde', 'golden', 'yellow', 'straw', 'citrus', 'wheat', 'white', 'cloudy'],
  amber: ['amber', 'orange', 'copper', 'reddish', 'red', 'mahogany']
};

const CONTAINER_KEYWORDS = {
  glass: ['glass', 'mug', 'pint', 'tumbler', 'shaker', 'pilsner glass'],
  bottle: ['bottle', 'bottles'],
  can: ['can', 'cans']
};

async function loadModel() {
  if (model || isModelLoading) return;
  isModelLoading = true;
  
  try {
    model = await mobilenet.load({ version: 2, alpha: 1.0 });
  } catch (error) {
    console.error('Failed to load MobileNet:', error);
  }
  
  isModelLoading = false;
}

function playSound() {
  audio.src = 'FAHHH Meme Sound Effect.mp3';
  audio.play().catch(() => {
    console.log('Sound effect not found or playback blocked');
  });
}

function extractDominantColor(img) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  const maxSize = 100;
  canvas.width = maxSize;
  canvas.height = maxSize;
  
  ctx.drawImage(img, 0, 0, maxSize, maxSize);
  
  const imageData = ctx.getImageData(0, 0, maxSize, maxSize);
  const data = imageData.data;
  
  let rSum = 0, gSum = 0, bSum = 0;
  let pixelCount = 0;
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    
    if (a > 200) {
      rSum += r;
      gSum += g;
      bSum += b;
      pixelCount++;
    }
  }
  
  const avgR = Math.round(rSum / pixelCount);
  const avgG = Math.round(gSum / pixelCount);
  const avgB = Math.round(bSum / pixelCount);
  
  return categorizeColor(avgR, avgG, avgB);
}

function categorizeColor(r, g, b) {
  const brightness = (r + g + b) / 3;
  const saturation = Math.max(r, g, b) - Math.min(r, g, b);
  
  if (saturation < 30 && brightness < 80) {
    return 'dark';
  }
  
  if (brightness > 180 && saturation < 50) {
    return 'light';
  }
  
  if (brightness > 150 && r > g && r > b) {
    return 'amber';
  }
  
  if (brightness < 100) {
    return 'dark';
  }
  
  if (saturation < 40) {
    return 'light';
  }
  
  if (r > 180 && g > 100 && g < 180) {
    return 'amber';
  }
  
  if (r < 80 && g < 80 && b < 80) {
    return 'dark';
  }
  
  if (r > 200 && g > 180 && b < 100) {
    return 'light';
  }
  
  return 'amber';
}

function extractColorFromPredictions(predictions) {
  const colorScores = { dark: 0, light: 0, amber: 0 };
  
  predictions.forEach(([label, probability]) => {
    const lowerLabel = label.toLowerCase();
    
    Object.entries(COLOR_KEYWORDS).forEach(([color, keywords]) => {
      keywords.forEach(keyword => {
        if (lowerLabel.includes(keyword)) {
          colorScores[color] += probability;
        }
      });
    });
  });
  
  const dominant = Object.entries(colorScores).reduce((a, b) => 
    a[1] > b[1] ? a : b
  );
  
  return dominant[1] > 0.05 ? dominant[0] : 'amber';
}

function extractContainerFromPredictions(predictions) {
  const containerScores = { glass: 0, bottle: 0, can: 0 };
  
  predictions.forEach(([label, probability]) => {
    const lowerLabel = label.toLowerCase();
    
    Object.entries(CONTAINER_KEYWORDS).forEach(([container, keywords]) => {
      keywords.forEach(keyword => {
        if (lowerLabel.includes(keyword)) {
          containerScores[container] += probability;
        }
      });
    });
  });
  
  const dominant = Object.entries(containerScores).reduce((a, b) => 
    a[1] > b[1] ? a : b
  );
  
  return dominant[1] > 0.03 ? dominant[0] : 'glass';
}

function detectFoam(predictions) {
  return predictions.some(([label]) => 
    label.toLowerCase().includes('foam') || 
    label.toLowerCase().includes('head') ||
    label.toLowerCase().includes('froth') ||
    label.toLowerCase().includes('bubbles')
  );
}

function scoreBeer(beer, detectedColor, container, hasFoam) {
  let score = 0;
  
  if (beer.color === detectedColor) {
    score += 0.7;
  } else if (detectedColor === 'amber' && beer.color !== 'dark') {
    score += 0.3;
  } else if (detectedColor === 'light' && beer.color === 'amber') {
    score += 0.15;
  }
  
  if (beer.container === container) {
    score += 0.15;
  }
  
  if (hasFoam && beer.container === 'glass') {
    score += 0.1;
  }
  
  const styleMatch = beer.keywords.some(k => 
    k.includes(detectedColor) || 
    (detectedColor === 'light' && k.includes('pale'))
  );
  if (styleMatch) {
    score += 0.05;
  }
  
  return score;
}

function findBestBeers(predictions, detectedColor) {
  const container = extractContainerFromPredictions(predictions);
  const hasFoam = detectFoam(predictions);
  
  const scored = BEERS.map(beer => ({
    beer,
    score: scoreBeer(beer, detectedColor, container, hasFoam),
    detectedColor,
    container,
    hasFoam
  }));
  
  scored.sort((a, b) => b.score - a.score);
  
  return {
    topMatches: scored.slice(0, 5),
    bestMatch: scored[0],
    detectedColor,
    container,
    hasFoam
  };
}

function showResults(beer, confidence = 50) {
  resultEmoji.textContent = beer.emoji;
  resultName.textContent = beer.name;
  resultStyle.textContent = `${beer.style} • ${beer.brewery} • ${beer.abv}% ABV`;
  resultCalories.textContent = beer.calories;
  resultSteps.textContent = beer.stepsToBurn.toLocaleString();
  confidencePercent.textContent = `${Math.round(confidence * 100)}%`;
  confidenceFill.style.width = `${Math.min(confidence * 100, 100)}%`;
  
  loading.classList.remove('visible');
  analyzeBtn.classList.remove('visible');
  previewContainer.classList.remove('visible');
  results.classList.add('visible');
  
  if (confidence > 0.4) {
    playSound();
  }
}

function showNextMatch() {
  if (currentTopMatches.length === 0) return;
  
  currentMatchIndex = (currentMatchIndex + 1) % currentTopMatches.length;
  const match = currentTopMatches[currentMatchIndex];
  
  const confidenceBoost = 1 - (currentMatchIndex * 0.15);
  showResults(match.beer, confidenceBoost);
}

function resetApp() {
  selectedFile = null;
  currentTopMatches = [];
  currentMatchIndex = 0;
  fileInput.value = '';
  previewImage.src = '';
  previewContainer.classList.remove('visible');
  analyzeBtn.classList.remove('visible');
  results.classList.remove('visible');
  loading.classList.remove('visible');
  uploadArea.style.display = 'block';
}

uploadArea.addEventListener('click', () => fileInput.click());

uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('dragover');
  
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    handleFile(file);
  }
});

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    handleFile(file);
  }
});

function handleFile(file) {
  selectedFile = file;
  const reader = new FileReader();
  
  reader.onload = (e) => {
    previewImage.src = e.target.result;
    previewContainer.classList.add('visible');
    analyzeBtn.classList.add('visible');
  };
  
  reader.readAsDataURL(file);
}

removeBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  resetApp();
});

analyzeBtn.addEventListener('click', async () => {
  if (!selectedFile) return;
  
  if (!model) {
    loading.classList.add('visible');
    analyzeBtn.classList.remove('visible');
    document.querySelector('.loading-text').textContent = 'Loading AI model...';
    await loadModel();
  }
  
  loading.classList.add('visible');
  analyzeBtn.classList.remove('visible');
  document.querySelector('.loading-text').textContent = 'Analyzing your beer...';
  
  const img = new Image();
  img.src = previewImage.src;
  
  img.onload = async () => {
    try {
      const detectedColor = extractDominantColor(img);
      
      let predictions = [];
      try {
        predictions = await model.classify(img);
      } catch (e) {
        console.log('MobileNet unavailable, using color analysis only');
      }
      
      const { bestMatch, topMatches } = findBestBeers(predictions, detectedColor);
      
      currentTopMatches = topMatches;
      currentMatchIndex = 0;
      
      showResults(bestMatch.beer, bestMatch.score);
    } catch (error) {
      console.error('Analysis error:', error);
      const randomBeer = BEERS[Math.floor(Math.random() * BEERS.length)];
      showResults(randomBeer, 0.1);
    }
  };
});

retryBtn.addEventListener('click', resetApp);

randomBtn.addEventListener('click', () => {
  const randomBeer = BEERS[Math.floor(Math.random() * BEERS.length)];
  currentTopMatches = [];
  showResults(randomBeer, 0.1);
});

tryAnotherBtn.addEventListener('click', showNextMatch);

loadModel();
