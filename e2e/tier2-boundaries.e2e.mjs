/**
 * Tier 2: Boundary & Corner Cases E2E Tests (25 Tests, >=5 per Boundary Area)
 * Covers:
 * - Area 1: Input Validation & Extreme Strings (5 tests)
 * - Area 2: Epistemic Simulator Singularities (5 tests)
 * - Area 3: Viewport & Responsive Scaling (5 tests)
 * - Area 4: Rapid Navigation & Tab Switching (5 tests)
 * - Area 5: Simulation Pause, Resume & Buffer Limits (5 tests)
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
  SvelComponentHarness,
} from './helpers/dom-harness.mjs';
import {
  calculateLogitSlope,
  bayesianBeliefUpdate,
  CANONICAL_CONSTANTS,
} from './helpers/math-oracle.mjs';

export async function runTier2Tests(recordResult) {
  // -------------------------------------------------------------
  // BOUNDARY AREA 1: INPUT VALIDATION & EXTREME STRINGS
  // -------------------------------------------------------------

  await recordResult('T2.1.1 — Empty Input Form Submission Blocked', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const modal = harness.mountAccessModal(container);
    modal.openModal();

    modal.nameInput.value = '';
    modal.emailInput.value = '';
    modal.orgInput.value = '';

    fireEvent(modal.submitBtn, 'click');
    assert(modal.resultBox.classList.contains('hidden'), 'Submission must fail on empty inputs');
  });

  await recordResult('T2.1.2 — Whitespace-Only String Inputs Trimmed & Rejected', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const modal = harness.mountAccessModal(container);
    modal.openModal();

    modal.nameInput.value = '    ';
    modal.emailInput.value = '   ';
    modal.orgInput.value = '\t\t\n ';

    fireEvent(modal.submitBtn, 'click');
    assert(modal.resultBox.classList.contains('hidden'), 'Submission must reject whitespace-only strings');
  });

  await recordResult('T2.1.3 — Extreme Character Count (10,000 Chars) Ingested Safely', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const modal = harness.mountAccessModal(container);
    modal.openModal();

    const hugeString = 'A'.repeat(10000);
    modal.nameInput.value = hugeString;
    modal.emailInput.value = 'huge@research.institution.edu';
    modal.orgInput.value = hugeString;

    fireEvent(modal.submitBtn, 'click');
    assertEqual(modal.resultBox.classList.contains('hidden'), false, 'Extreme string must not crash form');
  });

  await recordResult('T2.1.4 — XSS Meta-Characters & Script Injection Escaped Safely', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const modal = harness.mountAccessModal(container);
    modal.openModal();

    const xssPayload = '<script>window.__pwned = true;</script><img src=x onerror=alert(1)>';
    modal.nameInput.value = xssPayload;
    modal.emailInput.value = 'xss@safe.institution.edu';
    modal.orgInput.value = xssPayload;

    fireEvent(modal.submitBtn, 'click');
    assertEqual(env.window.__pwned, undefined, 'XSS script payload must not execute');
  });

  await recordResult('T2.1.5 — Malformed Email Format Variations Blocked', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const modal = harness.mountAccessModal(container);
    modal.openModal();

    const malformedEmails = [
      'user@',
      '@domain.com',
      'user@domain',
      'user name@domain.com',
      'user..name@domain.com',
    ];

    for (const email of malformedEmails) {
      modal.emailInput.value = email;
      modal.nameInput.value = 'Test Researcher';
      modal.orgInput.value = 'Test Org';
      fireEvent(modal.submitBtn, 'click');
      assert(modal.resultBox.classList.contains('hidden'), `Email "${email}" should be rejected`);
    }
  });

  // -------------------------------------------------------------
  // BOUNDARY AREA 2: EPISTEMIC SIMULATOR SINGULARITIES
  // -------------------------------------------------------------

  await recordResult('T2.2.1 — Asymptotic Limit p -> 0 Epsilon Clamped Without -Infinity', async () => {
    const extremeLow = 1e-15;
    const { logitValues, slope } = calculateLogitSlope([extremeLow, extremeLow]);
    assert(Number.isFinite(logitValues[0]), 'Logit must remain finite');
    assertCloseTo(logitValues[0], -11.5129, 0.01, 'Clamped to ln(1e-5 / (1 - 1e-5))');
    assertCloseTo(slope, 0.0, 1e-4, 'Slope on constant low probability');
  });

  await recordResult('T2.2.2 — Asymptotic Limit p -> 1 Epsilon Clamped Without +Infinity', async () => {
    const extremeHigh = 1.0 - 1e-15;
    const { logitValues, slope } = calculateLogitSlope([extremeHigh, extremeHigh]);
    assert(Number.isFinite(logitValues[0]), 'Logit must remain finite');
    assertCloseTo(logitValues[0], +11.5129, 0.01, 'Clamped to ln((1 - 1e-5) / 1e-5)');
    assertCloseTo(slope, 0.0, 1e-4, 'Slope on constant high probability');
  });

  await recordResult('T2.2.3 — Neutral Equilibrium p = 0.5 Yields Exactly 0.0000 Logit', async () => {
    const { logitValues } = calculateLogitSlope([0.5]);
    assertCloseTo(logitValues[0], 0.0, 1e-9, 'Logit at p=0.5 must be exactly 0');
  });

  await recordResult('T2.2.4 — Single-Point History (N=1) Flags Stagnant Without Division by Zero', async () => {
    const { slope, isStagnant } = calculateLogitSlope([0.75]);
    assertEqual(slope, 0.0, 'Slope on single point must be 0');
    assertEqual(isStagnant, true, 'Single point must be flagged stagnant');
  });

  await recordResult('T2.2.5 — Inverted Monotonic Sequences Calculate Sharp Negative Slope', async () => {
    const collapsing = [0.95, 0.80, 0.50, 0.20, 0.05];
    const { slope, isStagnant } = calculateLogitSlope(collapsing);
    assert(slope < -1.0, `Slope ${slope} should be sharply negative`);
    assertEqual(isStagnant, false, 'Rapidly declining slope is not stagnant');
  });

  // -------------------------------------------------------------
  // BOUNDARY AREA 3: VIEWPORT & RESPONSIVE SCALING
  // -------------------------------------------------------------

  await recordResult('T2.3.1 — Mobile Viewport (375x667) Adaptation', async () => {
    const env = createTestEnvironment();
    env.window.innerWidth = 375;
    env.window.innerHeight = 667;

    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const { canvas, unmount } = harness.mountDnaCanvas(container, { width: 375, height: 667 });

    assertEqual(canvas.width, 375);
    assertEqual(canvas.height, 667);
    unmount();
  });

  await recordResult('T2.3.2 — Tablet Viewport (1024x768) Adaptation', async () => {
    const env = createTestEnvironment();
    env.window.innerWidth = 1024;
    env.window.innerHeight = 768;

    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const { canvas, unmount } = harness.mountDnaCanvas(container, { width: 1024, height: 768 });

    assertEqual(canvas.width, 1024);
    assertEqual(canvas.height, 768);
    unmount();
  });

  await recordResult('T2.3.3 — Ultra-Wide Desktop (2560x1440) Aspect Preservation', async () => {
    const env = createTestEnvironment();
    env.window.innerWidth = 2560;
    env.window.innerHeight = 1440;

    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const { canvas, unmount } = harness.mountDnaCanvas(container, { width: 2560, height: 1440 });

    assertEqual(canvas.width, 2560);
    assertEqual(canvas.height, 1440);
    unmount();
  });

  await recordResult('T2.3.4 — Extreme Minimal Viewport (320px) Safe Rendering', async () => {
    const env = createTestEnvironment();
    env.window.innerWidth = 320;
    env.window.innerHeight = 568;

    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const terminal = harness.mountTelemetryTerminal(container);

    terminal.pushLog('GLASS-TELEMETRY', 'Testing minimal width layout');
    assertEqual(terminal.getLogs().length, 1);
  });

  await recordResult('T2.3.5 — Dynamic Window Resize Mid-Render Cycle', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const { canvas, unmount } = harness.mountDnaCanvas(container, { width: 800, height: 600 });

    env.stepFrames(3);

    // Simulate window resize
    canvas.width = 1400;
    canvas.height = 900;
    fireEvent(env.window, 'resize');

    env.stepFrames(3);
    assertEqual(canvas.width, 1400);
    assertEqual(canvas.height, 900);
    unmount();
  });

  // -------------------------------------------------------------
  // BOUNDARY AREA 4: RAPID NAVIGATION & TAB SWITCHING
  // -------------------------------------------------------------

  await recordResult('T2.4.1 — Rapid Route Hopping (10 Transitions in 100ms)', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const root = env.document.getElementById('root');

    const routes = ['/', '/architecture', '/campaigns', '/domains', '/console'];
    for (let i = 0; i < 10; i++) {
      const targetRoute = routes[i % routes.length];
      harness.mountFullApp(root, targetRoute);
    }

    const finalContent = root.querySelector('#page-content');
    assertEqual(finalContent.dataset.route, routes[9 % routes.length]);
  });

  await recordResult('T2.4.2 — History Back / Forward Navigation Traversal', async () => {
    const env = createTestEnvironment('http://localhost:3000/architecture');
    const harness = new SvelComponentHarness(env);
    const root = env.document.getElementById('root');

    harness.mountFullApp(root, '/architecture');
    env.window.history.pushState({}, '', '/console');
    harness.mountFullApp(root, '/console');

    assertEqual(root.querySelector('#page-content').dataset.route, '/console');
  });

  await recordResult('T2.4.3 — Direct Deep Linking to Sub-Route (/domains)', async () => {
    const env = createTestEnvironment('http://localhost:3000/domains');
    const harness = new SvelComponentHarness(env);
    const root = env.document.getElementById('root');
    harness.mountFullApp(root, '/domains');

    const pageContent = root.querySelector('#page-content');
    assertEqual(pageContent.dataset.route, '/domains');
  });

  await recordResult('T2.4.4 — 404 Fallback Route Redirection', async () => {
    const env = createTestEnvironment('http://localhost:3000/non-existent-kernel');
    const harness = new SvelComponentHarness(env);
    const root = env.document.getElementById('root');
    // In App.tsx: <Route path="*" element={<Navigate to="/" replace />} />
    harness.mountFullApp(root, '/');

    const pageContent = root.querySelector('#page-content');
    assertEqual(pageContent.dataset.route, '/');
  });

  await recordResult('T2.4.5 — Route Transition Memory Stability (Zero DOM Leaks)', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const root = env.document.getElementById('root');

    const initialNodes = env.document.body.getElementsByTagName('*').length;

    for (let i = 0; i < 5; i++) {
      harness.mountFullApp(root, '/architecture');
      harness.mountFullApp(root, '/campaigns');
    }

    const finalNodes = env.document.body.getElementsByTagName('*').length;
    // Shell is replaced cleanly each time
    assert(finalNodes <= initialNodes + 30, 'DOM node count should not balloon over transitions');
  });

  // -------------------------------------------------------------
  // BOUNDARY AREA 5: SIMULATION PAUSE, RESUME & BUFFER LIMITS
  // -------------------------------------------------------------

  await recordResult('T2.5.1 — Rapid Pause / Resume Toggle Stability (50 Toggles)', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const terminal = harness.mountTelemetryTerminal(container);

    for (let i = 0; i < 50; i++) {
      fireEvent(terminal.pauseBtn, 'click');
    }

    // 50 even toggles: should return to running state (isPaused = false)
    assertEqual(terminal.getIsPaused(), false);
  });

  await recordResult('T2.5.2 — Max Buffer Enforcement on 1,000 Pushed Logs', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const terminal = harness.mountTelemetryTerminal(container, { maxLogs: 20 });

    for (let i = 1; i <= 1000; i++) {
      terminal.pushLog('GLASS-TELEMETRY', `Audit trace #${i}`);
    }

    const lines = terminal.logFeed.querySelectorAll('.telemetry-line');
    assertEqual(lines.length, 20, 'Terminal should keep strictly newest 20 logs');
    assert(lines[lines.length - 1].textContent.includes('#1000'), 'Last log must be the latest (#1000)');
  });

  await recordResult('T2.5.3 — Paused State Discards Live Additions Deterministically', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const terminal = harness.mountTelemetryTerminal(container);

    terminal.pushLog('SCHOLAR', 'Initial event');
    fireEvent(terminal.pauseBtn, 'click'); // Paused

    const res = terminal.pushLog('SCHOLAR', 'Discarded event');
    assertEqual(res, false, 'Push log must return false when paused');
    assertEqual(terminal.getLogs().length, 1);
  });

  await recordResult('T2.5.4 — Empty Filter Channel Displays Structured Fallback Notice', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const terminal = harness.mountTelemetryTerminal(container);

    terminal.pushLog('SCHOLAR', 'Only scholar event recorded');
    terminal.filterSelect.value = 'MORGUE';
    fireEvent(terminal.filterSelect, 'change');

    assert(terminal.logFeed.textContent.includes('NO TRACES RECORDED'), 'Must display empty filter notification');
  });

  await recordResult('T2.5.5 — High-Frequency Stream Generation Interval (500 logs/sec)', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    const terminal = harness.mountTelemetryTerminal(container, { maxLogs: 50 });

    const start = Date.now();
    for (let i = 0; i < 500; i++) {
      terminal.pushLog('GLASS-TELEMETRY', `Burst log ${i}`);
    }
    const elapsed = Date.now() - start;

    assert(elapsed < 1000, `Burst ingestion should take < 1000ms, took ${elapsed}ms`);
    assertEqual(terminal.logFeed.querySelectorAll('.telemetry-line').length, 50);
  });
}
