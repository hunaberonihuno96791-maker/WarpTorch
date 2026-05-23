---
sidebar_position: 2
---

# Installation Guide

## Prerequisites

Before installing WarpTorch, verify your system has the required software:

```bash
# Check Python version (need 3.10+)
python --version

# Check Node.js version (need 20+)
node --version

# Check npm version
npm --version
```

## Installation Methods

Choose your installation method based on how you plan to use WarpTorch:

- **Method A: Web Interface** - Interactive 3D visualization in your browser
- **Method B: Jupyter Lab** - Direct Python programming for custom analysis

### Initial Setup (Required for Both Methods)

#### Step 1: Clone and Navigate to Project

```bash
git clone https://github.com/just-omar/WarpTorch.git
cd WarpTorch
```

#### Step 2: Create Virtual Environment

**Linux/macOS:**
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate
```

#### Step 3: Install PyTorch for Your Hardware

Choose the option that matches your hardware:

**For CPU-only (universal, works everywhere):**
```bash
pip install torch
```

**For NVIDIA GPU with CUDA 12.1+ (faster):**
```bash
pip install torch --index-url https://download.pytorch.org/whl/cu121
```

**For AMD GPU (ROCm 6.0, Linux only):**
```bash
pip install torch --index-url https://download.pytorch.org/whl/rocm6.0
```

**For macOS (Apple Silicon M1/M2/M3):**
```bash
pip install torch
```

**For Intel GPU (Arc):**
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/test/xpu
```

#### Step 4: Install Dependencies

```bash
pip install -r requirements.txt
```

This installs numpy, plotly, rich, jupyterlab, fastapi, and other dependencies.

### Method A: Web Interface Installation

#### Step 5: Frontend Setup

**Install Node.js dependencies:**
```bash
cd frontend
npm install
```

#### Step 6: Run the Application

**Terminal 1 - Start Backend (from project root with venv active):**
```bash
python backend/main.py
```
Backend will run on: `http://localhost:8099`

**Terminal 2 - Start Frontend (from frontend/ folder):**
```bash
cd frontend
npm run dev
```
Frontend will run on: `http://localhost:3005`

### Method B: Jupyter Lab Installation

After completing Initial Setup, simply launch Jupyter Lab:

```bash
jupyter lab
```

Jupyter Lab will automatically open in your browser at: `http://localhost:8888`

## Hardware Acceleration Guide

WarpTorch automatically adapts to your available hardware:

### Supported GPU Configurations

| GPU Type | Support Level | Performance | Platform |
|----------|---------------|-------------|----------|
| **NVIDIA (CUDA 12.1+)** | ✅ Best | 10-100x faster | Win/Linux/Mac |
| **AMD (ROCm 6.0)** | ✅ Good | 5-50x faster | Linux only |
| **Apple Silicon** | ✅ Good | 3-20x faster | macOS only |
| **Intel Arc** | ⚠️ Experimental | 2-10x faster | Win/Linux |
| **CPU-only** | ✅ Universal | Baseline | All platforms |

### Performance Tips

**For maximum performance (NVIDIA GPU):**
- Requires: NVIDIA GPU + CUDA 12.1+ drivers
- Check with: `nvidia-smi` command

**For AMD GPU (Linux only):**
- Requires: AMD GPU + ROCm 6.0 drivers
- Check with: `rocm-smi` command

**For Mac users (Apple Silicon):**
- Uses Metal Performance Shaders (MPS) automatically
- Check with: `python -c "import torch; print(torch.backends.mps.is_available())"`

## Docker Alternative (Optional)

If you prefer Docker over native installation, use the Makefile:

```bash
make up              # Start all services
make logs            # View logs
make down            # Stop services
```

Services will run on:
- Frontend: `http://localhost:3005`
- Backend: `http://localhost:8099`
- API Docs: `http://localhost:8099/docs`