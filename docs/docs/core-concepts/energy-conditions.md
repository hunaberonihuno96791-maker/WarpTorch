---
sidebar_position: 2
---

# Energy Conditions

## What are Energy Conditions?

In general relativity, **energy conditions** are constraints on the stress-energy tensor that ensure physically reasonable behavior. Warp drives often require "exotic matter" that violates these conditions.

## Energy Condition Types

### Null Energy Condition (NEC)
The weakest energy condition. If violated, allows for wormholes and warp drives.

```python
from core.solver.energy import get_energy_tensor
from core.analyzer.energy_conditions import check_nec

energy_tensor = get_energy_tensor(metric)
nec_violation = check_nec(energy_tensor)
```

### Weak Energy Condition (WEC)
Requires that energy density is non-negative for all observers.

```python
from core.analyzer.energy_conditions import check_wec

wec_violation = check_wec(energy_tensor)
```

### Strong Energy Condition (SEC)
Used in the singularity theorems of Penrose and Hawking.

```python
from core.analyzer.energy_conditions import check_sec

sec_violation = check_sec(energy_tensor)
```

## Warp Drive Implications

Most classical warp drive metrics (like Alcubierre) violate energy conditions, requiring:
- **Negative energy densities**
- **Exotic matter** (not observed in nature)
- **Enormous mass-energy requirements**

Lentz's positive energy soliton is notable for potentially satisfying energy conditions while still achieving superluminal travel.

## Visualization

WarpTorch provides energy condition violation maps:

```python
import matplotlib.pyplot as plt
from core.analyzer.energy_conditions import get_nec_violation_map

nec_map = get_nec_violation_map(energy_tensor)
plt.imshow(nec_map[0, 0].cpu().numpy())
plt.colorbar(label='NEC Violation Magnitude')
plt.title('Null Energy Condition Violations')
plt.show()
```