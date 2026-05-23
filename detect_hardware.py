#!/usr/bin/env python3
"""
Hardware detection script for WarpTorch
Automatically detects available hardware and recommends appropriate PyTorch installation
"""

import sys
import subprocess
import platform

def check_nvidia_gpu():
    """Check for NVIDIA GPU"""
    try:
        result = subprocess.run(['nvidia-smi'], capture_output=True, text=True, timeout=2)
        if result.returncode == 0:
            # Parse GPU info
            lines = result.stdout.split('\n')
            for line in lines:
                if 'Tesla' in line or 'GeForce' in line or 'RTX' in line or 'GTX' in line:
                    return True, "NVIDIA GPU detected"
            return True, "NVIDIA GPU detected"
        return False, None
    except (FileNotFoundError, subprocess.TimeoutExpired):
        return False, None

def check_amd_gpu():
    """Check for AMD GPU"""
    try:
        # Linux check
        if platform.system() == 'Linux':
            result = subprocess.run(['lspci'], capture_output=True, text=True)
            if 'AMD' in result.stdout and ('GPU' in result.stdout or 'VGA' in result.stdout):
                return True, "AMD GPU detected"
        return False, None
    except FileNotFoundError:
        return False, None

def check_intel_gpu():
    """Check for Intel GPU"""
    try:
        if platform.system() == 'Linux':
            result = subprocess.run(['lspci'], capture_output=True, text=True)
            if 'Intel' in result.stdout and ('GPU' in result.stdout or 'VGA' in result.stdout):
                return True, "Intel GPU detected"
        return False, None
    except FileNotFoundError:
        return False, None

def main():
    print("🔍 Detecting hardware for optimal PyTorch installation...\n")

    # Check GPU
    has_nvidia, nvidia_msg = check_nvidia_gpu()
    has_amd, amd_msg = check_amd_gpu()
    has_intel, intel_msg = check_intel_gpu()

    if has_nvidia:
        print(f"✅ {nvidia_msg}")
        print("📦 Recommended installation:")
        print("   pip install -r backend/requirements-cuda.txt")
        print("\n💡 CUDA will provide the best performance for training and inference")
        return 'cuda'

    if has_amd:
        print(f"✅ {amd_msg}")
        print("📦 Recommended installation:")
        print("   pip install -r backend/requirements-cpu.txt")
        print("\n💡 AMD GPUs use ROCm (not fully supported yet), CPU version recommended")
        return 'cpu'

    if has_intel:
        print(f"✅ {intel_msg}")
        print("📦 Recommended installation:")
        print("   pip install -r backend/requirements-cpu.txt")
        print("\n💡 Intel GPUs use oneAPI (experimental), CPU version recommended")
        return 'cpu'

    # No GPU detected
    print("💻 No GPU detected (CPU-only mode)")
    print("📦 Recommended installation:")
    print("   pip install -r backend/requirements-cpu.txt")
    print("\n💡 CPU version is lightweight and perfect for development")
    return 'cpu'

if __name__ == '__main__':
    torch_version = main()
    sys.exit(0)
