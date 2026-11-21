# TEST_INFRA.md — Svel AI Scientist Web Platform E2E Test Infrastructure

> **Architecture Track**: Requirement-Driven Opaque-Box E2E Test Suite  
> **Target System**: Svel AI Scientist Web Platform  
> **Working Directory**: `/Users/samaraldico/svel-ai-scientist-web`  
> **Specification Reference**: `ORIGINAL_REQUEST.md`, `PROJECT.md`, Reference Codebase `/Users/samaraldico/SVEL AI Scientist`  
> **Test Harness Runner**: `node e2e/runner.mjs` or `npm run test:e2e`  

---

## 1. Overview & Test Architecture

The Svel AI Scientist E2E test suite validates the deeptech web platform through an **opaque-box, requirement-driven methodology**. The suite treats the system as a scientific software artifact and verifies observable behavior against authoritative contracts:

1. **Deterministic Mathematical Oracles**: Mathematical properties derived from the reference codebase (`/Users/samaraldico/SVEL AI Scientist`), including log-odds slope calculations, Welch-Z clash thresholds, Born mechanical stability, relativistic Bremsstrahlung radiation, and GSTM multimodal tensor dimensions.
2. **DOM & Route State Integrity**: Verification of client-side routing across all 5 core routes (`/`, `/architecture`, `/campaigns`, `/domains`, `/console`), navigation headers, footers, and responsive views.
3. **Visual & Design System Compliance**: Pure OLED monochrome palette (`#000000`), deep obsidian surfaces (`#080808` / `#0F0F0F` / `#141414`), 1px metallic borders, cold phosphorescent emerald accents (`#00E599` / `#10B981`), `color-scheme: dark`, and strict elimination of multi-color/rainbow clutter.
4. **Canvas Shader & Interactive Animation**: Lifecycle, WebGL/2D rendering presence, 60 FPS animation loop handlers, resize reactions, mouse proximity listeners, and clean unmounting.
5. **Real-Time Telemetry & Terminal**: Live streaming trace generator, log channel tagging (`[RIGOR-VERIFIED]`, `[GLASS-TELEMETRY]`, `[MORGUE]`), SHA-256 weight hash divergence assertions, pause/resume state machines, and channel filters.
6. **Access & Waitlist Modal**: Interactive modal lifecycle, keyboard accessibility (Escape), email validation, organization inputs, and cryptographic/hex token generation (`svel_live_sk_...`).

---

## 2. The 4-Tier Test Matrix

The test suite is structured into 4 hierarchical testing tiers:

```
┌─────────────────────────────────────────────────────────────┐
│ Tier 4: Real-World Application Scenarios (5 Scenarios)      │
│ Complete end-to-end multi-step scientific workflows         │
├─────────────────────────────────────────────────────────────┤
│ Tier 3: Cross-Feature Combinations (8 Pairwise Tests)       │
│ Asynchronous concurrent interactions across system boundaries│
├─────────────────────────────────────────────────────────────┤
│ Tier 2: Boundary & Corner Cases (25 Tests, >=5 per feature) │
│ Singularities, epsilon boundaries, viewport stresses, race  │
├─────────────────────────────────────────────────────────────┤
│ Tier 1: Feature Coverage (35 Tests, >=5 per feature)        │
│ Happy paths, structural DOM contracts, visual tokens        │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Tier 1: Feature Coverage (>=5 Tests per Feature, Total: 35 Tests)

### Feature 1: Route Coverage (5 Dedicated Pages)
- **T1.1.1 — Home / Hero Route (`/`)**: Asserts route resolution, hero headline containing Svel Autonomous Scientific Research Organism, canonical visual assets, and telemetry statistics ($3.25/run unit cost, 12-72h campaigns).
- **T1.1.2 — Architecture Route (`/architecture`)**: Asserts 4-Tier Swarm hierarchy representation (`Svel-Core`, `Scholar-Prosecutor Dual Stream`, `CodeEngineer & SimulationRunner`, `MarketScout`), Falsification Engine breakdown, and SHA-256 weight audit description.
- **T1.1.3 — Campaigns & The Morgue Route (`/campaigns`)**: Asserts 72-hour campaign timeline visualization, TCP congestion backoff (AIMD), AST syntax audit pipeline, and "The Morgue" rejected hypothesis tombstone ledger.
- **T1.1.4 — Scientific Domains Route (`/domains`)**: Asserts 4 core domain kernels: Genomics (ITT, AutoDock Vina, ETKDGv3), Materials (pymatgen, M3GNet, $C_{ij}$ tensors), Fusion (Bremsstrahlung, Gamow peak, Lyapunov), and Multimodal ML (6-modality GSTM 422d, Adaptive Robust Loss).
- **T1.1.5 — Interactive Console Route (`/console`)**: Asserts interactive workspace containing the live Telemetry Terminal, Epistemic Confidence Simulator, and Early Access modal trigger button.

### Feature 2: OLED & Obsidian Design System
- **T1.2.1 — Palette Conformance**: Verifies root background is OLED black (`#000000`), card surfaces use obsidian tokens (`#080808` / `#0F0F0F` / `#141414`), and text is stark white (`#f5f5f5`).
- **T1.2.2 — Single Scientific Accent**: Verifies that primary accents use cold phosphorescent emerald (`#00E599` / `#10B981`) and forbids rainbow gradients, purple glows, or multi-color clutter.
- **T1.2.3 — Dark Color-Scheme & Meta Headers**: Verifies CSS `:root` defines `color-scheme: dark` and viewport meta tags enforce high-contrast rendering.
- **T1.2.4 — Typography Hierarchy**: Verifies monospace font configuration (`JetBrains Mono`) for code/telemetry/math and clean sans-serif (`Inter` / `Geist`) for prose.
- **T1.2.5 — 1px Metallic Hairlines**: Verifies subtle borders (`border-white/10` or `rgba(255, 255, 255, 0.08)`) with zero clumsy drop shadows or gaudy card borders.

### Feature 3: 60 FPS HTML5 Canvas DNA Shader
- **T1.3.1 — Canvas Element Presence**: Verifies existence of the `<canvas>` DOM element with proper ARIA role/label or background canvas decoration attributes.
- **T1.3.2 — Context Initialization**: Verifies canvas acquires `2d` or `webgl` rendering context without throwing context loss errors.
- **T1.3.3 — Animation Frame Request Loop**: Verifies continuous `requestAnimationFrame` registration during component lifecycle.
- **T1.3.4 — Interactive Event Binding**: Verifies `mousemove`, `pointermove`, and scroll event listeners are bound to canvas parent containers.
- **T1.3.5 — Lifecycle Unmount Cleanup**: Verifies cancellation of pending animation frame requests upon component unmounting to prevent memory leaks.

### Feature 4: Live Telemetry Terminal
- **T1.4.1 — Stream Generation**: Verifies terminal produces streaming trace lines with valid timestamps and structured channel tags.
- **T1.4.2 — Channel Formatting**: Verifies authentic channel markers (`[RIGOR-VERIFIED]`, `[GLASS-TELEMETRY]`, `[MORGUE]`, `[SCHOLAR]`, `[PROSECUTOR]`).
- **T1.4.3 — SHA-256 Model Weight Delta Verification**: Verifies presence of cryptographic model audit events (e.g. `SvelRigorMonitor: SHA-256 weight delta = 0.0418 > epsilon [VERIFIED]`).
- **T1.4.4 — Channel Filtering**: Verifies filtering logs by channel tag isolates matching logs and hides non-matching logs.
- **T1.4.5 — Buffer Capacity & Pause/Resume**: Verifies buffer cap prevents runaway DOM expansion and pause button halts incoming log display.

### Feature 5: Epistemic Confidence Slider
- **T1.5.1 — Logit Transformation Output**: Verifies mathematical evaluation of $y = \ln(p / (1 - p))$ across slider input $p \in (0, 1)$.
- **T1.5.2 — Epsilon Clipping Guard**: Verifies clipping at $p < 10^{-5}$ and $p > 1 - 10^{-5}$ prevents $\pm \infty$ singularities.
- **T1.5.3 — OLS Slope Calculation**: Verifies closed-form slope computation over rolling cycles matching ground-truth regression formulas.
- **T1.5.4 — Welch-Z Clash Detection**: Verifies statistical conflict detection ($Z > 2.576 \implies p < 0.01$) when effect size variance exceeds threshold.
- **T1.5.5 — Bayesian Belief Update**: Verifies posterior probability updates $P(H|E) = \frac{L \cdot P_0}{L \cdot P_0 + (1-L)(1-P_0)}$ given prior and likelihood.

### Feature 6: Scientific Domains & Ground Truth Data
- **T1.6.1 — Genomics & Medicine**: Verifies presence of Intention-to-Treat (ITT) protocol, RDKit ETKDGv3 3D conformers, and AutoDock Vina binding energy threshold ($\le -6.0$ kcal/mol).
- **T1.6.2 — Materials & Condensed Matter**: Verifies pymatgen spacegroup symmetry, M3GNet neural potentials, and Cubic Born stability criteria ($C_{11}-C_{12} > 0 \land C_{11}+2C_{12} > 0 \land C_{44} > 0$).
- **T1.6.3 — Fusion & Plasma Physics**: Verifies relativistic Bremsstrahlung radiation ($g_{\text{rel}} = 1.0 + 1.78(T_e/511.0)^{1.34}$), Gamow peak cross section, and Lyapunov exponent chaos check ($\lambda_1 > 0.01$).
- **T1.6.4 — Multimodal Machine Learning**: Verifies GSTM 6-modality concatenated dimension ($422\text{d}$) and Adaptive Robust Loss (quantile truncation keeping bottom 90% batch losses).
- **T1.6.5 — Cross-Domain Integrity**: Verifies all 4 domains have valid parameter definitions, units, and citation sources.

### Feature 7: Waitlist & Early Access Modal
- **T1.7.1 — Modal Trigger & Visibility**: Verifies clicking "Request Access" or "Early Access" reveals modal with `dialog` or `modal` role.
- **T1.7.2 — Required Form Fields**: Verifies presence of Researcher Name, Academic/Institutional Email, Organization, and Research Domain.
- **T1.7.3 — Email Validation**: Verifies email input enforces standard email formatting and flags malformed strings.
- **T1.7.4 — Simulated Key Generation**: Verifies valid submission yields simulated API key with format `svel_live_sk_[a-f0-9]{32}`.
- **T1.7.5 — Keyboard & Backdrop Dismissal**: Verifies pressing `Escape` key or clicking outside modal backdrop closes the modal.

---

## 4. Tier 2: Boundary & Corner Cases (>=5 Tests per Feature, Total: 25 Tests)

### Boundary Area 1: Input Validation & Extreme Strings (Modal & Search)
- **T2.1.1 — Empty Input Submission**: Submitting completely empty form prevents submission and flags required field attributes.
- **T2.1.2 — Whitespace-Only Inputs**: Submitting strings composed entirely of spaces or tabs is trimmed and rejected.
- **T2.1.3 — Extreme Character Count (10,000 chars)**: Submitting ultra-long text in inputs does not crash renderer or cause buffer overflow.
- **T2.1.4 — XSS Meta-Characters & Escaping**: Inputs containing `<script>alert(1)</script>` or `"><img src=x onerror=...>` are rendered safely as text without DOM execution.
- **T2.1.5 — Malformed Email Formats**: Emails like `user@`, `@domain.com`, `user@.com`, or `spaces in@email.com` fail validation.

### Boundary Area 2: Epistemic Simulator Singularities
- **T2.2.1 — Asymptotic Limit $p \to 0$**: Setting confidence to $0.0000001$ clips safely to $10^{-5}$ ($y \approx -11.5129$) without `NaN` or `-Infinity`.
- **T2.2.2 — Asymptotic Limit $p \to 1$**: Setting confidence to $0.9999999$ clips safely to $1 - 10^{-5}$ ($y \approx +11.5129$) without `NaN` or `+Infinity`.
- **T2.2.3 — Neutral Equilibrium $p = 0.5$**: Confidence of exactly $0.5$ yields logit value precisely $0.0000$.
- **T2.2.4 — Single-Point History ($N=1$)**: Feeding single-point historical data yields slope $0.0$ and flags stagnant state without division by zero.
- **T2.2.5 — Inverted Monotonic Sequences**: Sudden drop from $0.99$ to $0.01$ calculates sharp negative slope without arithmetic underflow.

### Boundary Area 3: Viewport & Responsive Scaling
- **T2.3.1 — Mobile Portrait (375x667)**: Navigation collapses into accessible hamburger drawer, text remains readable without horizontal overflow.
- **T2.3.2 — Tablet Landscape (1024x768)**: Grid layouts adjust gracefully from 1-column to 2/3-column presentation.
- **T2.3.3 — Desktop Ultra-Wide (2560x1440)**: Content containers maintain max-width bounds (`max-w-7xl` or equivalent) centered on screen.
- **T2.3.4 — Extreme Minimal Width (320px)**: Components downscale gracefully without text truncation destroying readability.
- **T2.3.5 — Viewport Resize Mid-Render**: Dynamically resizing window updates canvas dimensions without memory leak or canvas redraw corruption.

### Boundary Area 4: Rapid Navigation & Tab Switching
- **T2.4.1 — Rapid Route Hopping (10 routes in 100ms)**: Quickly transitioning between `/`, `/architecture`, `/campaigns`, `/domains`, `/console` resolves cleanly to final route without stale state collisions.
- **T2.4.2 — History Back / Forward Navigation**: Operating browser back/forward history correctly synchronizes active navbar indicators.
- **T2.4.3 — Deep Linking**: Directly loading `/console` or `/domains` immediately renders corresponding view without flashing home page.
- **T2.4.4 — Non-Existent Route 404 Recovery**: Requesting `/unknown-route` renders 404 fallback or redirects to home without unhandled exception.
- **T2.4.5 — Route Transition Memory Stability**: Repeated cyclic navigation produces zero retained detached DOM node growth.

### Boundary Area 5: Simulation Pause, Resume & Buffer Limits
- **T2.5.1 — Rapid Pause/Resume Toggling**: Toggling terminal stream state 50 times in rapid succession maintains deterministic running state.
- **T2.5.2 — Max Buffer Enforcement**: Streaming 1,000 logs maintains fixed max buffer cap (e.g. 100 or 200 items), shedding oldest logs first.
- **T2.5.3 — Paused Log Queueing**: In paused state, UI does not autoscroll or jitter, preserving researcher's reading position.
- **T2.5.4 — Empty Filter Selection**: Selecting a filter channel with zero events renders an informative empty state instead of blank crash.
- **T2.5.5 — High-Frequency Interval Stability**: Setting simulation speed to highest rate does not drop frames or lock the main thread.

---

## 5. Tier 3: Cross-Feature Combinations (Pairwise Tests, Total: 8 Tests)

- **T3.1 — Route Navigation While Canvas Animation Runs**: Navigating from Home to Architecture and back while Canvas shader renders verifies canvas cleans up and re-attaches without zombie rAF loops.
- **T3.2 — Telemetry Channel Filtering with Simultaneous Epistemic Slider Adjustments**: Adjusting epistemic confidence slider while terminal is filtered by `[RIGOR-VERIFIED]` updates both components smoothly without event interference.
- **T3.3 — Waitlist Modal Open/Close During Active Canvas Rendering**: Opening the Early Access modal over an active background canvas verifies modal traps focus while canvas continues smooth background rendering.
- **T3.4 — Epistemic Slider Stagnation Event Logged to Telemetry Feed**: Adjusting slider to flat slope ($|m| < 0.01$) produces a corresponding `[STAGNATION-DETECTED]` event in the telemetry stream.
- **T3.5 — Domain Kernel Selection with Concurrent Telemetry Stream**: Switching active scientific tabs on `/domains` while telemetry stream continues uninterrupted verifies state isolation across modules.
- **T3.6 — Modal Credential Submission While Navigating**: Submitting waitlist credentials and instantly changing routes preserves generated credential receipt in session state.
- **T3.7 — Mobile Drawer Toggle During Interactive Simulation**: Opening mobile drawer over running Epistemic simulation does not break touch sliders or corrupt layout.
- **T3.8 — Copy Simulated API Key While Telemetry Streams**: Clicking "Copy Key" on generated API key places key into clipboard without stalling active telemetry terminal.

---

## 6. Tier 4: Real-World Application Scenarios (Total: 5 Scenarios)

- **T4.1 — Scenario 1: Complete Hypothesis Discovery & Falsification Lifecycle**:
  1. Researcher enters at `/` (Hero), verifies system telemetry ($3.25 unit cost, 12-72h campaigns).
  2. Navigates to `/architecture`, reviews 4-Tier Swarm structure and Falsification Engine.
  3. Navigates to `/campaigns`, inspects 72-hour timeline and "The Morgue" kill-chain memory.
  4. Navigates to `/domains`, examines molecular docking kernel (ETKDGv3, AutoDock Vina).
  5. Navigates to `/console`, runs Epistemic simulation, monitors live telemetry stream, and clicks "Request Access".
  6. Submits credentials and receives verified API key token.

- **T4.2 — Scenario 2: Superconductivity Mechanical Stability Investigation**:
  1. Researcher opens `/domains` and selects Materials & Condensed Matter kernel.
  2. Inspects $C_{11}, C_{12}, C_{44}$ cubic elastic tensor parameters.
  3. Executes Born stability verification oracle:
     $$C_{11} - C_{12} > 0, \quad C_{11} + 2C_{12} > 0, \quad C_{44} > 0$$
  4. Verifies calculated Voigt bulk modulus $K = (C_{11} + 2C_{12})/3$ and shear modulus $G = C_{44}$.
  5. Navigates to `/console` to confirm materials simulation telemetry events are present.

- **T4.3 — Scenario 3: High-Energy Fusion Plasma Bremsstrahlung Run**:
  1. Researcher navigates to `/domains` and selects Fusion & Plasma Physics kernel.
  2. Evaluates relativistic Bremsstrahlung radiation power at $T_e = 50$ keV:
     $$g_{\text{rel}} = 1.0 + 1.78(T_e/511.0)^{1.34}$$
  3. Evaluates Gamow peak energy $E_0$ and evaluates Lyapunov exponent spectrum for chaos threshold ($\lambda_1 > 0.01$).
  4. Confirms numerical values match authentic plasma kernel ground truth.

- **T4.4 — Scenario 4: Epistemic Velocity Stagnation & Structured Mutation**:
  1. Researcher navigates to `/console` and adjusts Epistemic Confidence Slider through a sequence of 5 stagnant cycles ($p = 0.85, 0.85, 0.851, 0.850, 0.850$).
  2. OLS slope calculation yields $|m_{\text{logit}}| < 0.01$.
  3. Epistemic engine triggers `STAGNATION_DETECTED`.
  4. Telemetry terminal records automated structured mutation event without human intervention.

- **T4.5 — Scenario 5: Full Researcher Onboarding & Credential Acquisition**:
  1. Researcher explores Home, Architecture, Campaigns, and Domains.
  2. Opens Waitlist / Early Access modal from any page.
  3. Fills in valid credentials (`Dr. Jane Doe`, `jane.doe@cern.ch`, `CERN / Large Hadron Collider`, `High-Energy Physics`).
  4. Submits form; modal generates and displays API token `svel_live_sk_...`.
  5. Closes modal, navigates across routes, and re-opens modal to confirm credential status.

---

## 7. Execution Commands & Verification Matrix

To execute the complete E2E test suite:

```bash
# Direct runner invocation
node e2e/runner.mjs

# Standard npm script invocation
npm run test:e2e
```

The test runner produces machine-readable summary JSON and formatted CLI logs detailing:
- Total test cases executed: 73
- Passed / Failed / Skipped counts
- Per-tier execution timings
- Opaque-box assertion traces
