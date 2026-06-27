# Fake News Detector

A content classification tool that takes a news headline or article and predicts whether it is likely real or fake, using a fine-tuned BERT model running locally.

Built as part of my summer 2026 project work, partly because I kept seeing obviously false headlines shared without question, and partly because I wanted to understand how NLP models actually work in practice.

## What it does

- Paste any news headline or short article
- The model classifies it as Likely Fake, Likely Real, or Uncertain
- Shows a confidence score
- Keeps a history of your last 5 predictions

## How it works

The backend runs a fine-tuned BERT model (`Pulk17/Fake-News-Detection`) locally using the HuggingFace Transformers library. The model was trained on a labelled dataset of real and fake news articles. The frontend is a React app that sends text to the Flask API and displays the result.

No external API calls are made at inference time; the model runs entirely on your machine.

## Tech stack

- **Frontend:** React, Vite
- **Backend:** Python, Flask
- **Model:** BERT (fine-tuned) via HuggingFace Transformers
- **Styling:** Plain CSS, newspaper-inspired

## What I learned

Testing this against 20 headlines was more interesting than I expected. The model catches conspiracy-style misinformation very well (bleach cures cancer, microchips in vaccines, aliens landing in Delhi) all flagged correctly at 99%+ confidence.

Where it struggles is legitimate science and institutional news. A WHO guideline update was flagged as fake. An ISRO satellite launch was flagged as fake. Apple announcing a new iPhone was flagged as fake.

This is a training data problem, not a model architecture problem. The dataset it was trained on skewed heavily toward American political fake news, so anything that doesn't pattern-match to that style gets misclassified. Overall accuracy on my 20-headline test: 14/20 (70%).

This is worth knowing before using it. It is a useful tool for obvious misinformation, not a reliable fact-checker for nuanced content.

## Limitations

- English only
- Works best on US-style political and health misinformation
- Struggles with legitimate science, sports, and institutional news
- Should not replace actual fact-checking

## Run locally

**Backend:**

cd server

python -m venv venv

venv\Scripts\activate        # Windows

source venv/bin/activate     # Mac/Linux

pip install -r requirements.txt

python app.py

**Frontend:**

cd client

npm install

npm run dev

The first time you run the backend, it will download the model (~440MB). After that it loads in a few seconds.

## Project context

I am a third-year CS student at FLAME University working on NLP and bias in language models this summer. This project is part of a broader interest in how AI systems perform differently across languages and content types.
