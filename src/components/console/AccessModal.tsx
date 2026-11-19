import React, { useState, useEffect } from 'react';
import { X, Key, Copy, Check, ShieldCheck, AlertCircle } from 'lucide-react';

interface AccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccessModal: React.FC<AccessModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [org, setOrg] = useState<string>('');
  const [domain, setDomain] = useState<string>('Genomics & Medicine');

  const [error, setError] = useState<string | null>(null);
  const [generatedKey, setGeneratedKey] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedOrg = org.trim();

    if (!trimmedName || !trimmedOrg) {
      setError('Please provide your name and institution.');
      return;
    }

    // RFC-compliant email pattern check + consecutive dots guard
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail) || trimmedEmail.includes('..')) {
      setError('Invalid academic or institutional email address.');
      return;
    }

    // Generate simulated API key: ultron_live_sk_<32hex>
    const hexChars = '0123456789abcdef';
    let hex = '';
    for (let i = 0; i < 32; i++) {
      hex += hexChars.charAt(Math.floor(Math.random() * hexChars.length));
    }
    const newApiKey = `ultron_live_sk_${hex}`;
    setGeneratedKey(newApiKey);
  };

  const handleCopy = () => {
    if (generatedKey) {
      navigator.clipboard.writeText(generatedKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const resetAndClose = () => {
    setGeneratedKey(null);
    setError(null);
    onClose();
  };

  return (
    <div
      className="modal-backdrop fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Ultron Early Access Request"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          resetAndClose();
        }
      }}
    >
      <div className="modal-content relative w-full max-w-md rounded-xl border border-white/10 bg-obsidian-900 p-6 md:p-8 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Key className="w-4 h-4 text-emerald-cold" />
            <h2 className="text-base font-bold font-sans text-white">
              Request Research Access
            </h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            aria-label="Close Modal"
            className="text-neutral-400 hover:text-white transition-colors p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body or Key Generated State */}
        {!generatedKey ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-neutral-400 font-sans leading-relaxed">
              Ultron autonomous campaigns require institutional credential verification to allocate
              GPU cluster nodes and prevent runaway research loops.
            </p>

            {error && (
              <div className="p-3 rounded bg-rose-950/30 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono text-neutral-300 mb-1">
                RESEARCHER NAME
              </label>
              <input
                type="text"
                required
                placeholder="Dr. Eleanor Vance"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded bg-obsidian-800 border border-white/10 px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-emerald-cold transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-300 mb-1">
                INSTITUTIONAL EMAIL
              </label>
              <input
                type="email"
                required
                placeholder="e.vance@stanford.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded bg-obsidian-800 border border-white/10 px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-emerald-cold transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-300 mb-1">
                ORGANIZATION / INSTITUTION
              </label>
              <input
                type="text"
                required
                placeholder="Stanford Institute for Theoretical Physics"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full rounded bg-obsidian-800 border border-white/10 px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-emerald-cold transition-colors"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-neutral-300 mb-1">
                TARGET RESEARCH DOMAIN
              </label>
              <select
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full rounded bg-obsidian-800 border border-white/10 px-3 py-2 text-xs font-sans text-white focus:outline-none focus:border-emerald-cold transition-colors"
              >
                <option value="Genomics & Medicine">Genomics & Medicine</option>
                <option value="Materials & Condensed Matter">Materials & Condensed Matter</option>
                <option value="Fusion & Plasma Physics">Fusion & Plasma Physics</option>
                <option value="Multimodal ML">Multimodal ML</option>
              </select>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-2.5 rounded bg-emerald-cold text-black font-mono font-bold text-xs hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-950/20"
              >
                Generate API Key
              </button>
            </div>
          </form>
        ) : (
          <div className="result-box space-y-4">
            <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 text-center space-y-2">
              <ShieldCheck className="w-8 h-8 text-emerald-cold mx-auto" />
              <div className="text-sm font-bold text-white font-sans">
                Research Credentials Generated
              </div>
              <p className="text-xs text-neutral-400">
                Granted simulation tenant access for domain: <span className="text-emerald-cold font-mono">{domain}</span>.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-neutral-400">
                PROVISIONED API KEY (KEEP SECURE):
              </label>
              <div className="p-3 rounded bg-obsidian-950 border border-white/10 font-mono text-xs text-emerald-cold break-all select-all">
                <code>{generatedKey}</code>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={handleCopy}
                className="flex-1 py-2 rounded bg-obsidian-800 border border-white/10 text-xs font-mono text-neutral-200 hover:text-white hover:border-emerald-cold/40 transition-colors inline-flex items-center justify-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-cold" />
                    <span>COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Key</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={resetAndClose}
                className="px-4 py-2 rounded bg-white text-black text-xs font-mono font-bold hover:bg-neutral-200 transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccessModal;
