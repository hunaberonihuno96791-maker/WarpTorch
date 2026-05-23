# WarpTorch 🚀

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.10+](https://img.shields.io/badge/python-3.10+-blue.svg)](https://www.python.org/downloads/)
[![PyTorch GPU](https://img.shields.io/badge/PyTorch-2.0+-ee4c2c.svg)](https://pytorch.org/)
[![CUDA Acceleration](https://img.shields.io/badge/CUDA-Accelerated-green.svg)](https://developer.nvidia.com/cuda-toolkit)

**WarpTorch** is a high-performance, GPU-accelerated General Relativity (GR) toolkit designed for simulating, analyzing, and visualizing warp drive spacetimes. By porting and optimizing numerical relativity methods to modern tensor frameworks, WarpTorch enables physicists and enthusiasts to solve Einstein's field equations and evaluate exotic geometries at unprecedented speeds using NVIDIA CUDA, AMD ROCm, and Intel Arc hardware.

---

## 🌟 Key Features

- **Massive Acceleration:** Replaces nested MATLAB CPU loops with highly optimized PyTorch tensor computations (`torch.meshgrid`, `torch.einsum`), executing 4D spacetime operations directly on GPU Tensor Cores.
- **Comprehensive Metric Library:** Native vectorized implementations of classical and novel warp metrics, including Alcubierre, Lentz (positive energy soliton), Van Den Broeck, and Schwarzschild geometries.
- **Advanced Field Solvers:** 4th-order central finite difference stencils for computing arbitrary metric derivatives, Christoffel symbols, Ricci tensors, and scalar curvature.
- **Spacetime Flow Diagnostics:** Instantaneous evaluation of kinematic scalars (Expansion, Shear, Vorticity) and rigorous energy condition validation maps (NEC, WEC, SEC).
- **Web-Ready Export Pipeline:** Lightweight 2D slice and 3D vector field JSON exporters designed for immediate integration with WebGL frontends (Three.js / React Three Fiber).

---

## ✅ Prerequisites Check

**Before installing WarpTorch, verify your system has the required software:**

```bash
# Check Python version (need 3.10+)
python --version
# OR
python3 --version

# Check Node.js version (need 18+)
node --version

# Check npm version
npm --version
```

**If any command fails, install the missing software:**
- **Python 3.10+** → [python.org](https://www.python.org/downloads/)
- **Node.js 18+** → [nodejs.org](https://nodejs.org/)

---

## ⚙️ Installation & Setup

Choose your installation method based on how you plan to use WarpTorch:

### 🎯 Method A: Web Interface (Recommended for beginners)
Interactive 3D visualization in your browser with easy parameter controls.

### 🔬 Method B: Jupyter Notebooks (Recommended for researchers)
Direct Python programming in notebooks for custom analysis and experiments.

---

## 🎯 Method A: Web Interface Installation

### Step 1: Clone and Navigate to Project

```bash
git clone https://github.com/just-omar/WarpTorch.git
cd WarpTorch
```

### Step 2: Backend Setup (Python API)

**Navigate to backend directory:**

```bash
cd backend
```

**Create virtual environment in backend folder:**

**Linux/macOS:**
```bash
python3 -m venv venv
source venv/bin/activate  # <-- Activate venv in backend/ folder
```

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate     # <-- Activate venv in backend\ folder
```

**Install dependencies based on your hardware:**

**For CPU-only (universal, works everywhere):**
```bash
pip install -r requirements-cpu.txt
pip install -r requirements.txt      # Base backend dependencies
```

**For NVIDIA GPU with CUDA 12.1+ (faster):**
```bash
pip install -r requirements-cuda.txt
pip install -r requirements.txt      # Base backend dependencies
```

**For AMD GPU (ROCm 6.0, Linux only):**
```bash
pip install torch --index-url https://download.pytorch.org/whl/rocm6.0
pip install -r requirements.txt      # Base backend dependencies
```

**For macOS (Apple Silicon M1/M2/M3):**
```bash
pip install torch
pip install -r requirements.txt      # Base backend dependencies
```

**For Intel GPU (Arc):**
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/test/xpu
pip install -r requirements.txt      # Base backend dependencies
```

**✅ Verify installation:**
```bash
python -c "import torch; print(f'PyTorch {torch.__version__} installed successfully')"
```

### Step 3: Frontend Setup (React Interface)

**Open a new terminal, navigate to frontend directory:**

```bash
cd frontend  # From project root
```

**Install Node.js dependencies:**

```bash
npm install
```

### Step 4: Run the Application

**Terminal 1 - Start Backend (from backend/ folder with venv active):**

```bash
# Make sure you're in backend/ folder and venv is activated
cd backend
source venv/bin/activate  # Linux/macOS
# OR
venv\Scripts\activate     # Windows

python main.py
```

Backend will run on: `http://localhost:8001`

**Terminal 2 - Start Frontend (from frontend/ folder):**

```bash
cd frontend
npm run dev
```

Frontend will run on: `http://localhost:3001`

**Open your browser to:** `http://localhost:3001`

---

## 🔬 Method B: Jupyter Notebooks Installation

### Step 1: Clone and Navigate to Project

```bash
git clone https://github.com/just-omar/WarpTorch.git
cd WarpTorch
```

### Step 2: Create Virtual Environment in Project Root

**Create venv in project root directory:**

**Linux/macOS:**
```bash
python3 -m venv venv
source venv/bin/activate  # <-- Activate venv in project root
```

**Windows:**
```bash
python -m venv venv
venv\Scripts\activate     # <-- Activate venv in project root
```

### Step 3: Install PyTorch for Your Hardware

**For CPU-only (universal compatibility):**
```bash
pip install torch --index-url https://download.pytorch.org/whl/cpu
```

**For NVIDIA GPU with CUDA 12.1 (recommended for GPU users):**
```bash
pip install torch --index-url https://download.pytorch.org/whl/cu121
```

**For AMD GPU with ROCm 6.0 (Linux only):**
```bash
pip install torch --index-url https://download.pytorch.org/whl/rocm6.0
```

**For macOS (Apple Silicon):**
```bash
pip install torch
```

**For Intel GPU:**
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/test/xpu
```

### Step 4: Install Core Dependencies

```bash
pip install -r requirements.txt
```

This installs numpy, plotly, rich, and questionary needed for core functionality.

### Step 5 (Optional): Install Development Environment

```bash
pip install -r dev-requirements.txt
```

This installs JupyterLab for interactive notebook editing. Only needed for development.

### Step 6: Launch Jupyter

```bash
jupyter notebook jupyter_notebooks/01_alcubierre_bubble_analysis.ipynb
```

---

## 🚀 Quickstart

### For Web Interface Users:

**🚀 Super Quick (2 terminal windows):**

**Terminal 1 - Backend:**
```bash
cd WarpTorch/backend
python3 -m venv venv
source venv/bin/activate           # Linux/macOS
# OR
venv\Scripts\activate              # Windows

# Choose your hardware version:
pip install -r requirements-cpu.txt    # CPU (universal)
# OR
pip install -r requirements-cuda.txt   # NVIDIA GPU
# OR
pip install torch --index-url https://download.pytorch.org/whl/rocm6.0  # AMD GPU
pip install fastapi uvicorn[standard] pydantic numpy

python main.py                     # Runs on http://localhost:8001
```

**Terminal 2 - Frontend:**
```bash
cd WarpTorch/frontend
npm install
npm run dev                        # Runs on http://localhost:3001
```

**Open browser:** `http://localhost:3001`

### For Jupyter Notebook Users:

```bash
cd WarpTorch
python3 -m venv venv
source venv/bin/activate           # Linux/macOS

# Choose your hardware version:
pip install torch --index-url https://download.pytorch.org/whl/cpu  # CPU
# OR
pip install torch --index-url https://download.pytorch.org/whl/cu121  # NVIDIA GPU
# OR
pip install torch --index-url https://download.pytorch.org/whl/rocm6.0  # AMD GPU

pip install -r requirements.txt
jupyter notebook jupyter_notebooks/01_alcubierre_bubble_analysis.ipynb
```

---

## 💡 Usage Examples

### Programmatic Usage Example

```python
import torch
from core.metrics.alcubierre import get_alcubierre_metric
from core.solver.energy import get_energy_tensor
from core.analyzer.scalars import get_kinematic_scalars

# Automatically choose CUDA GPU if accessible
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Initialize a warp drive bubble moving at 1.5 times the speed of light
metric = get_alcubierre_metric(
    grid_size=(1, 64, 64, 64),
    world_center=(0.0, 16.0, 16.0, 16.0),
    v=1.5,
    R=6.0,
    sigma=4.0,
    device=device
)

# Solve Einstein's equations to find required stress-energy constraints
energy_tensor = get_energy_tensor(metric)

# Extract expansion and contraction metrics of the warp bubble
scalars = get_kinematic_scalars(metric)

print("Simulation successful! Active device:", energy_tensor.device)
```

---

## 🎮 Hardware Acceleration Guide

**WarpTorch automatically adapts to your available hardware:**

### Supported GPU Configurations

| GPU Type | Support Level | Performance | Platform |
|----------|---------------|-------------|----------|
| **NVIDIA (CUDA 12.1+)** | ✅ Best | 10-100x faster | Win/Linux/Mac |
| **AMD (ROCm 6.0)** | ✅ Good | 5-50x faster | Linux only |
| **Apple Silicon** | ✅ Good | 3-20x faster | macOS only |
| **Intel Arc** | ⚠️ Experimental | 2-10x faster | Win/Linux |
| **CPU-only** | ✅ Universal | Baseline | All platforms |

### Choosing Your Version

**For maximum performance (NVIDIA GPU):**
```bash
pip install -r backend/requirements-cuda.txt
```
- Requires: NVIDIA GPU + CUDA 12.1+ drivers
- Check with: `nvidia-smi` command

**For Linux users with AMD GPU:**
```bash
pip install torch --index-url https://download.pytorch.org/whl/rocm6.0
pip install fastapi uvicorn[standard] pydantic numpy
```
- Requires: AMD GPU + ROCm 6.0 drivers
- Check with: `rocm-smi` command

**For Mac users (Apple Silicon M1/M2/M3):**
```bash
pip install torch
pip install fastapi uvicorn[standard] pydantic numpy
```
- Uses Metal Performance Shaders (MPS) automatically
- Check with: `python -c "import torch; print(torch.backends.mps.is_available())"`

**For Windows Intel GPU users:**
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/test/xpu
pip install fastapi uvicorn[standard] pydantic numpy
```
- Requires: Latest Intel GPU drivers
- Check with: `python -c "import torch; print(torch.xpu.is_available())"`

**For everyone else (CPU):**
```bash
pip install -r backend/requirements-cpu.txt
```
- Works on any computer without GPU
- Slower but universally compatible

---

## 📦 Requirements Files Overview

**WarpTorch uses separate requirements files for different use cases:**

```
WarpTorch/
├── requirements.txt                    # Core dependencies (numpy, plotly, etc.)
├── dev-requirements.txt                # Development tools (JupyterLab, testing)
└── backend/
    ├── requirements.txt                # Base API dependencies
    ├── requirements-cpu.txt           # PyTorch CPU version
    └── requirements-cuda.txt          # PyTorch NVIDIA GPU version
```

### Why Separate Files?
- **Hardware flexibility:** Choose PyTorch version based on your GPU
- **Development vs production:** Core dependencies vs development tools
- **Size optimization:** CPU version (~300MB) vs CUDA version (~2GB)

### File Contents
- `requirements.txt` (root): numpy, plotly, rich, questionary - **needed for both methods**
- `dev-requirements.txt`: jupyterlab, ipywidgets, ipykernel - **development only**
- `backend/requirements.txt`: fastapi, uvicorn, pydantic, numpy - **web API only**
- `backend/requirements-cpu*.txt`: PyTorch only - **install with base backend requirements**

### Installation Summary
- **Web Interface:** `backend/requirements*.txt` + `backend/requirements.txt`
- **Jupyter Notebooks:** PyTorch + `requirements.txt` (+ `dev-requirements.txt` for development)
- **Core Only:** Just `requirements.txt` for using core modules in your own code

---

## 🔧 Troubleshooting

### Common Issues and Solutions

**❌ "python: command not found"**
- Install Python 3.10+ from [python.org](https://www.python.org/downloads/)
- Windows: During installation, check "Add Python to PATH"

**❌ "npm: command not found"**
- Install Node.js 18+ from [nodejs.org](https://nodejs.org/)

**❌ "ModuleNotFoundError: No module named 'torch'"**
- Make sure venv is activated: `source backend/venv/bin/activate`
- Install dependencies: `pip install -r backend/requirements-cpu.txt`

**❌ Backend running but frontend can't connect**
- Check if backend is working: Open `http://localhost:8001/api/health`
- Should return: `{"status": "healthy", "device": "...", "version": "1.0.0"}`

**❌ "Port 3001/8001 already in use"**
- Close the conflicting application
- Or let the application suggest an alternative port automatically

**❌ CUDA errors on Windows**
- Use CPU version instead: `pip install -r backend/requirements-cpu.txt`

**❌ AMD GPU not recognized on Windows**
- AMD ROCm is Linux-only. Use CPU version on Windows: `pip install -r backend/requirements-cpu.txt`

**❌ Apple Silicon performance issues**
- Make sure you installed native Apple Silicon PyTorch: `pip install torch`
- Avoid rosetta mode by using ARM64 Python

**❌ Intel GPU not working**
- Update Intel GPU drivers to latest version
- Verify XPU support: `python -c "import torch; print(torch.xpu.is_available())"`

**❌ Virtual environment won't activate**
- Linux/macOS: `chmod +x backend/venv/bin/activate`
- Windows: Run Command Prompt as Administrator

**❌ Wrong venv location confusion**
- **Web Interface:** venv must be in `backend/` folder
- **Jupyter Notebooks:** venv must be in project root
- See installation steps above for exact commands

### Getting Help

1. Check the error message in your terminal
2. Verify you're following the right installation method (A or B)
3. Make sure venv is activated and you're in the correct folder
4. Check that Python 3.10+ and Node.js 18+ are installed
5. Open an issue on GitHub with your error message

---

## 🐳 Docker Alternative (Optional)

**If you prefer Docker over native installation:**

```bash
docker-compose up --build
```

This will start both the backend API (`http://localhost:8001`) and frontend UI (`http://localhost:3001`).

**Hardware configurations:**
- CPU-only (default): `docker-compose up --build`
- NVIDIA CUDA: `TORCH_VERSION=cuda docker-compose up --build`
- AMD ROCm: `TORCH_VERSION=rocm docker-compose up --build`

**⚠️ Note:** Native installation (Methods A & B above) is recommended for most users - simpler setup and better performance.

---

## 📜 Credits & Attributions

WarpTorch is a modern, rewritten Python/PyTorch port of the pioneering open-source MATLAB project WarpFactory developed by Jared Fuchs, Christopher Helmerich, Alexey Bobrick, Gianni Martire, Brandon Melcher, and Luke Sellers.

We owe immense credit to the original authors for formulating the underlying finite difference architecture, frame transfer algebra, and numerical relativity workflows that drive this software.

---

## 📄 License

This project is licensed under the MIT License — see the `LICENSE` file for details.