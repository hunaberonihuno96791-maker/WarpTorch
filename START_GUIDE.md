# WarpTorch - Quick Start Guide

Complete guide to start the WarpTorch visualization project.

## Project Structure

```
WarpTorch/
├── core/              # Physics simulation core
├── backend/           # FastAPI backend server
├── frontend/          # React + Three.js frontend
├── jupyter_notebooks/ # Analysis notebooks
└── output/           # Simulation results
```

## Quick Start (4 steps)

### 1. Start Backend Server

```bash
# Terminal 1: Start FastAPI backend
cd backend
pip install -r requirements.txt
python main.py
```

Backend will run on `http://localhost:8001`

### 2. Start Frontend Development Server

```bash
# Terminal 2: Start React frontend
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3001`

### 3. Open Browser

Navigate to `http://localhost:3001`

You should see:
- **Left Panel**: Simulation controls
- **Main Area**: 3D visualization of warp bubble
- **Background**: Interactive spacetime particles

### 4. Run Simulation

1. Adjust parameters in the control panel:
   - Velocity (0.1c - 3.0c)
   - Bubble Radius (2 - 10 units)
   - Boundary Thickness (1 - 8)
   - Grid Resolution (48³ - 128³)

2. Click "Start Simulation"

3. Watch the 3D visualization update with real-time spacetime distortion

## Controls

### 3D Scene Controls
- **Left Click + Drag**: Rotate camera
- **Right Click + Drag**: Pan camera
- **Scroll Wheel**: Zoom in/out

### Simulation Controls
- **Velocity**: Controls warp bubble speed
- **Radius**: Size of the warp bubble
- **Sigma**: Thickness of bubble boundary
- **Grid Resolution**: Simulation accuracy vs. performance

## Features

### Currently Implemented
✅ **Alcubierre Warp Drive** (1994)
- Classic superluminal warp bubble
- Negative energy density visualization
- Interactive 3D spacetime distortion
- Real-time parameter adjustment

### Coming Soon
🚧 **Lentz Soliton** (2021)
- Positive energy density
- Modern warp drive approach

🚧 **Schwarzschild Black Hole**
- Event horizon visualization
- Gravitational time dilation

🚧 **Van Den Broeck Metric**
- Modified micro-bubble
- Enhanced space compression

## Troubleshooting

### Backend Issues

**Problem**: `ModuleNotFoundError: No module named 'core'`

**Solution**: Make sure you're running the backend from the project root directory

**Problem**: CUDA out of memory

**Solution**: Reduce grid size to 64³ or 48³

### Frontend Issues

**Problem**: `Cannot connect to backend`

**Solution**:
1. Check backend is running on port 8000
2. Check browser console for CORS errors
3. Verify API endpoint configuration in `vite.config.ts`

**Problem**: 3D scene not rendering

**Solution**:
1. Check browser WebGL support
2. Try different browser (Chrome/Firefox recommended)
3. Check browser console for Three.js errors

## Performance Tips

1. **For slow computers**: Use grid resolution 48³ or 64³
2. **For better graphics**: Use grid resolution 96³ or 128³
3. **GPU users**: Backend will automatically use CUDA if available
4. **CPU users**: Start with lower grid sizes for faster response

## Development

### Backend Development
```bash
cd backend
# Install dependencies
pip install -r requirements.txt

# Run with auto-reload
uvicorn main:app --reload --port 8000
```

### Frontend Development
```bash
cd frontend
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Documentation

Once backend is running, visit:
- Swagger UI: `http://localhost:8001/docs`
- ReDoc: `http://localhost:8001/redoc`

## System Requirements

### Minimum
- **CPU**: Dual-core processor
- **RAM**: 4GB
- **GPU**: Integrated graphics
- **Storage**: 500MB free space

### Recommended
- **CPU**: Quad-core processor
- **RAM**: 8GB+
- **GPU**: Dedicated GPU with CUDA support
- **Storage**: 2GB free space

## Next Steps

1. **Explore Parameters**: Try different combinations of velocity, radius, and sigma
2. **Study Physics**: Learn about the Alcubierre metric and energy conditions
3. **Experiment**: Compare different grid resolutions
4. **Extend**: Add new metrics or visualization features

## Support

For issues and questions:
- Check the main README.md
- Review API documentation at `/docs`
- Examine simulation code in `core/` directory

Enjoy exploring general relativity! 🚀
