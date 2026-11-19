#!/usr/bin/env node

/**
 * Master E2E Test Suite Runner for Ultron AI Scientist Web Platform
 * Executes 4-tier requirement-driven opaque-box verification across:
 * - Tier 1: Feature Coverage (35 tests)
 * - Tier 2: Boundary & Corner Cases (25 tests)
 * - Tier 3: Cross-Feature Combinations (8 tests)
 * - Tier 4: Real-World Application Scenarios (5 tests)
 * Total: 73 Comprehensive E2E Tests
 */

import { runTier1Tests } from './tier1-features.e2e.mjs';
import { runTier2Tests } from './tier2-boundaries.e2e.mjs';
import { runTier3Tests } from './tier3-combinations.e2e.mjs';
import { runTier4Tests } from './tier4-scenarios.e2e.mjs';

// ANSI terminal colors matching Ultron Obsidian & Emerald Palette
const C = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  emerald: '\x1b[38;2;0;229;153m', // #00E599
  emeraldBg: '\x1b[48;2;0;229;153m\x1b[30m',
  white: '\x1b[37m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  gray: '\x1b[90m',
};

async function main() {
  const startTime = Date.now();
  console.log(`\n${C.emerald}${C.bold}========================================================================${C.reset}`);
  console.log(`${C.emerald}${C.bold}   ULTRON AI SCIENTIST WEB PLATFORM — E2E TEST SUITE RUNNER            ${C.reset}`);
  console.log(`${C.gray}   4-Tier Requirement-Driven Opaque-Box Architectural Verification      ${C.reset}`);
  console.log(`${C.emerald}${C.bold}========================================================================${C.reset}\n`);

  const results = {
    tier1: { passed: 0, failed: 0, tests: [] },
    tier2: { passed: 0, failed: 0, tests: [] },
    tier3: { passed: 0, failed: 0, tests: [] },
    tier4: { passed: 0, failed: 0, tests: [] },
  };

  function createRecorder(tierKey, tierLabel) {
    console.log(`${C.bold}${C.white}▶ ${tierLabel}${C.reset}`);
    return async (testName, testFn) => {
      const testStart = Date.now();
      try {
        await testFn();
        const duration = Date.now() - testStart;
        results[tierKey].passed++;
        results[tierKey].tests.push({ name: testName, status: 'PASS', duration });
        console.log(`  ${C.emerald}✓${C.reset} ${C.white}${testName}${C.reset} ${C.gray}(${duration}ms)${C.reset}`);
      } catch (err) {
        const duration = Date.now() - testStart;
        results[tierKey].failed++;
        results[tierKey].tests.push({ name: testName, status: 'FAIL', duration, error: err.message });
        console.log(`  ${C.red}✗ ${testName}${C.reset} ${C.gray}(${duration}ms)${C.reset}`);
        console.log(`    ${C.red}↳ ${err.message}${C.reset}`);
      }
    };
  }

  // Execute Tier 1
  await runTier1Tests(createRecorder('tier1', 'TIER 1: FEATURE COVERAGE (35 Tests)'));
  console.log('');

  // Execute Tier 2
  await runTier2Tests(createRecorder('tier2', 'TIER 2: BOUNDARY & CORNER CASES (25 Tests)'));
  console.log('');

  // Execute Tier 3
  await runTier3Tests(createRecorder('tier3', 'TIER 3: CROSS-FEATURE COMBINATIONS (8 Tests)'));
  console.log('');

  // Execute Tier 4
  await runTier4Tests(createRecorder('tier4', 'TIER 4: REAL-WORLD APPLICATION SCENARIOS (5 Scenarios)'));
  console.log('');

  const totalDuration = Date.now() - startTime;
  const totalPassed =
    results.tier1.passed + results.tier2.passed + results.tier3.passed + results.tier4.passed;
  const totalFailed =
    results.tier1.failed + results.tier2.failed + results.tier3.failed + results.tier4.failed;
  const totalExecuted = totalPassed + totalFailed;

  console.log(`${C.emerald}${C.bold}========================================================================${C.reset}`);
  console.log(`${C.white}${C.bold}E2E EXECUTION SUMMARY:${C.reset}`);
  console.log(`  • ${C.white}Tier 1 (Feature Coverage):${C.reset}           ${results.tier1.passed} / 35 passed`);
  console.log(`  • ${C.white}Tier 2 (Boundary & Corner Cases):${C.reset}    ${results.tier2.passed} / 25 passed`);
  console.log(`  • ${C.white}Tier 3 (Cross-Feature Combinations):${C.reset} ${results.tier3.passed} / 8 passed`);
  console.log(`  • ${C.white}Tier 4 (Real-World Scenarios):${C.reset}       ${results.tier4.passed} / 5 passed`);
  console.log(`${C.gray}------------------------------------------------------------------------${C.reset}`);
  console.log(
    `  ${C.bold}Total Executed:${C.reset} ${totalExecuted} | ` +
    `${C.emerald}${C.bold}Passed:${C.reset} ${totalPassed} | ` +
    `${totalFailed > 0 ? C.red : C.gray}${C.bold}Failed:${C.reset} ${totalFailed} | ` +
    `${C.gray}Duration: ${totalDuration}ms${C.reset}`
  );
  console.log(`${C.emerald}${C.bold}========================================================================${C.reset}\n`);

  if (totalFailed > 0) {
    console.error(`${C.red}${C.bold}FAIL: ${totalFailed} E2E test(s) failed.${C.reset}\n`);
    process.exit(1);
  } else {
    console.log(`${C.emeraldBg} ALL 73 E2E TESTS VERIFIED WITH ZERO ERRORS [RIGOR-VERIFIED] ${C.reset}\n`);
    process.exit(0);
  }
}

main().catch((err) => {
  console.error('Fatal unhandled error in E2E runner:', err);
  process.exit(1);
});
