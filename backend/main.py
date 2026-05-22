from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
import numpy as np
import sys
import os

# Добавляем родительскую директорию в path для импорта модулей WarpTorch
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from core.metrics.alcubierre import get_alcubierre_metric
from core.solver.energy import get_energy_tensor
from core.visualizer.slicing import get_2d_slice
from core.utils import get_best_device

app = FastAPI(title="WarpTorch API")

# Настройка CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
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
        # Получаем устройство для вычислений
        device = get_best_device()

        # Создаем метрику Алькубьерре
        metric_tensor = get_alcubierre_metric(
            grid_size=(1, params.gridSize, params.gridSize, params.gridSize),
            grid_scale=(0.1, 0.5, 0.5, 0.5),
            world_center=(0.0, params.gridSize // 2, params.gridSize // 2, params.gridSize // 2),
            v=params.velocity,
            R=params.radius,
            sigma=params.sigma,
            device=device
        )

        # Вычисляем тензор энергии-импульса
        energy_tensor = get_energy_tensor(metric_tensor)

        # Получаем 2D срез для визуализации
        t00_slice = get_2d_slice(energy_tensor, component=(0, 0), slice_plane='xy')

        # Конвертируем в numpy для отправки
        t00_numpy = t00_slice.cpu().numpy()

        # Вычисляем статистику
        energy_stats = {
            "min": float(np.min(t00_numpy)),
            "max": float(np.max(t00_numpy)),
            "mean": float(np.mean(t00_numpy)),
            "std": float(np.std(t00_numpy))
        }

        # Подготовка данных для отправки (сэмплируем для скорости)
        sample_rate = max(1, params.gridSize // 64)  # Не более 64x64 точек
        sampled_data = t00_numpy[::sample_rate, ::sample_rate].tolist()

        return {
            "success": True,
            "params": params.dict(),
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
    uvicorn.run(app, host="0.0.0.0", port=8001)
