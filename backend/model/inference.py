import json
import shutil


def run_inference(input_path, output_path):
    # Fake placeholder inference
    detections = {
        "detections": [
            {
                "timestamp": 1.0,
                "boxes": [
                    {
                        "label": "person",
                        "confidence": 0.95,
                        "coordinates": [100, 100, 200, 200],
                    }
                ],
            },
            {
                "timestamp": 2.0,
                "boxes": [
                    {
                        "label": "car",
                        "confidence": 0.88,
                        "coordinates": [300, 200, 400, 300],
                    }
                ],
            },
        ]
    }

    # Add FFmpeg processing, overlays, etc.

    shutil.copy(input_path, output_path)  # simulate processing

    return json.dumps(detections)
