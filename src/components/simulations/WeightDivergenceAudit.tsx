import React, { useState } from 'react';
import MetallicCard from '../common/MetallicCard';
import { ShieldCheck, AlertOctagon, RefreshCw, Lock, Terminal } from 'lucide-react';

export const WeightDivergenceAudit: React.FC = () => {
  const [initialHash] = useState<string>('893cb8678404f06872d81f4047ab3fffe899ab8d8df1304eea9a8f20761e04fb');
  const [nonce, setNonce] = useState<string>('7f3b89e210ac');
  const [gradientNorm, setGradientNorm] = useState<number>(0.041829);
  const [isAuditing, setIsAuditing] = useState<boolean>(false);
  const [scenario, setScenario] = useState<'legitimate' | 'simulation_fraud' | 'noise_injection'>('legitimate');

  const runAudit = (targetScenario: 'legitimate' | 'simulation_fraud' | 'noise_injection') => {
    setIsAuditing(true);
    setScenario(targetScenario);

    setTimeout(() => {
      // Generate fresh 12-char hex nonce
      const newNonce = Array.from({ length: 12 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
      setNonce(newNonce);

      if (targetScenario === 'legitimate') {
        setGradientNorm(0.041829);
      } else if (targetScenario === 'simulation_fraud') {
        setGradientNorm(0.0);
      } else {
        setGradientNorm(8.4e-8); // Below 1e-5 threshold
      }
      setIsAuditing(false);
    }, 600);
  };

  const finalHash =
    scenario === 'simulation_fraud'
      ? initialHash
      : '3a19dc8e7714890bf231405a189fec001b9ca92837f1938501289df718293a84';

  const isVerified = scenario === 'legitimate';
  const isFraud = scenario === 'simulation_fraud';

  return (
    <MetallicCard title="CRYPTOGRAPHIC PROOF-OF-WORK AUDIT" badge="SVEL RIGOR" variant="terminal" glowOnHover>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs font-mono pb-2 border-b border-white/10">
          <span className="text-neutral-400">TEST ATTACK SCENARIOS:</span>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => runAudit('legitimate')}
              className={`px-2.5 py-1 rounded border text-[11px] transition-colors ${
                scenario === 'legitimate'
                  ? 'bg-emerald-cold text-black font-bold border-emerald-cold'
                  : 'bg-obsidian-800 text-neutral-300 border-white/10 hover:border-emerald-cold/40'
              }`}
            >
              Legitimate PyTorch Run
            </button>
            <button
              type="button"
              onClick={() => runAudit('simulation_fraud')}
              className={`px-2.5 py-1 rounded border text-[11px] transition-colors ${
                scenario === 'simulation_fraud'
                  ? 'bg-rose-500 text-white font-bold border-rose-500'
                  : 'bg-obsidian-800 text-neutral-300 border-white/10 hover:border-rose-400/40'
              }`}
            >
              Zero-Weight Fraud
            </button>
            <button
              type="button"
              onClick={() => runAudit('noise_injection')}
              className={`px-2.5 py-1 rounded border text-[11px] transition-colors ${
                scenario === 'noise_injection'
                  ? 'bg-amber-500 text-black font-bold border-amber-500'
                  : 'bg-obsidian-800 text-neutral-300 border-white/10 hover:border-amber-400/40'
              }`}
            >
              Noise Injection (1e-8)
            </button>
          </div>
        </div>

        {/* Cryptographic Hashes Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3 rounded bg-obsidian-900 border border-white/10 space-y-1.5">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px]">
              <Lock className="w-3 h-3 text-emerald-cold" />
              <span>PRE-TRAINING WEIGHT HASH (LOCKED):</span>
            </div>
            <div className="text-[11px] text-neutral-200 break-all select-all font-mono">
              SHA-256: {initialHash}
            </div>
            <div className="text-[10px] text-neutral-500">
              Parameter count: 48,220 differentiable tensors
            </div>
          </div>

          <div className="p-3 rounded bg-obsidian-900 border border-white/10 space-y-1.5">
            <div className="flex items-center gap-1.5 text-neutral-400 text-[10px]">
              <Terminal className="w-3 h-3 text-emerald-cold" />
              <span>POST-TRAINING WEIGHT HASH:</span>
            </div>
            <div className={`text-[11px] break-all select-all font-mono ${
              isFraud ? 'text-rose-400' : 'text-neutral-200'
            }`}>
              SHA-256: {finalHash}
            </div>
            <div className="text-[10px] text-neutral-500">
              Divergence status: {finalHash === initialHash ? 'ZERO WEIGHT DELTA (IDENTICAL)' : 'PHYSICAL DIVERGENCE DETECTED'}
            </div>
          </div>
        </div>

        {/* Gradient Norm vs Threshold */}
        <div className="p-3 rounded bg-obsidian-900 border border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
          <div>
            <span className="text-[10px] text-neutral-400 block">TOTAL GRADIENT NORM ||∇W||:</span>
            <span className={`text-base font-bold mt-0.5 block ${
              isVerified ? 'text-emerald-cold' : isFraud ? 'text-rose-400' : 'text-amber-400'
            }`}>
              {gradientNorm > 0 ? gradientNorm.toExponential(4) : '0.0000'}
            </span>
          </div>

          <div>
            <span className="text-[10px] text-neutral-400 block">PH.D. SIGNIFICANCE FLOOR:</span>
            <span className="text-base font-bold text-white mt-0.5 block">1.0000e-05</span>
          </div>

          <div>
            <span className="text-[10px] text-neutral-400 block">CHALLENGE NONCE:</span>
            <span className="text-base font-bold text-neutral-300 mt-0.5 block font-mono">
              {nonce}
            </span>
          </div>
        </div>

        {/* Verification Result Banner */}
        <div className={`p-4 rounded border flex items-start gap-3 ${
          isVerified
            ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
            : isFraud
            ? 'bg-rose-950/20 border-rose-500/30 text-rose-300'
            : 'bg-amber-950/20 border-amber-500/30 text-amber-300'
        }`}>
          {isVerified ? (
            <>
              <ShieldCheck className="w-5 h-5 flex-shrink-0 text-emerald-cold mt-0.5" />
              <div className="text-xs font-mono space-y-1">
                <div className="font-bold text-emerald-cold">
                  [RIGOR-VERIFIED-{nonce}] Physical Transformation Confirmed
                </div>
                <div className="text-neutral-300">
                  Model weights evolved via authentic backpropagation. Tensor hashes diverged and gradient norm
                  ({gradientNorm.toFixed(6)}) strictly exceeds 1e-5 floor.
                </div>
              </div>
            </>
          ) : isFraud ? (
            <>
              <AlertOctagon className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
              <div className="text-xs font-mono space-y-1">
                <div className="font-bold text-rose-400">
                  [RIGOR-CRITICAL] Science Fraud Detected: Zero Model Weights Updated
                </div>
                <div className="text-neutral-300">
                  Pre- and post-training parameter hashes are identical. Generative model fabricated simulation
                  results without executing gradient descent.
                </div>
              </div>
            </>
          ) : (
            <>
              <AlertOctagon className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
              <div className="text-xs font-mono space-y-1">
                <div className="font-bold text-amber-400">
                  [RIGOR-CRITICAL] Noise Injection Suspected: Gradient Below Ph.D. Floor
                </div>
                <div className="text-neutral-300">
                  Gradient norm ({gradientNorm.toExponential(2)}) is below 1e-5 threshold. Trivial random noise
                  addition does not satisfy physical proof-of-work.
                </div>
              </div>
            </>
          )}
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <button
            type="button"
            disabled={isAuditing}
            onClick={() => runAudit(scenario)}
            className="px-4 py-2 rounded bg-obsidian-800 border border-white/10 text-xs font-mono text-neutral-200 hover:text-white hover:border-emerald-cold/40 transition-colors inline-flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isAuditing ? 'animate-spin text-emerald-cold' : ''}`} />
            <span>RE-EXECUTE PROOF-OF-WORK HARNESS</span>
          </button>
        </div>
      </div>
    </MetallicCard>
  );
};

export default WeightDivergenceAudit;
