import React, { useState } from 'react';
import MetallicCard from '../components/common/MetallicCard';
import { DOMAINS_DATA, DomainKernel } from '../data/domainsData';
import {
  verifyCubicBornStability,
} from '../lib/materials';
import {
  relativisticBremsstrahlung,
  kaplanYorkeDimension,
} from '../lib/physics';
import {
  Dna,
  Atom,
  Flame,
  Network,
  CheckCircle2,
  Code,
  Calculator,
  Layers,
} from 'lucide-react';

export const DomainsPage: React.FC = () => {
  const [activeDomainId, setActiveDomainId] = useState<DomainKernel['id']>('genomics');

  // Materials Interactive Born Calculator State
  const [c11, setC11] = useState<number>(150.0);
  const [c12, setC12] = useState<number>(50.0);
  const [c44, setC44] = useState<number>(75.0);

  // Fusion Interactive Bremsstrahlung State
  const [teKeV, setTeKeV] = useState<number>(50.0);
  const [npVal, setNpVal] = useState<number>(1e20);
  const [nBVal, setNBVal] = useState<number>(1e20);

  // Fusion Interactive Lyapunov State
  const [lyap1, setLyap1] = useState<number>(0.15);
  const [lyap2, setLyap2] = useState<number>(0.0);
  const [lyap3, setLyap3] = useState<number>(-0.40);

  const activeDomain = DOMAINS_DATA.find((d) => d.id === activeDomainId) || DOMAINS_DATA[0]!;

  // Computed Materials Born Stability
  const bornResult = verifyCubicBornStability(c11, c12, c44);

  // Computed Fusion Bremsstrahlung
  const bremResult = relativisticBremsstrahlung(teKeV, npVal, nBVal);

  // Computed Fusion Lyapunov
  const lyapResult = kaplanYorkeDimension([lyap1, lyap2, lyap3]);

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div>
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-obsidian-800 border border-white/10 text-xs font-mono text-emerald-cold mb-3">
          <Layers className="w-3.5 h-3.5" />
          <span>04 // SCIENTIFIC DISCIPLINES &amp; DOMAIN KERNELS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
          Deterministic Domain Simulation Kernels
        </h1>
        <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-3xl font-sans leading-relaxed">
          Ultron grounds reasoning in verified numerical libraries (RDKit, AutoDock Vina, pymatgen, M3GNet), Cubic Born stability criteria, physics engines (Bremsstrahlung), and biostatistical protocols
          across molecular pharmacology, condensed matter lattices, relativistic plasma fusion, and
          multimodal frontier AI.
        </p>
      </div>

      {/* Domain Navigation Tabs */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-white/10">
        <button
          type="button"
          onClick={() => setActiveDomainId('genomics')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-mono transition-all ${
            activeDomainId === 'genomics'
              ? 'bg-obsidian-800 border-emerald-cold text-white shadow-lg'
              : 'bg-obsidian-900 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
          }`}
        >
          <Dna className="w-4 h-4 text-emerald-cold" />
          <span>{'GENOMICS & MEDICINE'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveDomainId('materials')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-mono transition-all ${
            activeDomainId === 'materials'
              ? 'bg-obsidian-800 border-emerald-cold text-white shadow-lg'
              : 'bg-obsidian-900 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
          }`}
        >
          <Atom className="w-4 h-4 text-emerald-cold" />
          <span>{'MATERIALS & CONDENSED MATTER'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveDomainId('fusion')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-mono transition-all ${
            activeDomainId === 'fusion'
              ? 'bg-obsidian-800 border-emerald-cold text-white shadow-lg'
              : 'bg-obsidian-900 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
          }`}
        >
          <Flame className="w-4 h-4 text-emerald-cold" />
          <span>{'FUSION & PLASMA PHYSICS'}</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveDomainId('multimodal-ml')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-xs font-mono transition-all ${
            activeDomainId === 'multimodal-ml'
              ? 'bg-obsidian-800 border-emerald-cold text-white shadow-lg'
              : 'bg-obsidian-900 border-white/10 text-neutral-400 hover:text-white hover:border-white/20'
          }`}
        >
          <Network className="w-4 h-4 text-emerald-cold" />
          <span>{'MULTIMODAL MACHINE LEARNING'} (GSTM FUSION)</span>
        </button>
      </div>

      {/* Domain Overview Banner */}
      <section className="p-6 sm:p-8 rounded-xl bg-obsidian-900 border border-white/10 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-white/5 pb-4">
          <div>
            <span className="text-[10px] font-mono text-emerald-cold block font-semibold">
              {activeDomain.discipline.toUpperCase()}
            </span>
            <h2 className="text-2xl font-bold font-sans text-white mt-1">
              {activeDomain.title}
            </h2>
            <p className="text-xs text-neutral-400 font-mono mt-0.5">
              {activeDomain.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded bg-obsidian-800 border border-white/10 text-xs font-mono text-emerald-cold">
              {activeDomain.badge}
            </span>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-neutral-300 font-sans leading-relaxed">
          {activeDomain.description}
        </p>
      </section>

      {/* Equations & Formulas Breakdown */}
      <section className="space-y-4">
        <h3 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2 pb-2 border-b border-white/10">
          <Calculator className="w-4 h-4 text-emerald-cold" />
          <span>GROUND-TRUTH MATHEMATICAL FORMULATIONS</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {activeDomain.equations.map((eq, i) => (
            <div
              key={i}
              className="p-4 rounded-lg bg-obsidian-900 border border-white/10 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="text-xs font-mono text-emerald-cold font-semibold block">
                  {eq.name}
                </span>
                <div className="p-2.5 rounded bg-obsidian-950 border border-white/5 font-mono text-xs text-white break-words">
                  <code>{eq.latex}</code>
                </div>
              </div>
              <p className="text-[11px] text-neutral-400 font-sans leading-relaxed">
                {eq.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Domain Specific Interactive Simulators */}
      {activeDomainId === 'materials' && (
        <section className="space-y-4">
          <h3 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2 pb-2 border-b border-white/10">
            <Atom className="w-4 h-4 text-emerald-cold" />
            <span>INTERACTIVE CUBIC BORN STABILITY CALCULATOR</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MetallicCard title="ELASTIC TENSOR COEFFICIENTS (GPa)" badge="INPUTS" glowOnHover>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-mono text-neutral-300 block mb-1">
                    C11 (Longitudinal Modulus): {c11} GPa
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="500"
                    step="5"
                    value={c11}
                    onChange={(e) => setC11(parseFloat(e.target.value))}
                    className="w-full accent-[#00E599] bg-obsidian-700 rounded h-2"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-300 block mb-1">
                    C12 (Transverse Coupling): {c12} GPa
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="400"
                    step="5"
                    value={c12}
                    onChange={(e) => setC12(parseFloat(e.target.value))}
                    className="w-full accent-[#00E599] bg-obsidian-700 rounded h-2"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-300 block mb-1">
                    C44 (Shear Resistance): {c44} GPa
                  </label>
                  <input
                    type="range"
                    min="-50"
                    max="300"
                    step="5"
                    value={c44}
                    onChange={(e) => setC44(parseFloat(e.target.value))}
                    className="w-full accent-[#00E599] bg-obsidian-700 rounded h-2"
                  />
                </div>
              </div>
            </MetallicCard>

            <MetallicCard title="BORN MECHANICAL STABILITY EVALUATION" badge="OUTPUT" variant="terminal" glowOnHover>
              <div className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded bg-obsidian-900 border border-white/10">
                    <span className="text-[10px] text-neutral-400 block">VOIGT BULK MODULUS K:</span>
                    <span className="text-xl font-bold text-white mt-1 block">
                      {bornResult.K_bulk_GPa.toFixed(2)} GPa
                    </span>
                  </div>
                  <div className="p-3 rounded bg-obsidian-900 border border-white/10">
                    <span className="text-[10px] text-neutral-400 block">VOIGT SHEAR MODULUS G:</span>
                    <span className="text-xl font-bold text-white mt-1 block">
                      {bornResult.G_shear_GPa.toFixed(2)} GPa
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 p-3 rounded bg-obsidian-900 border border-white/10">
                  <div className="flex justify-between">
                    <span>1. C11 - C12 &gt; 0:</span>
                    <span className={bornResult.bornChecks.c11MinusC12 ? 'text-emerald-cold' : 'text-rose-400'}>
                      {(c11 - c12).toFixed(1)} GPa ({bornResult.bornChecks.c11MinusC12 ? 'PASS' : 'FAIL'})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>2. C11 + 2·C12 &gt; 0:</span>
                    <span className={bornResult.bornChecks.c11Plus2C12 ? 'text-emerald-cold' : 'text-rose-400'}>
                      {(c11 + 2 * c12).toFixed(1)} GPa ({bornResult.bornChecks.c11Plus2C12 ? 'PASS' : 'FAIL'})
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>3. C44 &gt; 0:</span>
                    <span className={bornResult.bornChecks.c44 ? 'text-emerald-cold' : 'text-rose-400'}>
                      {c44.toFixed(1)} GPa ({bornResult.bornChecks.c44 ? 'PASS' : 'FAIL'})
                    </span>
                  </div>
                </div>

                <div className={`p-3 rounded border font-bold text-center ${
                  bornResult.isMechanicallyStable
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-emerald-cold'
                    : 'bg-rose-950/20 border-rose-500/40 text-rose-400'
                }`}>
                  {bornResult.isMechanicallyStable
                    ? 'MECHANICALLY STABLE (POSITIVE-DEFINITE STRAIN ENERGY)'
                    : 'MECHANICALLY UNSTABLE (SPONTANEOUS LATTICE COLLAPSE)'}
                </div>
              </div>
            </MetallicCard>
          </div>
        </section>
      )}

      {activeDomainId === 'fusion' && (
        <section className="space-y-4">
          <h3 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2 pb-2 border-b border-white/10">
            <Flame className="w-4 h-4 text-emerald-cold" />
            <span>INTERACTIVE RELATIVISTIC BREMSSTRAHLUNG &amp; LYAPUNOV SPECTRUM</span>
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MetallicCard title="RELATIVISTIC BREMSSTRAHLUNG LOSS (MAXON 1972)" badge="p-11B FUEL" glowOnHover>
              <div className="space-y-4 text-xs font-mono">
                <div>
                  <label className="text-neutral-300 block mb-1">
                    ELECTRON TEMPERATURE Te: {teKeV} keV
                  </label>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={teKeV}
                    onChange={(e) => setTeKeV(parseFloat(e.target.value))}
                    className="w-full accent-[#00E599] bg-obsidian-700 rounded h-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">
                      PROTON DENSITY np (cm⁻³):
                    </label>
                    <input
                      type="number"
                      step="1e19"
                      value={npVal}
                      onChange={(e) => setNpVal(Math.max(1e18, parseFloat(e.target.value) || 1e20))}
                      className="w-full bg-obsidian-800 border border-white/10 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">
                      BORON DENSITY nB (cm⁻³):
                    </label>
                    <input
                      type="number"
                      step="1e19"
                      value={nBVal}
                      onChange={(e) => setNBVal(Math.max(1e18, parseFloat(e.target.value) || 1e20))}
                      className="w-full bg-obsidian-800 border border-white/10 rounded px-2 py-1 text-white text-xs"
                    />
                  </div>
                </div>

                <div className="p-3 rounded bg-obsidian-900 border border-white/10 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Gaunt Factor g_rel:</span>
                    <span className="text-emerald-cold font-bold">{bremResult.g_rel.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Effective Charge Z_eff²:</span>
                    <span className="text-white font-bold">{bremResult.Z_eff_sq.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Volumetric Power Loss:</span>
                    <span className="text-white font-bold">{bremResult.P_brem_W_cm3.toExponential(4)} W/cm³</span>
                  </div>
                </div>
              </div>
            </MetallicCard>

            <MetallicCard title="LYAPUNOV CHAOS &amp; KAPLAN-YORKE DIMENSION" badge="QR-BENETTIN" variant="terminal" glowOnHover>
              <div className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-neutral-400 block">λ₁ (Divergence)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={lyap1}
                      onChange={(e) => setLyap1(parseFloat(e.target.value) || 0)}
                      className="w-full bg-obsidian-800 border border-white/10 rounded px-2 py-1 text-center text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block">λ₂ (Neutral)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={lyap2}
                      onChange={(e) => setLyap2(parseFloat(e.target.value) || 0)}
                      className="w-full bg-obsidian-800 border border-white/10 rounded px-2 py-1 text-center text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block">λ₃ (Dissipation)</label>
                    <input
                      type="number"
                      step="0.05"
                      value={lyap3}
                      onChange={(e) => setLyap3(parseFloat(e.target.value) || 0)}
                      className="w-full bg-obsidian-800 border border-white/10 rounded px-2 py-1 text-center text-white"
                    />
                  </div>
                </div>

                <div className="p-3 rounded bg-obsidian-900 border border-white/10 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Kaplan-Yorke Dimension D_KY:</span>
                    <span className="text-emerald-cold font-bold text-base">{lyapResult.D_KY.toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-400">Chaos Classification (λ₁ &gt; 0.01):</span>
                    <span className={lyapResult.isChaotic ? 'text-rose-400 font-bold' : 'text-emerald-cold font-bold'}>
                      {lyapResult.isChaotic ? 'TURBULENT / CHAOTIC' : 'LAMINAR / REGULAR'}
                    </span>
                  </div>
                </div>
              </div>
            </MetallicCard>
          </div>
        </section>
      )}

      {/* Parameter Table & Execution Criteria */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Parameters */}
        <MetallicCard title="CANONICAL CONSTANTS &amp; THRESHOLDS" badge="NUMERICAL FLOORS" glowOnHover>
          <div className="divide-y divide-white/5 text-xs font-mono">
            {activeDomain.parameters.map((param, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between gap-4">
                <div>
                  <span className="text-white font-semibold">{param.name}</span>
                  <span className="text-neutral-500 text-[10px] block mt-0.5">{param.note}</span>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-emerald-cold font-bold">{param.value}</span>
                  <span className="text-neutral-400 text-[10px] ml-1">{param.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </MetallicCard>

        {/* Verdict Criteria */}
        <MetallicCard title="GATE VERIFICATION CHECKLIST" badge="EPISTEMIC PASS" glowOnHover>
          <div className="space-y-3 text-xs font-mono">
            {activeDomain.verdictCriteria.map((criterion, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-cold flex-shrink-0 mt-0.5" />
                <span className="text-neutral-300 font-sans">{criterion}</span>
              </div>
            ))}
          </div>
        </MetallicCard>
      </section>

      {/* Verbatim Code Kernel */}
      <section className="space-y-3">
        <h3 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2 pb-2 border-b border-white/10">
          <Code className="w-4 h-4 text-emerald-cold" />
          <span>AUTONOMOUS EXECUTION KERNEL IMPLEMENTATION</span>
        </h3>

        <div className="rounded-lg border border-white/10 bg-obsidian-950 p-4 font-mono text-xs overflow-x-auto text-neutral-300">
          <pre>{activeDomain.codeSnippet}</pre>
        </div>
      </section>
    </div>
  );
};

export default DomainsPage;
