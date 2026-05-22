import os
import torch
import numpy as np

from core.metrics.alcubierre import get_alcubierre_metric
from core.analyzer.scalars import get_kinematic_scalars
from core.visualizer.export import export_heatmap_to_json

def main():
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    print(f"Generating Alcubierre data using device: {device}")

    grid_size = (1, 64, 64, 64)
    grid_scale = (0.1, 0.5, 0.5, 0.5)
    world_center = (0.0, 16.0, 16.0, 16.0)

    print("Generating Alcubierre metric...")
    metric = get_alcubierre_metric(
        grid_size=grid_size,
        world_center=world_center,
        v=1.5,
        R=6.0,
        sigma=4.0,
        grid_scale=grid_scale,
        device=device
    )

    print("Calculating kinematic scalars (Expansion)...")
    scalars = get_kinematic_scalars(metric)
    expansion = scalars["expansion"]

    # Extract a 2D slice from the center of the Z-axis (XY plane)
    expansion_slice = expansion[0, :, :, grid_size[3] // 2].detach().cpu().numpy()

    # Define output directory
    output_dir = os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "public", "data")
    os.makedirs(output_dir, exist_ok=True)

    filename = os.path.join(output_dir, "alcubierre_expansion.json")

    # Export the 2D slice
    export_heatmap_to_json(
        data_2d=expansion_slice,
        filename=filename,
        title="Alcubierre Warp Bubble: Expansion Scalar",
        grid_scaling=(grid_scale[1], grid_scale[2])
    )

    print(f"Data successfully exported to {filename}")

if __name__ == "__main__":
    main()
