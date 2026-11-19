import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../components/common/Footer';

describe('Footer', () => {
  it('renders Popperian epigraph', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/The game of science is, in principle, without end/i)).toBeInTheDocument();
    expect(screen.getByText(/Karl R. Popper/i)).toBeInTheDocument();
  });

  it('renders SHA-256 build verification mark', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Footer />
      </MemoryRouter>
    );

    const shaElement = screen.getByTestId('build-sha256');
    expect(shaElement).toBeInTheDocument();
    expect(shaElement.textContent).toBe('893cb8678404f06872d81f4047ab3fffe899ab8d8df1304eea9a8f20761e04fb');
  });

  it('renders system specs and navigation links', () => {
    render(
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Footer />
      </MemoryRouter>
    );

    expect(screen.getByText(/Logit Derivative Slope/i)).toBeInTheDocument();
    expect(screen.getByText(/Welch-Z \(p < 0.01\)/i)).toBeInTheDocument();
    expect(screen.getByText(/01\. System Overview/i)).toBeInTheDocument();
    expect(screen.getByText(/02\. 4-Tier Swarm Architecture/i)).toBeInTheDocument();
    expect(screen.getByText(/03\. Campaigns & The Morgue/i)).toBeInTheDocument();
    expect(screen.getByText(/04\. Domain Kernels & Physics/i)).toBeInTheDocument();
    expect(screen.getByText(/05\. Scientific Console/i)).toBeInTheDocument();
  });
});
