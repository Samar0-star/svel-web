/**
 * Epistemic Regulator Calculus
 * Implements bounded logit derivative slope and Welch-Z statistical clash detection.
 * Directly mirrors backend/epistemic/epistemic_regulator.py
 */

import { CANONICAL_CONSTANTS } from './constants';

export interface LogitSlopeResult {
  slope: number;
  isStagnant: boolean; // |slope| < 0.01
  logitValues: number[];
}

/**
 * Calculates closed-form Log-Odds (Logit) OLS slope over scientific cycles.
 * Transforms p in [0, 1] into y = ln(p / (1 - p)) with epsilon clipping to avoid ±Infinity.
 * Linearizes Bayesian evidence accumulation.
 */
export function calculateLogitSlope(
  confidences: number[],
  cycles?: number[],
  epsilon = CANONICAL_CONSTANTS.EPSILON
): LogitSlopeResult {
  if (!confidences || confidences.length === 0) {
    throw new Error('Confidences array cannot be empty');
  }

  const n = confidences.length;

  if (n === 1) {
    const rawP = confidences[0] ?? 0.5;
    const pClipped = Math.min(Math.max(rawP, epsilon), 1 - epsilon);
    const logit = Math.log(pClipped / (1 - pClipped));
    return {
      slope: 0.0,
      isStagnant: true,
      logitValues: [logit],
    };
  }

  const t = cycles && cycles.length === n ? cycles : Array.from({ length: n }, (_, i) => i);
  const t0 = t[0] ?? 0;

  const x = t.map((val) => val - t0);
  const logitValues = confidences.map((p) => {
    const pClipped = Math.min(Math.max(p, epsilon), 1 - epsilon);
    return Math.log(pClipped / (1 - pClipped));
  });

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumX2 = 0;

  for (let i = 0; i < n; i++) {
    const xi = x[i] ?? 0;
    const yi = logitValues[i] ?? 0;
    sumX += xi;
    sumY += yi;
    sumXY += xi * yi;
    sumX2 += xi * xi;
  }

  const denominator = n * sumX2 - sumX * sumX;
  if (Math.abs(denominator) < 1e-12) {
    return {
      slope: 0.0,
      isStagnant: true,
      logitValues,
    };
  }

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const isStagnant = Math.abs(slope) < CANONICAL_CONSTANTS.STAGNATION_SLOPE_THRESHOLD;

  return {
    slope,
    isStagnant,
    logitValues,
  };
}

export interface ClashResult {
  zScore: number;
  isConflict: boolean; // zScore > 2.576 (p < 0.01)
  standardErrorDelta: number;
}

/**
 * Welch-Z clash detection between two independent empirical estimates.
 * Z = |newEffect - oldEffect| / sqrt(newSe^2 + oldSe^2)
 */
export function detectStatisticalClash(
  newEffect: number,
  newSe: number,
  oldEffect: number,
  oldSe: number,
  threshold = CANONICAL_CONSTANTS.WELCH_Z_THRESHOLD
): ClashResult {
  if (newSe <= 0 || oldSe <= 0) {
    throw new Error('Standard errors must be strictly positive');
  }

  const varianceSum = newSe * newSe + oldSe * oldSe;
  const delta = Math.abs(newEffect - oldEffect);
  const zScore = delta / Math.sqrt(varianceSum);
  const isConflict = zScore > threshold;

  return {
    zScore,
    isConflict,
    standardErrorDelta: delta,
  };
}

/**
 * Standard Bayesian Belief Update with epistemic uncertainty damping.
 * P(H|E) = (L * P0) / (L * P0 + (1 - L) * (1 - P0)) * (1 / (1 + sigma))
 */
export function bayesianBeliefUpdate(
  prior: number,
  likelihood: number,
  uncertainty = 0.0
): number {
  const p0 = Math.min(Math.max(prior, 1e-9), 1 - 1e-9);
  const l = Math.min(Math.max(likelihood, 1e-9), 1 - 1e-9);

  const numerator = l * p0;
  const denominator = numerator + (1 - l) * (1 - p0) + 1e-10;
  let posterior = numerator / denominator;

  if (uncertainty > 0) {
    const damping = 1.0 / (1.0 + uncertainty);
    posterior = posterior * damping;
  }

  return Math.min(Math.max(posterior, 0.0), 1.0);
}

/**
 * Sigmoidal Temperature Annealing Decay curve over 72h campaign timeline.
 * T(tau) = 1 / (1 + exp(k * (tau - x0)))
 */
export function calculateSigmoidTemperature(progress: number, k = 10.0, x0 = 0.5): number {
  const p = Math.max(0, Math.min(1, progress));
  const exponent = Math.max(-700, Math.min(700, k * (p - x0)));
  const temp = 1.0 / (1.0 + Math.exp(exponent));
  return Math.max(0.01, Math.min(1.0, temp));
}
