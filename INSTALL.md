# WarpTorch Installation Guide

## Quick Start

### 1. Basic Installation (Core only)
```bash
pip install -r requirements.txt
```

### 2. Development Installation (with Jupyter)
```bash
pip install -r requirements.txt
pip install -r dev-requirements.txt
```

### 3. Git Setup for Notebooks
```bash
# Automatically clean notebook outputs before commits
pip install -r dev-requirements.txt
nbstripout --install
```

## File Structure

- **requirements.txt** — Core WarpTorch dependencies (PyTorch, NumPy, Plotly)
- **dev-requirements.txt** — Development tools (Jupyter, nbstripout)
- **core/requirements.txt** — Legacy file, phased out

## Why This Structure?

🎯 **Separation of Concerns:**
- Users only install what they need
- Developers get Jupyter + git tools
- CI/CD can install minimal dependencies

🚀 **Convenience:**
- Standard `pip install -r requirements.txt` from project root
- No need to remember `core/requirements.txt` path