---
sidebar_position: 1
---

# Alcubierre Warp Drive Simulation

## Overview

This tutorial walks through creating a classic Alcubierre warp drive simulation using WarpTorch.

## Step 1: Setup Environment

```python
import torch
from core.metrics.alcubierre import get_alcubierre_metric
from core.solver.energy import get_energy_tensor
from core.analyzer.scalars import get_kinematic_scalars

# Choose GPU if available
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")
```

## Step 2: Create Alcubierre Metric

```python
# Initialize warp bubble parameters
metric = get_alcubierre_metric(
    grid_size=(1, 64, 64, 64),      # 4D spacetime grid
    world_center=(0.0, 32.0, 32.0, 32.0),  # Center in space
    v=1.5,                           # 1.5x speed of light
    R=6.0,                           # Bubble radius
    sigma=4.0,                       # Wall thickness
    device=device
)

print(f"Metric tensor shape: {metric.g_uv.shape}")
```

## Step 3: Compute Energy Requirements

```python
# Solve Einstein's equations
energy_tensor = get_energy_tensor(metric)

# Analyze energy distribution
energy_density = energy_tensor.T_00[0, 0]
total_energy = energy_density.sum().item()

print(f"Total energy required: {total_energy:.2e} (normalized units)")
print(f"Min energy density: {energy_density.min().item():.2e}")
print(f"Max energy density: {energy_density.max().item():.2e}")
```

## Step 4: Analyze Spacetime Geometry

```python
# Compute kinematic scalars
scalars = get_kinematic_scalars(metric)

# Check expansion characteristics
expansion_magnitude = scalars.expansion[0, 0].abs().max().item()
print(f"Max expansion magnitude: {expansion_magnitude:.2e}")

# Check energy condition violations
from core.analyzer.energy_conditions import check_nec
nec_violations = check_nec(energy_tensor).sum().item()
print(f"NEC violations: {nec_violations} grid points")
```

## Step 5: Visualize Results

```python
import matplotlib.pyplot as plt

# Create 2D slice visualization
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Energy density
axes[0, 0].imshow(energy_density.cpu().numpy())
axes[0, 0].set_title('Energy Density Distribution')
axes[0, 0].set_xlabel('y (spatial)')
axes[0, 0].set_ylabel('z (spatial)')

# Expansion scalar
axes[0, 1].imshow(scalars.expansion[0, 0].cpu().numpy())
axes[0, 1].set_title('Expansion Scalar θ')
axes[0, 1].set_xlabel('y (spatial)')
axes[0, 1].set_ylabel('z (spatial)')

# Shear scalar
axes[1, 0].imshow(scalars.shear[0, 0].cpu().numpy())
axes[1, 0].set_title('Shear Scalar σ')
axes[1, 0].set_xlabel('y (spatial)')
axes[1, 0].set_ylabel('z (spatial)')

# Vorticity scalar
axes[1, 1].imshow(scalars.vorticity[0, 0].cpu().numpy())
axes[1, 1].set_title('Vorticity Scalar ω')
axes[1, 1].set_xlabel('y (spatial)')
axes[1, 1].set_ylabel('z (spatial)')

plt.tight_layout()
plt.savefig('alcubierre_analysis.png', dpi=150)
plt.show()
```

## Step 6: Export for Web Visualization

```python
from core.analyzer.export import export_metric_to_json

# Export data for WebGL frontend
export_path = export_metric_to_json(
    metric,
    "output/alcubierre_visualization.json",
    slices=[0]  # Export first time slice
)

print(f"Data exported to: {export_path}")
```

## Analysis Results

Your simulation should reveal:
- **Negative energy density** in bubble walls (exotic matter requirement)
- **Expansion behind bubble** (space creation)
- **Contraction ahead of bubble** (space collapse)
- **NEC violations** (classical warp drive limitation)

## Next Steps

- Experiment with different velocities (`v` parameter)
- Adjust bubble size (`R`) and wall thickness (`sigma`)
- Compare with Lentz positive energy soliton
- Analyze trade-offs between speed and energy requirements