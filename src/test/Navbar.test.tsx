import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../components/common/Navbar';

describe('Navbar', () => {
  it('renders brand logo and status beacon', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText('ULTRON')).toBeInTheDocument();
    expect(screen.getByText('AI SCIENTIST')).toBeInTheDocument();
    expect(screen.getByText('SWARM ACTIVE')).toBeInTheDocument();
  });

  it('renders all 5 primary route links', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /overview/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /architecture/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /campaigns & morgue/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /domain kernels/i })).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: /console/i })[0]).toBeInTheDocument();
  });

  it('toggles mobile menu when toggle button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
      </MemoryRouter>
    );

    const toggleButton = screen.getByRole('button', { name: /toggle navigation menu/i });
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.getByTestId('mobile-menu')).toBeInTheDocument();
    expect(screen.getByText('LAUNCH SCIENTIFIC CONSOLE')).toBeInTheDocument();

    fireEvent.click(toggleButton);
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  it('shows active indicator for current path', () => {
    render(
      <MemoryRouter initialEntries={['/architecture']} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
      </MemoryRouter>
    );

    const activeIndicator = screen.getByTestId('active-indicator');
    expect(activeIndicator).toBeInTheDocument();
  });
});
