# WarpTorch Backend API

FastAPI backend for running general relativity simulations and serving results to the frontend.

## Prerequisites

- Python 3.8+
- CUDA-capable GPU (optional, for acceleration)

## Installation

```bash
cd backend
pip install -r requirements.txt
```

## Development

```bash
# Start development server
python main.py

# Or with uvicorn directly
uvicorn main:app --reload --port 8000
```

## API Endpoints

### Health Check
```
GET /api/health
```

Returns server status and compute device information.

### Run Simulation
```
POST /api/simulate/alcubierre
```

Run Alcubierre warp drive simulation with custom parameters.

**Request Body:**
```json
{
  "velocity": 1.5,
  "radius": 6.0,
  "sigma": 4.0,
  "gridSize": 96
}
```

**Response:**
```json
{
  "success": true,
  "params": {...},
  "statistics": {
    "min": -0.5,
    "max": 0.1,
    "mean": -0.05,
    "std": 0.15
  },
  "grid_size": [96, 96],
  "data": [[...], [...]],
  "metadata": {...}
}
```

### Available Metrics
```
GET /api/metrics
```

List all available spacetime metrics and their status.

## Features

- **GPU Acceleration**: Automatic CUDA detection and usage
- **Multiple Metrics**: Support for various GR metrics
- **Real-time Computation**: Fast tensor operations with PyTorch
- **CORS Enabled**: Direct browser access
- **Error Handling**: Comprehensive error responses

## Tech Stack

- FastAPI for API framework
- PyTorch for tensor computations
- NumPy for numerical operations
- Pydantic for data validation
- Uvicorn for ASGI server

## Integration with WarpTorch Core

The backend imports simulation modules from the parent WarpTorch project:

- `core.metrics.alcubierre` - Spacetime metric definitions
- `core.solver.energy` - Einstein field equation solver
- `core.visualizer.slicing` - 3D → 2D data extraction
- `core.utils` - Device detection and utilities

## Error Handling

All endpoints return proper HTTP status codes:

- `200` - Success
- `500` - Simulation error with details
- `422` - Validation error (invalid parameters)

## Performance

- **Grid Size 64³**: ~2 seconds on CPU
- **Grid Size 96³**: ~5 seconds on CPU, <1 second on GPU
- **Grid Size 128³**: ~15 seconds on CPU, ~2 seconds on GPU
