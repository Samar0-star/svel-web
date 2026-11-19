import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EpistemicSimulator from '../components/simulations/EpistemicSimulator';
import TelemetryTerminal from '../components/console/TelemetryTerminal';
import AccessModal from '../components/console/AccessModal';
import WeightDivergenceAudit from '../components/simulations/WeightDivergenceAudit';
import DnaCanvasShader from '../components/canvas/DnaCanvasShader';

describe('Interactive Simulation Components', () => {
  describe('EpistemicSimulator', () => {
    it('renders logit slope simulator and switches to Welch-Z tab', () => {
      render(<EpistemicSimulator />);

      expect(screen.getByText(/0-TOKEN EPISTEMIC REGULATOR/i)).toBeInTheDocument();
      expect(screen.getByText(/LOGIT OLS SLOPE m/i)).toBeInTheDocument();

      // Switch tab to Welch-Z
      const welchTab = screen.getByRole('button', { name: /WELCH-Z CLASH TEST/i });
      fireEvent.click(welchTab);

      expect(screen.getByText(/WELCH-Z CLASH DECISION/i)).toBeInTheDocument();
      expect(screen.getByText(/TEST STATISTIC Z/i)).toBeInTheDocument();
    });

    it('applies breakthrough preset and updates epistemic velocity', () => {
      render(<EpistemicSimulator />);

      const breakthroughBtn = screen.getByRole('button', { name: /Breakthrough/i });
      fireEvent.click(breakthroughBtn);

      expect(screen.getByText(/EPISTEMIC VELOCITY ACTIVE/i)).toBeInTheDocument();
    });

    it('applies conflict preset in Welch-Z tab and detects conflict', () => {
      render(<EpistemicSimulator />);

      const conflictBtn = screen.getByRole('button', { name: /Welch Conflict/i });
      fireEvent.click(conflictBtn);

      expect(screen.getByText(/EMPIRICAL CONFLICT DETECTED/i)).toBeInTheDocument();
    });
  });

  describe('TelemetryTerminal', () => {
    it('renders terminal titlebar, controls, and initial logs', () => {
      render(<TelemetryTerminal maxLogs={50} streamingIntervalMs={1000} />);

      expect(screen.getByText(/GLASS-TELEMETRY \/\/ LIVE EXECUTION STREAM/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /PAUSE/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /COPY/i })).toBeInTheDocument();
    });

    it('toggles stream pause and resume', () => {
      render(<TelemetryTerminal maxLogs={50} streamingIntervalMs={1000} />);

      const pauseBtn = screen.getByRole('button', { name: /PAUSE/i });
      fireEvent.click(pauseBtn);

      expect(screen.getByText(/RESUME/i)).toBeInTheDocument();
      expect(screen.getByText(/PAUSED/i)).toBeInTheDocument();

      const resumeBtn = screen.getByRole('button', { name: /RESUME/i });
      fireEvent.click(resumeBtn);

      expect(screen.getByText(/PAUSE/i)).toBeInTheDocument();
      expect(screen.getByText(/LIVE \(60Hz FEED\)/i)).toBeInTheDocument();
    });

    it('filters logs by channel', () => {
      render(<TelemetryTerminal maxLogs={50} streamingIntervalMs={1000} />);

      const filterBtn = screen.getByRole('button', { name: 'RIGOR' });
      fireEvent.click(filterBtn);

      // Verify filtered tag is visible
      const rigorTags = screen.getAllByText(/\[RIGOR/i);
      expect(rigorTags.length).toBeGreaterThan(0);
    });

    it('clears terminal logs on clear button click', () => {
      render(<TelemetryTerminal maxLogs={50} streamingIntervalMs={1000} />);

      const clearBtn = screen.getByRole('button', { name: /Clear Terminal/i });
      fireEvent.click(clearBtn);

      expect(screen.getByText(/\/\/ NO LOGS MATCH CURRENT CHANNEL FILTER/i)).toBeInTheDocument();
    });
  });

  describe('AccessModal', () => {
    it('renders nothing when isOpen is false', () => {
      const { container } = render(<AccessModal isOpen={false} onClose={() => {}} />);
      expect(container.firstChild).toBeNull();
    });

    it('renders dialog when isOpen is true and generates simulated key on valid submission', async () => {
      const handleClose = vi.fn();
      render(<AccessModal isOpen={true} onClose={handleClose} />);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Dr\. Eleanor Vance/i)).toBeInTheDocument();

      // Fill in valid credentials
      fireEvent.change(screen.getByPlaceholderText(/Dr\. Eleanor Vance/i), {
        target: { value: 'Dr. Jane Doe' },
      });
      fireEvent.change(screen.getByPlaceholderText(/e\.vance@stanford\.edu/i), {
        target: { value: 'jane.doe@cern.ch' },
      });
      fireEvent.change(screen.getByPlaceholderText(/Stanford Institute/i), {
        target: { value: 'CERN' },
      });

      // Submit form
      const submitBtn = screen.getByRole('button', { name: /Generate API Key/i });
      fireEvent.click(submitBtn);

      await waitFor(() => {
        expect(screen.getByText(/Research Credentials Generated/i)).toBeInTheDocument();
        expect(screen.getByText(/ultron_live_sk_/i)).toBeInTheDocument();
      });
    });

    it('rejects invalid email formats', async () => {
      render(<AccessModal isOpen={true} onClose={() => {}} />);

      fireEvent.change(screen.getByPlaceholderText(/Dr\. Eleanor Vance/i), {
        target: { value: 'Dr. Jane Doe' },
      });
      fireEvent.change(screen.getByPlaceholderText(/e\.vance@stanford\.edu/i), {
        target: { value: 'invalid..email@domain.com' }, // Consecutive dots
      });
      fireEvent.change(screen.getByPlaceholderText(/Stanford Institute/i), {
        target: { value: 'CERN' },
      });

      const submitBtn = screen.getByRole('button', { name: /Generate API Key/i });
      fireEvent.click(submitBtn);

      expect(screen.getByText(/Invalid academic or institutional email address/i)).toBeInTheDocument();
    });

    it('closes on Escape key press', () => {
      const handleClose = vi.fn();
      render(<AccessModal isOpen={true} onClose={handleClose} />);

      fireEvent.keyDown(window, { key: 'Escape' });
      expect(handleClose).toHaveBeenCalled();
    });
  });

  describe('WeightDivergenceAudit', () => {
    it('renders PoW weight audit panel with initial SHA-256 state', () => {
      render(<WeightDivergenceAudit />);

      expect(screen.getByText(/CRYPTOGRAPHIC PROOF-OF-WORK AUDIT/i)).toBeInTheDocument();
      expect(screen.getByText(/TOTAL GRADIENT NORM \|\|∇W\|\|/i)).toBeInTheDocument();
      expect(screen.getByText(/893cb8678404f06872d81f4047ab3fffe899ab8d8df1304eea9a8f20761e04fb/i)).toBeInTheDocument();
    });

    it('switches to simulation fraud scenario and flags science fraud', async () => {
      render(<WeightDivergenceAudit />);

      const fraudBtn = screen.getByRole('button', { name: /Zero-Weight Fraud/i });
      fireEvent.click(fraudBtn);

      await waitFor(() => {
        expect(screen.getByText(/Science Fraud Detected/i)).toBeInTheDocument();
      });
    });
  });

  describe('DnaCanvasShader', () => {
    it('renders canvas element with accessibility role', () => {
      render(<DnaCanvasShader />);
      const canvas = screen.getByRole('img', {
        name: /Interactive 3D DNA Double Helix Simulation/i,
      });
      expect(canvas).toBeInTheDocument();
    });
  });
});
