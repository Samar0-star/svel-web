import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Menu, X, Terminal, Cpu } from 'lucide-react';

export interface NavItem {
  name: string;
  path: string;
  tag?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Overview', path: '/' },
  { name: 'Architecture', path: '/architecture' },
  { name: 'Campaigns & Morgue', path: '/campaigns' },
  { name: 'Domain Kernels', path: '/domains' },
  { name: 'Console', path: '/console', tag: 'LIVE' },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full glass-obsidian hairline-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Epistemic Tag */}
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="flex items-center space-x-3 group focus:outline-none focus:ring-1 focus:ring-emerald-cold rounded-sm"
          >
            <div className="w-8 h-8 rounded-sm bg-obsidian-800 border border-white/10 flex items-center justify-center group-hover:border-emerald-cold/50 transition-colors">
              <Cpu className="w-4 h-4 text-emerald-cold" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono font-bold text-sm tracking-wider text-white flex items-center gap-1.5">
                SVEL
                <span className="text-[10px] px-1 py-0.2 bg-emerald-cold/10 border border-emerald-cold/30 text-emerald-cold rounded">
                  v2.4
                </span>
              </span>
              <span className="text-[10px] tracking-widest text-neutral-400 font-mono">
                AI SCIENTIST
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav aria-label="Desktop Navigation" className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive: navActive }) =>
                    `relative px-3 py-1.5 text-xs font-mono tracking-wide transition-all rounded ${
                      navActive
                        ? 'text-white bg-white/5 border border-white/15'
                        : 'text-neutral-400 hover:text-white hover:bg-white/[0.02] border border-transparent'
                    }`
                  }
                >
                  <span className="flex items-center gap-1.5">
                    {item.name}
                    {item.tag && (
                      <span className="text-[9px] px-1 py-0.2 rounded bg-emerald-dim text-emerald-cold border border-emerald-cold/20">
                        {item.tag}
                      </span>
                    )}
                  </span>
                  {isActive && (
                    <span
                      data-testid="active-indicator"
                      className="absolute -bottom-[17px] left-0 right-0 h-[2px] bg-emerald-cold"
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Live Swarm Beacon & Console Action */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/console"
              className="flex items-center space-x-2 px-2.5 py-1 rounded bg-obsidian-900 border border-white/10 hover:border-emerald-cold/40 text-xs font-mono transition-all group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-cold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-cold"></span>
              </span>
              <span className="text-neutral-300 group-hover:text-emerald-cold transition-colors text-[11px]">
                SWARM ACTIVE
              </span>
              <Terminal className="w-3.5 h-3.5 text-neutral-500 group-hover:text-emerald-cold transition-colors ml-1" />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              to="/console"
              onClick={closeMobileMenu}
              aria-label="Console Beacon"
              className="p-1.5 rounded border border-white/10 bg-obsidian-800 text-emerald-cold"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-cold opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-cold"></span>
              </span>
            </Link>
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="p-2 rounded bg-obsidian-800 border border-white/10 text-neutral-300 hover:text-white hover:border-white/20 focus:outline-none focus:ring-1 focus:ring-emerald-cold"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div data-testid="mobile-menu" className="md:hidden hairline-t bg-obsidian-950 px-4 pt-3 pb-6 space-y-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded text-sm font-mono tracking-wide ${
                  isActive
                    ? 'text-white bg-white/10 border border-white/20'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>{item.name}</span>
                  {item.tag && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-dim text-emerald-cold border border-emerald-cold/30">
                      {item.tag}
                    </span>
                  )}
                </div>
              </NavLink>
            );
          })}
          <div className="pt-3 hairline-t mt-4">
            <Link
              to="/console"
              onClick={closeMobileMenu}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded bg-obsidian-800 border border-emerald-cold/30 text-emerald-cold font-mono text-xs hover:bg-emerald-cold/10 transition-colors"
            >
              <Terminal className="w-4 h-4" />
              <span>LAUNCH SCIENTIFIC CONSOLE</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
