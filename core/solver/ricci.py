"""
Computes the Ricci tensor and Ricci scalar from Christoffel symbols.
Original implementations: ricciT.m, ricciS.m
"""
import torch

def get_ricci_tensor(gamma: torch.Tensor, d_gamma: torch.Tensor) -> torch.Tensor:
    """
    Computes the covariant Ricci tensor R_{\mu\nu} fully vectorized.
    Instead of manually computing 2nd derivatives of the metric, 
    we use the standard GR definition via derivatives of Christoffel symbols.
    
    Formula: R_{\mu\nu} = \partial_\rho \Gamma^\rho_{\mu\nu} - \partial_\nu \Gamma^\rho_{\rho\mu} 
                        + \Gamma^\rho_{\rho\lambda}\Gamma^\lambda_{\mu\nu} - \Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\rho\mu}
    
    Args:
        gamma: Christoffel symbols of shape (4, 4, 4, T, X, Y, Z). Dims: (\rho, \mu, \nu)
        d_gamma: Derivatives of Christoffel symbols (4, 4, 4, 4, T, X, Y, Z). Dims: (der_dim, \rho, \mu, \nu)
        
    Returns:
        R_munu: Ricci tensor of shape (4, 4, T, X, Y, Z). Dims: (\mu, \nu)
    """
    # Term 1: \partial_\rho \Gamma^\rho_{\mu\nu}
    # Sum over \rho (index 0 of d_gamma is derivative dim, index 1 is upper index of gamma)
    term1 = torch.einsum('rrmn...->mn...', d_gamma)
    
    # Term 2: \partial_\nu \Gamma^\rho_{\rho\mu}
    # Derivative wrt \nu (index n), upper index \rho (index r), lower indices \rho (index r), \mu (index m)
    term2 = torch.einsum('nrrm...->mn...', d_gamma)
    
    # Term 3: \Gamma^\rho_{\rho\lambda}\Gamma^\lambda_{\mu\nu}
    term3 = torch.einsum('rrl...,lmn...->mn...', gamma, gamma)
    
    # Term 4: \Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\rho\mu}
    term4 = torch.einsum('rnl...,lrm...->mn...', gamma, gamma)
    
    R_munu = term1 - term2 + term3 - term4
    
    # Force symmetry to eliminate floating point noise
    R_munu = 0.5 * (R_munu + R_munu.transpose(0, 1))
    
    return R_munu

def get_ricci_scalar(R_munu: torch.Tensor, gu: torch.Tensor) -> torch.Tensor:
    """
    Computes the Ricci scalar R = g^{\mu\nu} R_{\mu\nu}
   
    """
    return torch.einsum('mn...,mn...->...', gu, R_munu)