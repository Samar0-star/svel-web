# Project: Ultron AI Scientist Web Platform

## Architecture
- **Framework**: Vite 6 + React 18/19 SPA with Client-Side Routing (`react-router-dom`)
- **Language**: TypeScript 5.x in Strict Mode (`strict: true`, `noImplicitAny: true`)
- **Styling**: Tailwind CSS with custom Obsidian & OLED monochrome palette (`#000000`, `#080808`, `#0F0F0F`, `#141414`), 1px metallic borders (`border-white/10`), crisp stark white typography (`#f5f5f5`), and single cold emerald accent (`#00E599` / `#10B981`). Zero rainbow/neon purple clutter.
- **Visual Assets**:
  - `/public/ultron_dna_minimal.jpg` (Minimal Titanium DNA Double Helix, 1376x768)
  - `/public/ultron_core_minimal.jpg` (Synthetic Computational Core, 1376x768)
- **Interactive Visualizers**:
  - 60 FPS HTML5 Canvas double-helix DNA particle shader with mouse/scroll interaction
  - Interactive Epistemic Logit Derivative Confidence Slope Simulator
  - Real-Time Live Streaming Telemetry Terminal with filterable channels
- **Testing**: Vitest unit test suite covering deterministic scientific calculations
- **Deployment**: Vercel zero-config with `vercel.json` wildcard rewrites and edge caching

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | OLED & Obsidian Design System | Pure OLED black (`#000000`), deep obsidian surfaces (`#080808`/`#0f0f0f`), 1px metallic borders, cold emerald accent (`#00E599`), dark color-scheme | M1 | ORIGINAL_REQUEST §R1 |
| 2 | Project Scaffolding & Config | Vite 6, React, TypeScript strict mode, Tailwind CSS, Lucide React, Vitest setup | M1 | ORIGINAL_REQUEST §R4 |
| 3 | Core Navigation & Layout Shell | Header navbar with active route indicator, responsive mobile menu, deeptech footer with SHA-256 build verification | M1 | ORIGINAL_REQUEST §R1 |
| 4 | Asset Integration | Canonical Titanium DNA double helix & Synthetic Computational Core images placed and optimized | M1 | ORIGINAL_REQUEST §Visual Assets |
| 5 | Home / Hero Page (`/`) | Hero with minimal DNA visual, telemetry stats (12-72h campaigns, 0-token epistemic, $3.25 unit cost vs $240k human salary), core thesis, feature highlights | M2 | ORIGINAL_REQUEST §R2.1 |
| 6 | Architecture Page (`/architecture`) | 4-Tier Swarm teardown (`Ultron-Core`, `Scholar-Prosecutor Dual Stream`, `CodeEngineer & SimulationRunner`, `MarketScout`), Falsification Engine, Proof-of-Work Weight Auditing, Epistemic Regulator | M2 | ORIGINAL_REQUEST §R2.2 |
| 7 | Campaigns Page (`/campaigns`) | Interactive 72-hour execution timeline emulator, TCP congestion backoff (AIMD), sigmoidal temperature decay, AST syntax audits, "The Morgue" kill-chain memory | M2 | ORIGINAL_REQUEST §R2.3 |
| 8 | Domains Page (`/domains`) | Genomics & Medicine (ITT, RDKit ETKDGv3, AutoDock Vina), Materials (pymatgen, M3GNet, $C_{ij}$ tensors), Fusion (Relativistic Bremsstrahlung, Gamow peak, Lyapunov), Multimodal ML (6-modality GSTM, Adaptive Robust Loss) | M2 | ORIGINAL_REQUEST §R2.4 |
| 9 | Console Page (`/console`) | Interactive experiment sandbox, live telemetry trace feed, epistemic slider, waitlist / API key request modal | M2 | ORIGINAL_REQUEST §R2.5 |
| 10 | 60 FPS HTML5 Canvas DNA Shader | Continuous monochrome double-helix particle simulation responding to mouse proximity and scroll | M3 | ORIGINAL_REQUEST §R3 |
| 11 | Epistemic Confidence Simulator | Interactive logit derivative slider demonstrating why linear scoring fails near asymptotic limits | M3 | ORIGINAL_REQUEST §R3 |
| 12 | Live Streaming Telemetry Terminal | High-frequency trace emulator streaming authentic Ultron logs (`[RIGOR-VERIFIED]`, `[GLASS-TELEMETRY]`, `[MORGUE]`, etc.) | M3 | ORIGINAL_REQUEST §R3 |
| 13 | Access & Credentials Modal | Waitlist submission and API key simulation modal for researchers | M3 | ORIGINAL_REQUEST §R2.5 |
| 14 | Scientific Calculation Library | Deterministic TypeScript modules for Logit slope, Welch-Z clash, Bremsstrahlung loss, Born stability, and Bayesian updates | M4 | ORIGINAL_REQUEST §R4 |
| 15 | Vitest Unit Test Suite | Comprehensive unit tests validating all mathematical formulas against ground truth test cases | M4 | ORIGINAL_REQUEST §R4 |
| 16 | Zero-Defect Production Build | TypeScript type check and Vite bundle compilation (`npm run build`) with zero errors | M4 | ORIGINAL_REQUEST §R4 |
| 17 | Vercel Deployment Config | `vercel.json` with SPA routing rewrites, security headers, and asset caching rules | M5 | ORIGINAL_REQUEST §R4 |
| 18 | Multi-Route E2E Verification & Forensic Audit | Verification of all 5 routes, zero broken links, accessibility contrast, and forensic integrity audit | M5 | ORIGINAL_REQUEST §Acceptance Criteria |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Scaffolding & Obsidian Design System | package.json, vite.config.ts, tsconfig.json, tailwind.config.js, index.html, Navbar, Footer, Asset setup | none | DONE |
| M2 | Five Core Grounded Pages | HomePage (`/`), ArchitecturePage (`/architecture`), CampaignsPage (`/campaigns`), DomainsPage (`/domains`), ConsolePage (`/console`) | M1 | DONE |
| M3 | Interactive Canvas Shader & Simulators | DnaCanvasShader (60 FPS), EpistemicSimulator, TelemetryTerminal, AccessModal | M1, M2 | DONE |
| M4 | Scientific Math Engine & Vitest Tests | lib/epistemic.ts, lib/physics.ts, lib/materials.ts, test/ suites, npm run build verification | M1, M2 | DONE |
| M5 | Vercel Config, E2E Verification & Audit | vercel.json, route testing, responsiveness check, Challenger verification, Forensic Integrity Audit | M1, M2, M3, M4 | IN_PROGRESS |

## Interface Contracts
### `src/lib/epistemic.ts`
```typescript
export interface LogitSlopeResult {
  slope: number;
  isStagnant: boolean; // |slope| < 0.01
  logitValues: number[];
}

export function calculateLogitSlope(confidences: number[], cycles?: number[]): LogitSlopeResult;

export interface ClashResult {
  zScore: number;
  isConflict: boolean; // zScore > 2.576 (p < 0.01)
  standardErrorDelta: number;
}

export function detectStatisticalClash(
  newEffect: number,
  newSe: number,
  oldEffect: number,
  oldSe: number
): ClashResult;

export function bayesianBeliefUpdate(
  prior: number,
  likelihood: number,
  uncertainty?: number
): number;
```

### `src/lib/physics.ts`
```typescript
export function relativisticBremsstrahlung(
  Te_keV: number,
  np_cm3: number,
  nB_cm3: number
): { P_brem_W_cm3: number; g_rel: number; Z_eff_sq: number; n_e: number };

export function kaplanYorkeDimension(
  lyapunovExponents: number[]
): { D_KY: number; isChaotic: boolean };
```

### `src/lib/materials.ts`
```typescript
export interface CubicBornResult {
  K_bulk_GPa: number;
  G_shear_GPa: number;
  isMechanicallyStable: boolean;
  bornChecks: { c11MinusC12: boolean; c11Plus2C12: boolean; c44: boolean };
}

export function verifyCubicBornStability(
  c11: number,
  c12: number,
  c44: number
): CubicBornResult;
```

## Code Layout
```
/Users/samaraldico/ultron-ai-scientist-web/
├── public/
│   ├── ultron_dna_minimal.jpg
│   ├── ultron_core_minimal.jpg
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── canvas/
│   │   │   └── DnaCanvasShader.tsx
│   │   ├── common/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MetallicCard.tsx
│   │   ├── console/
│   │   │   ├── TelemetryTerminal.tsx
│   │   │   └── AccessModal.tsx
│   │   └── simulations/
│   │       ├── EpistemicSimulator.tsx
│   │       └── WeightDivergenceAudit.tsx
│   ├── data/
│   │   ├── telemetryEvents.ts
│   │   ├── domainsData.ts
│   │   └── campaignsData.ts
│   ├── lib/
│   │   ├── epistemic.ts
│   │   ├── physics.ts
│   │   ├── materials.ts
│   │   └── constants.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── ArchitecturePage.tsx
│   │   ├── CampaignsPage.tsx
│   │   ├── DomainsPage.tsx
│   │   └── ConsolePage.tsx
│   ├── styles/
│   │   └── index.css
│   ├── test/
│   │   ├── epistemic.test.ts
│   │   ├── physics.test.ts
│   │   └── materials.test.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── index.html
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.ts
└── vercel.json
```
