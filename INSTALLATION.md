# 🚀 WarpTorch Installation Guide

## Quick Start

### Option 1: Auto-install (Recommended)
Automatically detects your hardware and installs the appropriate version:

```bash
make install
```

### Option 2: Manual selection

**For CPU/AMD/Intel (fast, ~200MB):**
```bash
make install-cpu
```

**For NVIDIA GPUs with CUDA (slower, ~2-5GB):**
```bash
make install-cuda
```

## Hardware Detection

Check what's detected on your system:
```bash
make detect
```

## Installation Details

### CPU Version (requirements-cpu.txt)
- ✅ **Fast installation** (~2-5 minutes)
- ✅ **Small download** (~200MB)
- ✅ **Perfect for development**
- ✅ **Works with AMD/Intel GPUs**
- ✅ **No NVIDIA dependencies**

### CUDA Version (requirements-cuda.txt)
- 🚀 **Best performance** on NVIDIA GPUs
- ⚠️ **Large download** (~2-5GB)
- ⚠️ **Slow installation** (~10-30 minutes)
- ✅ **GPU acceleration** for training/inference

## Docker Builds

### Auto-detect hardware:
```bash
make docker-build
```

### Manual selection:
```bash
make docker-build-cpu    # CPU-only version
make docker-build-cuda   # CUDA version
```

## Troubleshooting

### Installation errors
If you get errors during installation, try:
```bash
pip install --upgrade pip
make install-cpu  # Start with CPU version
```

### CUDA errors
If you have CUDA errors but don't have an NVIDIA GPU:
```bash
make install-cpu  # Use CPU version instead
```

### Docker issues
For Docker builds, ensure you have enough disk space:
- CPU version: ~500MB
- CUDA version: ~3-6GB

## Performance Comparison

| Hardware | Version | Installation Size | Speed |
|----------|---------|------------------|-------|
| CPU only | CPU | ~200MB | ⭐⭐ |
| NVIDIA GPU | CUDA | ~2-5GB | ⭐⭐⭐⭐⭐ |
| AMD/Intel GPU | CPU | ~200MB | ⭐⭐⭐ |

## Recommendation

Start with **CPU version** for development. Upgrade to CUDA only if you:
- Have an NVIDIA GPU
- Need maximum performance
- Are doing production training
