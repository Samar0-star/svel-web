/**
 * Physics & Plasma Fusion Kernel
 * Implements Relativistic Bremsstrahlung radiation power loss (Maxon 1972)
 * and full Lyapunov spectrum Kaplan-Yorke dimension (QR-Benettin algorithm).
 * Directly mirrors backend/experiments/templates/physics/fusion_plasma_kernel.py
 * and backend/experiments/kernels/physics_kernels.py
 */

import { CANONICAL_CONSTANTS } from './constants';

export interface BremsstrahlungResult {
  P_brem_W_cm3: number;
  g_rel: number;
  Z_eff_sq: number;
  n_e: number;
}

/**
 * Calculates Relativistic Bremsstrahlung power loss in hot aneutronic p-11B plasma.
 * g_rel = 1.0 + 1.78 * (Te / 511.0)^1.34
 * P_brem = C_brem * Z_eff^2 * n_e^2 * sqrt(Te) * g_rel
 */
export function relativisticBremsstrahlung(
  Te_keV: number,
  np_cm3: number,
  nB_cm3: number
): BremsstrahlungResult {
  if (Te_keV <= 0 || np_cm3 <= 0 || nB_cm3 <= 0) {
    throw new Error('Temperature and particle densities must be strictly positive');
  }

  // Electron density: charge neutrality n_e = n_p * 1 + n_B * 5
  const n_e = np_cm3 * 1 + nB_cm3 * 5;

  // Effective ionic charge squared: Z_eff^2 = (n_p * 1^2 + n_B * 5^2) / n_e
  const Z_eff_sq = (np_cm3 * 1 + nB_cm3 * 25) / n_e;

  // Relativistic Gaunt correction factor (Maxon 1972)
  const g_rel = 1.0 + 1.78 * Math.pow(Te_keV / CANONICAL_CONSTANTS.ELECTRON_REST_MASS_KEV, 1.34);

  // Volumetric Bremsstrahlung radiation loss (W/cm^3)
  const P_brem_W_cm3 =
    CANONICAL_CONSTANTS.C_BREM *
    Z_eff_sq *
    Math.pow(n_e, 2) *
    Math.sqrt(Te_keV) *
    g_rel;

  return {
    P_brem_W_cm3,
    g_rel,
    Z_eff_sq,
    n_e,
  };
}

export interface LyapunovResult {
  D_KY: number;
  isChaotic: boolean;
}

/**
 * Kaplan-Yorke (Lyapunov) dimension from sorted Lyapunov spectrum.
 * D_KY = j + (sum_{i=1}^j lambda_i) / |lambda_{j+1}|
 */
export function kaplanYorkeDimension(lyapunovExponents: number[]): LyapunovResult {
  if (!lyapunovExponents || lyapunovExponents.length === 0) {
    throw new Error('Lyapunov exponents array cannot be empty');
  }

  const sorted = [...lyapunovExponents].sort((a, b) => b - a);
  const leading = sorted[0] ?? 0;
  const isChaotic = leading > CANONICAL_CONSTANTS.CHAOS_LYAPUNOV_THRESHOLD;

  let sum = 0;
  let j = -1;

  for (let i = 0; i < sorted.length; i++) {
    const val = sorted[i] ?? 0;
    if (sum + val >= 0) {
      sum += val;
      j = i;
    } else {
      break;
    }
  }

  if (j === -1) {
    return { D_KY: 0.0, isChaotic };
  }

  if (j === sorted.length - 1) {
    return { D_KY: sorted.length, isChaotic };
  }

  const nextVal = sorted[j + 1] ?? 1;
  const nextMag = Math.abs(nextVal);
  if (nextMag === 0) {
    return { D_KY: j + 1, isChaotic };
  }

  const D_KY = j + 1 + sum / nextMag;

  return { D_KY, isChaotic };
}

/**
 * Plasma Beta: ratio of kinetic pressure to magnetic field pressure
 * beta = 2 * mu_0 * (2 * n_i * k_B * T) / B^2
 */
export function calculatePlasmaBeta(
  density_m3: number,
  temperature_eV: number,
  magneticField_T: number
): number {
  const mu0 = 4 * Math.PI * 1e-7;
  const e = 1.602176634e-19; // J/eV
  const pressure = 2 * density_m3 * (temperature_eV * e);
  const magneticPressure = (magneticField_T * magneticField_T) / (2 * mu0);
  return pressure / magneticPressure;
}

/**
 * Troyon beta limit for Tokamak disruption: beta_T = 0.028 * (I [MA] / (a [m] * B [T]))
 */
export function calculateTroyonLimit(current_MA: number, minorRadius_m: number, magneticField_T: number): number {
  if (minorRadius_m <= 0 || magneticField_T <= 0) return 0;
  return CANONICAL_CONSTANTS.TROYON_COEFFICIENT * (current_MA / (minorRadius_m * magneticField_T));
}
