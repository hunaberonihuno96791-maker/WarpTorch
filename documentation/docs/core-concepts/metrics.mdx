---
sidebar_position: 1
---

import MetricComparisonChart from '@site/src/components/MetricComparisonChart';

# Spacetime Metrics

## What are Metrics?

In general relativity, a **metric** defines the geometry of spacetime. It describes how distances and angles are measured, and how gravity affects the motion of objects.

## WarpTorch Metric Library

WarpTorch provides a comprehensive library of classical and novel warp metrics, fully vectorized for GPU acceleration.

### Available Metrics

#### Alcubierre Metric
The original warp drive spacetime proposed by Miguel Alcubierre in 1994.

```python
from core.metrics.alcubierre import get_alcubierre_metric

metric = get_alcubierre_metric(
    grid_size=(1, 64, 64, 64),
    world_center=(0.0, 16.0, 16.0, 16.0),
    v=1.5,  # Warp bubble velocity
    R=6.0,  # Bubble radius
    sigma=4.0,  # Bubble wall thickness
    device=device
)
```

#### Lentz Metric
Positive energy soliton solution by Erik Lentz (2021).

```python
from core.metrics.lentz import get_lentz_metric

metric = get_lentz_metric(
    grid_size=(1, 64, 64, 64),
    v=1.0,
    R=5.0,
    device=device
)
```

#### Schwarzschild Metric
Classic black hole spacetime.

```python
from core.metrics.schwarzschild import get_schwarzschild_metric

metric = get_schwarzschild_metric(
    grid_size=(1, 64, 64, 64),
    M=1.0,  # Black hole mass
    device=device
)
```

## Metric Comparison

Compare different warp metrics across key parameters:

<MetricComparisonChart />

### Analysis

The visualization shows important trade-offs:

- **Alcubierre**: Highest energy requirements, violates energy conditions, but conceptually simple
- **Lentz**: Moderate energy, can satisfy energy conditions, more physically realistic
- **Van den Broeck**: Intermediate solution using micro-bubble techniques
- **Schwarzschild**: Zero energy requirement (vacuum solution), naturally stable

## Metric Structure

Each metric in WarpTorch returns a `Metric` object containing:

- **g_uv**: Metric tensor components (4×4×grid_size)
- **derivatives**: First and second derivatives
- **coordinates**: Spacetime coordinate grid
- **parameters**: Original simulation parameters

## Performance Considerations

- **Grid Size**: Larger grids provide higher resolution but require more memory
- **GPU Memory**: 4D spacetime grids can be memory-intensive
- **Batch Processing**: Multiple metrics can be processed simultaneously on GPU