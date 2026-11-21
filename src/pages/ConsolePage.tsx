import React, { useState } from 'react';
import MetallicCard from '../components/common/MetallicCard';
import TelemetryTerminal from '../components/console/TelemetryTerminal';
import EpistemicSimulator from '../components/simulations/EpistemicSimulator';
import AccessModal from '../components/console/AccessModal';
import {
  Terminal as TerminalIcon,
  Play,
  Key,
  Cpu,
  Settings2,
  CheckCircle2,
} from 'lucide-react';

export const ConsolePage: React.FC = () => {
  const [isAccessModalOpen, setIsAccessModalOpen] = useState<boolean>(false);
  const [selectedDomain, setSelectedDomain] = useState<string>('Genomics & Medicine');
  const [campaignHours, setCampaignHours] = useState<number>(24);
  const [adversarialRigor, setAdversarialRigor] = useState<number>(0.85);
  const [isDispatched, setIsDispatched] = useState<boolean>(false);

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDispatched(true);
    setTimeout(() => setIsDispatched(false), 4000);
  };

  return (
    <div className="space-y-16">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-obsidian-800 border border-white/10 text-xs font-mono text-emerald-cold mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>05 // INTERACTIVE SCIENTIFIC CONSOLE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
            Live Telemetry Terminal &amp; Epistemic Sandbox
          </h1>
          <p className="text-neutral-400 text-sm sm:text-base mt-3 max-w-3xl font-sans leading-relaxed">
            Monitor real-time streaming execution traces from autonomous research runs, simulate log-odds
            confidence slopes, test empirical conflict detection, or request credentials to dispatch custom campaigns.
          </p>
        </div>

        <div className="flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsAccessModalOpen(true)}
            aria-haspopup="dialog"
            className="px-5 py-2.5 rounded bg-emerald-cold text-black font-mono font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-950/20 inline-flex items-center gap-2"
          >
            <Key className="w-4 h-4" />
            <span>REQUEST ACCESS</span>
          </button>
        </div>
      </div>

      {/* Real-Time Live Streaming Telemetry Terminal */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 pb-2 border-b border-white/10">
          <h2 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
            <TerminalIcon className="w-4 h-4 text-emerald-cold" />
            <span>Live Telemetry Terminal &amp; Trace Stream</span>
          </h2>
          <span className="text-xs font-mono text-neutral-400">
            Streaming [RIGOR-VERIFIED] PoW weight hashes and [MORGUE] scar tissue events
          </span>
        </div>

        <TelemetryTerminal maxLogs={150} streamingIntervalMs={1800} />
      </section>

      {/* Experiment Control & Dispatch Panel */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h2 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
            <Settings2 className="w-4 h-4 text-emerald-cold" />
            <span>CAMPAIGN DISPATCH CONTROLS</span>
          </h2>
          <span className="text-xs font-mono text-neutral-500">SANDBOX CLUSTER ALLOCATION</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <MetallicCard title="CONFIGURE RESEARCH RUN" badge="CLUSTER ARC-04" glowOnHover>
              <form onSubmit={handleDispatch} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      TARGET SCIENTIFIC DOMAIN
                    </label>
                    <select
                      value={selectedDomain}
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      className="w-full rounded bg-obsidian-800 border border-white/10 px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-emerald-cold transition-colors"
                    >
                      <option value="Genomics & Medicine">Genomics & Medicine (ITT, Vina)</option>
                      <option value="Materials & Condensed Matter">Materials & Condensed Matter (pymatgen, M3GNet)</option>
                      <option value="Fusion & Plasma Physics">Fusion & Plasma Physics (Bremsstrahlung, Gamow)</option>
                      <option value="Multimodal ML">Multimodal ML (GSTM 422d Fusion)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      CAMPAIGN HORIZON: {campaignHours} HOURS
                    </label>
                    <input
                      type="range"
                      min="12"
                      max="72"
                      step="6"
                      value={campaignHours}
                      onChange={(e) => setCampaignHours(parseInt(e.target.value, 10))}
                      className="w-full accent-[#00E599] bg-obsidian-700 rounded h-2 mt-2"
                    />
                    <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                      <span>12h (Rapid Scan)</span>
                      <span>36h (Standard)</span>
                      <span>72h (Deep Discovery)</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-neutral-300 mb-1">
                    ADVERSARIAL RIGOR FLOOR (UNBREAKABILITY INDEX U ≥ {adversarialRigor})
                  </label>
                  <input
                    type="range"
                    min="0.50"
                    max="0.95"
                    step="0.05"
                    value={adversarialRigor}
                    onChange={(e) => setAdversarialRigor(parseFloat(e.target.value))}
                    className="w-full accent-[#00E599] bg-obsidian-700 rounded h-2"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-neutral-500 mt-1">
                    <span>U ≥ 0.50 (Permissive)</span>
                    <span>U ≥ 0.80 (Peer Review)</span>
                    <span>U ≥ 0.95 (Ph.D. Strict)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <div className="text-xs font-mono text-neutral-400">
                    ESTIMATED UNIT COMPUTE: <span className="text-emerald-cold font-bold">$3.25 / RUN</span>
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded bg-emerald-cold text-black font-mono font-bold text-xs hover:bg-emerald-400 transition-colors inline-flex items-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-black" />
                    <span>DISPATCH CAMPAIGN RUN</span>
                  </button>
                </div>

                {isDispatched && (
                  <div className="p-3 rounded bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-cold flex-shrink-0" />
                    <span>
                      Campaign dispatched to GodModeSandbox cluster: Domain={selectedDomain}, Horizon={campaignHours}h, Rigor={adversarialRigor}.
                    </span>
                  </div>
                )}
              </form>
            </MetallicCard>
          </div>

          <div>
            <MetallicCard title="CREDENTIALS &amp; API TOKENS" badge="INVITE ONLY" variant="terminal" glowOnHover>
              <div className="space-y-4 text-xs font-mono">
                <p className="text-neutral-300 font-sans leading-relaxed">
                  Connect to Svel ARC compute clusters for multi-day autonomous research campaigns.
                </p>

                <div className="p-3 rounded bg-obsidian-900 border border-white/10 space-y-2">
                  <div className="text-[10px] text-neutral-500">API RATE LIMIT SPECS:</div>
                  <div className="text-neutral-300">• Token Bucket: 100k TPM / 2,000 RPM</div>
                  <div className="text-neutral-300">• TCP AIMD Concurrency: 20 slots</div>
                  <div className="text-neutral-300">• PoW Weight Audit: SHA-256 Armed</div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAccessModalOpen(true)}
                  className="w-full py-2.5 rounded bg-obsidian-800 border border-white/15 text-neutral-200 font-mono text-xs font-semibold hover:border-emerald-cold/40 hover:text-white transition-colors"
                >
                  REQUEST RESEARCH API CREDENTIALS
                </button>
              </div>
            </MetallicCard>
          </div>
        </div>
      </section>

      {/* Epistemic Simulator Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-white/10">
          <h2 className="text-sm font-mono font-bold text-white tracking-wider flex items-center gap-2">
            <Cpu className="w-4 h-4 text-emerald-cold" />
            <span>EPISTEMIC SIMULATION WORKBENCH</span>
          </h2>
          <span className="text-xs font-mono text-neutral-500">LOGIT SLIDER &amp; WELCH-Z</span>
        </div>

        <EpistemicSimulator />
      </section>

      {/* Access Modal Dialog */}
      <AccessModal
        isOpen={isAccessModalOpen}
        onClose={() => setIsAccessModalOpen(false)}
      />
    </div>
  );
};

export default ConsolePage;
