---
sidebar_position: 2
---

# Lentz Positive Energy Soliton Simulation

## Overview

This tutorial demonstrates Erik Lentz's positive energy soliton (2021), a warp drive solution that may avoid the exotic matter requirements of classical warp drives.

## Why Lentz Soliton?

Unlike the Alcubierre metric, Lentz's soliton:
- Uses **positive energy densities** (no exotic matter)
- Maintains **superluminal travel** capabilities
- Requires **enormous but finite** energy

## Step 1: Create Lentz Metric

```python
import torch
from core.metrics.lentz import get_lentz_metric
from core.solver.energy import get_energy_tensor
from core.analyzer.energy_conditions import check_nec, check_wec

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Create Lentz soliton
metric = get_lentz_metric(
    grid_size=(1, 64, 64, 64),
    world_center=(0.0, 32.0, 32.0, 32.0),
    v=1.0,                           # Speed of light
    R=5.0,                           # Soliton radius
    device=device
)
```

## Step 2: Energy Condition Analysis

```python
# Compute energy tensor
energy_tensor = get_energy_tensor(metric)

# Check energy conditions (unlike Alcubierre)
nec_status = check_nec(energy_tensor)
wec_status = check_wec(energy_tensor)

print(f"NEC violations: {nec_status.sum().item()} points")
print(f"WEC violations: {wec_status.sum().item()} points")

# Energy analysis
energy_density = energy_tensor.T_00[0, 0]
total_energy = energy_density.sum().item()

print(f"Total energy: {total_energy:.2e} normalized units")
print(f"Positive energy ratio: {(energy_density > 0).sum().item() / energy_density.numel():.1%}")
```

## Step 3: Geometry Comparison

```python
from core.analyzer.scalars import get_kinematic_scalars

scalars = get_kinematic_scalars(metric)

# Analyze spacetime geometry
expansion = scalars.expansion[0, 0]
shear = scalars.shear[0, 0]
vorticity = scalars.vorticity[0, 0]

print(f"Expansion range: [{expansion.min():.2e}, {expansion.max():.2e}]")
print(f"Shear range: [{shear.min():.2e}, {shear.max():.2e}]")
print(f"Vorticity range: [{vorticity.min():.2e}, {vorticity.max():.2e}]")
```

## Step 4: Comparative Visualization

```python
import matplotlib.pyplot as plt

fig, axes = plt.subplots(1, 3, figsize=(18, 5))

# Energy density (should be mostly positive)
im0 = axes[0].imshow(energy_density.cpu().numpy(), cmap='viridis')
axes[0].set_title('Energy Density (Lentz)')
plt.colorbar(im0, ax=axes[0], label='Energy Density')

# Expansion pattern
im1 = axes[1].imshow(expansion.cpu().numpy(), cmap='RdBu')
axes[1].set_title('Expansion Scalar θ')
plt.colorbar(im1, ax=axes[1], label='Expansion')

# Energy condition violations
im2 = axes[2].imshow(nec_status[0, 0].cpu().numpy(), cmap='Reds')
axes[2].set_title('NEC Violations')
plt.colorbar(im2, ax=axes[2], label='Violation Magnitude')

plt.tight_layout()
plt.savefig('lentz_analysis.png', dpi=150)
plt.show()
```

## Step 5: Performance Requirements

```python
# Calculate practical energy requirements
# Note: These are normalized units, real values would be much larger

print("=== Energy Requirements Analysis ===")
print(f"Grid resolution: {metric.g_uv.shape}")
print(f"Peak energy density: {energy_density.max().item():.2e}")
print(f"Total energy requirement: {total_energy:.2e}")

# Efficiency metrics
positive_energy = energy_density[energy_density > 0].sum().item()
negative_energy = abs(energy_density[energy_density < 0].sum().item())
energy_ratio = positive_energy / (positive_energy + negative_energy) if (positive_energy + negative_energy) > 0 else 0

print(f"Positive energy ratio: {energy_ratio:.1%}")
print("✓ Potential for positive energy warp drive!" if energy_ratio > 0.9 else "⚠ Significant exotic matter required")
```

## Key Findings

Lentz soliton advantages:
- **Positive energy densities** possible
- **No exotic matter** requirement (theoretically)
- **Stable spacetime geometry**

Challenges:
- **Enormous energy requirements** (still)
- **Complex metric structure**
- **Engineering feasibility** remains uncertain

## Comparison with Alcubierre

| Property | Alcubierre (1994) | Lentz (2021) |
|----------|-------------------|--------------|
| **Energy Conditions** | Violates NEC | May satisfy NEC |
| **Energy Type** | Negative (exotic) | Positive |
| **Speed** | Arbitrary superluminal | Superluminal |
| **Complexity** | Relatively simple | More complex |
| **Engineering** | Extremely difficult | Extremely difficult |

## Further Research

- Experiment with velocity parameters
- Analyze energy efficiency vs speed trade-offs
- Study stability properties over time
- Compare with other positive energy solutions