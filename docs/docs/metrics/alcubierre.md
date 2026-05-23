---
sidebar_position: 1
title: Alcubierre Metric
---

# Alcubierre Metric

The original warp metric proposed by Miguel Alcubierre in 1994.

## Mathematical Definition

The metric tensor for the Alcubierre warp bubble describes spacetime with a warp bubble moving at velocity $v_s$.

### Shape Function

The shape function determines the form of the warp bubble and uses hyperbolic tangent to create smooth bubble walls.

### Key Parameters:
- **v** — warp bubble velocity (in units of c)
- **R** — warp bubble radius
- **sigma** — bubble wall thickness
- **r_s** — distance from bubble center

## Stress-Energy Tensor

The stress-energy tensor for the Alcubierre metric contains **negative energy density**, which violates the weak energy condition (WEC) and requires exotic matter.

## Usage in WarpTorch

```python
from core.metrics.alcubierre import get_alcubierre_metric

metric = get_alcubierre_metric(
    grid_size=(1, 64, 64, 64),
    world_center=(0.0, 16.0, 16.0, 16.0),
    v=1.5,     # Velocity in units of c
    R=6.0,     # Bubble radius
    sigma=4.0, # Wall thickness
    device=device
)

# Access metric components
g_uv = metric.g_uv        # Metric tensor
coordinates = metric.coordinates  # Coordinate grid
```

## Physical Properties

| Property | Value |
|----------|-------|
| **Metric Type** | Warp Drive |
| **Energy Conditions** | Violates WEC, NEC, SEC |
| **Velocity** | Arbitrary v |
| **Event Horizon** | Absent |
| **Singularities** | None |

## Visualization

Interactive visualizations are available on the [Demo page](/docs/interactive-demo).

## References

- Alcubierre, M. (1994). "The warp drive: hyper-fast travel within general relativity". Classical and Quantum Gravity.
- [WarpFactory documentation](https://warpfactory.org)