import React, { useState, useMemo } from 'react';
import { calculateLogitSlope, detectStatisticalClash } from '../../lib/epistemic';
import { CANONICAL_CONSTANTS } from '../../lib/constants';
import MetallicCard from '../common/MetallicCard';
import { Activity, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const EpistemicSimulator: React.FC = () => {
  // Mode selection: Logit Confidence Slope vs Welch-Z Clash
  const [activeTab, setActiveTab] = useState<'logit' | 'clash'>('logit');

  // Logit Slider State
  const [currentConfidence, setCurrentConfidence] = useState<number>(0.85);
  const [cyclesHistory, setCyclesHistory] = useState<number[]>([0.50, 0.62, 0.74, 0.81, 0.85]);

  // Welch-Z Clash State
  const [newEffect, setNewEffect] = useState<number>(0.85);
  const [newSe, setNewSe] = useState<number>(0.08);
  const [oldEffect, setOldEffect] = useState<number>(0.45);
  const [oldSe, setOldSe] = useState<number>(0.09);

  // Computed Logit
  const logitValue = useMemo(() => {
    const pClipped = Math.min(Math.max(currentConfidence, CANONICAL_CONSTANTS.EPSILON), 1 - CANONICAL_CONSTANTS.EPSILON);
    return Math.log(pClipped / (1 - pClipped));
  }, [currentConfidence]);

  // Computed Slope
  const slopeResult = useMemo(() => {
    try {
      return calculateLogitSlope(cyclesHistory);
    } catch {
      return { slope: 0, isStagnant: true, logitValues: [] };
    }
  }, [cyclesHistory]);

  // Computed Clash
  const clashResult = useMemo(() => {
    try {
      return detectStatisticalClash(newEffect, newSe, oldEffect, oldSe);
    } catch {
      return { zScore: 0, isConflict: false, standardErrorDelta: 0 };
    }
  }, [newEffect, newSe, oldEffect, oldSe]);

  // Preset scenarios
  const applyPreset = (type: 'breakthrough' | 'stagnant' | 'conflict' | 'consensus') => {
    if (type === 'breakthrough') {
      setActiveTab('logit');
      setCyclesHistory([0.50, 0.65, 0.80, 0.92, 0.98]);
      setCurrentConfidence(0.98);
    } else if (type === 'stagnant') {
      setActiveTab('logit');
      setCyclesHistory([0.85, 0.851, 0.850, 0.851, 0.850]);
      setCurrentConfidence(0.85);
    } else if (type === 'conflict') {
      setActiveTab('clash');
      setNewEffect(0.95);
      setNewSe(0.05);
      setOldEffect(0.35);
      setOldSe(0.06);
    } else if (type === 'consensus') {
      setActiveTab('clash');
      setNewEffect(0.60);
      setNewSe(0.08);
      setOldEffect(0.58);
      setOldSe(0.07);
    }
  };

  return (
    <div className="space-y-6">
      {/* Subsystem Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-obsidian-800 border border-white/10 text-[11px] font-mono text-emerald-cold">
            <Activity className="w-3.5 h-3.5" />
            <span>0-TOKEN EPISTEMIC REGULATOR</span>
          </div>
          <h2 className="text-xl font-bold font-sans text-white mt-2">
            Bounded Log-Odds Calculus & Welch-Z Conflict Detection
          </h2>
        </div>

        {/* Tab switchers */}
        <div className="inline-flex p-1 rounded-lg bg-obsidian-900 border border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('logit')}
            className={`px-4 py-1.5 rounded text-xs font-mono transition-colors ${
              activeTab === 'logit'
                ? 'bg-emerald-cold text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            LOGIT SLOPE ln(p/(1-p))
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('clash')}
            className={`px-4 py-1.5 rounded text-xs font-mono transition-colors ${
              activeTab === 'clash'
                ? 'bg-emerald-cold text-black font-bold'
                : 'text-neutral-400 hover:text-white'
            }`}
          >
            WELCH-Z CLASH TEST
          </button>
        </div>
      </div>

      {/* Preset Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
        <span className="text-neutral-500">PRESETS:</span>
        <button
          type="button"
          onClick={() => applyPreset('breakthrough')}
          className="px-2.5 py-1 rounded bg-obsidian-800 border border-white/10 text-neutral-300 hover:border-emerald-cold/50 hover:text-white transition-colors"
        >
          Breakthrough (p=0.98)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('stagnant')}
          className="px-2.5 py-1 rounded bg-obsidian-800 border border-white/10 text-neutral-300 hover:border-amber-400/50 hover:text-white transition-colors"
        >
          Stagnation (|m| &lt; 0.01)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('conflict')}
          className="px-2.5 py-1 rounded bg-obsidian-800 border border-white/10 text-neutral-300 hover:border-rose-400/50 hover:text-white transition-colors"
        >
          Welch Conflict (Z &gt; 2.576)
        </button>
        <button
          type="button"
          onClick={() => applyPreset('consensus')}
          className="px-2.5 py-1 rounded bg-obsidian-800 border border-white/10 text-neutral-300 hover:border-emerald-cold/50 hover:text-white transition-colors"
        >
          Consensus (Z &lt; 1.0)
        </button>
      </div>

      {activeTab === 'logit' ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Interactive Controls */}
          <MetallicCard title="CONFIDENCE PARAMETERS" badge="INTERACTIVE" glowOnHover>
            <div className="space-y-6">
              {/* Single slider */}
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-2">
                  <span className="text-neutral-300">CURRENT CONFIDENCE p:</span>
                  <span className="text-emerald-cold font-bold text-sm">{(currentConfidence * 100).toFixed(1)}%</span>
                </div>
                <input
                  type="range"
                  min="0.0001"
                  max="0.9999"
                  step="0.0001"
                  value={currentConfidence}
                  onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setCurrentConfidence(val);
                    setCyclesHistory((prev) => [...prev.slice(0, 4), val]);
                  }}
                  className="w-full accent-[#00E599] bg-obsidian-700 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                  <span>p → 0.0001 (-11.51)</span>
                  <span>p = 0.50 (0.00)</span>
                  <span>p → 0.9999 (+11.51)</span>
                </div>
              </div>

              {/* 5-Cycle History Scrubbers */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <span className="text-xs font-mono text-neutral-400 block">
                  ROLLING 5-CYCLE VERIFICATION TRAJECTORY:
                </span>
                <div className="grid grid-cols-5 gap-2">
                  {cyclesHistory.map((val, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-[10px] font-mono text-neutral-500 text-center">t{idx}</div>
                      <input
                        type="number"
                        min="0.001"
                        max="0.999"
                        step="0.01"
                        value={val}
                        onChange={(e) => {
                          const num = Math.min(0.999, Math.max(0.001, parseFloat(e.target.value) || 0.5));
                          const newHist = [...cyclesHistory];
                          newHist[idx] = num;
                          setCyclesHistory(newHist);
                        }}
                        className="w-full bg-obsidian-800 border border-white/10 rounded px-1.5 py-1 text-center font-mono text-xs text-white"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Epistemic Thesis Callout */}
              <div className="p-3 rounded bg-obsidian-800/60 border border-white/10 text-xs text-neutral-400 space-y-1">
                <p className="font-semibold text-neutral-200">Why Linear Scoring Fails Near 1.0:</p>
                <p>
                  Linear OLS treats 0.50→0.55 and 0.94→0.99 identically (Δp = +0.05). In log-odds, moving
                  from 0.94 to 0.99 requires an evidence leap of +1.84 log-odds vs +0.20 for the center.
                </p>
              </div>
            </div>
          </MetallicCard>

          {/* Right Column: Mathematical Output & Diagnostics */}
          <MetallicCard title="CALCULATED EPISTEMIC STATE" badge="0-TOKEN METRICS" variant="terminal" glowOnHover>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-obsidian-900 border border-white/10">
                  <div className="text-[10px] font-mono text-neutral-400">LOGIT DERIVATIVE y</div>
                  <div className="text-2xl font-mono font-bold text-white mt-1">
                    {logitValue > 0 ? `+${logitValue.toFixed(4)}` : logitValue.toFixed(4)}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-1">
                    ln({currentConfidence.toFixed(4)} / {(1 - currentConfidence).toFixed(4)})
                  </div>
                </div>

                <div className="p-3 rounded bg-obsidian-900 border border-white/10">
                  <div className="text-[10px] font-mono text-neutral-400">LOGIT OLS SLOPE m</div>
                  <div className={`text-2xl font-mono font-bold mt-1 ${
                    slopeResult.isStagnant ? 'text-amber-400' : 'text-emerald-cold'
                  }`}>
                    {slopeResult.slope > 0 ? `+${slopeResult.slope.toFixed(4)}` : slopeResult.slope.toFixed(4)}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-1">
                    Threshold: |m| ≥ 0.01
                  </div>
                </div>
              </div>

              {/* Status Banner */}
              <div className={`p-3 rounded border flex items-center gap-3 ${
                slopeResult.isStagnant
                  ? 'bg-amber-950/20 border-amber-500/30 text-amber-300'
                  : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
              }`}>
                {slopeResult.isStagnant ? (
                  <>
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 text-amber-400" />
                    <div className="text-xs font-mono">
                      <div className="font-bold">STAGNATION DETECTED (|m| &lt; 0.01)</div>
                      <div className="text-amber-400/80">Triggering structured hypothesis mutator &amp; variance injection.</div>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-cold" />
                    <div className="text-xs font-mono">
                      <div className="font-bold">EPISTEMIC VELOCITY ACTIVE (m = {slopeResult.slope.toFixed(4)})</div>
                      <div className="text-emerald-400/80">Evidence accumulation is actively evolving the belief state.</div>
                    </div>
                  </>
                )}
              </div>

              {/* Transformed Values Bar Visualizer */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono text-neutral-400 block">
                  LOGIT VALUES ACROSS CYCLES (y_t):
                </span>
                <div className="space-y-1.5 font-mono text-xs">
                  {slopeResult.logitValues.map((yVal, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <span className="w-8 text-neutral-500 text-[10px]">t{i}:</span>
                      <div className="flex-1 bg-obsidian-900 rounded h-4 overflow-hidden relative border border-white/5">
                        <div
                          className="h-full bg-emerald-cold/30 border-r border-emerald-cold transition-all"
                          style={{
                            width: `${Math.min(100, Math.max(5, ((yVal + 11.5) / 23) * 100))}%`,
                          }}
                        />
                      </div>
                      <span className="w-16 text-right text-neutral-300 text-[11px]">
                        {yVal > 0 ? `+${yVal.toFixed(2)}` : yVal.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MetallicCard>
        </div>
      ) : (
        /* Welch-Z Conflict Detection Tab */
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MetallicCard title="ESTIMATE INPUT PARAMETERS" badge="EMPIRICAL" glowOnHover>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-emerald-cold block font-semibold">
                    NEW EXPERIMENT (θ_new)
                  </span>
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 block">EFFECT SIZE μ</label>
                    <input
                      type="number"
                      step="0.01"
                      value={newEffect}
                      onChange={(e) => setNewEffect(parseFloat(e.target.value) || 0)}
                      className="w-full bg-obsidian-800 border border-white/10 rounded px-2.5 py-1.5 font-mono text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 block">STANDARD ERROR SE</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.001"
                      value={newSe}
                      onChange={(e) => setNewSe(Math.max(0.001, parseFloat(e.target.value) || 0.01))}
                      className="w-full bg-obsidian-800 border border-white/10 rounded px-2.5 py-1.5 font-mono text-xs text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono text-neutral-400 block font-semibold">
                    PRIOR FINDING (θ_old)
                  </span>
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 block">EFFECT SIZE μ</label>
                    <input
                      type="number"
                      step="0.01"
                      value={oldEffect}
                      onChange={(e) => setOldEffect(parseFloat(e.target.value) || 0)}
                      className="w-full bg-obsidian-800 border border-white/10 rounded px-2.5 py-1.5 font-mono text-xs text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-mono text-neutral-400 block">STANDARD ERROR SE</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.001"
                      value={oldSe}
                      onChange={(e) => setOldSe(Math.max(0.001, parseFloat(e.target.value) || 0.01))}
                      className="w-full bg-obsidian-800 border border-white/10 rounded px-2.5 py-1.5 font-mono text-xs text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 rounded bg-obsidian-800/60 border border-white/10 text-xs text-neutral-400 space-y-1">
                <span className="font-semibold text-neutral-200">Decision Rule (p &lt; 0.01):</span>
                <p>
                  Z = |μ_new - μ_old| / √(SE_new² + SE_old²). If Z &gt; 2.576, the Epistemic Reaper
                  flags an irreconcilable empirical conflict, halting belief propagation.
                </p>
              </div>
            </div>
          </MetallicCard>

          <MetallicCard title="WELCH-Z CLASH DECISION" badge="CONFIDENCE p < 0.01" variant="terminal" glowOnHover>
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 rounded bg-obsidian-900 border border-white/10">
                  <div className="text-[10px] font-mono text-neutral-400">TEST STATISTIC Z</div>
                  <div className={`text-2xl font-mono font-bold mt-1 ${
                    clashResult.isConflict ? 'text-rose-400' : 'text-emerald-cold'
                  }`}>
                    {clashResult.zScore.toFixed(4)}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-1">
                    Cutoff: 2.576 (p = 0.01)
                  </div>
                </div>

                <div className="p-3 rounded bg-obsidian-900 border border-white/10">
                  <div className="text-[10px] font-mono text-neutral-400">ABSOLUTE DELTA |Δ|</div>
                  <div className="text-2xl font-mono font-bold text-white mt-1">
                    {clashResult.standardErrorDelta.toFixed(4)}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-500 mt-1">
                    Pooled SE: {Math.sqrt(newSe * newSe + oldSe * oldSe).toFixed(4)}
                  </div>
                </div>
              </div>

              <div className={`p-4 rounded border flex items-center gap-3 ${
                clashResult.isConflict
                  ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
                  : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
              }`}>
                {clashResult.isConflict ? (
                  <>
                    <AlertTriangle className="w-6 h-6 flex-shrink-0 text-rose-400" />
                    <div className="text-xs font-mono">
                      <div className="font-bold text-sm">EMPIRICAL CONFLICT DETECTED (Z = {clashResult.zScore.toFixed(2)} &gt; 2.576)</div>
                      <div className="text-rose-400/80 mt-0.5">
                        Irreconcilable discrepancy between new finding and prior ground truth. Evidence propagation halted.
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-6 h-6 flex-shrink-0 text-emerald-cold" />
                    <div className="text-xs font-mono">
                      <div className="font-bold text-sm">STATISTICAL CONSENSUS (Z = {clashResult.zScore.toFixed(2)} ≤ 2.576)</div>
                      <div className="text-emerald-400/80 mt-0.5">
                        New finding is statistically compatible with prior belief distributions.
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="text-xs font-mono text-neutral-400 space-y-1">
                <div className="flex justify-between">
                  <span>CLASH STATUS:</span>
                  <span className={clashResult.isConflict ? 'text-rose-400 font-bold' : 'text-emerald-cold font-bold'}>
                    {clashResult.isConflict ? 'REAPER_UPDATE: CONFLICT' : 'REAPER_UPDATE: CONSISTENT'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>TWO-TAILED SIGNIFICANCE:</span>
                  <span className="text-neutral-300">
                    {clashResult.zScore > 2.576 ? 'p < 0.01' : clashResult.zScore > 1.96 ? 'p < 0.05' : 'p > 0.05 (Not Significant)'}
                  </span>
                </div>
              </div>
            </div>
          </MetallicCard>
        </div>
      )}
    </div>
  );
};

export default EpistemicSimulator;
