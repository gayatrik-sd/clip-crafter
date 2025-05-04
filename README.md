# 📽️ ClipCrafter

**ClipCrafter** is a GPU-accelerated web application for uploading videos, running AI inference (e.g., object detection using PyTorch), and visualizing results with real-time overlays in the browser.

- 🎥 Built with Angular (standalone components)
- 🧠 AI inference powered by PyTorch (Python backend)
- 🚀 Dockerized for local and GPU-accelerated deployment
- 🌐 Real-time rendering with HTML5 Video & WebGL (PixiJS optional)

---

## 🧱 Tech Stack

| Layer        | Technology                              |
|--------------|------------------------------------------|
| Frontend     | Angular (Standalone Components)          |
| Backend      | Python (Flask) + PyTorch      |
| Inference    | PyTorch-based model (customizable)       |
| Media        | FFmpeg (frame extraction)                |
| Deployment   | Docker, Nginx                            |
| Visualization| HTML5 Video, WebGL (PixiJS optional)     |

---

## 🛠️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/gayatrik-sd/clipcrafter.git
cd clipcrafter
```

### 🌐 2. Frontend Setup

```bash
cd frontend
npm install
ng serve
```
The app will be available at: http://localhost:4200

Make sure Angular CLI is installed: npm install -g @angular/cli

### 🐍 3. Backend Setup (Flask)

Install Python dependencies:
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```
Run the server:
```bash
python3 app.py
```
The backend will run at http://localhost:5000.

### 📦 4. Docker Build

```bash
docker-compose up --build
```

## 📤 Features

- Upload .mp4 video via browser
- Frames extracted and passed to AI model
- PyTorch model runs inference and outputs detection results
- Angular overlays bounding boxes synced with video playback
- Built for GPU acceleration (optional)

## ✅ TODO

- Add progress bar for uploads
- Improve overlay performance with PixiJS/WebGL
- Add support for multiple models (YOLO, SSD, etc.)
- Save and export detection results
