import os
from transformers import pipeline

# Load model once when the server starts
print("Loading model... this may take 30-60 seconds the first time")
classifier_pipeline = pipeline(
    "text-classification",
    model="Pulk17/Fake-News-Detection"
)
print("Model loaded successfully")


def classify(text):
    try:
        result = classifier_pipeline(text, truncation=True, max_length=512)
        print(result)

        top = result[0]
        label = top['label']
        confidence = round(top['score'] * 100, 1)

        # This model returns FAKE or REAL directly
        if confidence < 60:
            verdict = "Uncertain"
        elif label == "LABEL_0":
            verdict = "Likely Fake"
        elif label == "LABEL_1":
            verdict = "Likely Real"
        else:
            verdict = label

        return {
            "verdict": verdict,
            "confidence": confidence,
            "label": label,
            "all_scores": [
                {
                    "label": r['label'],
                    "score": round(r['score'] * 100, 1)
                }
                for r in result
            ]
        }

    except Exception as e:
        return {"error": str(e)}