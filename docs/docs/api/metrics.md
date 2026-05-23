---
sidebar_position: 1
---

# Metrics API

## Overview

The metrics module provides implementations of various spacetime metrics used in general relativity research.

## Available Metrics

### `get_alcubierre_metric`

Creates an Alcubierre warp drive spacetime metric.

**Parameters:**
- `grid_size` (Tuple[int, int, int, int]): Grid dimensions (t, x, y, z)
- `world_center` (Tuple[float, float, float, float]): Center coordinates
- `v` (float): Warp bubble velocity (in units of c)
- `R` (float): Bubble radius
- `sigma` (float): Bubble wall thickness parameter
- `device` (torch.device): Target device (cuda/cpu)

**Returns:**
- `Metric`: Object containing metric tensor and derivatives

**Example:**
```python
from core.metrics.alcubierre import get_alcubierre_metric

metric = get_alcubierre_metric(
    grid_size=(1, 64, 64, 64),
    world_center=(0.0, 16.0, 16.0, 16.0),
    v=1.5,
    R=6.0,
    sigma=4.0,
    device=torch.device("cuda")
)
```

### `get_lentz_metric`

Creates a Lentz positive energy soliton metric.

**Parameters:**
- `grid_size` (Tuple[int, int, int, int]): Grid dimensions
- `v` (float): Soliton velocity
- `R` (float): Soliton radius
- `device` (torch.device): Target device

**Returns:**
- `Metric`: Lentz spacetime metric object

### `get_schwarzschild_metric`

Creates a Schwarzschild black hole metric.

**Parameters:**
- `grid_size` (Tuple[int, int, int, int]): Grid dimensions
- `M` (float): Black hole mass
- `device` (torch.device): Target device

**Returns:**
- `Metric`: Schwarzschild metric object

### `get_vandenbroeck_metric`

Creates a Van Den Broeck modified micro-bubble metric.

**Parameters:**
- `grid_size` (Tuple[int, int, int, int]): Grid dimensions
- `v` (float): Bubble velocity
- `R` (float): Bubble radius
- `device` (torch.device): Target device

**Returns:**
- `Metric`: Van Den Broeck metric object

## Metric Object

All metric functions return a `Metric` object containing:

- `g_uv` (torch.Tensor): Metric tensor (4×4×grid_size)
- `derivatives`: Dict of first and second derivatives
- `coordinates`: Coordinate grid arrays
- `parameters`: Original simulation parameters
- `device` (torch.device): Computation device