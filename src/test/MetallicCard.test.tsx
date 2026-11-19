import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MetallicCard from '../components/common/MetallicCard';

describe('MetallicCard', () => {
  it('renders children correctly', () => {
    render(
      <MetallicCard>
        <p>Telemetry Node Active</p>
      </MetallicCard>
    );
    expect(screen.getByText('Telemetry Node Active')).toBeInTheDocument();
  });

  it('renders title, subtitle, and badge when provided', () => {
    render(
      <MetallicCard
        title="EPISTEMIC ENGINE"
        subtitle="Logit Derivative Slope"
        badge="0-TOKEN"
      >
        <span>Content Body</span>
      </MetallicCard>
    );

    expect(screen.getByText('EPISTEMIC ENGINE')).toBeInTheDocument();
    expect(screen.getByText('Logit Derivative Slope')).toBeInTheDocument();
    expect(screen.getByText('0-TOKEN')).toBeInTheDocument();
    expect(screen.getByText('Content Body')).toBeInTheDocument();
  });

  it('applies variant styling classes', () => {
    const { rerender } = render(
      <MetallicCard variant="accent">
        <span>Accent Card</span>
      </MetallicCard>
    );
    const card = screen.getByTestId('metallic-card');
    expect(card.className).toContain('border-emerald-cold');

    rerender(
      <MetallicCard variant="terminal">
        <span>Terminal Card</span>
      </MetallicCard>
    );
    expect(card.className).toContain('bg-oled');
    expect(card.className).toContain('font-mono');
  });

  it('handles click events when interactive', () => {
    const handleClick = vi.fn();
    render(
      <MetallicCard variant="interactive" onClick={handleClick}>
        <button type="button">Trigger</button>
      </MetallicCard>
    );

    const card = screen.getByTestId('metallic-card');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
