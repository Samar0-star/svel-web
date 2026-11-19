import React, { useState, useMemo } from 'react';
import MetallicCard from '../components/common/MetallicCard';
import {
  CAMPAIGN_PHASES,
  THE_MORGUE_RECORDS,
} from '../data/campaignsData';
import { calculateSigmoidTemperature } from '../lib/epistemic';
import {
  Clock,
  Skull,
  Search,
  ShieldAlert,
  ChevronRight,
  Sliders,
} from 'lucide-react';

export const CampaignsPage: React.FC = () => {
  // Timeline scrubber state (0 to 72 hours)
  const [currentHour, setCurrentHour] = useState<number>(36);

  // Morgue search & filter state
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedVector, setSelectedVector] = useState<string>('ALL');

  // TCP AIMD simulation state
  const [concurrency, setConcurrency] = useState<number>(18);
  const [aimdHistory, setAimdHistory] = useState<number[]>([20, 20, 14, 15, 16, 17, 18]);

  // Current Phase based on current hour
  const currentPhase = useMemo(() => {
    if (currentHour < 2) return CAMPAIGN_PHASES[0];
    if (currentHour < 6) return CAMPAIGN_PHASES[1];
    if (currentHour < 12) return CAMPAIGN_PHASES[2];
    if (currentHour < 18) return CAMPAIGN_PHASES[3];
    if (currentHour < 24) return CAMPAIGN_PHASES[4];
    if (currentHour < 30) return CAMPAIGN_PHASES[5];
    if (currentHour < 36) return CAMPAIGN_PHASES[6];
    if (currentHour < 44) return CAMPAIGN_PHASES[7];
    if (currentHour < 52) return CAMPAIGN_PHASES[8];
    if (currentHour < 60) return CAMPAIGN_PHASES[9];
    if (currentHour < 66) return CAMPAIGN_PHASES[10];
    if (currentHour < 70) return CAMPAIGN_PHASES[11];
    return CAMPAIGN_PHASES[12] ?? CAMPAIGN_PHASES[11];
  }, [currentHour]);

  // Computed temperature from sigmoidal curve
  const progressRatio = currentHour / 72.0;
  const currentTemperature = calculateSigmoidTemperature(progressRatio);

  // Trigger AIMD 429 simulation
  const simulateRateLimit = () => {
    const decreased = Math.max(1, Math.floor(concurrency * 0.7));
    setConcurrency(decreased);
    setAimdHistory((prev) => [...prev.slice(-9), decreased]);
  };

  const simulateSuccess = () => {
    const increased = Math.min(20, concurrency + 1);
    setConcurrency(increased);
    setAimdHistory((prev) => [...prev.slice(-9), increased]);
  };

  // Filtered morgue records
  const filteredMorgue = useMemo(() => {
    return THE_MORGUE_RECORDS.filter((item) => {
      const matchesSearch =
        searchQuery === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.originalConjecture.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.killReason.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesVector =
        selectedVector === 'ALL' || item.attackVector.includes(selectedVector);

      return matchesSearch && matchesVector;
    });
  }, [searchQuery, selectedVector]);

  const attackVectors = [
    'ALL',
    'Bremsstrahlung Energy Balance',
    'PAINS Toxicophore Screening',
    'Dynamic Phonon Soft-Mode Check',
    'Welch-Z Clash & ITT Dropouts',
    'Cryptographic SHA-256 PoW Audit',
  ];

  return (
    <div className="space-y-16">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-obsidian-800 border border-white/10 text-xs font-mono text-emerald-cold mb-3">
          <Clock className="w-3.5 h-3.5" />
          <span>03 // AUTONOMOUS CAMPAIGNS &amp; THE MORGUE</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          72-Hour Continuous Execution &amp; Semantic Kill-Chain
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-3xl font-sans leading-relaxed">
          Ultron research campaigns operate continuously without human intervention across 12-to-72 hour
          horizons with sigmoidal temperature decay and TCP AIMD congestion backoff. All eliminated conjectures
          are permanently archived in &ldquo;The Morgue&rdquo; to immunize the swarm against duplicate exploration and wasted GPU cycles.
        </p>
      </div>

      {/* 72-Hour Interactive Timeline Emulator */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h2 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
            <Sliders className="w-4 h-4 text-emerald-cold" />
            <span>72-HOUR TIMELINE EMULATOR &amp; SIGMOIDAL TEMPERATURE DECAY</span>
          </h2>
          <span className="text-xs font-mono text-neutral-500">SCRUB HOUR 0 → 72</span>
        </div>

        <MetallicCard title="CAMPAIGN EXECUTION MONITOR" badge={`HOUR ${currentHour}.00 / 72.00`} variant="terminal" glowOnHover>
          <div className="space-y-8">
            {/* Hour Scrubber Slider */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono mb-2">
                <span className="text-neutral-300">SCRUB CAMPAIGN TIMELINE:</span>
                <span className="text-emerald-cold font-bold text-base">
                  {currentHour}h 00m ({((currentHour / 72) * 100).toFixed(1)}% COMPLETE)
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="72"
                step="1"
                value={currentHour}
                onChange={(e) => setCurrentHour(parseInt(e.target.value, 10))}
                className="w-full accent-[#00E599] bg-obsidian-700 rounded-lg cursor-pointer h-2.5"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1.5">
                <span>0h (Seed Discovery)</span>
                <span>18h (Morgue Gate)</span>
                <span>36h (Midpoint Transition)</span>
                <span>54h (Adversarial Falsify)</span>
                <span>72h (Camera Ready)</span>
              </div>
            </div>

            {/* Metrics Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-3 rounded bg-obsidian-900 border border-white/10">
                <div className="text-[10px] font-mono text-neutral-400">CURRENT ACTIVE PHASE</div>
                <div className="text-lg font-mono font-bold text-white mt-1">
                  Phase {currentPhase?.phaseNumber ?? 0}: {currentPhase?.name}
                </div>
                <div className="text-[10px] font-mono text-emerald-cold mt-0.5">
                  Subsystem: {currentPhase?.subsystem}
                </div>
              </div>

              <div className="p-3 rounded bg-obsidian-900 border border-white/10">
                <div className="text-[10px] font-mono text-neutral-400">EXPLORATION TEMPERATURE T</div>
                <div className="text-2xl font-mono font-bold text-emerald-cold mt-1">
                  {currentTemperature.toFixed(4)}
                </div>
                <div className="text-[10px] font-mono text-neutral-500 mt-0.5">
                  {currentTemperature > 0.7
                    ? 'Regime: High Generative Exploration'
                    : currentTemperature > 0.3
                    ? 'Regime: Mid Transition / Refinement'
                    : 'Regime: Cold Deterministic Exploitation'}
                </div>
              </div>

              <div className="p-3 rounded bg-obsidian-900 border border-white/10">
                <div className="text-[10px] font-mono text-neutral-400">SIGMOID FORMULATION</div>
                <div className="text-xs font-mono text-neutral-300 mt-1 font-semibold">
                  T(τ) = 1 / (1 + exp(10 · (τ - 0.5)))
                </div>
                <div className="text-[10px] font-mono text-neutral-500 mt-1">
                  Decays via wall-clock time τ = t / 72h
                </div>
              </div>
            </div>

            {/* Phase Details Card */}
            {currentPhase && (
              <div className="p-4 rounded-lg bg-obsidian-900 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono border-b border-white/5 pb-2">
                  <span className="text-white font-bold">
                    PHASE {currentPhase.phaseNumber} OBJECTIVE: {currentPhase.objective}
                  </span>
                  <span className="text-emerald-cold font-semibold">{currentPhase.hourRange}</span>
                </div>
                <div className="space-y-1 text-xs font-mono text-neutral-300">
                  {currentPhase.details.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <ChevronRight className="w-3.5 h-3.5 text-emerald-cold flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </MetallicCard>
      </section>

      {/* TCP AIMD Congestion Control & AST Syntax Audits Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* TCP AIMD Backoff Card */}
        <MetallicCard title="TCP CONGESTION CONTROL (AIMD BACKOFF)" badge="RATE LIMIT IMMUNITY" glowOnHover>
          <div className="space-y-4">
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              To survive multi-day API rate limits without dropping state, <code className="text-neutral-200 font-mono text-[11px]">GlobalScheduler</code> implements
              explicit TCP Additive Increase / Multiplicative Decrease (AIMD) across model endpoints:
            </p>

            <div className="p-3 rounded bg-obsidian-900 border border-white/10 text-xs font-mono space-y-2">
              <div className="flex justify-between">
                <span className="text-neutral-400">On 429 / 500 Error:</span>
                <span className="text-rose-400 font-bold">C_new = max(1, ⌊0.70 · C_old⌋) (-30%)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400">On 200 OK Success:</span>
                <span className="text-emerald-cold font-bold">C_new = min(C_base, C_old + 1) (+1)</span>
              </div>
            </div>

            {/* Interactive AIMD Simulator Buttons */}
            <div className="flex items-center justify-between pt-2">
              <div className="text-xs font-mono">
                <span className="text-neutral-400">CURRENT CONCURRENCY: </span>
                <span className="text-emerald-cold font-bold text-base">{concurrency} SLOTS</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={simulateRateLimit}
                  className="px-2.5 py-1.5 rounded bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs font-mono hover:bg-rose-900/50 transition-colors"
                >
                  Simulate 429 Drop (-30%)
                </button>
                <button
                  type="button"
                  onClick={simulateSuccess}
                  className="px-2.5 py-1.5 rounded bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs font-mono hover:bg-emerald-900/50 transition-colors"
                >
                  Simulate 200 OK (+1)
                </button>
              </div>
            </div>

            {/* Concurrency Bar Chart */}
            <div className="pt-2">
              <span className="text-[10px] font-mono text-neutral-500 block mb-1">
                RECENT CONCURRENCY ADAPTATION TRAJECTORY:
              </span>
              <div className="flex items-end gap-1.5 h-12 bg-obsidian-900 p-1.5 rounded border border-white/5">
                {aimdHistory.map((val, idx) => (
                  <div key={idx} className="flex-1 flex flex-col justify-end items-center h-full">
                    <div
                      className="w-full bg-emerald-cold/40 border-t border-emerald-cold transition-all rounded-t-sm"
                      style={{ height: `${(val / 20) * 100}%` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </MetallicCard>

        {/* Pre-Execution AST Syntax & Scope Audit Card */}
        <MetallicCard title="PRE-EXECUTION AST &amp; SCOPE AUDIT" badge="SECURITY GATE" glowOnHover>
          <div className="space-y-4">
            <p className="text-xs text-neutral-300 font-sans leading-relaxed">
              Generated simulation scripts pass through Python <code className="text-neutral-200 font-mono text-[11px]">ast.parse()</code> and
              the <code className="text-neutral-200 font-mono text-[11px]">NameVisitor</code> lexical scope stack prior to execution:
            </p>

            <div className="p-3 rounded bg-obsidian-900 border border-white/10 text-xs font-mono space-y-2">
              <div className="text-neutral-400 font-bold">// Prohibited Primitive Tokens:</div>
              <div className="flex flex-wrap gap-1.5">
                {['exec', 'eval', 'system', 'popen', 'spawn', 'fork', 'kill', 'chmod', 'breakpoint'].map((token) => (
                  <span
                    key={token}
                    className="px-1.5 py-0.5 rounded bg-rose-950/40 border border-rose-500/30 text-rose-300 text-[11px]"
                  >
                    {token}
                  </span>
                ))}
              </div>
              <div className="pt-2 border-t border-white/5 text-[11px] text-neutral-400">
                • Scope Stack: Automatically identifies undefined variables across list &amp; dict comprehensions.
              </div>
              <div className="text-[11px] text-neutral-400">
                • Trailing Syntax Scrubbing: Automatically removes hallucinated unmatched parentheses.
              </div>
            </div>

            <div className="p-3 rounded bg-obsidian-800/60 border border-white/10 text-xs text-neutral-300 font-sans">
              <span className="font-bold text-white block mb-1">Igor Code Audit Rules:</span>
              Enforces explicit numpy random seeding, seed isolation, clean variable binding, and
              mandates matplotlib figure closing to prevent memory fragmentation.
            </div>
          </div>
        </MetallicCard>
      </section>

      {/* "The Morgue" Kill-Chain Ledger */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-white/10">
          <div>
            <h2 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
              <Skull className="w-4 h-4 text-rose-400" />
              <span>THE MORGUE // KILL-CHAIN ARCHIVE</span>
            </h2>
            <p className="text-xs text-neutral-400 mt-1">
              Cosine similarity threshold ≥ 0.85 immediately aborts zombie hypotheses before running simulations.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-cold">
            {THE_MORGUE_RECORDS.length} DEAD HYPOTHESES INDEXED
          </span>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dead hypotheses by SHA-256, title, or kill reason..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded bg-obsidian-900 border border-white/10 pl-9 pr-4 py-2 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-cold transition-colors"
            />
          </div>

          <select
            value={selectedVector}
            onChange={(e) => setSelectedVector(e.target.value)}
            className="rounded bg-obsidian-900 border border-white/10 px-3 py-2 text-xs font-mono text-neutral-300 focus:outline-none focus:border-emerald-cold transition-colors"
          >
            {attackVectors.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Morgue Record Cards */}
        <div className="space-y-3">
          {filteredMorgue.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-neutral-500 border border-white/10 rounded-lg bg-obsidian-950">
              No dead hypotheses matching query &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            filteredMorgue.map((record) => (
              <div
                key={record.id}
                className="p-4 sm:p-5 rounded-lg bg-obsidian-900 border border-white/10 hover:border-white/20 transition-all space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-white/5 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-rose-400 font-bold">
                      DEAD_HYPOTHESIS_{record.id}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-obsidian-800 text-[10px] font-mono text-neutral-400 border border-white/10">
                      {record.campaignId}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className="text-emerald-cold">Tokens Saved: {record.tokensSaved}</span>
                    <span className="text-neutral-500">Killed: {record.killedAt.slice(0, 10)}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white font-sans">{record.title}</h3>
                  <p className="text-xs text-neutral-400 mt-1 font-sans italic">
                    &ldquo;{record.originalConjecture}&rdquo;
                  </p>
                </div>

                <div className="p-3 rounded bg-obsidian-950 border border-white/5 text-xs font-mono space-y-1">
                  <div className="text-rose-400 font-semibold flex items-center gap-1.5">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>KILL REASON: {record.killReason}</span>
                  </div>
                  <div className="text-neutral-500 text-[11px]">
                    Killed By: <span className="text-neutral-300">{record.killedBy}</span> // Vector: <span className="text-neutral-300">{record.attackVector}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-neutral-500 pt-1">
                  <span>Cosine Similarity Match: {(record.similarityScore * 100).toFixed(1)}% (Cutoff: ≥ 85.0%)</span>
                  <span className="text-emerald-cold font-semibold">[AUTO-REJECT CONFIRMED]</span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default CampaignsPage;
