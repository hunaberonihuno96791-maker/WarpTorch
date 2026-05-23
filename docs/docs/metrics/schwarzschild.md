---
sidebar_position: 3
title: Schwarzschild Metric
---

# Schwarzschild Metric

Classical solution of Einstein's equations for a spherically symmetric black body.

## Mathematical Definition

The Schwarzschild metric describes spacetime around an uncharged, non-rotating spherically symmetric mass M.

## Characteristic Scales

### Schwarzschild Radius

The Schwarzschild radius is defined as rs = 2GM/c². For a black hole with the mass of the Sun, rs ≈ 3 km.

## Singularities

### Curvature Singularity

As r → 0, the Kretschmann scalar curvature diverges to infinity — this is a true spacetime singularity.

### Coordinate Singularity

At r = rs, a metric component diverges, but this is a coordinate singularity, not a spacetime singularity.

## Usage in WarpTorch

```python
from core.metrics.schwarzschild import get_schwarzschild_metric

metric = get_schwarzschild_metric(
    grid_size=(1, 64, 64, 64),
    M=1.0,     # Black hole mass
    device=device
)

# Calculate stress-energy tensor
from core.solver.energy import get_energy_tensor
energy = get_energy_tensor(metric)
```

## Physical Properties

| Property | Value |
|----------|-------|
| **Metric Type** | Black Hole |
| **Mass** | M |
| **Charge** | Q = 0 |
| **Angular Momentum** | J = 0 |
| **Event Horizon** | rs = 2GM/c² |

## Spacetime Visualization

Interactive visualizations are available on the [Demo page](/docs/interactive-demo).

## References

- Schwarzschild, K. (1916). "Über das Gravitationsfeld eines Massenpunktes nach der Einsteinschen Theorie"
- [Black Hole Math](https://mathworld.wolfram.com/SchwarzschildBlackHole.html)