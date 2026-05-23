# Simple Installation Guide

Get WarpTorch running on your computer in a few simple steps.

## Prerequisites Check

**Before starting, verify your system has the required software:**

```bash
# Check Python version (need 3.10+)
python --version
# OR if python doesn't work:
python3 --version

# Check Node.js version (need 18+)  
node --version

# Check npm (comes with Node.js)
npm --version
```

**Expected output:**
- Python: `Python 3.10.0` or higher
- Node.js: `v18.0.0` or higher  
- npm: `9.0.0` or higher

**If any command fails, install the missing software:**
- **Python 3.10+** → [python.org](https://www.python.org/downloads/)
- **Node.js 18+** → [nodejs.org](https://nodejs.org/)

**Additional Requirements:**
- [ ] **4 GB RAM** minimum (8 GB recommended)
- [ ] **2 GB free disk space**
- [ ] **GPU optional** (NVIDIA, AMD, or Intel) for faster computations

## Installation Steps

### Step 0: Prerequisites Verification ✅

**Open your terminal/command prompt and run:**

```bash
# Verify Python installation
python --version
# OR
python3 --version

# Verify Node.js installation  
node --version

# Verify npm installation
npm --version
```

**If all commands show correct versions, you're ready to proceed!**

**If any command fails:**
- Install Python from [python.org](https://www.python.org/downloads/) (choose "Add Python to PATH" during installation)
- Install Node.js from [nodejs.org](https://nodejs.org/)

### Step 1: Get the Code

```bash
git clone https://github.com/yourusername/WarpTorch.git
cd WarpTorch
```

Or download and extract the ZIP file.

### Step 2: Backend Installation

Open your terminal/command prompt:

```bash
# Navigate to backend folder
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
# For CPU (works everywhere):
pip install -r requirements-cpu.txt

# OR for NVIDIA GPU (faster):
pip install -r requirements-cuda.txt
```

### Step 3: Frontend Installation

Open a new terminal/command prompt:

```bash
# Navigate to frontend folder
cd frontend

# Install dependencies
npm install
```

## Running WarpTorch

### Start Backend (Terminal 1)

```bash
cd backend
# Activate virtual environment if not already active
source venv/bin/activate    # Linux/macOS
# OR
venv\Scripts\activate       # Windows

# Start the server
python main.py
```

Backend will run on `http://localhost:8001`

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

Frontend will run on `http://localhost:3001` (or similar)

### Open Your Browser

Navigate to `http://localhost:3001` and start experimenting!

## Verification

Test that everything is working:

1. **Backend Health Check:** Open `http://localhost:8001/api/health`
   - Should show: `{"status": "healthy", "device": "...", "version": "1.0.0"}`

2. **Frontend Interface:** Open `http://localhost:3001`
   - Should show the WarpTorch 3D visualization interface

3. **Run a Test Simulation:**
   - Click "Simulate" in the interface
   - Should visualize an Alcubierre warp drive

## Choosing the Right PyTorch Version

WarpTorch supports multiple hardware configurations:

### For CPU-Only (Most Compatible)
```bash
pip install -r backend/requirements-cpu.txt
```
- **Pros:** Works on any computer
- **Cons:** Slower computations
- **Size:** ~200 MB

### For NVIDIA GPU (Fastest)
```bash
pip install -r backend/requirements-cuda.txt
```
- **Pros:** Maximum performance
- **Cons:** Requires NVIDIA GPU + CUDA
- **Size:** ~2 GB

### For Apple Silicon (M1/M2/M3)
```bash
pip install torch
pip install -r backend/requirements.txt
```
- **Pros:** Optimized for Apple Silicon
- **Cons:** macOS only
- **Uses:** Metal Performance Shaders

### For AMD GPU (Linux Only)
```bash
pip install torch --index-url https://download.pytorch.org/whl/rocm6.0
pip install -r backend/requirements.txt
```

### For Intel GPU
```bash
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/test/xpu
pip install -r backend/requirements.txt
```

## Troubleshooting

### Python Not Found
**Error:** `python: command not found`

**Solution:** Install Python 3.10+ from [python.org](https://www.python.org/downloads/)

### Node.js Not Found  
**Error:** `npm: command not found`

**Solution:** Install Node.js 18+ from [nodejs.org](https://nodejs.org/)

### Virtual Environment Issues
**Error:** Permission denied or activation fails

**Solution:** Make sure you have correct permissions:
```bash
# Linux/macOS
chmod +x backend/venv/bin/activate

# Windows: Run Command Prompt as Administrator
```

### Port Already in Use
**Error:** `Address already in use`

**Solution:** The script will suggest an alternative port automatically, or close the conflicting application.

### Import Errors
**Error:** `ModuleNotFoundError: No module named 'torch'`

**Solution:** Make sure virtual environment is activated and dependencies installed:
```bash
source backend/venv/bin/activate  # Linux/macOS
# OR
backend\venv\Scripts\activate     # Windows
pip install -r backend/requirements-cpu.txt
```

### CUDA Errors
**Error:** CUDA not found or CUDA errors

**Solution:** Use CPU version instead:
```bash
pip install -r backend/requirements-cpu.txt
```

## Advanced Installation

### Using Different Python Versions

If you have multiple Python versions:

```bash
# Specify Python version explicitly
python3.11 -m venv venv
# OR
python3.12 -m venv venv
```

### Development Installation

For contributing to WarpTorch:

```bash
# Install development dependencies
pip install -r backend/requirements.txt
pip install pytest black flake8

# Install frontend development tools
cd frontend
npm install --save-dev @types/node@18 typescript@5
```

## Next Steps

1. ✅ **Explore the Interface:** Open `http://localhost:3001`
2. ✅ **Try Examples:** Check out the Jupyter notebooks in `jupyter_notebooks/`
3. ✅ **Read Documentation:** See [`README.md`](README.md) for detailed info
4. ✅ **Start Researching:** Modify parameters for your own simulations

## Support

- **Documentation:** [`README.md`](README.md)
- **Quick Start:** [`QUICKSTART.md`](QUICKSTART.md)
- **Docker Alternative:** [`RUN_WITHOUT_DOCKER.md`](RUN_WITHOUT_DOCKER.md)
- **Issues:** Report bugs on GitHub Issues

Happy warp drive researching! 🚀