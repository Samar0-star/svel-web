import React from 'react';
import MetallicCard from '../components/common/MetallicCard';
import EpistemicSimulator from '../components/simulations/EpistemicSimulator';
import WeightDivergenceAudit from '../components/simulations/WeightDivergenceAudit';
import {
  Layers,
  ShieldAlert,
  Cpu,
  Lock,
  Flame,
  CheckCircle2,
  Workflow,
  Crosshair,
} from 'lucide-react';

export const ArchitecturePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-obsidian-800 border border-white/10 text-xs font-mono text-emerald-cold mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>02 // ARCHITECTURE & DISCOVERY ENGINE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          4-Tier Swarm &amp; Falsification Engine
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-3xl font-sans leading-relaxed">
          Svel isolates scientific generative exploration from adversarial evaluation. By decoupling
          the Scholar from the Prosecutor and enforcing cryptographic Proof-of-Work weight audits, the
          system prevents generative hallucination and premature consensus.
        </p>
      </div>

      {/* 4-Tier Swarm Teardown Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h2 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
            <Workflow className="w-4 h-4 text-emerald-cold" />
            <span>4-TIER SWARM SUBSYSTEM ARCHITECTURE</span>
          </h2>
          <span className="text-xs font-mono text-neutral-500">ISOLATED ROLES &amp; ASYNC QUEUES</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Tier 1 */}
          <MetallicCard title="TIER 1: SVEL-CORE ORCHESTRATOR" badge="SUPER-EGO" glowOnHover>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-cold">
                <Cpu className="w-4 h-4" />
                <span>DeepResearchOrchestrator • Overmind • GlobalScheduler</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                Manages the 12-phase 72-hour campaign lifecycle. <strong className="text-white">Overmind</strong> computes
                semantic trajectory drift <code className="text-neutral-200 font-mono text-[11px]">D(G, S) = 1.0 - cos(e_goal, e_state)</code>,
                retaining sovereign shutdown authority. <strong className="text-white">GlobalScheduler</strong> manages token buckets
                and executes TCP AIMD congestion backoff to eliminate 429 rate limits without session loss.
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-neutral-400 space-y-1">
                <div>• SingularityEngine: Hydra recovery protocol for task failures up to depth=3</div>
                <div>• CentralRouter: Semantic task dispatcher &amp; async queue balancing</div>
              </div>
            </div>
          </MetallicCard>

          {/* Tier 2 */}
          <MetallicCard title="TIER 2: SCHOLAR & PROSECUTOR" badge="ADVERSARIAL" glowOnHover>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-cold">
                <ShieldAlert className="w-4 h-4" />
                <span>Discovery Stream vs. 5-Persona Tribunal Stream</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                <strong className="text-white">Scholar Stream</strong> (ResearchAgent, HypothesisGenerator, GNN Oracle) generates
                formal conjectures and performs Deep Dream intuition walks on Knowledge Graph hypergraphs.
                <strong className="text-white"> Prosecutor Stream</strong> (RedTeamAgent, ProtocolValidator, FactChecker) runs
                a 5-Persona Tribunal (Statistician, Physicist, Economist, Skeptic, Methodologist) requiring a 4/5 supermajority.
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-neutral-400 space-y-1">
                <div>• Auto-Morgue Filter: Cosine similarity ≥ 0.85 immediately aborts dead ideas</div>
                <div>• FactChecker: Validates citations &amp; numbers against source literature</div>
              </div>
            </div>
          </MetallicCard>

          {/* Tier 3 */}
          <MetallicCard title="TIER 3: CODEENGINEER & SIMULATIONRUNNER" badge="EXECUTION" glowOnHover>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-cold">
                <Crosshair className="w-4 h-4" />
                <span>AST Syntax Audit • GodModeSandbox • SvelRigorMonitor</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                <strong className="text-white">ExperimentAgent</strong> generates Python code, runs lexical AST scope audits
                via NameVisitor, and executes code in isolated environments. Integrates RDKit, pymatgen,
                and Vina. <strong className="text-white">SvelRigorMonitor</strong> intercepts PyTorch gradient steps to enforce
                physical weight evolution.
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-neutral-400 space-y-1">
                <div>• AutomatedMLBuilder: 6-Modality GSTM Fusion + Adaptive Robust Loss</div>
                <div>• Scavenger Daemon: Recovers lost simulation artifact files from disk</div>
              </div>
            </div>
          </MetallicCard>

          {/* Tier 4 */}
          <MetallicCard title="TIER 4: RIGOR MONITOR (POW)" badge="CRYPTO AUDIT" glowOnHover>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-cold">
                <Flame className="w-4 h-4" />
                <span>ScholarNexus • ReportComposer • SVG Lock</span>
              </div>
              <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                <strong className="text-white">SvelRigorMonitor</strong> verifies model parameters via SHA-256 cryptographic weight divergence checks.
                <strong className="text-white"> ReportComposer</strong> launches headless Chromium (<code className="text-neutral-200 font-mono text-[11px]">async_playwright</code>)
                with DOM polling to guarantee 100% SVG render completion prior to PDF print.
                <strong className="text-white"> GodzillaWriterAgent</strong> forces an immutable <code className="text-neutral-200 font-mono text-[11px]">&lt;claim_registry&gt;</code> linking prose to Jupyter cells.
              </p>
              <div className="pt-2 border-t border-white/5 text-[11px] font-mono text-neutral-400 space-y-1">
                <div>• SHA-256 PoW Audit: Eliminates hallucinated gradient convergence</div>
                <div>• Zero Hallucination Lock: Unverified claims throw compilation errors</div>
              </div>
            </div>
          </MetallicCard>
        </div>
      </section>

      {/* The Falsification Engine Deep Teardown */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h2 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-emerald-cold" />
            <span>THE FALSIFICATION ENGINE (falsification_engine.py)</span>
          </h2>
          <span className="text-xs font-mono text-neutral-500">2,000 LINES // 7 ATTACK VECTORS</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MetallicCard title="DIFFERENTIAL EVOLUTION & UNBREAKABILITY INDEX" badge="GLOBAL OPTIMIZATION" glowOnHover>
              <div className="space-y-4">
                <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                  Svel deploys global adversarial optimization via Differential Evolution (<code className="text-neutral-200 font-mono text-[11px]">scipy.optimize.differential_evolution</code>)
                  to aggressively search the parameter manifold for counter-examples that destroy the hypothesis:
                </p>

                {/* Mathematical Formula Box */}
                <div className="p-4 rounded bg-obsidian-900 border border-white/10 font-mono text-xs space-y-2">
                  <div className="text-neutral-400 text-[11px]">// Global Adversarial Objective Function:</div>
                  <div className="text-white text-sm font-semibold">
                    x* = argmax_{'{'}x ∈ B{'}'} L_error(x) &nbsp;⟺&nbsp; argmin_{'{'}x ∈ B{'}'} ( -L_error(x) )
                  </div>
                  <div className="pt-2 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <span className="text-emerald-cold text-base font-bold">
                      Unbreakability Index U = 1.0 - min(1.0, worst_case_metric)
                    </span>
                    <span className="text-neutral-400 text-[11px]">Population = 10, Iterations = 20</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded bg-obsidian-800 border border-white/10">
                    <span className="text-rose-400 font-bold block">U &lt; 0.30 // BROKEN</span>
                    <span className="text-neutral-400 text-[11px] mt-0.5 block">
                      Hypothesis fails under adversarial perturbation; downgraded to inconclusive or refuted.
                    </span>
                  </div>
                  <div className="p-2.5 rounded bg-obsidian-800 border border-white/10">
                    <span className="text-emerald-cold font-bold block">U ≥ 0.60 // SURVIVES</span>
                    <span className="text-neutral-400 text-[11px] mt-0.5 block">
                      Hypothesis withstands worst-case parameter stress and maintains significant effect size.
                    </span>
                  </div>
                </div>
              </div>
            </MetallicCard>

            {/* 7 Adversarial Perturbation Vectors */}
            <MetallicCard title="7-VECTOR ADVERSARIAL PERTURBATION SUITE" badge="ATTACK SUITE" glowOnHover>
              <div className="space-y-3 text-xs font-mono">
                <div className="flex items-start gap-2">
                  <span className="text-emerald-cold font-bold">1.</span>
                  <div>
                    <span className="text-white font-semibold">Gaussian Noise Injection:</span>
                    <span className="text-neutral-400 block text-[11px]">
                      Injects noise at σ ∈ {'{'}0.05, 0.10, 0.25, 0.50{'}'} of pooled signal std; tests if Cohen&apos;s d &gt; 0.2 and p &lt; 0.05 survive.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-cold font-bold">2.</span>
                  <div>
                    <span className="text-white font-semibold">Adversarial Outliers:</span>
                    <span className="text-neutral-400 block text-[11px]">
                      Injects 1%, 5%, and 10% extreme outliers specifically positioned at ±5σ in the exact direction opposing the hypothesis.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-cold font-bold">3.</span>
                  <div>
                    <span className="text-white font-semibold">Lethal Adversarial Dropout:</span>
                    <span className="text-neutral-400 block text-[11px]">
                      Deletes the top 20% of data points most favorable to the hypothesis (highest treatment values or lowest control values).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-cold font-bold">4.</span>
                  <div>
                    <span className="text-white font-semibold">Cohort Label Shuffling:</span>
                    <span className="text-neutral-400 block text-[11px]">
                      Randomly scrambles treatment/control labels to verify that the empirical null distribution behaves uniformly as p ~ U(0, 1).
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-cold font-bold">5.</span>
                  <div>
                    <span className="text-white font-semibold">Heavy-Tailed Distribution Shift:</span>
                    <span className="text-neutral-400 block text-[11px]">
                      Replaces Gaussian noise assumptions with Cauchy and Student-t distributions.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-cold font-bold">6.</span>
                  <div>
                    <span className="text-white font-semibold">Instrument Calibration Drift:</span>
                    <span className="text-neutral-400 block text-[11px]">
                      Simulates physical sensor degradation and baseline drift over experimental timelines.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-emerald-cold font-bold">7.</span>
                  <div>
                    <span className="text-white font-semibold">Bayesian Information Criterion (BIC) Model Competition:</span>
                    <span className="text-neutral-400 block text-[11px]">
                      Pits the hypothesis against competing null specifications; tests Bayes Factor BF = exp(ΔBIC / 2).
                    </span>
                  </div>
                </div>
              </div>
            </MetallicCard>
          </div>

          {/* Right Column: Karl Popper Philosophy & Falsification Summary */}
          <div className="space-y-6">
            <MetallicCard title="EPISTEMOLOGICAL RIGOR" badge="KARL POPPER (1959)" variant="terminal" glowOnHover>
              <div className="space-y-4 text-xs font-sans leading-relaxed text-neutral-300">
                <p>
                  Most AI research agents suffer from <strong className="text-white">Confirmation Bias</strong>: they formulate
                  a claim and generate cherry-picked scripts to prove themselves right.
                </p>
                <p>
                  Svel reverses this incentive architecture. The Prosecutor Stream is rewarded exclusively for
                  <strong className="text-rose-400"> finding boundary cases and destroying hypotheses</strong>. A finding is only
                  admitted into the persistent World Model if it survives lethal adversarial perturbations and differential evolution stress testing.
                </p>
                <div className="p-3 rounded bg-obsidian-900 border border-white/10 font-mono text-[11px] text-neutral-400 space-y-1">
                  <div className="text-emerald-cold font-bold">FINAL VERDICT GATE:</div>
                  <div>• SURVIVES: Robustness &gt; 0.80 &amp; Lethal &gt; 0.50</div>
                  <div>• FRAGILE: Robustness &gt; 0.65</div>
                  <div>• DESTROYED: Sent to The Morgue</div>
                </div>
              </div>
            </MetallicCard>
          </div>
        </div>
      </section>

      {/* Proof-of-Work Model Weight Auditing */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h2 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-cold" />
            <span>CRYPTOGRAPHIC PROOF-OF-WORK WEIGHT AUDITING (SvelRigorMonitor)</span>
          </h2>
          <span className="text-xs font-mono text-neutral-500">ANTI-HALLUCINATION HARNESS</span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-3xl">
          To physically verify that a machine learning experiment actually executed gradient descent
          rather than fabricating fake convergence tables, Svel hashes parameter tensors before and
          after execution and enforces a strict gradient norm floor:
        </p>

        {/* Embedded Interactive Weight Divergence Component */}
        <WeightDivergenceAudit />
      </section>

      {/* Epistemic Regulator Section with Embedded Interactive Simulator */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h2 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-cold" />
            <span>EPISTEMIC REGULATOR CALCULUS &amp; SIMULATOR</span>
          </h2>
          <span className="text-xs font-mono text-neutral-500">ZERO TOKENS // CLOSED FORM MATH</span>
        </div>

        <p className="text-xs sm:text-sm text-neutral-400 font-sans max-w-3xl">
          Interact directly with Svel&apos;s Epistemic Regulator below. Test why linear probability slopes fail
          near confidence limits and verify statistical clash detection against prior findings:
        </p>

        {/* Embedded Interactive Epistemic Simulator */}
        <EpistemicSimulator />
      </section>
    </div>
  );
};

export default ArchitecturePage;
