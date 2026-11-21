import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import ArchitecturePage from '../pages/ArchitecturePage';
import CampaignsPage from '../pages/CampaignsPage';
import DomainsPage from '../pages/DomainsPage';
import ConsolePage from '../pages/ConsolePage';

describe('Svel 5 Dedicated Core Pages', () => {
  describe('HomePage', () => {
    it('renders hero title, Karl Popper epigraph, and telemetry metrics', () => {
      render(
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Autonomous Discovery Across 12–72 Hour Scientific Campaigns/i)).toBeInTheDocument();
      expect(screen.getByText(/It is not enough to confirm a theory. You must try to destroy it/i)).toBeInTheDocument();
      expect(screen.getByText(/\$3\.25/i)).toBeInTheDocument();
      expect(screen.getByText(/ln\(p\/\(1-p\)\)/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Minimal Titanium DNA Double Helix/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Synthetic Computational Core/i)).toBeInTheDocument();
    });
  });

  describe('ArchitecturePage', () => {
    it('renders 4-tier swarm, falsification engine, and simulators', () => {
      render(
        <MemoryRouter>
          <ArchitecturePage />
        </MemoryRouter>
      );

      expect(screen.getByText(/4-Tier Swarm & Falsification Engine/i)).toBeInTheDocument();
      expect(screen.getByText(/TIER 1: SVEL-CORE ORCHESTRATOR/i)).toBeInTheDocument();
      expect(screen.getByText(/TIER 2: SCHOLAR & PROSECUTOR/i)).toBeInTheDocument();
      expect(screen.getByText(/TIER 3: CODEENGINEER & SIMULATIONRUNNER/i)).toBeInTheDocument();
      expect(screen.getByText(/TIER 4: RIGOR MONITOR \(POW\)/i)).toBeInTheDocument();
      expect(screen.getByText(/Unbreakability Index U = 1.0 - min\(1.0, worst_case_metric\)/i)).toBeInTheDocument();
    });
  });

  describe('CampaignsPage', () => {
    it('renders 72h timeline, TCP AIMD, and The Morgue ledger', () => {
      render(
        <MemoryRouter>
          <CampaignsPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/72-Hour Continuous Execution & Semantic Kill-Chain/i)).toBeInTheDocument();
      expect(screen.getByText(/THE MORGUE \/\/ KILL-CHAIN ARCHIVE/i)).toBeInTheDocument();
      expect(screen.getByText(/TCP CONGESTION CONTROL \(AIMD BACKOFF\)/i)).toBeInTheDocument();

      // Adjust timeline slider
      const slider = screen.getByRole('slider');
      fireEvent.change(slider, { target: { value: '60' } });
      expect(screen.getByText(/60h 00m/i)).toBeInTheDocument();
    });
  });

  describe('DomainsPage', () => {
    it('renders all domain tabs and toggles between disciplines', () => {
      render(
        <MemoryRouter>
          <DomainsPage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Deterministic Domain Simulation Kernels/i)).toBeInTheDocument();
      expect(screen.getByText(/GENOMICS & MEDICINE/i)).toBeInTheDocument();

      // Switch to Materials
      const materialsTab = screen.getByRole('button', { name: /MATERIALS & CONDENSED MATTER/i });
      fireEvent.click(materialsTab);
      expect(screen.getByText(/INTERACTIVE CUBIC BORN STABILITY CALCULATOR/i)).toBeInTheDocument();

      // Switch to Fusion
      const fusionTab = screen.getByRole('button', { name: /FUSION & PLASMA PHYSICS/i });
      fireEvent.click(fusionTab);
      expect(screen.getByText(/RELATIVISTIC BREMSSTRAHLUNG LOSS/i)).toBeInTheDocument();

      // Switch to Multimodal ML
      const mlTab = screen.getByRole('button', { name: /MULTIMODAL MACHINE LEARNING/i });
      fireEvent.click(mlTab);
      expect(screen.getByText(/GSTM 422D FUSION/i)).toBeInTheDocument();
    });
  });

  describe('ConsolePage', () => {
    it('renders live telemetry terminal, dispatch panel, and opens access modal', () => {
      render(
        <MemoryRouter>
          <ConsolePage />
        </MemoryRouter>
      );

      expect(screen.getByText(/Live Telemetry Terminal & Trace Stream/i)).toBeInTheDocument();
      expect(screen.getByText(/CAMPAIGN DISPATCH CONTROLS/i)).toBeInTheDocument();

      // Click Request Access
      const requestAccessBtn = screen.getByRole('button', { name: /REQUEST ACCESS/i });
      fireEvent.click(requestAccessBtn);

      expect(screen.getByRole('dialog')).toBeInTheDocument();
      expect(screen.getByText(/Request Research Access/i)).toBeInTheDocument();
    });
  });
});
