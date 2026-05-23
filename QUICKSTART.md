# 🚀 WarpTorch Quick Start

**Get WarpTorch running in 5 minutes without Docker**

## Prerequisites Check

**Before starting, verify you have the required software:**

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

**🔍 Want detailed system verification?** Read the Prerequisites section carefully

**System Requirements:**
- **4 GB RAM** (8 GB recommended)
- **2 GB disk space**
- *GPU optional — works on any laptop*

**🎮 Supported GPUs:**
- **NVIDIA** (CUDA) - fastest, all platforms
- **AMD** (ROCm) - Linux only
- **Apple Silicon** (M1/M2/M3) - macOS only
- **Intel Arc** - Windows/Linux
- **CPU** - universal, slower

## Choose Your Setup Method

### Method 1: Web Interface (Recommended - Native)
*Works on Windows, macOS, Linux*

**📍 IMPORTANT: Activate venv in the correct folder!**

**Terminal/Command Prompt 1 - Backend:**
```bash
# Navigate to backend folder FIRST
cd backend

# Create venv in backend folder
python3 -m venv venv
source venv/bin/activate       # Linux/macOS - activates backend/venv
# OR
venv\Scripts\activate          # Windows - activates backend\venv

# Install dependencies
# For CPU (works everywhere):
pip install -r requirements-cpu.txt

# OR for NVIDIA GPU (faster):
pip install -r requirements-cuda.txt

# OR for AMD GPU (Linux):
pip install torch --index-url https://download.pytorch.org/whl/rocm6.0
pip install fastapi uvicorn[standard] pydantic numpy

# OR for Apple Silicon:
pip install torch
pip install fastapi uvicorn[standard] pydantic numpy

# OR for Intel GPU:
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/test/xpu
pip install fastapi uvicorn[standard] pydantic numpy

# Start backend server
python main.py                 # Runs on http://localhost:8001
```

**Terminal/Command Prompt 2 - Frontend:**
```bash
# Navigate to frontend folder
cd frontend

# Install and start frontend
npm install
npm run dev                    # Runs on http://localhost:3001
```

Then open `http://localhost:3001` in your browser.

**⚠️ Remember:** Always activate venv from the `backend/` folder when running the backend!

### Method 2: Docker (If You Have Docker)
```bash
docker-compose up --build
```

Open `http://localhost:3001` in your browser.

## What Happens?

The commands will:
1. ✅ Create a Python virtual environment
2. ✅ Install all dependencies (first time only, takes a few minutes)
3. ✅ Start the backend API on `http://localhost:8001`
4. ✅ Start the frontend UI on `http://localhost:3001`
5. ✅ Open browser with warp drive interface

## Verify It's Working

Open these URLs in your browser:
- **Frontend**: `http://localhost:3001` (main interface)
- **Backend Health**: `http://localhost:8001/api/health` (should show JSON with "healthy" status)

You should see a 3D warp drive visualization interface!

## Troubleshooting

**❌ "python: command not found"**
Install Python from [python.org](https://www.python.org/downloads/)

**❌ "npm: command not found"**  
Install Node.js from [nodejs.org](https://nodejs.org/)

**❌ "Port already in use"**
The script will suggest an alternative port automatically.

**❌ Backend running but frontend can't connect**
Check `http://localhost:8001/api/health` - if this works, the issue is with frontend setup.

**❌ GPU not recognized**
- NVIDIA: Install CUDA 12.1+ drivers
- AMD: Use Linux, ROCm is Linux-only
- Intel: Update Intel GPU drivers
- Mac: Make sure you have ARM64 Python

**❌ Need more help?**
Read the main [`README.md`](README.md) for detailed installation instructions.

## Next Steps

1. ✅ Experiment with warp drive parameters in the interface
2. ✅ Explore [`README.md`](README.md) for full documentation
3. ✅ Check out Jupyter notebooks in `jupyter_notebooks/`
4. ✅ Start your own research!

## Hardware Options

**For maximum performance with NVIDIA GPU:**
```bash
pip install -r backend/requirements-cuda.txt
```

**For universal compatibility (CPU-only):**
```bash
pip install -r backend/requirements-cpu.txt
```

**For Apple Silicon Mac:**
```bash
pip install torch
pip install -r backend/requirements.txt
```

---

**Full Documentation:** [`README.md`](README.md)

**Questions?** Open an issue on GitHub!