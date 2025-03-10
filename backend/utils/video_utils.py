import subprocess
from backend.model.inference import run_inference


def process_video(input_path, output_path):
    # Extract frames
    subprocess.call(["ffmpeg", "-i", input_path, "frames/frame_%04d.png"])

    # Inference
    run_inference("frames/", "outputs/")

    # Recompile video
    subprocess.call(
        ["ffmpeg", "-framerate", "30", "-i", "frames/processed_%04d.png", output_path]
    )
