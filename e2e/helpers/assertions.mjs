/**
 * Assertion Utilities for Svel AI Scientist E2E Test Suite
 * Provides rigorous checks for DOM structures, WCAG accessibility contrast,
 * color tokens, numeric bounds, and deterministic invariants.
 */

export class AssertionError extends Error {
  constructor(message, expected, actual) {
    super(message);
    this.name = 'AssertionError';
    this.expected = expected;
    this.actual = actual;
  }
}

export function assert(condition, message = 'Assertion failed') {
  if (!condition) {
    throw new AssertionError(message, true, false);
  }
}

export function assertEqual(actual, expected, message = '') {
  if (actual !== expected) {
    const msg = message ? `${message}: expected ${expected}, got ${actual}` : `Expected ${expected}, got ${actual}`;
    throw new AssertionError(msg, expected, actual);
  }
}

export function assertDeepEqual(actual, expected, message = '') {
  const actualStr = JSON.stringify(actual);
  const expectedStr = JSON.stringify(expected);
  if (actualStr !== expectedStr) {
    const msg = message ? `${message}: expected ${expectedStr}, got ${actualStr}` : `Expected ${expectedStr}, got ${actualStr}`;
    throw new AssertionError(msg, expected, actual);
  }
}

export function assertCloseTo(actual, expected, tolerance = 1e-4, message = '') {
  const diff = Math.abs(actual - expected);
  if (diff > tolerance) {
    const msg = message
      ? `${message}: expected ~${expected} (±${tolerance}), got ${actual} (diff: ${diff})`
      : `Expected ~${expected} (±${tolerance}), got ${actual} (diff: ${diff})`;
    throw new AssertionError(msg, expected, actual);
  }
}

export function assertMatches(string, regex, message = '') {
  if (!regex.test(string)) {
    const msg = message ? `${message}: string "${string}" does not match pattern ${regex}` : `String "${string}" does not match pattern ${regex}`;
    throw new AssertionError(msg, regex.toString(), string);
  }
}

export function assertThrows(fn, message = 'Expected function to throw') {
  let threw = false;
  try {
    fn();
  } catch {
    threw = true;
  }
  if (!threw) {
    throw new AssertionError(message, 'throw', 'did not throw');
  }
}

/**
 * Parses Hex color (#RRGGBB or #RGB) to [r, g, b] in [0, 255]
 */
export function hexToRgb(hex) {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    return [
      parseInt(clean[0] + clean[0], 16),
      parseInt(clean[1] + clean[1], 16),
      parseInt(clean[2] + clean[2], 16),
    ];
  }
  if (clean.length === 6) {
    return [
      parseInt(clean.slice(0, 2), 16),
      parseInt(clean.slice(2, 4), 16),
      parseInt(clean.slice(4, 6), 16),
    ];
  }
  throw new Error(`Invalid hex color: ${hex}`);
}

/**
 * Calculates relative luminance according to WCAG 2.1
 */
export function getRelativeLuminance(rgb) {
  const [r, g, b] = rgb.map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Calculates WCAG contrast ratio between two hex colors: (L1 + 0.05) / (L2 + 0.05)
 */
export function calculateContrastRatio(colorA, colorB) {
  const lumA = getRelativeLuminance(hexToRgb(colorA));
  const lumB = getRelativeLuminance(hexToRgb(colorB));
  const lighter = Math.max(lumA, lumB);
  const darker = Math.min(lumA, lumB);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Asserts contrast ratio meets WCAG standard (e.g. 4.5 for AA normal text, 7.0 for AAA)
 */
export function assertContrastRatio(foregroundHex, backgroundHex, minRatio = 4.5, message = '') {
  const ratio = calculateContrastRatio(foregroundHex, backgroundHex);
  if (ratio < minRatio) {
    const msg = message
      ? `${message}: contrast ratio ${ratio.toFixed(2)}:1 between ${foregroundHex} and ${backgroundHex} is below required ${minRatio}:1`
      : `Contrast ratio ${ratio.toFixed(2)}:1 is below required ${minRatio}:1`;
    throw new AssertionError(msg, `>= ${minRatio}:1`, `${ratio.toFixed(2)}:1`);
  }
}
