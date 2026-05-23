# Running WarpTorch Without Docker

This guide is for users who prefer to run WarpTorch directly instead of using Docker containers. The project works on any system with Python and Node.js installed.

## Prerequisites Check

**Before you begin, verify your system has the required software:**

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

**Expected output:**
- Python: `Python 3.10.0` or higher
- Node.js: `v18.0.0` or higher
- npm: `9.0.0` or higher

**If any command fails, install the missing software:**
- **Python 3.10+** → [python.org](https://www.python.org/downloads/)
- **Node.js 18+** → [nodejs.org](https://nodejs.org/)

**System Requirements:**
- **RAM**: 4 GB minimum (8 GB recommended)
- **Disk space**: ~2 GB for dependencies
- **GPU**: Optional (NVIDIA CUDA, AMD ROCm, Intel Arc, or CPU-only)

## Quick Start (5 minutes)

### Linux/macOS:

```bash
# Terminal 1 - Backend (computational engine)
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements-cpu.txt
python main.py
```

```bash
# Terminal 2 - Frontend (web interface)  
cd frontend
npm install
npm run dev
```

### Windows:

```cmd
# Command Prompt 1 - Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements-cpu.txt
python main.py
```

```cmd
# Command Prompt 2 - Frontend
cd frontend
npm install
npm run dev
```

Then open `http://localhost:3001` in your browser.

## Detailed Instructions

### Part 1: Backend Setup

The backend is a Python API running the General Relativity computation system.

**Step 1:** Create and activate a virtual environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Linux/macOS
# OR
venv\Scripts\activate     # Windows
```

**Step 2:** Install dependencies

Choose the appropriate version for your hardware:

```bash
# CPU-only (works everywhere, ~200MB)
pip install -r requirements-cpu.txt

# NVIDIA GPU with CUDA 12.1+ (faster)
pip install -r requirements-cuda.txt

# For AMD GPU or Apple Silicon, see README.md
```

**Step 3:** Start the server

```bash
python main.py
```

Backend will be available at `http://localhost:8001`

**Verify it's working:** Open `http://localhost:8001/api/health` in your browser - should return JSON with `"status": "healthy"`.

### Part 2: Frontend Setup

The frontend is a React application with 3D visualization.

**Step 1:** Install dependencies (one-time only)

```bash
cd frontend
npm install
```

**Step 2:** Start the development server

```bash
npm run dev
```

Frontend will be available at `http://localhost:3001` (or similar port if 3001 is busy).

## Hardware Acceleration Options

WarpTorch automatically adapts to your available hardware:

### For CPU-Only (Universal)
```bash
pip install -r backend/requirements-cpu.txt
```
Works on any computer. Slower but universally compatible.

### For NVIDIA GPU (Maximum Performance)
```bash
pip install -r backend/requirements-cuda.txt
```
Requires CUDA Toolkit 12.1+. Check with `nvidia-smi` command.

### For Apple Silicon (M1/M2/M3)
```bash
pip install torch
pip install -r backend/requirements.txt
```
Uses Metal Performance Shaders (MPS) automatically.

### For AMD GPU (Linux only)
```bash
pip install torch --index-url https://download.pytorch.org/whl/rocm6.0
pip install -r backend/requirements.txt
```

### For Intel GPU
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/test/xpu
pip install -r backend/requirements.txt
```

## Alternative: Jupyter Notebooks Only

If you only need computational analysis without the web interface:

```bash
pip install -r core/requirements.txt
jupyter notebook jupyter_notebooks/01_alcubierre_bubble_analysis.ipynb
```

## Common Issues and Solutions

### "python: command not found"
**Solution:** Install Python 3.10+ from [python.org](https://www.python.org/downloads/)

### "npm: command not found"  
**Solution:** Install Node.js 18+ from [nodejs.org](https://nodejs.org/)

### "ModuleNotFoundError: No module named 'torch'"
**Solution:** Make sure you activated the virtual environment:
```bash
source backend/venv/bin/activate  # Linux/macOS
# OR
backend\venv\Scripts\activate     # Windows
```

### "Port 3001 is already in use"
**Solution:** Vite will automatically suggest an alternative port (e.g., 3002). Use that instead.

### "Backend running but frontend can't connect"
**Solution:** Verify backend is working by opening `http://localhost:8001/api/health` in your browser.

### CUDA errors on Windows
**Solution:** Use the CPU version instead:
```bash
pip install -r backend/requirements-cpu.txt
```

## Verification Checklist

Before using WarpTorch, verify these endpoints:

- [ ] Backend health: `http://localhost:8001/api/health`
- [ ] Frontend interface: `http://localhost:3001`  
- [ ] Can load metrics list in frontend
- [ ] Can run simple Alcubierre simulation

## Next Steps

1. **Explore the interface:** Open `http://localhost:3001` and experiment with warp drive parameters
2. **Study the notebooks:** Check `jupyter_notebooks/` for detailed analysis examples
3. **Read the docs:** See [`README.md`](README.md) for complete documentation
4. **Customize:** Modify parameters in the code for your research

## Comparison: Docker vs Native

| Feature | Native (No Docker) | Docker |
|---|---|---|
| **Ease of setup** | ✅ Very simple | ❌ Requires Docker |
| **Cross-platform** | ✅ Windows/Mac/Linux | ⚠️ Mostly Linux |
| **Development speed** | ✅ Direct code access | ❌ Requires rebuilds |
| **Performance** | ✅ Native speed | ⚠️ Slight overhead |
| **Isolation** | ❌ Shared system | ✅ Full isolation |
| **Initial download** | ~2GB | ~4GB |

**Recommendation:** Start with native execution — it's simpler and faster for most users.

## Support

If you encounter issues:
1. Check your Python version: `python --version` (should be 3.10+)
2. Check your Node.js version: `node --version` (should be 18+)
3. Verify backend is running: Open `http://localhost:8001/api/health`
4. Check console output for specific error messages
5. Review the main [`README.md`](README.md) for additional help

Happy warp drive researching! 🚀