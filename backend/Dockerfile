FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Optional: If using GPU, you may need NVIDIA base image and CUDA
# FROM nvidia/cuda:11.7.1-cudnn8-runtime-ubuntu20.04

CMD ["python", "app.py"]
