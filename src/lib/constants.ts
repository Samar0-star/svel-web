/**
 * Canonical Constants for Svel AI Scientist Web Platform
 * Directly aligned with /Users/samaraldico/SVEL AI Scientist source code:
 * - backend/epistemic/epistemic_regulator.py
 * - backend/experiments/templates/physics/fusion_plasma_kernel.py
 * - backend/experiments/kernels/physics_kernels.py
 * - backend/experiments/templates/materials/superconductivity.py
 * - backend/tools/ml_model_builder_tool.py
 */

export const CANONICAL_CONSTANTS = {
  // Epistemic Regulator
  EPSILON: 1e-5,
  WELCH_Z_THRESHOLD: 2.576, // p < 0.01 two-tailed
  STAGNATION_SLOPE_THRESHOLD: 0.01,
  CONFIDENCE_CEILING_BASE: 0.50,
  CONFIDENCE_CEILING_STEP: 0.10,
  CONFIDENCE_CEILING_MAX: 0.95,
  MORGUE_SIMILARITY_THRESHOLD: 0.85,

  // Physics & Fusion Kernel
  C_BREM: 5.35e-37, // W cm^3 keV^(-1/2) (NRL Plasma Formulary)
  ELECTRON_REST_MASS_KEV: 511.0,
  CHAOS_LYAPUNOV_THRESHOLD: 0.01,
  TROYON_COEFFICIENT: 0.028,
  GAMOW_B_PB11: 149.89, // keV^(1/2)

  // Materials & Mechanics
  MAX_BFGS_FORCE: 0.05, // eV/Angstrom

  // Multimodal ML
  GSTM_FUSION_DIMENSION: 422, // 128 + 128 + 64 + 32 + 64 + 1 + 5
  ADAPTIVE_LOSS_ALPHA: 0.90, // Bottom 90% retained in clean batch
} as const;
