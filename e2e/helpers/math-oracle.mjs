/**
 * Mathematical Oracle for Ultron AI Scientist Web Platform
 * Derived directly from ground-truth algorithms in /Users/samaraldico/ULTRON AI Scientist:
 * - Epistemic Regulator: Logit slope, Welch-Z clash detection, Bayesian updating
 * - Physics Kernel: Relativistic Bremsstrahlung radiation, Lyapunov spectrum
 * - Materials Kernel: Cubic Born mechanical stability, Voigt moduli
 */

export const CANONICAL_CONSTANTS = {
  EPSILON: 1e-5,
  WELCH_Z_THRESHOLD: 2.576, // p < 0.01
  STAGNATION_SLOPE_THRESHOLD: 0.01,
  C_BREM: 5.35e-37, // W cm^3 keV^(-1/2)
  CHAOS_LYAPUNOV_THRESHOLD: 0.01,
  GSTM_FUSION_DIMENSION: 422, // 128 + 128 + 64 + 32 + 64 + 1 + 5
};

/**
 * Closed-form Log-Odds (Logit) OLS Slope calculation
 * y = ln(p / (1 - p)) with epsilon clipping to avoid ±Infinity.
 */
export function calculateLogitSlope(confidences, cycles = null, epsilon = CANONICAL_CONSTANTS.EPSILON) {
  if (!confidences || confidences.length === 0) {
    throw new Error('Confidences array cannot be empty');
  }

  const n = confidences.length;
  if (n === 1) {
    const pClipped = Math.min(Math.max(confidences[0], epsilon), 1 - epsilon);
    const logit = Math.log(pClipped / (1 - pClipped));
    return {
      slope: 0.0,
      isStagnant: true,
      logitValues: [logit],
    };
  }

  const t = cycles && cycles.length === n ? cycles : Array.from({ length: n }, (_, i) => i);
  const t0 = t[0];

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
    sumX += x[i];
    sumY += logitValues[i];
    sumXY += x[i] * logitValues[i];
    sumX2 += x[i] * x[i];
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

/**
 * Welch-Z clash detection between two independent empirical estimates
 * Z = |theta_new - theta_old| / sqrt(SE_new^2 + SE_old^2)
 */
export function detectStatisticalClash(
  newEffect,
  newSe,
  oldEffect,
  oldSe,
  threshold = CANONICAL_CONSTANTS.WELCH_Z_THRESHOLD
) {
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
 * Standard Bayesian Belief Update with epistemic uncertainty damping
 * P(H|E) = (L * P0) / (L * P0 + (1 - L) * (1 - P0))
 */
export function bayesianBeliefUpdate(prior, likelihood, uncertainty = 0.0) {
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
 * Cubic Born Mechanical Stability Criteria:
 * c11 - c12 > 0 AND c11 + 2*c12 > 0 AND c44 > 0
 * Bulk modulus K = (c11 + 2*c12) / 3
 * Shear modulus G = c44
 */
export function verifyCubicBornStability(c11, c12, c44) {
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
 * Relativistic Bremsstrahlung radiation loss (Maxon 1972)
 * g_rel = 1.0 + 1.78 * (Te / 511.0)^1.34
 * P_brem = C_brem * Z_eff^2 * n_e^2 * sqrt(Te) * g_rel
 */
export function relativisticBremsstrahlung(Te_keV, np_cm3, nB_cm3) {
  const n_e = np_cm3 * 1 + nB_cm3 * 5;
  const Z_eff_sq = (np_cm3 * (1 * 1) + nB_cm3 * (5 * 5)) / n_e;
  const g_rel = 1.0 + 1.78 * Math.pow(Te_keV / 511.0, 1.34);
  const P_brem_W_cm3 = CANONICAL_CONSTANTS.C_BREM * Z_eff_sq * Math.pow(n_e, 2) * Math.sqrt(Te_keV) * g_rel;

  return {
    P_brem_W_cm3,
    g_rel,
    Z_eff_sq,
    n_e,
  };
}

/**
 * Kaplan-Yorke dimension from full Lyapunov spectrum
 * D_KY = j + (sum_{i=1}^j lambda_i) / |lambda_{j+1}|
 */
export function kaplanYorkeDimension(lyapunovExponents) {
  if (!lyapunovExponents || lyapunovExponents.length === 0) {
    throw new Error('Lyapunov exponents array cannot be empty');
  }

  const sorted = [...lyapunovExponents].sort((a, b) => b - a);
  const isChaotic = sorted[0] > CANONICAL_CONSTANTS.CHAOS_LYAPUNOV_THRESHOLD;

  let sum = 0;
  let j = -1;

  for (let i = 0; i < sorted.length; i++) {
    if (sum + sorted[i] >= 0) {
      sum += sorted[i];
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

  const nextMag = Math.abs(sorted[j + 1]);
  const D_KY = (j + 1) + (sum / nextMag);

  return { D_KY, isChaotic };
}
