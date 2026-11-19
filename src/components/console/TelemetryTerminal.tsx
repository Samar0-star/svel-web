import React, { useState, useEffect, useRef } from 'react';
import {
  INITIAL_TELEMETRY_LOGS,
  generateNextTelemetryEvent,
  TelemetryLog,
} from '../../data/telemetryEvents';
import { Play, Pause, Trash2, Copy, Check, Filter, Terminal as TerminalIcon } from 'lucide-react';

interface TelemetryTerminalProps {
  maxLogs?: number;
  streamingIntervalMs?: number;
}

export const TelemetryTerminal: React.FC<TelemetryTerminalProps> = ({
  maxLogs = 100,
  streamingIntervalMs = 1500,
}) => {
  const [logs, setLogs] = useState<TelemetryLog[]>(INITIAL_TELEMETRY_LOGS);
  const [isStreaming, setIsStreaming] = useState<boolean>(true);
  const [selectedChannel, setSelectedChannel] = useState<string>('ALL');
  const [copied, setCopied] = useState<boolean>(false);
  const counterRef = useRef<number>(INITIAL_TELEMETRY_LOGS.length + 1);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll on new log arrival if user hasn't scrolled up
  useEffect(() => {
    if (isStreaming && terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [logs, isStreaming]);

  // Streaming interval
  useEffect(() => {
    if (!isStreaming) return;

    const interval = setInterval(() => {
      setLogs((prev) => {
        const nextLog = generateNextTelemetryEvent(counterRef.current);
        counterRef.current += 1;
        const updated = [...prev, nextLog];
        // Enforce max buffer capacity
        if (updated.length > maxLogs) {
          return updated.slice(updated.length - maxLogs);
        }
        return updated;
      });
    }, streamingIntervalMs);

    return () => clearInterval(interval);
  }, [isStreaming, maxLogs, streamingIntervalMs]);

  // Filter logs by channel
  const filteredLogs = logs.filter((log) => {
    if (selectedChannel === 'ALL') return true;
    return log.channel === selectedChannel;
  });

  // Copy terminal contents
  const handleCopy = () => {
    const text = filteredLogs
      .map((l) => `[${l.timestamp}] ${l.tag} ${l.message} ${l.details ? `// ${l.details}` : ''}`)
      .join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Clear terminal
  const handleClear = () => {
    setLogs([]);
  };

  // Tag styling helper
  const getTagColorClass = (channel: TelemetryLog['channel']) => {
    switch (channel) {
      case 'RIGOR':
        return 'text-emerald-cold border-emerald-cold/40 bg-emerald-cold/10';
      case 'FALSIFY':
        return 'text-cyan-400 border-cyan-400/40 bg-cyan-400/10';
      case 'MORGUE':
        return 'text-amber-400 border-amber-400/40 bg-amber-400/10';
      case 'KILL':
        return 'text-rose-400 border-rose-400/40 bg-rose-400/10';
      case 'SCHEDULER':
        return 'text-blue-400 border-blue-400/40 bg-blue-400/10';
      case 'SANDBOX':
        return 'text-purple-400 border-purple-400/40 bg-purple-400/10';
      default:
        return 'text-neutral-300 border-neutral-600 bg-neutral-800/40';
    }
  };

  const channels = ['ALL', 'RIGOR', 'GLASS-TELEMETRY', 'MORGUE', 'SCHEDULER', 'FALSIFY', 'KILL', 'SANDBOX'];

  return (
    <div className="rounded-lg border border-white/10 bg-obsidian-950 flex flex-col h-[520px] overflow-hidden shadow-2xl">
      {/* Terminal Titlebar */}
      <div className="px-4 py-2.5 bg-obsidian-900 border-b border-white/10 flex items-center justify-between gap-3 select-none">
        <div className="flex items-center gap-2">
          <TerminalIcon className="w-4 h-4 text-emerald-cold" />
          <span className="text-xs font-mono font-bold text-white tracking-wider">
            GLASS-TELEMETRY // LIVE EXECUTION STREAM
          </span>
          <div className="flex items-center gap-1.5 ml-2">
            <span
              className={`w-2 h-2 rounded-full ${
                isStreaming ? 'bg-emerald-cold animate-pulse' : 'bg-neutral-600'
              }`}
            />
            <span className="text-[10px] font-mono text-neutral-400">
              {isStreaming ? 'LIVE (60Hz FEED)' : 'PAUSED'}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setIsStreaming(!isStreaming)}
            aria-label={isStreaming ? 'Pause Stream' : 'Resume Stream'}
            className="px-2.5 py-1 rounded bg-obsidian-800 border border-white/10 text-neutral-300 text-xs font-mono hover:text-white hover:border-emerald-cold/40 transition-colors inline-flex items-center gap-1.5"
          >
            {isStreaming ? (
              <>
                <Pause className="w-3 h-3 text-amber-400" />
                <span>PAUSE</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-emerald-cold" />
                <span>RESUME</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy Logs"
            className="px-2.5 py-1 rounded bg-obsidian-800 border border-white/10 text-neutral-300 text-xs font-mono hover:text-white hover:border-white/30 transition-colors inline-flex items-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-cold" />
                <span>COPIED</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>COPY</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleClear}
            aria-label="Clear Terminal"
            className="p-1 rounded bg-obsidian-800 border border-white/10 text-neutral-400 hover:text-rose-400 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="px-4 py-2 bg-obsidian-900/60 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto text-[11px] font-mono">
        <Filter className="w-3 h-3 text-neutral-500 mr-1 flex-shrink-0" />
        {channels.map((chan) => (
          <button
            key={chan}
            type="button"
            onClick={() => setSelectedChannel(chan)}
            className={`px-2 py-0.5 rounded transition-colors whitespace-nowrap ${
              selectedChannel === chan
                ? 'bg-emerald-cold/20 text-emerald-cold border border-emerald-cold/40 font-semibold'
                : 'text-neutral-400 hover:text-neutral-200 hover:bg-obsidian-800 border border-transparent'
            }`}
          >
            {chan}
          </button>
        ))}
      </div>

      {/* Terminal Log Output Area */}
      <div
        ref={terminalContainerRef}
        className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-2 selection:bg-emerald-cold selection:text-black"
      >
        {filteredLogs.length === 0 ? (
          <div className="text-center py-16 text-neutral-600 font-mono">
            <p>// NO LOGS MATCH CURRENT CHANNEL FILTER ({selectedChannel})</p>
            <p className="text-[10px] mt-1 text-neutral-700">Awaiting incoming telemetry packets...</p>
          </div>
        ) : (
          filteredLogs.map((log) => (
            <div
              key={log.id}
              className="group flex items-start gap-2.5 leading-relaxed hover:bg-white/[0.02] p-1 rounded transition-colors"
            >
              {/* Timestamp */}
              <span className="text-neutral-600 select-none text-[10px] pt-0.5 whitespace-nowrap">
                {log.timestamp.slice(11, 23)}
              </span>

              {/* Channel Tag */}
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded border font-semibold flex-shrink-0 whitespace-nowrap ${getTagColorClass(
                  log.channel
                )}`}
              >
                {log.tag}
              </span>

              {/* Log Message and Details */}
              <div className="flex-1 min-w-0">
                <span className="text-neutral-200 break-words">{log.message}</span>
                {log.details && (
                  <span className="text-neutral-500 block text-[11px] mt-0.5 break-words">
                    ↳ {log.details}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
        <div ref={terminalEndRef} />
      </div>

      {/* Terminal Status Footer */}
      <div className="px-4 py-2 bg-obsidian-900/80 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-neutral-500">
        <div>
          <span>BUFFER: {filteredLogs.length} / {maxLogs} LINES</span>
          <span className="mx-2">|</span>
          <span>UNIT COST: $3.25 / CAMPAIGN RUN</span>
        </div>
        <div>
          <span>HASH: SHA-256 RIGOR ARMED</span>
        </div>
      </div>
    </div>
  );
};

export default TelemetryTerminal;
