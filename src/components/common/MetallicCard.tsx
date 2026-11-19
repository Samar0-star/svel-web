import React from 'react';

export interface MetallicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'interactive' | 'accent' | 'terminal';
  glowOnHover?: boolean;
  title?: string;
  subtitle?: string;
  badge?: string;
  headerAction?: React.ReactNode;
}

export const MetallicCard: React.FC<MetallicCardProps> = ({
  children,
  className = '',
  variant = 'default',
  glowOnHover = false,
  title,
  subtitle,
  badge,
  headerAction,
  ...props
}) => {
  const variantStyles = {
    default: 'bg-obsidian-900 border-white/10',
    elevated: 'bg-obsidian-800 border-white/15 shadow-metallic-inset',
    interactive:
      'bg-obsidian-900 border-white/10 hover:border-white/25 hover:bg-obsidian-850 cursor-pointer transition-all duration-200',
    accent: 'bg-obsidian-900 border-emerald-cold/30 shadow-emerald-subtle',
    terminal: 'bg-oled border-white/10 font-mono',
  };

  const glowStyles = glowOnHover
    ? 'hover:border-emerald-cold/40 hover:shadow-emerald-subtle transition-all duration-200'
    : '';

  return (
    <div
      data-testid="metallic-card"
      className={`relative rounded-md border p-5 ${variantStyles[variant]} ${glowStyles} ${className}`}
      {...props}
    >
      {/* Optional Top Spec Header */}
      {(title || badge || headerAction) && (
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10">
          <div>
            {title && (
              <h3 className="font-mono text-sm font-semibold text-white tracking-wide flex items-center gap-2">
                {title}
                {badge && (
                  <span className="text-[10px] font-normal px-1.5 py-0.5 rounded bg-emerald-dim border border-emerald-cold/30 text-emerald-cold">
                    {badge}
                  </span>
                )}
              </h3>
            )}
            {subtitle && (
              <p className="text-xs text-neutral-400 font-sans mt-0.5">{subtitle}</p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}

      {/* Main Card Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default MetallicCard;
