# run_simulation.py
import os
import torch
import numpy as np
import time

# 1. Import core modules from WarpTorch
from core.metrics.alcubierre import get_alcubierre_metric
from core.solver.energy import get_energy_tensor
from core.analyzer.scalars import get_kinematic_scalars
from core.visualizer.slicing import get_2d_slice
from core.visualizer.export import export_heatmap_to_json
from core.utils import get_best_device

def main():
    # 2. Select hardware accelerator automatically
    device = get_best_device()
    print(f"[*] Activating hardware device: {device}")
    
    # 3. Setup spacetime grid configuration
    grid_size = (1, 96, 96, 96)  # Увеличил в ~3.4 раза
    grid_scale = (0.1, 0.5, 0.5, 0.5)
    world_center = (0.0, 24.0, 24.0, 24.0)  # Подстроил центр
    
    # 4. Generate the Alcubierre metric
    print("[*] Generating Alcubierre warp metric...")
    start = time.time()
    metric = get_alcubierre_metric(
        grid_size=grid_size,
        world_center=world_center,
        v=1.5, # Superluminal velocity (1.5c)
        R=6.0,
        sigma=4.0,
        grid_scale=grid_scale,
        device=device
    )
    print(f"    [*] Метрика сгенерирована за {time.time() - start:.2f} сек")

    # 5. Solve Einstein Field Equations to get Stress-Energy Tensor
    print("[*] Solving Einstein field equations...")
    start = time.time()
    energy_tensor = get_energy_tensor(metric)
    print(f"    [*] Уравнения Эйнштейна решены за {time.time() - start:.2f} сек")

    # 6. Extract raw 2D slice data for T00 (Energy Density)
    print("[*] Extracting 2D mid-plane slice...")
    start = time.time()
    t00_slice = get_2d_slice(energy_tensor, component=(0, 0), slice_plane='xy')
    print(f"    [*] 2D срез извлечён за {time.time() - start:.2f} сек")
    
    # 7. Export data to JSON for web/external engines or future plotting
    os.makedirs("output", exist_ok=True)
    export_path = "output/alcubierre_t00.json"
    
    export_heatmap_to_json(
        data_2d=t00_slice,
        filename=export_path,
        title="Alcubierre Warp Bubble Energy Density",
        grid_scaling=(grid_scale[1], grid_scale[2])
    )
    print(f"[+] Simulation finished successfully! Data saved to {export_path}")

if __name__ == "__main__":
    main()