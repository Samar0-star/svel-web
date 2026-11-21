/**
 * Autonomous Campaigns & The Morgue Kill-Chain Data
 * Directly mirrors backend/orchestration/deep_research_orchestrator.py,
 * backend/core/scheduler.py, backend/agents/experiment_agent.py,
 * and backend/agents/red_team_agent.py
 */

export interface CampaignPhase {
  phaseNumber: number;
  name: string;
  hourRange: string;
  temperatureRange: string;
  objective: string;
  subsystem: string;
  status: 'COMPLETED' | 'ACTIVE' | 'SCHEDULED';
  details: string[];
}

export const CAMPAIGN_PHASES: CampaignPhase[] = [
  {
    phaseNumber: 0,
    name: 'Seed Discovery & Literature Ingestion',
    hourRange: '0h – 2h',
    temperatureRange: 'T = 0.99 – 0.98',
    objective: 'Initial ingestion of arXiv, PubMed, and bioRxiv corpora via ScholarNexus.',
    subsystem: 'WebSearchAgent & ScholarNexus',
    status: 'COMPLETED',
    details: [
      'Loaded FAISS index (dim=1536) with 550 peer-reviewed documents',
      'Extracted citation graph & causal knowledge edges (200+ relations)',
      'Identified high-conviction research gap in aneutronic fusion confinement',
    ],
  },
  {
    phaseNumber: 1,
    name: 'Domain Ontology & Boundary Definition',
    hourRange: '2h – 6h',
    temperatureRange: 'T = 0.98 – 0.96',
    objective: 'Grounding problem formulation in physical boundary conditions.',
    subsystem: 'ResearchAgent & WorldModel',
    status: 'COMPLETED',
    details: [
      'Bounded parameter manifold [Te: 10–100 keV, ne: 1e14–1e16 cm⁻³]',
      'Constructed causal DAG in Neo4j World Model',
      'Generated 24 testable hypothesis seeds',
    ],
  },
  {
    phaseNumber: 2,
    name: 'Hypothesis Generation & Formalization',
    hourRange: '6h – 12h',
    temperatureRange: 'T = 0.96 – 0.91',
    objective: 'Mathematical formalization into Y = f(X) prediction tuples.',
    subsystem: 'HypothesisGenerator & EpistemicRegulator',
    status: 'COMPLETED',
    details: [
      'Derived testable relation: Gaunt factor scaling suppresses Bremsstrahlung losses',
      'Assigned initial epistemic confidence P0 = 0.50 (neutral prior)',
      'Validated hypothesis syntax and boundary constraints',
    ],
  },
  {
    phaseNumber: 3,
    name: 'GNN Oracle Intuition Walk ("Deep Dream")',
    hourRange: '12h – 18h',
    temperatureRange: 'T = 0.91 – 0.82',
    objective: 'Graph Neural Network intuition walks over latent hypergraph.',
    subsystem: 'GNN Oracle',
    status: 'COMPLETED',
    details: [
      'Ran 1,000 stochastic walks on 482-edge knowledge graph',
      'Ranked candidate conjectures by uncertainty-discounted confidence C * (1 - sigma)',
      'Selected top 8 conjectures for empirical testing',
    ],
  },
  {
    phaseNumber: 4,
    name: 'Annealing & Epistemic Morgue Gate',
    hourRange: '18h – 24h',
    temperatureRange: 'T = 0.82 – 0.73',
    objective: 'VectorStore similarity scan against The Morgue kill-chain ledger.',
    subsystem: 'The Morgue & ChromaDB',
    status: 'COMPLETED',
    details: [
      'Queried ChromaDB for cosine similarity >= 0.85 against dead ideas',
      'Auto-rejected candidate H-1049 (similarity 0.894) as research scar tissue',
      'Saved 1.2M tokens and 4 GPU-hours of redundant simulation compute',
    ],
  },
  {
    phaseNumber: 5,
    name: 'Automated Code Synthesis & AST Audit',
    hourRange: '24h – 30h',
    temperatureRange: 'T = 0.73 – 0.62',
    objective: 'Synthesize simulation scripts with Igor code audit rules.',
    subsystem: 'ExperimentAgent & AST NameVisitor',
    status: 'COMPLETED',
    details: [
      'Parsed AST syntax: 0 unmatched parentheses, 0 unclosed scopes',
      'Verified NameVisitor lexical scopes across 14 functions',
      'Screened for forbidden primitives (exec, eval, system, popen): 0 violations',
    ],
  },
  {
    phaseNumber: 6,
    name: 'Physical Simulation & PoW Weight Auditing',
    hourRange: '30h – 36h',
    temperatureRange: 'T = 0.62 – 0.50',
    objective: 'Sandboxed code execution with cryptographic SvelRigorMonitor.',
    subsystem: 'GodModeSandbox & SvelRigorMonitor',
    status: 'COMPLETED',
    details: [
      'Locked initial weights: SHA-256 = 893cb8678404f06872d81f4047ab3fffe899ab8d8df1304eea9a8f20761e04fb',
      'Nonce challenge: [RIGOR-VERIFIED-7f3b89e210ac]',
      'Verified weight divergence: delta = 0.0418 > 1e-4, gradient norm = 0.041829 >= 1e-5',
    ],
  },
  {
    phaseNumber: 7,
    name: 'Singularity Shatter (Hydra Recovery)',
    hourRange: '36h – 44h',
    temperatureRange: 'T = 0.50 – 0.38',
    objective: 'Decompose complex simulation roadblocks into recursive sub-tasks.',
    subsystem: 'SingularityEngine',
    status: 'COMPLETED',
    details: [
      'Detected numerical singularity in boundary plasma sheath integrator',
      'Hydra protocol spawned 3 targeted sub-tasks to depth=2',
      'Replaced stiff explicit Runge-Kutta with adaptive Radau IIA integrator',
    ],
  },
  {
    phaseNumber: 8,
    name: 'Swarm Dispatch & Global Capacity Scheduling',
    hourRange: '44h – 52h',
    temperatureRange: 'T = 0.38 – 0.27',
    objective: 'Coordinate multi-agent worker pool with TCP AIMD backoff.',
    subsystem: 'GlobalScheduler',
    status: 'COMPLETED',
    details: [
      'Enforced token bucket rate limits across 20 worker threads',
      'Handled 429 rate limit: Concurrency 20 -> 14 (-30% multiplicative backoff)',
      'Additive recovery ramped concurrency back to 18 slots upon 200 OK responses',
    ],
  },
  {
    phaseNumber: 9,
    name: 'Adversarial Falsification Engine Stress Test',
    hourRange: '52h – 60h',
    temperatureRange: 'T = 0.27 – 0.16',
    objective: 'Destroy candidate findings using 7 adversarial perturbation vectors.',
    subsystem: 'FalsificationEngine & RedTeamAgent',
    status: 'ACTIVE',
    details: [
      'Differential Evolution parameter search: Max iterations = 20, Pop size = 10',
      'Evaluated 5-sigma adversarial outliers and 20% lethal dropout',
      'Current Unbreakability Index U = 0.864 >= 0.60 (Classification: SURVIVES)',
    ],
  },
  {
    phaseNumber: 10,
    name: 'Epistemic Velocity & Logit Derivative Check',
    hourRange: '60h – 66h',
    temperatureRange: 'T = 0.16 – 0.08',
    objective: 'Calculate log-odds slope m_logit and Welch-Z clash detection.',
    subsystem: 'EpistemicRegulator',
    status: 'SCHEDULED',
    details: [
      'Evaluate log-odds slope: m_logit = (n*sum(xy) - sum(x)*sum(y)) / (n*sum(x²) - (sum(x))²)',
      'Flag stagnation if |m_logit| < 0.01; trigger structured hypothesis mutation',
      'Welch-Z test against prior findings: Z <= 2.576',
    ],
  },
  {
    phaseNumber: 11,
    name: 'Overmind Superego & Strategic Drift Meter',
    hourRange: '66h – 70h',
    temperatureRange: 'T = 0.08 – 0.03',
    objective: 'Measure semantic cosine drift between campaign goal and current state.',
    subsystem: 'Overmind',
    status: 'SCHEDULED',
    details: [
      'Semantic drift metric: D(G, S) = 1.0 - cosine_similarity(e_goal, e_state)',
      'Autonomous kill authority if drift exceeds 0.40',
      'Confirm 4/5 consensus across 5-Persona Red Team Tribunal',
    ],
  },
  {
    phaseNumber: 12,
    name: 'Final Synthesis, Camera-Ready Report & Claim Lock',
    hourRange: '70h – 72h',
    temperatureRange: 'T = 0.03 – 0.01',
    objective: 'Camera-ready document compilation with Headless Chromium DOM SVG lock.',
    subsystem: 'ReportComposer & GodzillaWriterAgent',
    status: 'SCHEDULED',
    details: [
      'Generate immutable <claim_registry> JSON block',
      'Verify 100% of claims hyperlink to executed Jupyter notebook cells',
      'Headless Chromium renders complete SVG vector graphics before PDF print',
    ],
  },
];

export interface DeadHypothesisRecord {
  id: string; // SHA-256 first 16 chars
  title: string;
  originalConjecture: string;
  killReason: string;
  killedBy: string;
  killedAt: string;
  similarityScore: number;
  tokensSaved: string;
  campaignId: string;
  attackVector: string;
}

export const THE_MORGUE_RECORDS: DeadHypothesisRecord[] = [
  {
    id: '7c3a91bf94d21e80',
    title: 'High-Temperature Alpha Channeling via Resonant Waves',
    originalConjecture: 'Alpha channeling driven by high-frequency Alfven waves achieves Q > 5.0 in cold-ion p-11B.',
    killReason: 'Falsified by Relativistic Bremsstrahlung loss. Electron heating exceeds fusion output by 280%.',
    killedBy: 'FalsificationEngine (Differential Evolution)',
    killedAt: '2026-09-18T14:22:10Z',
    similarityScore: 0.894,
    tokensSaved: '2.4M tokens ($7.80)',
    campaignId: 'CAMPAIGN-014',
    attackVector: 'Bremsstrahlung Energy Balance',
  },
  {
    id: '4e2b00a188f57c12',
    title: 'JAK1/2 Allosteric Inhibition via Quinazoline Analogues',
    originalConjecture: 'Novel quinazoline scaffold exhibits sub-nanomolar selectivity for unphosphorylated JAK1 pocket.',
    killReason: 'PAINS filter rejection: Contains reactive quinone-diimine redox-cycling substructure.',
    killedBy: 'ProtocolValidator & RDKit FilterCatalog',
    killedAt: '2026-09-22T03:11:45Z',
    similarityScore: 0.871,
    tokensSaved: '850k tokens ($2.76)',
    campaignId: 'CAMPAIGN-016',
    attackVector: 'PAINS Toxicophore Screening',
  },
  {
    id: 'd910fe28b031c54a',
    title: 'Room-Temperature Hydride Superconductivity in YH9-δ',
    originalConjecture: 'Metastable YH9-δ cubic lattice maintains dynamic phonon stability at ambient pressure (1 atm).',
    killReason: 'Phonon dispersion calculation revealed severe imaginary soft modes (ω² = -14.2 THz²) at Γ point.',
    killedBy: 'M3GNet Neural Potential & ASE BFGS',
    killedAt: '2026-09-29T19:40:02Z',
    similarityScore: 0.915,
    tokensSaved: '4.1M tokens ($13.32)',
    campaignId: 'CAMPAIGN-019',
    attackVector: 'Dynamic Phonon Soft-Mode Check',
  },
  {
    id: 'b52a7810df6601ea',
    title: 'Intention-to-Treat Treatment Efficacy in Microglial Modulators',
    originalConjecture: 'Oral CS-992 reduces amyloid burden by 45% (p < 0.01) in early AD cohort.',
    killReason: 'Welch-Z Clash Z = 3.42 > 2.576 with benchmark study. Missing data rate (14.2%) exceeded ITT protocol floor (10%).',
    killedBy: 'EpistemicReaper & Welch-Z Clash Test',
    killedAt: '2026-10-02T11:05:30Z',
    similarityScore: 0.883,
    tokensSaved: '1.9M tokens ($6.18)',
    campaignId: 'CAMPAIGN-021',
    attackVector: 'Welch-Z Clash & ITT Dropouts',
  },
  {
    id: '1a9f02c6381e4b88',
    title: 'Zero-Shot Multi-Modal Fusion via Unweighted Concatenation',
    originalConjecture: 'Linear concatenation of genomic embeddings and raw image pixels preserves cross-modal invariance.',
    killReason: 'SvelRigorMonitor Proof-of-Work failed: Gradient norm = 8.2e-7 < 1e-5. Model weights failed to evolve.',
    killedBy: 'SvelRigorMonitor (PoW Weight Audit)',
    killedAt: '2026-10-05T08:33:14Z',
    similarityScore: 0.862,
    tokensSaved: '3.6M tokens ($11.70)',
    campaignId: 'CAMPAIGN-023',
    attackVector: 'Cryptographic SHA-256 PoW Audit',
  },
];
