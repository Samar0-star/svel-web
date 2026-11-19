/**
 * Materials & Condensed Matter Kernel
 * Implements Cubic Born Mechanical Stability Criteria and Voigt Moduli calculations.
 * Directly mirrors backend/experiments/templates/materials/superconductivity.py
 */

export interface CubicBornResult {
  K_bulk_GPa: number;
  G_shear_GPa: number;
  isMechanicallyStable: boolean;
  bornChecks: {
    c11MinusC12: boolean;
    c11Plus2C12: boolean;
    c44: boolean;
  };
}

/**
 * Evaluates Born Mechanical Stability Criteria for cubic crystal systems.
 * Born Criteria (Cubic):
 * 1. c11 - c12 > 0
 * 2. c11 + 2 * c12 > 0 (Bulk modulus K > 0)
 * 3. c44 > 0
 * Voigt Bulk Modulus: K = (c11 + 2 * c12) / 3
 * Voigt Shear Modulus: G = c44
 */
export function verifyCubicBornStability(
  c11: number,
  c12: number,
  c44: number
): CubicBornResult {
  const c11MinusC12 = c11 - c12 > 0;
  const c11Plus2C12 = c11 + 2 * c12 > 0;
  const c44Check = c44 > 0;

  const isMechanicallyStable = c11MinusC12 && c11Plus2C12 && c44Check;
  const K_bulk_GPa = (c11 + 2 * c12) / 3;
  const G_shear_GPa = c44;

  return {
    K_bulk_GPa,
    G_shear_GPa,
    isMechanicallyStable,
    bornChecks: {
      c11MinusC12,
      c11Plus2C12,
      c44: c44Check,
    },
  };
}

/**
 * Calculates Pugh's ductility ratio k = K / G.
 * If k > 1.75, material is typically ductile; if k < 1.75, brittle.
 */
export function calculatePughRatio(K_bulk_GPa: number, G_shear_GPa: number): {
  ratio: number;
  isDuctile: boolean;
} {
  if (G_shear_GPa <= 0) {
    return { ratio: 0, isDuctile: false };
  }
  const ratio = K_bulk_GPa / G_shear_GPa;
  return {
    ratio,
    isDuctile: ratio > 1.75,
  };
}
