from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import numpy as np
import sys
import os
from dotenv import load_dotenv

# Load .env from parent directory (project root)
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(__file__)), '.env'))

# Add parent directory to path for WarpTorch module imports
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.metrics.alcubierre import get_alcubierre_metric
from core.solver.energy import get_energy_tensor
from core.visualizer.slicing import get_2d_slice
from core.utils import get_best_device

app = FastAPI(title="WarpTorch API")

# CORS configuration
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3001").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AlcubierreParams(BaseModel):
    velocity: float = 1.5
    radius: float = 6.0
    sigma: float = 4.0
    gridSize: int = 96

@app.get("/")
async def root():
    return {"message": "WarpTorch API - General Relativity Simulator"}

@app.get("/health")
async def health_check():
    device = get_best_device()
    return {
        "status": "healthy",
        "device": str(device),
        "version": "1.0.0"
    }

@app.get("/api/health")
async def health():
    device = get_best_device()
    return {
        "status": "healthy",
        "device": str(device),
        "version": "1.0.0"
    }

@app.post("/api/simulate/alcubierre")
async def simulate_alcubierre(params: AlcubierreParams):
    try:
        # Get device for computations
        device = get_best_device()

        # Create Alcubierre metric
        metric_tensor = get_alcubierre_metric(
            grid_size=(1, params.gridSize, params.gridSize, params.gridSize),
            grid_scale=(0.1, 0.5, 0.5, 0.5),
            world_center=(0.0, params.gridSize // 2, params.gridSize // 2, params.gridSize // 2),
            v=params.velocity,
            R=params.radius,
            sigma=params.sigma,
            device=device
        )

        # Compute stress-energy tensor
        energy_tensor = get_energy_tensor(metric_tensor)

        # Get 2D slice for visualization
        t00_slice = get_2d_slice(energy_tensor, component=(0, 0), slice_plane='xy')

        # get_2d_slice already returns numpy array, so we use it directly
        t00_numpy = t00_slice

        # Compute statistics
        energy_stats = {
            "min": float(np.min(t00_numpy)),
            "max": float(np.max(t00_numpy)),
            "mean": float(np.mean(t00_numpy)),
            "std": float(np.std(t00_numpy))
        }

        # Prepare data for transmission (sample for performance)
        sample_rate = max(1, params.gridSize // 64)  # Max 64x64 points
        sampled_data = t00_numpy[::sample_rate, ::sample_rate].tolist()

        return {
            "success": True,
            "params": params.model_dump(),
            "statistics": energy_stats,
            "grid_size": list(t00_numpy.shape),
            "data": sampled_data,
            "metadata": {
                "metric": "Alcubierre (1994)",
                "description": "Classic superluminal warp bubble",
                "energy_condition": "Negative (requires exotic matter)"
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation error: {str(e)}")

@app.get("/api/metrics")
async def get_metrics():
    return {
        "metrics": [
            {
                "id": "alcubierre",
                "name": "Alcubierre (1994)",
                "description": "Classic superluminal warp bubble",
                "status": "available"
            },
            {
                "id": "lentz",
                "name": "Lentz Soliton (2021)",
                "description": "Positive energy density",
                "status": "coming_soon"
            },
            {
                "id": "schwarzschild",
                "name": "Schwarzschild Black Hole",
                "description": "Static singularity and event horizon",
                "status": "coming_soon"
            }
        ]
    }

if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("BACKEND_PORT", "8001"))
    uvicorn.run(app, host="0.0.0.0", port=port)
