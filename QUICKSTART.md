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

**🔍 Want detailed system verification?** See [`CHECK_SYSTEM.md`](CHECK_SYSTEM.md)

**System Requirements:**
- **4 GB RAM** (8 GB recommended)
- **2 GB disk space**
- *GPU optional — works on any laptop*

## Choose Your Setup Method

### Method 1: Native (Recommended - No Docker)
*Works on Windows, macOS, Linux*

**Terminal/Command Prompt 1 - Backend:**
```bash
cd backend
python3 -m venv venv
source venv/bin/activate       # Linux/macOS
# OR
venv\Scripts\activate          # Windows
pip install -r requirements-cpu.txt
python main.py
```

**Terminal/Command Prompt 2 - Frontend:**
```bash
cd frontend
npm install
npm run dev
```

Then open `http://localhost:3001` in your browser.

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

**❌ Need more help?**
See [`RUN_WITHOUT_DOCKER.md`](RUN_WITHOUT_DOCKER.md) for detailed instructions.

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

**Detailed Setup Guide:** [`RUN_WITHOUT_DOCKER.md`](RUN_WITHOUT_DOCKER.md)

**Questions?** Open an issue on GitHub!