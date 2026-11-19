import { describe, it, expect } from 'vitest';
import {
  verifyCubicBornStability,
  calculatePughRatio,
} from '../lib/materials';

describe('Materials & Condensed Matter Kernel Calculations', () => {
  describe('verifyCubicBornStability', () => {
    it('verifies mechanical stability for Case 5 ground truth', () => {
      // Input: c11 = 150.0 GPa, c12 = 50.0 GPa, c44 = 75.0 GPa
      const result = verifyCubicBornStability(150.0, 50.0, 75.0);

      // K = (150 + 2*50) / 3 = 250 / 3 = 83.333...
      expect(result.K_bulk_GPa).toBeCloseTo(83.333, 2);
      expect(result.G_shear_GPa).toBe(75.0);

      // Born checks:
      expect(result.bornChecks.c11MinusC12).toBe(true);
      expect(result.bornChecks.c11Plus2C12).toBe(true);
      expect(result.bornChecks.c44).toBe(true);
      expect(result.isMechanicallyStable).toBe(true);
    });

    it('flags unstable crystal when c11 - c12 <= 0', () => {
      const result = verifyCubicBornStability(80.0, 100.0, 60.0);
      expect(result.bornChecks.c11MinusC12).toBe(false);
      expect(result.isMechanicallyStable).toBe(false);
    });

    it('flags unstable crystal when c44 <= 0', () => {
      const result = verifyCubicBornStability(200.0, 50.0, -10.0);
      expect(result.bornChecks.c44).toBe(false);
      expect(result.isMechanicallyStable).toBe(false);
    });
  });

  describe('calculatePughRatio', () => {
    it('identifies ductile material when K/G > 1.75', () => {
      // K = 160 GPa, G = 80 GPa -> ratio = 2.0 > 1.75
      const pugh = calculatePughRatio(160.0, 80.0);
      expect(pugh.ratio).toBe(2.0);
      expect(pugh.isDuctile).toBe(true);
    });

    it('identifies brittle material when K/G <= 1.75', () => {
      // K = 120 GPa, G = 100 GPa -> ratio = 1.2 <= 1.75
      const pugh = calculatePughRatio(120.0, 100.0);
      expect(pugh.ratio).toBe(1.2);
      expect(pugh.isDuctile).toBe(false);
    });
  });
});
