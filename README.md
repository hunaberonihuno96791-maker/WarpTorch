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

Follow these steps to isolate environment dependencies and configure hardware-accelerated tensor computations.

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/WarpTorch.git
cd WarpTorch
```

### 2. Create and Activate a Virtual Environment

#### On Linux/macOS

```bash
python3 -m venv venv
source venv/bin/activate
```

#### On Windows

```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies

To execute computations on your specific hardware, install the appropriate PyTorch build before installing ecosystem utilities.

#### For NVIDIA GPUs (CUDA 12.1) (Recommended)

```bash
pip install torch --index-url https://download.pytorch.org/whl/cu121
pip install -r core/requirements.txt
```

#### For AMD GPUs (ROCm 6.0)

```bash
pip install torch --index-url https://download.pytorch.org/whl/rocm6.0
pip install -r core/requirements.txt
```

#### For macOS (Apple Silicon / MPS)

```bash
pip install torch
pip install -r core/requirements.txt
```

#### For Intel GPUs (XPU)

```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/test/xpu
pip install -r core/requirements.txt
```

#### For CPU-Only Evaluation

```bash
pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install -r core/requirements.txt
```

---

## 🚀 Quickstart

You can check your installation and compute your first superluminal warp drive by launching the Alcubierre diagnostic suite.

Open your environment terminal or Jupyter IDE and run:

```bash
jupyter notebook jupyter_notebooks/01_alcubierre_bubble_analysis.ipynb
```

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

## 🐳 Docker-Quickstart (Recommended for easy setup)

If you have Docker installed, you can run the entire stack with a single command:

```bash
docker-compose up --build
```

This will start both the backend API (`http://localhost:8001`) and frontend UI (`http://localhost:3001`).

**For different hardware configurations:**
- CPU-only (default): `docker-compose up --build`
- NVIDIA CUDA: `TORCH_VERSION=cuda docker-compose up --build`
- AMD ROCm: `TORCH_VERSION=rocm docker-compose up --build`

---

## 💻 Running Without Docker

**Don't have Docker or prefer native execution?** No problem!

WarpTorch can be run directly on your system using Python and Node.js:

### Quick Start

**Open two terminals:**

**Terminal 1 - Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# OR
venv\Scripts\activate     # Windows
pip install -r requirements-cpu.txt
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:3001` in your browser.

### Detailed Setup

See [`RUN_WITHOUT_DOCKER.md`](RUN_WITHOUT_DOCKER.md) for detailed instructions on:
- Manual Python virtual environment setup
- Different PyTorch hardware configurations (CPU, CUDA, ROCm, etc.)
- Troubleshooting common issues
- Jupyter notebook usage

**Key advantages of running without Docker:**
- Works on any system with Python 3.10+ and Node.js 18+
- No Linux required — runs on Windows, macOS, and Linux
- Easier debugging and development
- Direct access to Python environment for custom experiments

---

## 🛠️ Requirements Content (`core/requirements.txt`)

Ensure your `core/requirements.txt` file contains the following configurations to support visualization and notebook hosting:

```text
numpy>=1.22.0
plotly>=5.0.0
plotly-express>=0.4.1
notebook>=6.4.0
ipywidgets>=7.6.0
```

---

## 📜 Credits & Attributions

WarpTorch is a modern, rewritten Python/PyTorch port of the pioneering open-source MATLAB project WarpFactory developed by Jared Fuchs, Christopher Helmerich, Alexey Bobrick, Gianni Martire, Brandon Melcher, and Luke Sellers.

We owe immense credit to the original authors for formulating the underlying finite difference architecture, frame transfer algebra, and numerical relativity workflows that drive this software.

---

## 📄 License

This project is licensed under the MIT License — see the `LICENSE` file for details.