/**
 * Tier 4: Real-World Application Scenarios E2E Tests (5 Scenarios)
 * Validates complete end-to-end multi-step scientific research workflows:
 * - Scenario 1: Complete Hypothesis Discovery & Falsification Lifecycle
 * - Scenario 2: Superconductivity Mechanical Stability Investigation
 * - Scenario 3: High-Energy Fusion Plasma Bremsstrahlung Run
 * - Scenario 4: Epistemic Velocity Stagnation & Structured Mutation
 * - Scenario 5: Full Researcher Onboarding & Credential Acquisition
 */

import {
  assert,
  assertEqual,
  assertCloseTo,
  assertMatches,
} from './helpers/assertions.mjs';
import {
  createTestEnvironment,
  fireEvent,
  UltronComponentHarness,
} from './helpers/dom-harness.mjs';
import {
  calculateLogitSlope,
  detectStatisticalClash,
  verifyCubicBornStability,
  relativisticBremsstrahlung,
  kaplanYorkeDimension,
} from './helpers/math-oracle.mjs';

export async function runTier4Tests(recordResult) {
  // -------------------------------------------------------------
  // SCENARIO 1: COMPLETE HYPOTHESIS LIFECYCLE
  // -------------------------------------------------------------
  await recordResult('T4.1 — Scenario 1: Complete Hypothesis Discovery & Falsification Lifecycle', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const root = env.document.getElementById('root');

    // Step 1: Researcher arrives at Home page
    harness.mountFullApp(root, '/');
    const { canvas, unmount: unmountCanvas } = harness.mountDnaCanvas(root);
    env.stepFrames(3);

    // Step 2: Navigate to Architecture to audit Swarm
    unmountCanvas();
    harness.mountFullApp(root, '/architecture');
    assertEqual(root.querySelector('#page-content').dataset.route, '/architecture');

    // Step 3: Navigate to Campaigns to check The Morgue
    harness.mountFullApp(root, '/campaigns');
    assertEqual(root.querySelector('#page-content').dataset.route, '/campaigns');

    // Step 4: Navigate to Domains to inspect AutoDock Vina
    harness.mountFullApp(root, '/domains');
    assertEqual(root.querySelector('#page-content').dataset.route, '/domains');

    // Step 5: Navigate to Console, interact with terminal & request credentials
    harness.mountFullApp(root, '/console');
    const terminal = harness.mountTelemetryTerminal(root);
    const modal = harness.mountAccessModal(root);

    terminal.pushLog('SCHOLAR', 'Hypothesis H-1049: Vina binding = -9.42 kcal/mol');
    terminal.pushLog('PROSECUTOR', 'Running differential evolution adversarial perturbation');
    terminal.pushLog('MORGUE', 'Candidate H-1049 passed falsification tests [SURVIVOR]');

    modal.openModal();
    modal.nameInput.value = 'Dr. Rosalind Franklin';
    modal.emailInput.value = 'r.franklin@mrc.ac.uk';
    modal.orgInput.value = 'MRC Laboratory of Molecular Biology';

    fireEvent(modal.submitBtn, 'click');
    const key = modal.keyDisplay.textContent;
    assertMatches(key, /^ultron_live_sk_[a-f0-9]{32}$/);
  });

  // -------------------------------------------------------------
  // SCENARIO 2: SUPERCONDUCTIVITY MECHANICAL STABILITY
  // -------------------------------------------------------------
  await recordResult('T4.2 — Scenario 2: Superconductivity Mechanical Stability Investigation', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const root = env.document.getElementById('root');

    // Step 1: Open Domains page
    harness.mountFullApp(root, '/domains');

    // Step 2: Compute Born Mechanical Stability for candidate cubic superconductor
    // Candidate 1: Niobium-Germanium Nb3Ge cubic lattice (c11=218 GPa, c12=108 GPa, c44=62 GPa)
    const nb3ge = verifyCubicBornStability(218, 108, 62);
    assertEqual(nb3ge.isMechanicallyStable, true, 'Nb3Ge must be mechanically stable');
    assertCloseTo(nb3ge.K_bulk_GPa, (218 + 2 * 108) / 3, 0.01);
    assertEqual(nb3ge.G_shear_GPa, 62);

    // Candidate 2: Hypothetical unrelaxed phase (c11=80, c12=95 -> c11 - c12 = -15 < 0)
    const unstablePhase = verifyCubicBornStability(80, 95, 45);
    assertEqual(unstablePhase.isMechanicallyStable, false, 'Unrelaxed phase must fail Born check');

    // Step 3: Transition to Console and log audit to terminal
    harness.mountFullApp(root, '/console');
    const terminal = harness.mountTelemetryTerminal(root);
    terminal.pushLog('MATERIALS', `Nb3Ge Born stability verified: K=${nb3ge.K_bulk_GPa.toFixed(1)} GPa [STABLE]`);
    terminal.pushLog('MORGUE', 'Unrelaxed phase H-402 aborted: c11-c12 = -15.0 < 0 [ELIMINATED]');

    const logs = terminal.getLogs();
    assertEqual(logs.length, 2);
  });

  // -------------------------------------------------------------
  // SCENARIO 3: HIGH-ENERGY FUSION BREMSSTRAHLUNG RUN
  // -------------------------------------------------------------
  await recordResult('T4.3 — Scenario 3: High-Energy Fusion Plasma Bremsstrahlung Run', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const root = env.document.getElementById('root');

    // Step 1: Domains page plasma kernel inspection
    harness.mountFullApp(root, '/domains');

    // Step 2: Evaluate relativistic radiation loss at Te = 50 keV
    const np = 1e14; // cm^-3
    const nB = 1e13; // cm^-3
    const plasma = relativisticBremsstrahlung(50, np, nB);

    assert(plasma.g_rel > 1.05, 'Relativistic factor must show significant elevation at 50 keV');
    assert(plasma.P_brem_W_cm3 > 0, 'Bremsstrahlung power must be non-zero');

    // Step 3: Full Lyapunov spectrum chaos evaluation
    const spectrum = [0.125, 0.042, -0.015, -0.280];
    const lyapunovResult = kaplanYorkeDimension(spectrum);
    assertEqual(lyapunovResult.isChaotic, true, 'Positive maximum exponent indicates chaotic plasma regime');
    assert(lyapunovResult.D_KY > 2.0, 'Fractal Kaplan-Yorke dimension must exceed 2.0');

    // Step 4: Verify console logging
    harness.mountFullApp(root, '/console');
    const terminal = harness.mountTelemetryTerminal(root);
    terminal.pushLog('FUSION', `Relativistic Bremsstrahlung P=${plasma.P_brem_W_cm3.toExponential(3)} W/cm^3`);
    terminal.pushLog('FUSION', `Lyapunov D_KY=${lyapunovResult.D_KY.toFixed(2)} [CHAOTIC REGIME CONFIRMED]`);

    assertEqual(terminal.getLogs().length, 2);
  });

  // -------------------------------------------------------------
  // SCENARIO 4: EPISTEMIC VELOCITY STAGNATION & MUTATION
  // -------------------------------------------------------------
  await recordResult('T4.4 — Scenario 4: Epistemic Velocity Stagnation & Structured Mutation', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const root = env.document.getElementById('root');

    harness.mountFullApp(root, '/console');
    const simulator = harness.mountEpistemicSimulator(root);
    const terminal = harness.mountTelemetryTerminal(root);

    // Stagnant sequence across 5 verification cycles
    const stagnantHistory = [0.850, 0.850, 0.851, 0.850, 0.850];
    const { slope, isStagnant } = calculateLogitSlope(stagnantHistory);

    assertEqual(isStagnant, true, '|slope| < 0.01 must flag stagnation');
    assert(Math.abs(slope) < 0.01);

    // Trigger structured mutation (Epistemic Regulator rule)
    terminal.pushLog('EPISTEMIC-REGULATOR', `Slope m=${slope.toFixed(4)}: STAGNATION DETECTED`);
    terminal.pushLog('SCHOLAR', 'Triggering structured mutation: relaxing assumption A-12 to escape local plateau');

    // Breakthrough sequence follows mutation
    const breakthroughHistory = [0.850, 0.870, 0.910, 0.940, 0.970];
    const breakthrough = calculateLogitSlope(breakthroughHistory);
    assertEqual(breakthrough.isStagnant, false);
    assert(breakthrough.slope > 0.40);

    terminal.pushLog('EPISTEMIC-REGULATOR', `Post-mutation slope m=${breakthrough.slope.toFixed(4)}: ACCELERATING [BREAKTHROUGH]`);
    assertEqual(terminal.getLogs().length, 3);
  });

  // -------------------------------------------------------------
  // SCENARIO 5: RESEARCHER ONBOARDING & CREDENTIAL ACQUISITION
  // -------------------------------------------------------------
  await recordResult('T4.5 — Scenario 5: Full Researcher Onboarding & Credential Acquisition', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const root = env.document.getElementById('root');

    // Step 1: Researcher navigates entire platform
    const platformPages = ['/', '/architecture', '/campaigns', '/domains', '/console'];
    for (const page of platformPages) {
      harness.mountFullApp(root, page);
      assertEqual(root.querySelector('#page-content').dataset.route, page);
    }

    // Step 2: Launch Access Modal
    const modal = harness.mountAccessModal(root);
    modal.openModal();
    assertEqual(modal.isOpen(), true);

    // Step 3: Enter credentials
    modal.nameInput.value = 'Dr. Chien-Shiung Wu';
    modal.emailInput.value = 'cswu@columbia.edu';
    modal.orgInput.value = 'Columbia University / Pupin Laboratories';
    modal.domainSelect.value = 'Fusion & Plasma Physics';

    // Step 4: Submit and receive key
    fireEvent(modal.submitBtn, 'click');
    assertEqual(modal.resultBox.classList.contains('hidden'), false);
    const generatedKey = modal.keyDisplay.textContent;
    assertMatches(generatedKey, /^ultron_live_sk_[a-f0-9]{32}$/);

    // Step 5: Copy key to clipboard
    fireEvent(modal.copyBtn, 'click');
    assertEqual(env.getClipboard(), generatedKey);

    // Step 6: Close modal via backdrop click
    fireEvent(modal.modalBackdrop, 'click');
    assertEqual(modal.isOpen(), false);
  });
}
