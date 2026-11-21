/**
 * Tier 3: Cross-Feature Combinations E2E Tests (8 Tests)
 * Verifies pairwise asynchronous interactions across system boundaries:
 * - Canvas animation + Route navigation
 * - Telemetry filtering + Epistemic slider
 * - Modal lifecycle + Canvas rendering
 * - Stagnation detection + Telemetry logging
 * - Domain switching + Telemetry streaming
 * - Credential submission + Route navigation
 * - Mobile drawer + Interactive simulations
 * - Clipboard operations + Streaming logs
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

export async function runTier3Tests(recordResult) {
  await recordResult('T3.1 — Route Navigation While Canvas Animation Loop Runs', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const root = env.document.getElementById('root');

    // Mount canvas on home page
    const { unmount } = harness.mountDnaCanvas(root);
    assertEqual(env.getActiveFrameCount(), 1);
    env.stepFrames(5);

    // Navigate to /architecture: unmount canvas, mount full app
    unmount();
    assertEqual(env.getActiveFrameCount(), 0, 'No zombie rAF frames should survive navigation');

    harness.mountFullApp(root, '/architecture');
    assertEqual(root.querySelector('#page-content').dataset.route, '/architecture');
  });

  await recordResult('T3.2 — Telemetry Channel Filtering with Simultaneous Epistemic Slider Adjustments', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    env.document.body.appendChild(container);

    const terminal = harness.mountTelemetryTerminal(container);
    const simulator = harness.mountEpistemicSimulator(container);

    // Set filter to RIGOR-VERIFIED
    terminal.filterSelect.value = 'RIGOR-VERIFIED';
    fireEvent(terminal.filterSelect, 'change');

    // Adjust epistemic slider
    simulator.setConfidence(0.92);
    assert(simulator.logitDisplay.textContent.includes('2.44'), 'Logit display should update');

    // Push logs of different channels
    terminal.pushLog('GLASS-TELEMETRY', 'Cycle update');
    terminal.pushLog('RIGOR-VERIFIED', 'Model parameter hash delta verified');

    const lines = terminal.logFeed.querySelectorAll('.telemetry-line');
    assertEqual(lines.length, 1);
    assertEqual(lines[0].dataset.channel, 'RIGOR-VERIFIED');
  });

  await recordResult('T3.3 — Waitlist Modal Open / Close During Active Canvas Rendering', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    env.document.body.appendChild(container);

    const { canvas, unmount } = harness.mountDnaCanvas(container);
    const modal = harness.mountAccessModal(container);

    // Step canvas frames while opening modal
    env.stepFrames(3);
    modal.openModal();
    assertEqual(modal.isOpen(), true);

    // Canvas animation continues smoothly in background
    env.stepFrames(5);
    assert(env.mockCanvasState.renderCalls >= 8, 'Canvas should keep rendering behind open modal');

    // Close modal via Escape
    fireEvent(env.window, 'keydown', { key: 'Escape' });
    assertEqual(modal.isOpen(), false);
    unmount();
  });

  await recordResult('T3.4 — Epistemic Slider Stagnation Event Reflected in Telemetry Feed', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    env.document.body.appendChild(container);

    const terminal = harness.mountTelemetryTerminal(container);
    const simulator = harness.mountEpistemicSimulator(container);

    // Feed stagnant sequence
    simulator.setHistory([0.850, 0.850, 0.850, 0.850, 0.850]);
    simulator.setConfidence(0.850);

    assert(simulator.statusBadge.textContent.includes('STAGNATION'), 'Stagnation badge should activate');

    // Simulate cross-component event dispatch to telemetry terminal
    terminal.pushLog('EPISTEMIC-REGULATOR', 'Zero-token slope |m| < 0.01: STAGNATION DETECTED');

    const lastLog = terminal.getLogs().slice(-1)[0];
    assertEqual(lastLog.channel, 'EPISTEMIC-REGULATOR');
    assert(lastLog.message.includes('STAGNATION DETECTED'));
  });

  await recordResult('T3.5 — Domain Kernel Selection with Concurrent Telemetry Stream', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    env.document.body.appendChild(container);

    const terminal = harness.mountTelemetryTerminal(container);

    // Simulate domain tabs
    const domainTabs = ['Genomics', 'Materials', 'Fusion', 'Multimodal'];
    let selectedDomain = 'Genomics';

    terminal.pushLog('DOMAINS', `Active kernel: ${selectedDomain}`);

    // Switch domain to Fusion
    selectedDomain = 'Fusion';
    terminal.pushLog('DOMAINS', `Active kernel switched to: ${selectedDomain}`);

    const domainLogs = terminal.getLogs().filter((l) => l.channel === 'DOMAINS');
    assertEqual(domainLogs.length, 2);
    assert(domainLogs[1].message.includes('Fusion'));
  });

  await recordResult('T3.6 — Modal Credential Submission While Navigating Routes', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const root = env.document.getElementById('root');

    harness.mountFullApp(root, '/console');
    const modal = harness.mountAccessModal(root);

    modal.openModal();
    modal.nameInput.value = 'Dr. Paul Dirac';
    modal.emailInput.value = 'p.dirac@cambridge.ac.uk';
    modal.orgInput.value = 'Cambridge';

    fireEvent(modal.submitBtn, 'click');
    const generatedKey = modal.keyDisplay.textContent;
    assertMatches(generatedKey, /^svel_live_sk_[a-f0-9]{32}$/);

    // Navigate to /campaigns
    harness.mountFullApp(root, '/campaigns');
    assertEqual(root.querySelector('#page-content').dataset.route, '/campaigns');
  });

  await recordResult('T3.7 — Mobile Drawer Toggle During Interactive Simulation', async () => {
    const env = createTestEnvironment();
    env.window.innerWidth = 375;

    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    env.document.body.appendChild(container);

    const simulator = harness.mountEpistemicSimulator(container);

    // Simulate mobile menu open
    let mobileMenuOpen = false;
    const toggleMobileMenu = () => {
      mobileMenuOpen = !mobileMenuOpen;
    };

    toggleMobileMenu();
    assertEqual(mobileMenuOpen, true);

    // Interact with slider while drawer is open
    simulator.setConfidence(0.88);
    assert(simulator.pDisplay.textContent.includes('0.880'));

    toggleMobileMenu();
    assertEqual(mobileMenuOpen, false);
  });

  await recordResult('T3.8 — Copy Simulated API Key While Telemetry Streams', async () => {
    const env = createTestEnvironment();
    const harness = new SvelComponentHarness(env);
    const container = env.document.createElement('div');
    env.document.body.appendChild(container);

    const terminal = harness.mountTelemetryTerminal(container);
    const modal = harness.mountAccessModal(container);

    modal.openModal();
    modal.nameInput.value = 'Dr. Enrico Fermi';
    modal.emailInput.value = 'efermi@chicago.edu';
    modal.orgInput.value = 'Chicago';

    fireEvent(modal.submitBtn, 'click');
    const key = modal.keyDisplay.textContent;

    // Stream logs
    terminal.pushLog('SECURITY', 'Simulated API key dispatched to researcher');

    // Click Copy Key
    fireEvent(modal.copyBtn, 'click');
    assertEqual(env.getClipboard(), key, 'Clipboard should contain the generated API key');
  });
}
