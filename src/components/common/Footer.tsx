import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Terminal, GitCommit, Binary } from 'lucide-react';

export const Footer: React.FC = () => {
  // Canonical SHA-256 integrity hash from the Ultron computational core audit
  const BUILD_SHA256 = '893cb8678404f06872d81f4047ab3fffe899ab8d8df1304eea9a8f20761e04fb';
  const BUILD_VERSION = 'v2.4.0-stochastic-hardened';

  return (
    <footer className="w-full bg-obsidian-950 hairline-t text-neutral-400 font-mono text-xs">
      {/* Popperian Epigraph Banner */}
      <div className="hairline-b bg-obsidian-900/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex items-start gap-2.5 max-w-4xl">
            <span className="text-emerald-cold text-sm">“</span>
            <p className="text-neutral-300 italic font-sans text-xs leading-relaxed">
              The game of science is, in principle, without end. He who decides one day that scientific
              statements do not call for any further test, and that they can be regarded as finally verified,
              retires from the game.
            </p>
          </div>
          <span className="text-[11px] text-neutral-400 whitespace-nowrap md:self-end">
            — Karl R. Popper, <span className="text-neutral-300">Logik der Forschung (1934)</span>
          </span>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Column 1: System Identification */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-emerald-cold" />
              <span className="font-bold text-white tracking-wider text-sm">ULTRON ARC</span>
            </div>
            <p className="text-neutral-400 font-sans text-xs leading-relaxed">
              Autonomous synthetic research organism executing continuous 12–72 hour scientific campaigns with
              deterministic simulation kernels and zero-token epistemic regulators.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-obsidian-800 border border-white/10 text-[10px] text-neutral-300">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-cold" />
              <span>CRYPTOGRAPHIC RIGOR AUDITED</span>
            </div>
          </div>

          {/* Column 2: Architecture & Navigation */}
          <div className="space-y-2.5">
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase">Navigation</h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <Link to="/" className="hover:text-emerald-cold transition-colors">
                  01. System Overview
                </Link>
              </li>
              <li>
                <Link to="/architecture" className="hover:text-emerald-cold transition-colors">
                  02. 4-Tier Swarm Architecture
                </Link>
              </li>
              <li>
                <Link to="/campaigns" className="hover:text-emerald-cold transition-colors">
                  03. Campaigns & The Morgue
                </Link>
              </li>
              <li>
                <Link to="/domains" className="hover:text-emerald-cold transition-colors">
                  04. Domain Kernels & Physics
                </Link>
              </li>
              <li>
                <Link to="/console" className="hover:text-emerald-cold transition-colors flex items-center gap-1">
                  05. Scientific Console
                  <span className="text-[9px] px-1 bg-emerald-dim text-emerald-cold border border-emerald-cold/30 rounded">
                    LIVE
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Telemetry & Rigor Engine Specs */}
          <div className="space-y-2.5">
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase">System Specs</h4>
            <div className="space-y-1.5 text-[11px] text-neutral-400">
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-neutral-400">Epistemic Method:</span>
                <span className="text-neutral-200">Logit Derivative Slope</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-neutral-400">Clash Detection:</span>
                <span className="text-neutral-200">Welch-Z (p &lt; 0.01)</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-neutral-400">PoW Weight Delta:</span>
                <span className="text-emerald-cold">||Δθ||₂ &gt; 10⁻⁴</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-1">
                <span className="text-neutral-400">Target Duration:</span>
                <span className="text-neutral-200">12h – 72h Continuous</span>
              </div>
              <div className="flex justify-between pb-1">
                <span className="text-neutral-400">Unit Compute Cost:</span>
                <span className="text-emerald-cold">~$3.25 / run</span>
              </div>
            </div>
          </div>

          {/* Column 4: Cryptographic Build Attestation */}
          <div className="space-y-2.5">
            <h4 className="text-white text-xs font-semibold tracking-wider uppercase">Build Attestation</h4>
            <div className="p-2.5 rounded bg-obsidian-900 border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[10px]">
                <span className="flex items-center gap-1 text-neutral-300">
                  <Binary className="w-3 h-3 text-emerald-cold" />
                  SHA-256 WEIGHT PROOF
                </span>
                <span className="text-emerald-cold">PASS</span>
              </div>
              <p
                data-testid="build-sha256"
                className="text-[9px] text-neutral-400 break-all leading-tight font-mono selection:bg-emerald-cold selection:text-black"
              >
                {BUILD_SHA256}
              </p>
              <div className="flex items-center justify-between text-[10px] text-neutral-400 pt-1 border-t border-white/5">
                <span className="flex items-center gap-1">
                  <GitCommit className="w-3 h-3 text-neutral-400" />
                  {BUILD_VERSION}
                </span>
                <span>SEC-L3</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Protocol Verification */}
        <div className="pt-8 hairline-t flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          <div className="flex items-center space-x-2">
            <Terminal className="w-3.5 h-3.5 text-neutral-400" />
            <span>ULTRON AI SCIENTIST • AUTONOMOUS SYNTHETIC RESEARCH PROTOCOL</span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-emerald-cold">● ALL KERNELS DETERMINISTIC</span>
            <span>ZERO HUMAN COGNITION IN THE LOOP</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
