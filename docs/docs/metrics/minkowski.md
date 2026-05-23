---
sidebar_position: 5
title: Minkowski Metric
---

# Minkowski Metric

The basic flat metric of special relativity — the reference for all other metrics.

## Mathematical Definition

The Minkowski metric describes flat spacetime without gravity. In matrix form, it has signature (-+++).

## Properties of Minkowski Metric

### Riemann Tensor

All curvature tensor components are zero — spacetime is flat.

### Stress-Energy Tensor

The stress-energy tensor is zero — this is a vacuum solution of Einstein's equations.

## Usage in WarpTorch

```python
from core.metrics.minkowski import get_minkowski_metric

metric = get_minkowski_metric(
    grid_size=(1, 64, 64, 64),
    device=device
)

# Verification: all curvature tensors should be zero
from core.solver.ricci import get_ricci_tensor
ricci = get_ricci_tensor(metric)
assert torch.allclose(ricci, torch.zeros_like(ricci))
```

## Role in WarpTorch

### Baseline for Testing

The Minkowski metric is used for:
- **Validating numerical methods** — all derivatives should be zero
- **Testing convergence** — deviation from zero indicates numerical errors
- **Visualization calibration** — reference "flat" case

### Comparison with Curved Spacetime

| Metric | Curvature | Stress-Energy Tensor | Energy Conditions |
|--------|-----------|---------------------|-------------------|
| **Minkowski** | R = 0 | 0 | Vacuum |
| **Alcubierre** | R ≠ 0 | T₀₀ < 0 | Violates WEC |
| **Schwarzschild** | R ≠ 0 | Tμν = 0 | Vacuum (r > rs) |

## Interactive Visualization

Interactive visualizations are available on the [Demo page](/docs/interactive-demo).

## Advantages

1. **Simplicity** — analytical solution
2. **Accuracy** — no numerical errors
3. **Performance** — minimal computation
4. **Comparison baseline** — control case

## References

- Minkowski, H. (1908). "Raum und Zeit"
- [Special Relativity](https://en.wikipedia.org/wiki/Minkowski_space)