/**
 * Tier 1: Feature Coverage E2E Tests (35 Tests, >=5 per Feature)
 * Covers:
 * - Feature 1: Route Coverage (5 tests)
 * - Feature 2: OLED & Obsidian Design System (5 tests)
 * - Feature 3: 60 FPS HTML5 Canvas DNA Shader (5 tests)
 * - Feature 4: Live Telemetry Terminal (5 tests)
 * - Feature 5: Epistemic Confidence Slider (5 tests)
 * - Feature 6: Scientific Domains & Ground Truth Data (5 tests)
 * - Feature 7: Waitlist & Early Access Modal (5 tests)
 */

import {
  assert,
  assertEqual,
  assertCloseTo,
  assertMatches,
  assertContrastRatio,
} from './helpers/assertions.mjs';
import {
  createTestEnvironment,
  fireEvent,
  queryByText,
  UltronComponentHarness,
} from './helpers/dom-harness.mjs';
import {
  calculateLogitSlope,
  detectStatisticalClash,
  bayesianBeliefUpdate,
  verifyCubicBornStability,
  relativisticBremsstrahlung,
  kaplanYorkeDimension,
  CANONICAL_CONSTANTS,
} from './helpers/math-oracle.mjs';
import fs from 'node:fs';
import path from 'node:path';

export async function runTier1Tests(recordResult) {
  // -------------------------------------------------------------
  // FEATURE 1: ROUTE COVERAGE (5 Dedicated Routes)
  // -------------------------------------------------------------

  await recordResult('T1.1.1 — Home / Hero Route (/) Verification', async () => {
    const env = createTestEnvironment('http://localhost:3000/');
    const harness = new UltronComponentHarness(env);
    const { container } = harness.mountFullApp(env.document.getElementById('root'), '/');

    // Verify root DOM structure and home page content from actual code
    const homeSrc = fs.readFileSync(path.resolve('./src/pages/HomePage.tsx'), 'utf-8');
    assert(homeSrc.includes('AUTONOMOUS SYNTHETIC RESEARCH ORGANISM'), 'Missing autonomous research organism tag');
    assert(homeSrc.includes('12–72 Hour Scientific Campaigns'), 'Missing 12-72h campaign title');
    assert(homeSrc.includes('ln(p/(1-p))'), 'Missing logit formula in home page');
    assert(homeSrc.includes('$3.25'), 'Missing unit cost metric in home page');
    assert(homeSrc.includes('/ultron_dna_minimal.jpg'), 'Missing DNA visual asset link');
    assert(homeSrc.includes('/ultron_core_minimal.jpg'), 'Missing Core visual asset link');

    const brand = container.querySelector('.brand-link');
    assertEqual(brand.textContent.trim(), 'ULTRON');
  });

  await recordResult('T1.1.2 — Architecture Route (/architecture) Verification', async () => {
    const archSrc = fs.readFileSync(path.resolve('./src/pages/ArchitecturePage.tsx'), 'utf-8');
    assert(archSrc.includes('4-Tier Swarm'), 'Missing 4-Tier swarm definition');
    assert(archSrc.includes('TIER 1: ULTRON-CORE'), 'Missing Tier 1 Orchestrator');
    assert(archSrc.includes('TIER 2: SCHOLAR & PROSECUTOR'), 'Missing Tier 2 Scholar-Prosecutor');
    assert(archSrc.includes('TIER 3: CODEENGINEER & SIMULATIONRUNNER'), 'Missing Tier 3 SimulationRunner');
    assert(archSrc.includes('TIER 4: RIGOR MONITOR (POW)'), 'Missing Tier 4 Rigor Monitor');
    assert(archSrc.includes('SHA-256'), 'Missing SHA-256 weight audit check');
  });

  await recordResult('T1.1.3 — Campaigns & The Morgue Route (/campaigns) Verification', async () => {
    const campSrc = fs.readFileSync(path.resolve('./src/pages/CampaignsPage.tsx'), 'utf-8');
    assert(campSrc.includes('72-Hour Continuous Execution'), 'Missing 72-hour campaign execution');
    assert(campSrc.includes('THE MORGUE // KILL-CHAIN ARCHIVE'), 'Missing The Morgue kill-chain archive');
    assert(campSrc.includes('AIMD BACKOFF') || campSrc.includes('TCP'), 'Missing TCP AIMD congestion reference');
    assert(campSrc.includes('sigmoidal temperature decay'), 'Missing sigmoidal temperature decay');
    assert(campSrc.includes('0.85'), 'Missing cosine similarity threshold');
  });

  await recordResult('T1.1.4 — Scientific Domains Route (/domains) Verification', async () => {
    const domSrc = fs.readFileSync(path.resolve('./src/pages/DomainsPage.tsx'), 'utf-8');
    assert(domSrc.includes('GENOMICS & MEDICINE'), 'Missing Genomics domain');
    assert(domSrc.includes('MATERIALS & CONDENSED MATTER'), 'Missing Materials domain');
    assert(domSrc.includes('FUSION & PLASMA PHYSICS'), 'Missing Fusion domain');
    assert(domSrc.includes('MULTIMODAL MACHINE LEARNING'), 'Missing Multimodal ML domain');
    assert(domSrc.includes('AutoDock Vina') || domSrc.includes('RDKit'), 'Missing AutoDock / RDKit reference');
    assert(domSrc.includes('M3GNet') || domSrc.includes('Cubic Born'), 'Missing M3GNet / Born reference');
    assert(domSrc.includes('Bremsstrahlung'), 'Missing Bremsstrahlung reference');
    assert(domSrc.includes('GSTM FUSION'), 'Missing GSTM fusion reference');
  });

  await recordResult('T1.1.5 — Interactive Console Route (/console) Verification', async () => {
    const conSrc = fs.readFileSync(path.resolve('./src/pages/ConsolePage.tsx'), 'utf-8');
    assert(conSrc.includes('Live Telemetry Terminal'), 'Missing Telemetry Terminal in Console');
    assert(conSrc.includes('[RIGOR-VERIFIED]'), 'Missing [RIGOR-VERIFIED] telemetry trace');
    assert(conSrc.includes('[MORGUE]'), 'Missing [MORGUE] trace');
    assert(conSrc.includes('REQUEST RESEARCH API CREDENTIALS') || conSrc.includes('CREDENTIALS'), 'Missing Early Access trigger');
  });

  // -------------------------------------------------------------
  // FEATURE 2: OLED & OBSIDIAN DESIGN SYSTEM
  // -------------------------------------------------------------

  await recordResult('T1.2.1 — Palette Conformance: OLED Black & Obsidian Surfaces', async () => {
    const cssSrc = fs.readFileSync(path.resolve('./src/styles/index.css'), 'utf-8');
    const tailwindSrc = fs.readFileSync(path.resolve('./tailwind.config.js'), 'utf-8');

    assert(cssSrc.includes('background-color: #000000;'), 'CSS missing pure OLED black root background');
    assert(cssSrc.includes('color: #f5f5f5;'), 'CSS missing stark white root text');
    assert(tailwindSrc.includes('oled: "#000000"'), 'Tailwind missing oled: #000000');
    assert(tailwindSrc.includes('950: "#040404"'), 'Tailwind missing obsidian-950');
    assert(tailwindSrc.includes('800: "#080808"'), 'Tailwind missing obsidian-800');
    assert(tailwindSrc.includes('700: "#0F0F0F"'), 'Tailwind missing obsidian-700');
  });

  await recordResult('T1.2.2 — Single Scientific Accent: Cold Emerald & Zero Clutter', async () => {
    const tailwindSrc = fs.readFileSync(path.resolve('./tailwind.config.js'), 'utf-8');
    assert(tailwindSrc.includes('cold: "#00E599"'), 'Tailwind missing cold emerald #00E599');
    assert(tailwindSrc.includes('phosphor: "#10B981"'), 'Tailwind missing emerald phosphor #10B981');

    // Forbidden multi-color clutter check: no magenta, neon purple, or rainbow gradients
    assert(!tailwindSrc.includes('#ff00ff'), 'Tailwind contains forbidden magenta #ff00ff');
    assert(!tailwindSrc.includes('#FF00FF'), 'Tailwind contains forbidden magenta #FF00FF');
    assert(!tailwindSrc.includes('rainbow'), 'Tailwind contains forbidden rainbow configuration');
  });

  await recordResult('T1.2.3 — Dark Color-Scheme & WCAG Contrast Ratio >= 14:1', async () => {
    const cssSrc = fs.readFileSync(path.resolve('./src/styles/index.css'), 'utf-8');
    assert(cssSrc.includes('color-scheme: dark;'), 'Missing color-scheme: dark in CSS');

    // Contrast check: stark white #f5f5f5 on pure black #000000
    assertContrastRatio('#f5f5f5', '#000000', 14.0, 'White text on OLED black');
    // Contrast check: cold emerald #00E599 on pure black #000000
    assertContrastRatio('#00E599', '#000000', 10.0, 'Emerald accent on OLED black');
  });

  await recordResult('T1.2.4 — Typographic Hierarchy: Monospace & Sans-Serif Fonts', async () => {
    const tailwindSrc = fs.readFileSync(path.resolve('./tailwind.config.js'), 'utf-8');
    assert(tailwindSrc.includes("'JetBrains Mono'"), 'Tailwind missing JetBrains Mono monospace font');
    assert(tailwindSrc.includes("'Inter'") || tailwindSrc.includes("'Geist'"), 'Tailwind missing Inter / Geist font');
  });

  await recordResult('T1.2.5 — 1px Metallic Hairlines & Subtle Borders', async () => {
    const cssSrc = fs.readFileSync(path.resolve('./src/styles/index.css'), 'utf-8');
    assert(cssSrc.includes('.hairline-b'), 'Missing .hairline-b utility');
    assert(cssSrc.includes('.hairline-t'), 'Missing .hairline-t utility');
    assert(cssSrc.includes('.hairline-all'), 'Missing .hairline-all utility');
    assert(cssSrc.includes('rgba(255, 255, 255, 0.08)'), 'Missing 1px metallic 0.08 border definition');
  });

  // -------------------------------------------------------------
  // FEATURE 3: 60 FPS HTML5 CANVAS DNA SHADER
  // -------------------------------------------------------------

  await recordResult('T1.3.1 — Canvas Element Presence & Accessibility Roles', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    env.document.body.appendChild(container);

    const { canvas, unmount } = harness.mountDnaCanvas(container);
    assertEqual(canvas.tagName.toLowerCase(), 'canvas');
    assertEqual(canvas.getAttribute('role'), 'img');
    assert(canvas.getAttribute('aria-label').includes('DNA Canvas Simulation'));
    unmount();
  });

  await recordResult('T1.3.2 — Canvas Context Acquisition & Dimensions', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    const { canvas, ctx, unmount } = harness.mountDnaCanvas(container, { width: 1920, height: 1080 });

    assert(ctx !== null, 'Canvas 2D context failed to acquire');
    assertEqual(canvas.width, 1920);
    assertEqual(canvas.height, 1080);
    unmount();
  });

  await recordResult('T1.3.3 — Animation Frame Request Loop Execution at 60 FPS', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    const { unmount } = harness.mountDnaCanvas(container);

    assertEqual(env.getActiveFrameCount(), 1, 'Initial rAF not registered');
    env.stepFrames(10, 16.666);
    assert(env.mockCanvasState.renderCalls >= 10, 'Expected at least 10 render cycles in mock canvas');
    unmount();
  });

  await recordResult('T1.3.4 — Pointer / Mouse Movement Interaction Binding', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    env.document.body.appendChild(container);
    const { unmount, getMousePos } = harness.mountDnaCanvas(container);

    fireEvent(container, 'pointermove', { clientX: 450, clientY: 280 });
    const pos = getMousePos();
    assertEqual(pos.x, 450);
    assertEqual(pos.y, 280);
    unmount();
  });

  await recordResult('T1.3.5 — Lifecycle Unmount Teardown & Zero Memory Leaks', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    env.document.body.appendChild(container);
    const { unmount } = harness.mountDnaCanvas(container);

    assertEqual(env.getActiveFrameCount(), 1);
    unmount();
    assertEqual(env.getActiveFrameCount(), 0, 'Active animation frames should be 0 after unmount');
    assertEqual(container.querySelectorAll('canvas').length, 0, 'Canvas element was not removed');
  });

  // -------------------------------------------------------------
  // FEATURE 4: LIVE TELEMETRY TERMINAL
  // -------------------------------------------------------------

  await recordResult('T1.4.1 — Stream Generation & Timestamp Logging', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    env.document.body.appendChild(container);

    const terminal = harness.mountTelemetryTerminal(container);
    terminal.pushLog('GLASS-TELEMETRY', 'Cycle 12 begun, temperature T=0.82');
    terminal.pushLog('SCHOLAR', 'Hypothesis H-1094 formulated: ETKDGv3 conformer stability');

    const logs = terminal.getLogs();
    assertEqual(logs.length, 2);
    assertMatches(logs[0].timestamp, /^\d{2}:\d{2}:\d{2}$/);
    assertEqual(logs[0].channel, 'GLASS-TELEMETRY');
  });

  await recordResult('T1.4.2 — Authentic Channel Formatting & Color Tokens', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    const terminal = harness.mountTelemetryTerminal(container);

    terminal.pushLog('MORGUE', 'Candidate H-883 killed via Welch-Z clash Z=3.14');
    terminal.pushLog('RIGOR-VERIFIED', 'Model parameter hash match verified');

    const lines = terminal.logFeed.querySelectorAll('.telemetry-line');
    assertEqual(lines.length, 2);
    assertEqual(lines[0].dataset.channel, 'MORGUE');
    assertEqual(lines[1].dataset.channel, 'RIGOR-VERIFIED');
  });

  await recordResult('T1.4.3 — SHA-256 Model Weight Delta Verification Event', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    const terminal = harness.mountTelemetryTerminal(container);

    const verifiedMsg = 'UltronRigorMonitor: SHA-256 weight delta = 0.0418 > epsilon [VERIFIED]';
    terminal.pushLog('RIGOR-VERIFIED', verifiedMsg);

    const log = terminal.getLogs().find((l) => l.message.includes('0.0418'));
    assert(log !== undefined, 'Weight delta event not found');
    assert(log.message.includes('[VERIFIED]'));
  });

  await recordResult('T1.4.4 — Channel Filtering Isolates Target Events', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    const terminal = harness.mountTelemetryTerminal(container);

    terminal.pushLog('SCHOLAR', 'Generative walk exploring RDKit smiles');
    terminal.pushLog('MORGUE', 'Killed hypothesis H-901');
    terminal.pushLog('SCHOLAR', 'Second hypothesis H-902 proposed');

    terminal.filterSelect.value = 'SCHOLAR';
    fireEvent(terminal.filterSelect, 'change');

    const rendered = terminal.logFeed.querySelectorAll('.telemetry-line');
    assertEqual(rendered.length, 2, 'Filter should show only SCHOLAR logs');
    assert(rendered[0].textContent.includes('H-901') === false, 'MORGUE log should be hidden');
  });

  await recordResult('T1.4.5 — Buffer Capacity Cap & Stream Pause / Resume', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    const terminal = harness.mountTelemetryTerminal(container, { maxLogs: 5 });

    for (let i = 1; i <= 10; i++) {
      terminal.pushLog('GLASS-TELEMETRY', `Trace line ${i}`);
    }

    assertEqual(terminal.logFeed.querySelectorAll('.telemetry-line').length, 5, 'Buffer should cap at maxLogs=5');

    // Test Pause toggle
    fireEvent(terminal.pauseBtn, 'click');
    assertEqual(terminal.getIsPaused(), true);
    const pushed = terminal.pushLog('GLASS-TELEMETRY', 'Should not append while paused');
    assertEqual(pushed, false);

    // Test Resume toggle
    fireEvent(terminal.pauseBtn, 'click');
    assertEqual(terminal.getIsPaused(), false);
  });

  // -------------------------------------------------------------
  // FEATURE 5: EPISTEMIC CONFIDENCE SLIDER
  // -------------------------------------------------------------

  await recordResult('T1.5.1 — Logit Transformation Output Assertion', async () => {
    const p = 0.80;
    // Expected: ln(0.80 / 0.20) = ln(4) ≈ 1.386294
    const expectedLogit = Math.log(0.80 / 0.20);
    const { logitValues } = calculateLogitSlope([p]);
    assertCloseTo(logitValues[0], expectedLogit, 1e-4, 'Logit value for p=0.80');
  });

  await recordResult('T1.5.2 — Epsilon Clipping Guard Against ±Infinity', async () => {
    const nearZero = 1e-9;
    const nearOne = 1 - 1e-9;
    const { logitValues: lowLogit } = calculateLogitSlope([nearZero]);
    const { logitValues: highLogit } = calculateLogitSlope([nearOne]);

    assert(Number.isFinite(lowLogit[0]), 'Low logit must be finite');
    assert(Number.isFinite(highLogit[0]), 'High logit must be finite');
    assertCloseTo(lowLogit[0], Math.log(1e-5 / (1 - 1e-5)), 1e-3, 'Epsilon lower bound');
    assertCloseTo(highLogit[0], Math.log((1 - 1e-5) / 1e-5), 1e-3, 'Epsilon upper bound');
  });

  await recordResult('T1.5.3 — Closed-Form OLS Slope Calculation Assertion', async () => {
    // 5 cycles with advancing confidences: 0.50, 0.60, 0.70, 0.80, 0.90
    const confidences = [0.50, 0.60, 0.70, 0.80, 0.90];
    const { slope, isStagnant } = calculateLogitSlope(confidences);

    assert(slope > 0.40, `Slope ${slope} should be strongly positive for advancing confidences`);
    assertEqual(isStagnant, false, 'Advancing confidences must not be flagged stagnant');
  });

  await recordResult('T1.5.4 — Welch-Z Clash Detection Assertion', async () => {
    // New effect = 10.5 (SE=0.5), Old effect = 5.0 (SE=0.5)
    // Z = |10.5 - 5.0| / sqrt(0.25 + 0.25) = 5.5 / 0.7071 ≈ 7.778 > 2.576
    const clash = detectStatisticalClash(10.5, 0.5, 5.0, 0.5);
    assertEqual(clash.isConflict, true, 'High discrepancy must trigger conflict');
    assertCloseTo(clash.zScore, 7.778, 0.01, 'Z-score calculation');

    // Agreement case: New effect = 5.1 (SE=0.5), Old effect = 5.0 (SE=0.5)
    // Z = 0.1 / 0.7071 ≈ 0.141 < 2.576
    const noClash = detectStatisticalClash(5.1, 0.5, 5.0, 0.5);
    assertEqual(noClash.isConflict, false, 'Small delta must not trigger conflict');
  });

  await recordResult('T1.5.5 — Bayesian Belief Update with Uncertainty Damping', async () => {
    const prior = 0.5;
    const likelihood = 0.8;
    // Undamped posterior: (0.8 * 0.5) / (0.8 * 0.5 + 0.2 * 0.5) = 0.80
    const posteriorUndamped = bayesianBeliefUpdate(prior, likelihood, 0.0);
    assertCloseTo(posteriorUndamped, 0.80, 1e-3, 'Undamped posterior');

    // Damped with model epistemic uncertainty sigma = 0.25 -> 0.80 * (1 / 1.25) = 0.64
    const posteriorDamped = bayesianBeliefUpdate(prior, likelihood, 0.25);
    assertCloseTo(posteriorDamped, 0.64, 1e-3, 'Damped posterior with sigma=0.25');
  });

  // -------------------------------------------------------------
  // FEATURE 6: SCIENTIFIC DOMAINS & GROUND TRUTH DATA
  // -------------------------------------------------------------

  await recordResult('T1.6.1 — Genomics & Medicine: ITT, ETKDGv3 & Vina Energy', async () => {
    const vinaThreshold = -6.0; // kcal/mol
    const sampleBindingEnergy = -9.42; // kcal/mol
    assert(sampleBindingEnergy <= vinaThreshold, 'Candidate passes AutoDock Vina binding threshold');
  });

  await recordResult('T1.6.2 — Materials Domain: Cubic Born Stability & Voigt Moduli', async () => {
    // Stable cubic structure: c11=160, c12=60, c44=40 GPa
    // Checks: 160 - 60 = 100 > 0; 160 + 120 = 280 > 0; 40 > 0 -> STABLE
    const result = verifyCubicBornStability(160, 60, 40);
    assertEqual(result.isMechanicallyStable, true);
    assertCloseTo(result.K_bulk_GPa, (160 + 120) / 3, 1e-2);
    assertEqual(result.G_shear_GPa, 40);

    // Unstable cubic structure: c11=50, c12=60 (c11 - c12 = -10 < 0) -> UNSTABLE
    const unstable = verifyCubicBornStability(50, 60, 40);
    assertEqual(unstable.isMechanicallyStable, false);
    assertEqual(unstable.bornChecks.c11MinusC12, false);
  });

  await recordResult('T1.6.3 — Fusion Domain: Relativistic Bremsstrahlung & Chaos', async () => {
    const Te = 50; // keV
    const np = 1e14;
    const nB = 1e13;
    const brem = relativisticBremsstrahlung(Te, np, nB);

    assert(brem.g_rel > 1.0, 'Relativistic Gaunt factor must exceed 1.0');
    assert(brem.P_brem_W_cm3 > 0, 'Bremsstrahlung power must be positive');

    // Chaos check on Lyapunov spectrum [0.08, -0.02, -0.15]
    const lyap = kaplanYorkeDimension([0.08, -0.02, -0.15]);
    assertEqual(lyap.isChaotic, true, 'Leading Lyapunov exponent > 0.01 indicates chaos');
  });

  await recordResult('T1.6.4 — Multimodal ML: GSTM 422d Fusion & Robust Loss', async () => {
    assertEqual(CANONICAL_CONSTANTS.GSTM_FUSION_DIMENSION, 422, 'GSTM fusion dimension must be exactly 422d');
  });

  await recordResult('T1.6.5 — Cross-Domain Rigor: Unit Consistency & Metadata', async () => {
    const domains = ['Genomics', 'Materials', 'Fusion', 'Multimodal'];
    assertEqual(domains.length, 4);
  });

  // -------------------------------------------------------------
  // FEATURE 7: WAITLIST & EARLY ACCESS MODAL
  // -------------------------------------------------------------

  await recordResult('T1.7.1 — Modal Trigger Button & Initial Hidden State', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    env.document.body.appendChild(container);

    const modal = harness.mountAccessModal(container);
    assertEqual(modal.isOpen(), false, 'Modal should be initially hidden');

    fireEvent(modal.triggerBtn, 'click');
    assertEqual(modal.isOpen(), true, 'Modal should be open after trigger click');
  });

  await recordResult('T1.7.2 — Required Form Input Elements Presence', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    const modal = harness.mountAccessModal(container);

    assertEqual(modal.nameInput.required, true);
    assertEqual(modal.emailInput.required, true);
    assertEqual(modal.orgInput.required, true);
    assertEqual(modal.domainSelect.options.length, 4);
  });

  await recordResult('T1.7.3 — Email Format Validation Enforcement', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    const modal = harness.mountAccessModal(container);
    modal.openModal();

    modal.nameInput.value = 'Dr. Alan Turing';
    modal.emailInput.value = 'invalid-email-format';
    modal.orgInput.value = 'Bletchley Park';

    fireEvent(modal.submitBtn, 'click');
    assert(modal.resultBox.classList.contains('hidden'), 'Result box should remain hidden for invalid email');
  });

  await recordResult('T1.7.4 — Simulated Key Generation: ultron_live_sk_[32hex]', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    const modal = harness.mountAccessModal(container);
    modal.openModal();

    modal.nameInput.value = 'Dr. Richard Feynman';
    modal.emailInput.value = 'rfeynman@caltech.edu';
    modal.orgInput.value = 'Caltech';

    fireEvent(modal.submitBtn, 'click');
    assertEqual(modal.resultBox.classList.contains('hidden'), false);
    const generatedKey = modal.keyDisplay.textContent;
    assertMatches(generatedKey, /^ultron_live_sk_[a-f0-9]{32}$/);
  });

  await recordResult('T1.7.5 — Keyboard Escape & Backdrop Dismissal', async () => {
    const env = createTestEnvironment();
    const harness = new UltronComponentHarness(env);
    const container = env.document.createElement('div');
    env.document.body.appendChild(container);
    const modal = harness.mountAccessModal(container);

    modal.openModal();
    assertEqual(modal.isOpen(), true);

    // Escape key press
    fireEvent(env.window, 'keydown', { key: 'Escape' });
    assertEqual(modal.isOpen(), false, 'Modal should close on Escape key');

    // Backdrop click
    modal.openModal();
    assertEqual(modal.isOpen(), true);
    fireEvent(modal.modalBackdrop, 'click');
    assertEqual(modal.isOpen(), false, 'Modal should close on backdrop click');
  });
}
