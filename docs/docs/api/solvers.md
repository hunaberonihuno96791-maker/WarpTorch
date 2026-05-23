---
sidebar_position: 2
---

# Solvers API

## Overview

The solvers module provides numerical methods for computing Einstein's field equations and related quantities.

## Energy Tensor Solver

### `get_energy_tensor`

Computes the stress-energy tensor from a metric using Einstein's field equations.

**Parameters:**
- `metric` (Metric): Input metric object
- `order` (int): Finite difference order (default: 4)

**Returns:**
- `EnergyTensor`: Object containing T_μν components and derived quantities

**Example:**
```python
from core.solver.energy import get_energy_tensor

energy_tensor = get_energy_tensor(metric)
print(f"Energy density: {energy_tensor.T_00}")
```

## Field Equation Solvers

### `get_ricci_tensor`

Computes the Ricci curvature tensor from metric derivatives.

**Parameters:**
- `metric` (Metric): Input metric object
- `order` (int): Finite difference order (default: 4)

**Returns:**
- `torch.Tensor`: Ricci tensor R_μν

### `get_scalar_curvature`

Computes the Ricci scalar curvature.

**Parameters:**
- `metric` (Metric): Input metric object
- `ricci_tensor` (torch.Tensor): Pre-computed Ricci tensor

**Returns:**
- `torch.Tensor`: Ricci scalar R

### `get_einstein_tensor`

Computes the Einstein tensor G_μν = R_μν - ½Rg_μν.

**Parameters:**
- `metric` (Metric): Input metric object
- `ricci_tensor` (torch.Tensor): Pre-computed Ricci tensor
- `ricci_scalar` (torch.Tensor): Pre-computed Ricci scalar

**Returns:**
- `torch.Tensor`: Einstein tensor G_μν

## Derivative Solvers

### `get_christoffel_symbols`

Computes Christoffel symbols Γ^λ_μν from metric derivatives.

**Parameters:**
- `metric` (Metric): Input metric object

**Returns:**
- `torch.Tensor`: Christoffel symbols (4×4×4×grid_size)

### `get_metric_derivatives`

Computes first and second derivatives of the metric.

**Parameters:**
- `metric` (Metric): Input metric object
- `order` (int): Finite difference order (default: 4)

**Returns:**
- `dict`: Dictionary containing ∂g and ∂²g components

## Performance Notes

- **Finite Difference Order**: Higher orders (4-6) provide better accuracy but slower computation
- **GPU Acceleration**: All solvers are fully vectorized for GPU acceleration
- **Memory Usage**: 4D grids can be memory-intensive for large simulations