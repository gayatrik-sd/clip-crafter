import os
from flask import Flask, request, jsonify, send_file
from model.inference import run_inference

# from utils.video_utils import process_video

app = Flask(__name__)
UPLOAD_FOLDER = "uploads"
RESULTS_FOLDER = "results"
DETECTIONS_FILE = "detections.json"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(RESULTS_FOLDER, exist_ok=True)


@app.route("/api/upload", methods=["POST"])
def upload_video():
    video = request.files.get("video")
    if not video:
        return jsonify({"error": "No file uploaded"}), 400

    input_path = os.path.join(UPLOAD_FOLDER, video.filename)
    output_path = os.path.join(RESULTS_FOLDER, f"processed_{video.filename}")

    video.save(input_path)

    # Run model inference and video overlay processing
    detections = run_inference(input_path, output_path)

    # Save detections to JSON
    with open(DETECTIONS_FILE, "w") as f:
        f.write(detections)

    return send_file(output_path, mimetype="video/mp4")


@app.route("/api/detections", methods=["GET"])
def get_detections():
    if not os.path.exists(DETECTIONS_FILE):
        return jsonify([])

    with open(DETECTIONS_FILE, "r") as f:
        return f.read(), 200, {"Content-Type": "application/json"}


@app.route("/api/status", methods=["GET"])
def check_status():
    # For simplicity: always "done"
    return jsonify({"status": "done"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
