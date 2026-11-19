import { describe, it, expect } from 'vitest';
import {
  calculateLogitSlope,
  detectStatisticalClash,
  bayesianBeliefUpdate,
  calculateSigmoidTemperature,
} from '../lib/epistemic';

describe('Epistemic Regulator Calculations', () => {
  describe('calculateLogitSlope', () => {
    it('calculates near-zero slope and flags stagnant state for Case 1 ground truth', () => {
      // Input cycles: [1, 2, 3, 4, 5]
      // Input confidences: [0.60, 0.601, 0.599, 0.602, 0.600]
      const cycles = [1, 2, 3, 4, 5];
      const confidences = [0.60, 0.601, 0.599, 0.602, 0.600];

      const result = calculateLogitSlope(confidences, cycles);

      expect(result.slope).toBeCloseTo(0.00042, 4);
      expect(result.isStagnant).toBe(true);
      expect(result.logitValues.length).toBe(5);
      expect(result.logitValues[0]).toBeCloseTo(Math.log(0.6 / 0.4), 4);
    });

    it('detects strong breakthrough slope (|m| > 0.01) and flags not stagnant', () => {
      const confidences = [0.50, 0.65, 0.80, 0.90, 0.98];
      const result = calculateLogitSlope(confidences);

      expect(result.slope).toBeGreaterThan(0.5);
      expect(result.isStagnant).toBe(false);
    });

    it('handles single-point history safely without division by zero', () => {
      const result = calculateLogitSlope([0.75]);
      expect(result.slope).toBe(0.0);
      expect(result.isStagnant).toBe(true);
      expect(result.logitValues.length).toBe(1);
    });

    it('clamps extreme probabilities to epsilon guard to avoid infinity', () => {
      const resultLow = calculateLogitSlope([1e-15, 1e-15]);
      expect(Number.isFinite(resultLow.logitValues[0])).toBe(true);
      expect(resultLow.logitValues[0]).toBeCloseTo(Math.log(1e-5 / (1 - 1e-5)), 3);

      const resultHigh = calculateLogitSlope([0.99999999, 0.99999999]);
      expect(Number.isFinite(resultHigh.logitValues[0])).toBe(true);
      expect(resultHigh.logitValues[0]).toBeCloseTo(Math.log((1 - 1e-5) / 1e-5), 3);
    });

    it('throws error for empty confidences array', () => {
      expect(() => calculateLogitSlope([])).toThrow('Confidences array cannot be empty');
    });
  });

  describe('detectStatisticalClash (Welch-Z)', () => {
    it('detects empirical conflict for Case 2 ground truth (Z > 2.576)', () => {
      const newEffect = 0.85;
      const newSe = 0.08;
      const oldEffect = 0.45;
      const oldSe = 0.09;

      const result = detectStatisticalClash(newEffect, newSe, oldEffect, oldSe);

      // |0.85 - 0.45| = 0.40
      // sqrt(0.08^2 + 0.09^2) = sqrt(0.0145) = 0.120416
      // Z = 0.40 / 0.120416 = 3.3218
      expect(result.zScore).toBeCloseTo(3.3218, 3);
      expect(result.isConflict).toBe(true);
      expect(result.standardErrorDelta).toBeCloseTo(0.40, 4);
    });

    it('detects empirical consensus when estimates are statistically compatible (Z <= 2.576)', () => {
      const result = detectStatisticalClash(0.60, 0.08, 0.58, 0.07);
      expect(result.zScore).toBeLessThan(1.0);
      expect(result.isConflict).toBe(false);
    });

    it('throws error when standard errors are non-positive', () => {
      expect(() => detectStatisticalClash(0.5, 0, 0.5, 0.1)).toThrow(
        'Standard errors must be strictly positive'
      );
      expect(() => detectStatisticalClash(0.5, 0.1, 0.5, -0.05)).toThrow(
        'Standard errors must be strictly positive'
      );
    });
  });

  describe('bayesianBeliefUpdate', () => {
    it('computes calibrated posterior with uncertainty damping for Case 3 ground truth', () => {
      // Prior = 0.50, Likelihood = 0.80, Uncertainty = 0.25
      // Posterior = (0.8 * 0.5) / (0.8 * 0.5 + 0.2 * 0.5) = 0.8000
      // Damping = 1 / (1 + 0.25) = 0.80
      // Calibrated = 0.80 * 0.80 = 0.6400
      const calibrated = bayesianBeliefUpdate(0.50, 0.80, 0.25);
      expect(calibrated).toBeCloseTo(0.6400, 3);
    });

    it('computes standard posterior without damping when uncertainty is 0', () => {
      const posterior = bayesianBeliefUpdate(0.50, 0.80, 0.0);
      expect(posterior).toBeCloseTo(0.8000, 3);
    });
  });

  describe('calculateSigmoidTemperature', () => {
    it('produces high temperature near progress 0.0', () => {
      const temp0 = calculateSigmoidTemperature(0.0);
      expect(temp0).toBeGreaterThan(0.99);
    });

    it('produces exactly 0.50 at progress 0.50 (midpoint transition)', () => {
      const tempMid = calculateSigmoidTemperature(0.50);
      expect(tempMid).toBeCloseTo(0.50, 3);
    });

    it('produces cold temperature (<= 0.01) at progress 1.0 (campaign conclusion)', () => {
      const tempEnd = calculateSigmoidTemperature(1.0);
      expect(tempEnd).toBeLessThanOrEqual(0.01);
    });
  });
});
