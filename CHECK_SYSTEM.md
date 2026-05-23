# System Requirements Checklist

**Use this checklist to verify your system meets WarpTorch requirements before installation.**

## ✅ Software Verification

**Run these commands in your terminal/command prompt:**

### 1. Python Check
```bash
python --version
# OR if python doesn't work:
python3 --version
```

**Required:** Python 3.10.0 or higher

**❌ If fails:** Install from [python.org](https://www.python.org/downloads/)
- **Windows:** During installation, check "Add Python to PATH"
- **Mac:** Use installer or `brew install python@3.11`
- **Linux:** `sudo apt install python3.11` or similar

### 2. Node.js Check
```bash
node --version
```

**Required:** Node.js v18.0.0 or higher

**❌ If fails:** Install from [nodejs.org](https://nodejs.org/)

### 3. npm Check
```bash
npm --version
```

**Required:** npm 9.0.0 or higher (usually comes with Node.js)

**❌ If fails:** Reinstall Node.js from [nodejs.org](https://nodejs.org/)

## 🖥️ Hardware Requirements

### Minimum System Specs
- [ ] **RAM:** 4 GB (8 GB recommended)
- [ ] **Disk Space:** 2 GB free space
- [ ] **Operating System:** Windows 10+, macOS 10.15+, or Linux

### Optional GPU Acceleration
**If you have a GPU, you can use hardware-accelerated versions:**

- [ ] **NVIDIA GPU** with CUDA 12.1+ support
- [ ] **AMD GPU** (Linux only with ROCm)
- [ ] **Apple Silicon** (M1/M2/M3 Mac)
- [ ] **Intel Arc** GPU
- [ ] **None** - CPU-only version works on any computer

## 🧪 Quick System Test

**Copy and paste this into your terminal:**

```bash
echo "=== System Check ===" &&
echo "Python:" && python --version &&
echo "Node.js:" && node --version && 
echo "npm:" && npm --version &&
echo "=== System Info ===" &&
echo "OS:" && uname -s &&
echo "Architecture:" && uname -m &&
echo "RAM:" && free -h 2>/dev/null || systeminfo | findstr /C:"Total Physical Memory"
```

**Expected output example:**
```
=== System Check ===
Python: 3.11.5
Node.js: v20.1.0
npm: 10.2.4
=== System Info ===
OS: Linux
Architecture: x86_64
RAM: 16GB
```

## 🔧 Common Issues and Solutions

### Issue: "python: command not found"
**Cause:** Python not installed or not in PATH

**Solution:** 
1. Install Python from [python.org](https://www.python.org/downloads/)
2. **Windows:** During installation, check "Add Python to PATH"
3. **Mac/Linux:** Make sure `/usr/local/bin` is in your PATH

### Issue: "python version too old"
**Cause:** System has old Python version (2.7 or 3.9)

**Solution:** Install newer Python version and use `python3` command

### Issue: "node: command not found"  
**Cause:** Node.js not installed

**Solution:** Install Node.js from [nodejs.org](https://nodejs.org/)

### Issue: "npm version too old"
**Cause:** Old Node.js version installed

**Solution:** Update Node.js to latest LTS version

### Issue: "Permission denied"
**Cause:** Lack of admin/installation permissions

**Solution:**
- **Windows:** Run Command Prompt as Administrator
- **Mac/Linux:** Use `sudo` for system-wide installs, or use user directory

## 📊 Capability Assessment

**Your system configuration:**

**For Basic Usage:**
- ✅ **Any modern computer** with Python 3.10+ and Node.js 18+
- ✅ **CPU-only mode** works on all systems
- ⚠️ **Performance:** Slower for large simulations

**For Advanced Usage:**
- ✅ **8+ GB RAM** for larger simulations
- ✅ **NVIDIA GPU** for CUDA acceleration (10-100x faster)
- ✅ **Apple Silicon Mac** for optimized performance
- ✅ **Linux system** for best GPU support

**For Research/Production:**
- ✅ **16+ GB RAM** for complex simulations  
- ✅ **Dedicated GPU** with 4+ GB VRAM
- ✅ **SSD storage** for faster data loading
- ✅ **Multi-core CPU** for parallel processing

## 🚀 Ready to Install?

**If all checks passed above, you're ready!**

- **Quick Start:** See [`QUICKSTART.md`](QUICKSTART.md)
- **Detailed Guide:** See [`INSTALLATION.md`](INSTALLATION.md)  
- **Docker Alternative:** See [`README.md`](README.md)

**If some checks failed:**
1. Install missing software (links above)
2. Re-run the verification commands
3. Proceed with installation once all checks pass

## 💡 Performance Tips

**To get maximum performance:**
1. **Use GPU version** if you have NVIDIA/AMD/Apple Silicon GPU
2. **Close other applications** to free up RAM
3. **Use SSD storage** for faster data access
4. **Update GPU drivers** for latest CUDA/ROCm support
5. **Use Linux** if doing heavy GPU computations

**For development:**
1. **Use CPU version** for easier debugging
2. **Keep enough RAM free** for your IDE/editor
3. **Use git** for version control

---

**Need help?** Check the main [`README.md`](README.md) or open a GitHub issue!