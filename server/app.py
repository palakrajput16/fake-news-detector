from flask import Flask, request, jsonify
from flask_cors import CORS
from classifier import classify

app = Flask(__name__)
CORS(app)

@app.route('/api/classify', methods=['POST'])
def classify_text():
    data = request.get_json()

    text = data.get('text', '').strip()

    if not text:
        return jsonify({"error": "No text provided"}), 400

    if len(text) < 10:
        return jsonify({"error": "Text too short"}), 400

    if len(text) > 2000:
        return jsonify({"error": "Text too long (max 2000 characters)"}), 400

    result = classify(text)

    return jsonify(result)


if __name__ == "__main__":
    app.run(debug=True)