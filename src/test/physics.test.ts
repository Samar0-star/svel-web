import { describe, it, expect } from 'vitest';
import {
  relativisticBremsstrahlung,
  kaplanYorkeDimension,
  calculatePlasmaBeta,
  calculateTroyonLimit,
} from '../lib/physics';

describe('Physics & Plasma Fusion Kernel Calculations', () => {
  describe('relativisticBremsstrahlung', () => {
    it('calculates relativistic Bremsstrahlung power loss matching Case 4 ground truth', () => {
      // Input: Te = 50 keV, np = 1e20 cm^-3, nB = 1e20 cm^-3
      const Te_keV = 50.0;
      const np_cm3 = 1e20;
      const nB_cm3 = 1e20;

      const result = relativisticBremsstrahlung(Te_keV, np_cm3, nB_cm3);

      // Charge neutrality: ne = 1e20 * 1 + 1e20 * 5 = 6e20
      expect(result.n_e).toBe(6e20);

      // Z_eff^2 = (1e20 * 1 + 1e20 * 25) / 6e20 = 26 / 6 = 4.3333...
      expect(result.Z_eff_sq).toBeCloseTo(4.3333, 3);

      // g_rel = 1.0 + 1.78 * (50 / 511.0)^1.34 = 1.07902
      expect(result.g_rel).toBeCloseTo(1.079, 3);

      // Volumetric loss ~ 6.37e6 W/cm^3
      expect(result.P_brem_W_cm3).toBeGreaterThan(6.0e6);
      expect(result.P_brem_W_cm3).toBeLessThan(6.7e6);
    });

    it('throws error for non-positive input densities or temperature', () => {
      expect(() => relativisticBremsstrahlung(0, 1e20, 1e20)).toThrow();
      expect(() => relativisticBremsstrahlung(50, -1e20, 1e20)).toThrow();
    });
  });

  describe('kaplanYorkeDimension', () => {
    it('calculates Kaplan-Yorke dimension matching Case 6 ground truth', () => {
      // Exponents: [0.15, 0.00, -0.40]
      // S1 = 0.15, S2 = 0.15, S3 = -0.25 -> j = 2
      // D_KY = 2 + 0.15 / |-0.40| = 2 + 0.375 = 2.375
      const exponents = [0.15, 0.00, -0.40];
      const result = kaplanYorkeDimension(exponents);

      expect(result.D_KY).toBeCloseTo(2.375, 3);
      expect(result.isChaotic).toBe(true);
    });

    it('classifies non-chaotic system when leading exponent <= 0.01', () => {
      const regularExponents = [0.005, -0.1, -0.5];
      const result = kaplanYorkeDimension(regularExponents);

      expect(result.isChaotic).toBe(false);
    });

    it('throws error for empty exponents array', () => {
      expect(() => kaplanYorkeDimension([])).toThrow('Lyapunov exponents array cannot be empty');
    });
  });

  describe('calculatePlasmaBeta & calculateTroyonLimit', () => {
    it('calculates plasma beta correctly', () => {
      // density = 1e20 m^-3, T = 10,000 eV (10 keV), B = 5.0 Tesla
      const beta = calculatePlasmaBeta(1e20, 10000, 5.0);
      expect(beta).toBeGreaterThan(0.01);
      expect(beta).toBeLessThan(0.10);
    });

    it('calculates Troyon beta limit correctly', () => {
      // I = 15 MA, a = 2.0 m, B = 5.3 T
      // beta_T = 0.028 * (15 / (2 * 5.3)) = 0.028 * 1.415 = 0.0396
      const troyon = calculateTroyonLimit(15, 2.0, 5.3);
      expect(troyon).toBeCloseTo(0.0396, 3);
    });
  });
});
