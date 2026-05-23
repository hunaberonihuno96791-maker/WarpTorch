---
sidebar_position: 3
---

# Creating Custom Metrics

## Overview

This tutorial shows how to create custom spacetime metrics in WarpTorch for research and experimentation.

## Metric Structure

A WarpTorch metric must provide:

1. **Metric tensor** g_μν (4×4 matrix at each grid point)
2. **First derivatives** ∂g_μν/∂x^λ  
3. **Second derivatives** ∂²g_μν/∂x^λ∂x^σ
4. **Coordinate grid** for the spacetime

## Step 1: Define Custom Metric Class

```python
import torch
from dataclasses import dataclass
from typing import Tuple, Dict

@dataclass
class Metric:
    """Standard WarpTorch metric structure"""
    g_uv: torch.Tensor           # Metric tensor (4, 4, grid_size)
    derivatives: Dict            # First and second derivatives
    coordinates: Dict            # Coordinate grids
    parameters: Dict             # Original parameters
    device: torch.device         # Computation device
```

## Step 2: Create Custom Metric Function

Here's how to implement a custom warp metric:

```python
def get_custom_warp_metric(
    grid_size: Tuple[int, int, int, int] = (1, 64, 64, 64),
    world_center: Tuple[float, float, float, float] = (0.0, 32.0, 32.0, 32.0),
    v: float = 1.0,
    R: float = 5.0,
    sigma: float = 3.0,
    device: torch.device = torch.device("cuda")
) -> Metric:
    """
    Custom warp metric implementation.
    
    Parameters:
    - grid_size: (t, x, y, z) dimensions
    - world_center: (t, x, y, z) center coordinates
    - v: warp velocity
    - R: bubble radius
    - sigma: wall thickness
    - device: computation device
    """
    
    # Create coordinate grid
    t = torch.linspace(0, 1, grid_size[0], device=device)
    x = torch.linspace(0, 64, grid_size[1], device=device)
    y = torch.linspace(0, 64, grid_size[2], device=device)
    z = torch.linspace(0, 64, grid_size[3], device=device)
    
    T, X, Y, Z = torch.meshgrid(t, x, y, z, indexing='ij')
    
    # Your custom metric tensor definition here
    # Example: Modified Alcubierre-like metric
    
    # Define warp bubble shape function
    def bubble_shape(x, y, z, t, v, R, sigma):
        # Your custom shape function
        x_center = world_center[1] + v * t
        r = torch.sqrt((x - x_center)**2 + y**2 + z**2)
        return torch.exp(-(r**2) / (sigma**2))
    
    # Compute metric components
    f = bubble_shape(X, Y, Z, T, v, R, sigma)
    
    # Metric tensor g_μν (4×4 matrix)
    g_uv = torch.zeros((4, 4) + grid_size, device=device)
    
    # Flat Minkowski background
    g_uv[0, 0] = -1.0  # Time component
    g_uv[1, 1] = 1.0   # x component  
    g_uv[2, 2] = 1.0   # y component
    g_uv[3, 3] = 1.0   # z component
    
    # Add warp drive modification
    g_uv[0, 0] -= f**2 * v**2
    g_uv[0, 1] = f * v
    g_uv[1, 0] = f * v
    
    # Compute derivatives using finite differences
    from core.solver.derivatives import compute_metric_derivatives
    derivatives = compute_metric_derivatives(g_uv, t, x, y, z)
    
    # Create metric object
    return Metric(
        g_uv=g_uv,
        derivatives=derivatives,
        coordinates={'t': T, 'x': X, 'y': Y, 'z': Z},
        parameters={'v': v, 'R': R, 'sigma': sigma},
        device=device
    )
```

## Step 3: Analyze Your Custom Metric

```python
from core.solver.energy import get_energy_tensor
from core.analyzer.scalars import get_kinematic_scalars

# Create your custom metric
custom_metric = get_custom_warp_metric(
    v=1.2,
    R=6.0,
    sigma=4.0,
    device=torch.device("cuda")
)

# Analyze energy requirements
energy_tensor = get_energy_tensor(custom_metric)
print(f"Total energy: {energy_tensor.T_00.sum().item():.2e}")

# Check spacetime geometry
scalars = get_kinematic_scalars(custom_metric)
print(f"Max expansion: {scalars.expansion.max().item():.2e}")
```

## Step 4: Optimize Performance

For GPU acceleration:

```python
# Vectorized operations only
def optimized_shape_function(x, y, z, t, v, R, sigma):
    # Use torch operations for GPU acceleration
    r_squared = (x - v*t)**2 + y**2 + z**2
    return torch.exp(-r_squared / (sigma**2))

# Avoid Python loops, use tensor operations
# Batch operations when possible
# Use in-place operations for large tensors
```

## Step 5: Validate Your Metric

```python
def validate_metric(metric: Metric) -> bool:
    """Basic metric validation checks"""
    
    # Check metric is non-singular
    det = torch.linalg.det(metric.g_uv.permute(2, 3, 4, 5, 0, 1).reshape(-1, 4, 4))
    if (det.abs() < 1e-10).any():
        print("Warning: Metric is singular at some points")
        return False
    
    # Check metric symmetry (g_μν = g_νμ)
    if not torch.allclose(metric.g_uv, metric.g_uv.permute(1, 0, 2, 3, 4, 5)):
        print("Warning: Metric is not symmetric")
        return False
    
    print("✓ Metric validation passed")
    return True

# Validate your custom metric
validate_metric(custom_metric)
```

## Example: Hybrid Metric

Combine existing metrics:

```python
def get_hybrid_metric(metric1: Metric, metric2: Metric, alpha: float = 0.5) -> Metric:
    """Create hybrid of two metrics"""
    
    # Linear combination of metric tensors
    g_uv = alpha * metric1.g_uv + (1 - alpha) * metric2.g_uv
    
    # Combine parameters
    params = {
        'type': 'hybrid',
        'alpha': alpha,
        'metric1': metric1.parameters,
        'metric2': metric2.parameters
    }
    
    return Metric(
        g_uv=g_uv,
        derivatives=None,  # Would need re-computation
        coordinates=metric1.coordinates,
        parameters=params,
        device=metric1.device
    )
```

## Testing and Documentation

Always document your custom metric:

```python
def get_my_metric(
    grid_size: Tuple[int, int, int, int] = (1, 64, 64, 64),
    parameter1: float = 1.0,
    parameter2: float = 2.0,
    device: torch.device = torch.device("cuda")
) -> Metric:
    """
    Brief description of your metric.
    
    Mathematical background:
    - Based on [paper/research]
    - Key properties: [list properties]
    
    Parameters:
    - grid_size: Spacetime grid dimensions
    - parameter1: Description and physical meaning
    - parameter2: Description and physical meaning
    - device: Computation device (cuda/cpu)
    
    Returns:
    - Metric: Custom spacetime metric
    
    Examples:
    >>> metric = get_my_metric(v=1.5, R=6.0)
    >>> energy = get_energy_tensor(metric)
    """
    # Your implementation
    pass
```

## Next Steps

- Experiment with different functional forms
- Study specific research papers for inspiration
- Share your metrics with the WarpTorch community
- Consider publishing interesting findings