---
sidebar_position: 4
title: Finite Difference Method
---

# Finite Difference Method in WarpTorch

## 4th-Order Finite Difference Schemes

WarpTorch uses 4th-order central finite difference schemes for computing metric tensor derivatives.

This provides **4th-order accuracy** when computing Christoffel symbols, Ricci tensor, scalar curvature, and stress-energy tensor.

### Central Difference Formula

The 4th-order central difference formula for first derivatives is:

```
f'(x) = (-f(x+2h) + 8f(x+h) - 8f(x-h) + f(x-2h))/(12h) + O(h^4)
```

For second derivatives:

```
f''(x) = (-f(x+2h) + 16f(x+h) - 30f(x) + 16f(x-h) - f(x-2h))/(12h^2) + O(h^4)
```

## Interactive Convergence Visualization

See interactive charts on the [Demo page](/docs/interactive-demo).

## GPU Performance

4th-order schemes vectorize excellently on GPU:

```python
# Example: computing Christoffel symbols on GPU
from core.solver.christoffel import get_christoffel_symbols

christoffel = get_christoffel_symbols(metric)  # Computed on CUDA Tensor Cores
print(f"Computed on: {christoffel.device}")     # cuda:0
```

## Advantages of 4th Order

| Scheme Order | Accuracy | Performance | GPU Utilization |
|--------------|----------|-------------|-----------------|
| **2nd order** | O(h²) | Baseline | Excellent |
| **4th order** | O(h⁴) | High | Excellent |
| **6th order** | O(h⁶) | Medium | Good |

WarpTorch uses **4th order** as the optimal balance between accuracy and performance.