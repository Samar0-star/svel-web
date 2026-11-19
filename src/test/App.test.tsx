import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AppContent } from '../App';

describe('App routing', () => {
  it('renders HomePage on "/" route', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </MemoryRouter>
    );

    expect(screen.getByText(/Autonomous Discovery Across 12–72 Hour Scientific Campaigns/i)).toBeInTheDocument();
  });

  it('renders ArchitecturePage on "/architecture" route', () => {
    render(
      <MemoryRouter initialEntries={['/architecture']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </MemoryRouter>
    );

    expect(screen.getByText(/4-Tier Swarm & Falsification Engine/i)).toBeInTheDocument();
  });

  it('renders CampaignsPage on "/campaigns" route', () => {
    render(
      <MemoryRouter initialEntries={['/campaigns']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </MemoryRouter>
    );

    expect(screen.getByText(/72-Hour Continuous Execution & Semantic Kill-Chain/i)).toBeInTheDocument();
  });

  it('renders DomainsPage on "/domains" route', () => {
    render(
      <MemoryRouter initialEntries={['/domains']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </MemoryRouter>
    );

    expect(screen.getByText(/Deterministic Domain Simulation Kernels/i)).toBeInTheDocument();
  });

  it('renders ConsolePage on "/console" route', () => {
    render(
      <MemoryRouter initialEntries={['/console']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <AppContent />
      </MemoryRouter>
    );

    expect(screen.getByText(/Live Telemetry Terminal & Epistemic Sandbox/i)).toBeInTheDocument();
  });
});
