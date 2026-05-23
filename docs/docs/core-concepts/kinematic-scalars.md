---
sidebar_position: 3
---

# Kinematic Scalars

## What are Kinematic Scalars?

**Kinematic scalars** describe the expansion, shear, and vorticity of spacetime congruences. They provide insight into how warp bubbles affect spacetime geometry.

## The Three Scalars

### Expansion
Describes the expansion or contraction of spacetime volume.

```python
from core.analyzer.scalars import get_expansion

expansion = get_expansion(metric)
# Positive values: expansion (big bang-like)
# Negative values: contraction (crunch-like)
```

### Shear
Describes distortion without volume change.

```python
from core.analyzer.scalars import get_shear

shear = get_shear(metric)
# Tidal forces that stretch and squeeze
```

### Vorticity
Describes rotation of the spacetime congruence.

```python
from core.analyzer.scalars import get_vorticity

vorticity = get_vorticity(metric)
# Frame-dragging effects
```

```python
from core.analyzer.scalars import get_expansion

expansion = get_expansion(metric)
# Positive values: expansion (big bang-like)
# Negative values: contraction (crunch-like)
```

### Shear ($\sigma$)
Describes distortion without volume change.

```python
from core.analyzer.scalars import get_shear

shear = get_shear(metric)
# Tidal forces that stretch and squeeze
```

### Vorticity ($\omega$)
Describes rotation of the spacetime congruence.

```python
from core.analyzer.scalars import get_vorticity

vorticity = get_vorticity(metric)
# Frame-dragging effects
```

## Physical Interpretation

For warp drives:
- **Expansion front**: Space expands behind the bubble
- **Contraction front**: Space contracts in front of the bubble  
- **Shear effects**: Spacetime distortion at bubble walls
- **Vorticity**: Frame-dragging around moving warp bubbles

## Complete Analysis

```python
from core.analyzer.scalars import get_kinematic_scalars

scalars = get_kinematic_scalars(metric)
print(f"Expansion: {scalars.expansion}")
print(f"Shear: {scalars.shear}")
print(f"Vorticity: {scalars.vorticity}")
```

## Visualization

```python
import matplotlib.pyplot as plt

# Plot expansion scalar
fig, axes = plt.subplots(1, 3, figsize=(15, 5))

axes[0].imshow(scalars.expansion[0, 0].cpu().numpy())
axes[0].set_title('Expansion Scalar θ')

axes[1].imshow(scalars.shear[0, 0].cpu().numpy())
axes[1].set_title('Shear Scalar σ')

axes[2].imshow(scalars.vorticity[0, 0].cpu().numpy())
axes[2].set_title('Vorticity Scalar ω')

plt.tight_layout()
plt.show()
```