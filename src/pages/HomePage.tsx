import React from 'react';
import { Link } from 'react-router-dom';
import MetallicCard from '../components/common/MetallicCard';
import DnaCanvasShader from '../components/canvas/DnaCanvasShader';
import {
  ArrowRight,
  ShieldCheck,
  Cpu,
  Layers,
  Terminal,
  Activity,
  Flame,
  Binary,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-xl border border-white/10 bg-obsidian-950 p-6 sm:p-10 md:p-14">
        {/* Ambient Canvas Shader Backdrop */}
        <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
          <DnaCanvasShader particleCount={48} interactive={false} />
        </div>

        <div className="relative z-10 max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-obsidian-900 border border-white/15 text-xs font-mono text-emerald-cold shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-cold animate-pulse" />
            <span className="tracking-wider">AUTONOMOUS SYNTHETIC RESEARCH ORGANISM</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-sans leading-tight">
            Autonomous Discovery Across 12–72 Hour Scientific Campaigns.
          </h1>

          <p className="text-neutral-400 font-sans text-base sm:text-lg leading-relaxed max-w-3xl">
            Svel pairs deterministic physics engines with zero-token epistemic regulators,
            cryptographic proof-of-work model weight audits, and Scholar-Prosecutor dual-stream agent
            swarms to continuously formulate, simulate, and falsify scientific hypotheses without human intervention.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/console"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-white text-black font-mono text-xs font-bold hover:bg-neutral-200 transition-colors shadow-lg"
            >
              <span>ENTER CONSOLE</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/architecture"
              className="inline-flex items-center gap-2 px-6 py-3 rounded bg-obsidian-800 border border-white/15 text-neutral-200 font-mono text-xs font-semibold hover:border-emerald-cold/40 hover:text-white transition-colors"
            >
              <span>EXPLORE ARCHITECTURE</span>
            </Link>
          </div>
        </div>

        {/* Karl Popper Epigraph */}
        <div className="relative z-10 mt-10 pt-8 border-t border-white/10 flex items-start gap-3 text-xs font-mono text-neutral-400">
          <span className="text-emerald-cold text-lg font-bold select-none">“</span>
          <div>
            <p className="italic text-neutral-300">
              It is not enough to confirm a theory. You must try to destroy it.
            </p>
            <span className="text-[11px] text-neutral-500 block mt-1">
              — Karl Popper, <span className="text-neutral-400">The Logic of Scientific Discovery</span> (1959)
            </span>
          </div>
        </div>

        {/* Canonical Visual Assets Showcase */}
        <div className="relative z-10 mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="group relative rounded-lg overflow-hidden border border-white/10 bg-black aspect-[16/9]">
            <img
              src="./svel_dna_minimal.jpg"
              alt="Minimal Titanium DNA Double Helix"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-300">
              <span className="px-2 py-0.5 rounded bg-black/90 border border-white/15 text-emerald-cold font-semibold">
                TITANIUM DNA HELIX // ETKDGv3
              </span>
              <span className="text-neutral-500 text-[10px]">1376 × 768 PX</span>
            </div>
          </div>

          <div className="group relative rounded-lg overflow-hidden border border-white/10 bg-black aspect-[16/9]">
            <img
              src="./svel_core_minimal.jpg"
              alt="Synthetic Computational Core"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-neutral-300">
              <span className="px-2 py-0.5 rounded bg-black/90 border border-white/15 text-emerald-cold font-semibold">
                SVEL CORE // COMPUTATIONAL CONFINEMENT
              </span>
              <span className="text-neutral-500 text-[10px]">1376 × 768 PX</span>
            </div>
          </div>
        </div>
      </section>

      {/* Ground-Truth Telemetry Statistics Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h2 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-cold" />
            <span>CORE SYSTEM BENCHMARKS // EMPIRICAL TELEMETRY</span>
          </h2>
          <span className="text-xs font-mono text-neutral-500">SVEL_INTELLIGENCE_BRIEF_v2.4</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetallicCard title="CAMPAIGN HORIZON" badge="CONTINUOUS" glowOnHover>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-mono font-bold text-white">12–72h</span>
              <span className="text-xs text-neutral-400 font-mono">Unattended</span>
            </div>
            <p className="mt-2 text-xs text-neutral-400 font-sans">
              TCP AIMD congestion control backoff and sigmoidal temperature cooling prevent token drift.
            </p>
          </MetallicCard>

          <MetallicCard title="UNIT EXECUTION COST" badge="EFFICIENCY" glowOnHover>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-mono font-bold text-emerald-cold">$3.25</span>
              <span className="text-xs text-neutral-400 font-mono">/ run</span>
            </div>
            <p className="mt-2 text-xs text-neutral-400 font-sans">
              Compared to $240,000/yr human computational scientist salary for equivalent hypothesis throughput.
            </p>
          </MetallicCard>

          <MetallicCard title="EPISTEMIC REGULATOR" badge="ZERO TOKENS" glowOnHover>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-white">ln(p/(1-p))</span>
            </div>
            <p className="mt-2 text-xs text-neutral-400 font-sans">
              Linear slope on logit scale stops premature convergence and detects Welch-Z clashes (Z &gt; 2.576).
            </p>
          </MetallicCard>

          <MetallicCard title="WEIGHT VERIFICATION" badge="SHA-256 PoW" glowOnHover>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-mono font-bold text-emerald-cold">||∇W|| ≥ 1e-5</span>
            </div>
            <p className="mt-2 text-xs text-neutral-400 font-sans">
              SvelRigorMonitor checks parameter byte divergence, rejecting hallucinated neural convergence.
            </p>
          </MetallicCard>
        </div>
      </section>

      {/* 4-Tier Swarm Architecture Highlights */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h2 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-emerald-cold" />
            <span>4-TIER SWARM ARCHITECTURE OVERVIEW</span>
          </h2>
          <Link to="/architecture" className="text-xs font-mono text-emerald-cold hover:underline">
            VIEW DEEP TEARDOWN →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <MetallicCard title="TIER 1: SVEL-CORE ORCHESTRATOR" badge="EXECUTIVE" glowOnHover>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                <Cpu className="w-4 h-4 text-emerald-cold" />
                <span>DeepResearchOrchestrator • Overmind Superego • SingularityEngine</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Controls the 12-phase master campaign loop. Overmind evaluates semantic trajectory drift
                D(G, S) = 1.0 - cos(e_goal, e_state) with absolute kill authority. GlobalScheduler enforces
                TCP AIMD capacity backoff across Foundation Model API endpoints.
              </p>
            </div>
          </MetallicCard>

          <MetallicCard title="TIER 2: SCHOLAR-PROSECUTOR DUAL STREAM" badge="ADVERSARIAL" glowOnHover>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                <ShieldCheck className="w-4 h-4 text-emerald-cold" />
                <span>Scholar (Discovery) vs. RedTeam Prosecutor (5-Persona Tribunal)</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                The Scholar proposes bold mathematical statements Y = f(X) via GNN Oracle Deep Dream intuition
                walks; the Prosecutor executes Reviewer #2 stress tests across 5 specialized personas, enforcing
                a 4/5 consensus threshold before hypothesis commitment.
              </p>
            </div>
          </MetallicCard>

          <MetallicCard title="TIER 3: CODEENGINEER & SIMULATION RUNNER" badge="DETERMINISTIC" glowOnHover>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                <Binary className="w-4 h-4 text-emerald-cold" />
                <span>AST Scope Audit • GodModeSandbox • SvelRigorMonitor</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Converts conjectures into AST-validated Python code. Audits lexical scopes via NameVisitor,
                strips forbidden execution primitives (exec, eval, system), and monkey-patches cryptographic
                Proof-of-Work harnesses to physically verify backpropagation weight updates.
              </p>
            </div>
          </MetallicCard>

          <MetallicCard title="TIER 4: MARKET SCOUT & SCIENTIFIC SYNTHESIS" badge="CAM-READY" glowOnHover>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-neutral-300">
                <Terminal className="w-4 h-4 text-emerald-cold" />
                <span>ScholarNexus • ReportComposer • Headless Chromium SVG Lock</span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Synthesizes camera-ready publication PDFs. Headless Chromium polls DOM SVG completion
                before printing, while GodzillaWriterAgent strictly validates that every prose claim
                hyperlinks to an executed empirical Jupyter notebook cell.
              </p>
            </div>
          </MetallicCard>
        </div>
      </section>

      {/* 4 Dedicated Scientific Domains Quick Showcase */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h2 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
            <Flame className="w-4 h-4 text-emerald-cold" />
            <span>GROUNDED SCIENTIFIC DOMAINS</span>
          </h2>
          <Link to="/domains" className="text-xs font-mono text-emerald-cold hover:underline">
            EXPLORE DOMAIN KERNELS →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link to="/domains" className="block group">
            <div className="h-full p-4 rounded-lg bg-obsidian-900 border border-white/10 group-hover:border-emerald-cold/50 transition-colors space-y-2">
              <div className="text-[10px] font-mono text-emerald-cold">DISCIPLINE 01</div>
              <div className="text-sm font-bold text-white font-sans">Genomics &amp; Medicine</div>
              <p className="text-xs text-neutral-400 line-clamp-3">
                Intention-to-Treat protocols, RDKit ETKDGv3 3D conformers, PAINS toxicophore filter, and AutoDock Vina binding (ΔG ≤ -6.0 kcal/mol).
              </p>
            </div>
          </Link>

          <Link to="/domains" className="block group">
            <div className="h-full p-4 rounded-lg bg-obsidian-900 border border-white/10 group-hover:border-emerald-cold/50 transition-colors space-y-2">
              <div className="text-[10px] font-mono text-emerald-cold">DISCIPLINE 02</div>
              <div className="text-sm font-bold text-white font-sans">Materials &amp; Superconductors</div>
              <p className="text-xs text-neutral-400 line-clamp-3">
                pymatgen SpacegroupAnalyzer, DFT M3GNet Universal Potentials, and Cubic Born mechanical stability tensor verification.
              </p>
            </div>
          </Link>

          <Link to="/domains" className="block group">
            <div className="h-full p-4 rounded-lg bg-obsidian-900 border border-white/10 group-hover:border-emerald-cold/50 transition-colors space-y-2">
              <div className="text-[10px] font-mono text-emerald-cold">DISCIPLINE 03</div>
              <div className="text-sm font-bold text-white font-sans">Fusion Plasma Physics</div>
              <p className="text-xs text-neutral-400 line-clamp-3">
                Maxon (1972) relativistic Bremsstrahlung power loss, Gamow peak numerical quadrature, and full Lyapunov spectrum QR-Benettin integrators.
              </p>
            </div>
          </Link>

          <Link to="/domains" className="block group">
            <div className="h-full p-4 rounded-lg bg-obsidian-900 border border-white/10 group-hover:border-emerald-cold/50 transition-colors space-y-2">
              <div className="text-[10px] font-mono text-emerald-cold">DISCIPLINE 04</div>
              <div className="text-sm font-bold text-white font-sans">Multimodal Machine Learning</div>
              <p className="text-xs text-neutral-400 line-clamp-3">
                Level 10 GSTM 6-modality cross-attention architecture with 422d latent concatenation and Adaptive Robust Loss (α = 0.90).
              </p>
            </div>
          </Link>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="rounded-xl border border-white/10 bg-gradient-to-r from-obsidian-950 via-obsidian-900 to-obsidian-950 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <h2 className="text-2xl font-bold font-sans text-white">
            Dispatch Your Own Autonomous Scientific Campaign
          </h2>
          <p className="text-xs sm:text-sm text-neutral-400">
            Launch unattended research across molecular conformers, fusion reactor confinement, or condensed matter crystals.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/console"
            className="px-6 py-3 rounded bg-emerald-cold text-black font-mono font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg"
          >
            LAUNCH CONSOLE SANDBOX
          </Link>
          <Link
            to="/campaigns"
            className="px-6 py-3 rounded bg-obsidian-800 border border-white/15 text-neutral-200 font-mono text-xs hover:text-white transition-colors"
          >
            VIEW CAMPAIGN TIMELINE
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
