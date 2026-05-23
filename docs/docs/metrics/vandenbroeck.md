---
sidebar_position: 4
title: Van den Broeck Metric
---

# Van den Broeck Metric

Modified warp metric with micro-bubble that reduces exotic matter requirements.

## Mathematical Definition

The Van den Broeck metric uses a conformal transformation to reduce the warp bubble volume.

## Conformal Factor

The conformal factor B²(rs) strongly compresses space inside the bubble, creating a **micro-bubble** with effective volume much smaller than the external volume.

## Stress-Energy Tensor

Exotic matter requirements are proportional to the ratio of internal to external space volumes, significantly reducing negative energy requirements compared to Alcubierre.

## Usage in WarpTorch

```python
from core.metrics.vandenbroeck import get_vandenbroeck_metric

metric = get_vandenbroeck_metric(
    grid_size=(1, 64, 64, 64),
    v=1.5,     # Warp bubble velocity
    R=6.0,     # External radius
    device=device
)

# Analyze energy requirements
from core.solver.energy import get_energy_density
energy_density = get_energy_density(metric)
total_exotic_energy = energy_density.sum()
```

## Physical Properties

| Property | Value |
|----------|-------|
| **Metric Type** | Warp Drive (micro-bubble) |
| **Energy Conditions** | Violates WEC (less than Alcubierre) |
| **Velocity** | Arbitrary $v$ |
| **Efficiency** | Higher than Alcubierre |

## Advantages Over Alcubierre

| Parameter | Alcubierre | Van den Broeck |
|-----------|------------|----------------|
| **Exotic Matter** | E ~ -10^64 kg | E ~ -10^20 kg |
| **Bubble Volume** | Full | Micro-bubble |
| **Practicality** | Theoretical | More achievable |

## Conformal Factor Visualization

Interactive visualizations are available on the [Demo page](/docs/interactive-demo).

## References

- Van den Broeck, C. (1999). "A 'warp drive' with more reasonable total energy requirements"
- [Warp Drive Modifications](https://arxiv.org/abs/gr-qc/9905084)