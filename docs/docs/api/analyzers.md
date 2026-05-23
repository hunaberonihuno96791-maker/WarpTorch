---
sidebar_position: 3
---

# Analyzers API

## Overview

The analyzers module provides tools for analyzing spacetime properties, energy conditions, and kinematic scalars.

## Kinematic Scalars

### `get_kinematic_scalars`

Computes expansion, shear, and vorticity scalars.

**Parameters:**
- `metric` (Metric): Input metric object

**Returns:**
- `KinematicScalars`: Object with expansion, shear, vorticity tensors

**Example:**
```python
from core.analyzer.scalars import get_kinematic_scalars

scalars = get_kinematic_scalars(metric)
print(f"Expansion: {scalars.expansion.shape}")
```

### `get_expansion`

Computes only the expansion scalar.

**Parameters:**
- `metric` (Metric): Input metric object

**Returns:**
- `torch.Tensor`: Expansion tensor θ

### `get_shear`

Computes only the shear scalar.

**Parameters:**
- `metric` (Metric): Input metric object

**Returns:**
- `torch.Tensor`: Shear tensor σ_μν

### `get_vorticity`

Computes only the vorticity scalar.

**Parameters:**
- `metric` (Metric): Input metric object

**Returns:**
- `torch.Tensor`: Vorticity tensor ω_μν

## Energy Condition Analyzers

### `check_nec`

Checks violation of the Null Energy Condition.

**Parameters:**
- `energy_tensor` (EnergyTensor): Input energy tensor

**Returns:**
- `torch.Tensor`: Boolean tensor indicating NEC violations

**Example:**
```python
from core.analyzer.energy_conditions import check_nec

nec_violated = check_nec(energy_tensor)
print(f"NEC violations: {nec_violated.sum().item()}")
```

### `check_wec`

Checks violation of the Weak Energy Condition.

**Parameters:**
- `energy_tensor` (EnergyTensor): Input energy tensor

**Returns:**
- `torch.Tensor`: Boolean tensor indicating WEC violations

### `check_sec`

Checks violation of the Strong Energy Condition.

**Parameters:**
- `energy_tensor` (EnergyTensor): Input energy tensor

**Returns:**
- `torch.Tensor`: Boolean tensor indicating SEC violations

### `get_energy_condition_violation_map`

Creates comprehensive energy condition violation maps.

**Parameters:**
- `energy_tensor` (EnergyTensor): Input energy tensor

**Returns:**
- `dict`: Dictionary with violation maps for NEC, WEC, SEC

## Data Export

### `export_metric_to_json`

Exports metric data for WebGL visualization.

**Parameters:**
- `metric` (Metric): Input metric object
- `filename` (str): Output JSON filename
- `slices` (list): Which spacetime slices to export

**Returns:**
- `str`: Path to exported JSON file

**Example:**
```python
from core.analyzer.export import export_metric_to_json

export_metric_to_json(
    metric,
    "output/alcubierre_data.json",
    slices=[0]  # Export first time slice
)
```