---
sidebar_position: 2
title: Lentz Metric
---

# Lentz Metric

Positive energy warp metric proposed by Erik Lentz in 2021.

## Mathematical Definition

The Lentz metric uses soliton solutions to create a warp bubble without violating energy conditions.

## Lentz Shape Function

The function F(rs) is constructed from a superposition of soliton waves, allowing for **positive energy density** in certain configurations.

## Stress-Energy Tensor

Unlike the Alcubierre metric, the Lentz metric can satisfy **energy conditions** for some parameter sets.

## Usage in WarpTorch

```python
from core.metrics.lentz import get_lentz_metric

metric = get_lentz_metric(
    grid_size=(1, 64, 64, 64),
    v=1.0,     # Warp bubble velocity
    R=5.0,     # Characteristic radius
    device=device
)

# Check energy conditions
from core.solver.energy import check_energy_conditions
conditions = check_energy_conditions(metric)
```

## Physical Properties

| Property | Value |
|----------|-------|
| **Metric Type** | Warp Drive |
| **Energy Conditions** | Can satisfy WEC |
| **Velocity** | Limited |
| **Event Horizon** | Absent |
| **Singularities** | None |

## Advantages Over Alcubierre

1. **Positive Energy** — does not require exotic matter
2. **Stability** — more stable to perturbations
3. **Experimental Verification** — can be tested in laboratory settings

## Energy Distribution Visualization

Interactive visualizations are available on the [Demo page](/docs/interactive-demo).

## References

- Lentz, E. (2021). "Breaking the Warp Barrier: Hyper-Fast Solitons in Einstein-Maxwell-Plasma Theory"
- [Positive Energy Warp Drives](https://arxiv.org/abs/2006.07175)