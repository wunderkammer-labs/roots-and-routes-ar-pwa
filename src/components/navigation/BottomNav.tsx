import React from 'react';
import { Screen } from '../../lib/types';

export type BottomNavItem = {
  label: string;
  screen: Screen;
  icon?: React.ReactNode;
};

export type BottomNavProps = {
  items: BottomNavItem[];
  active: Screen;
  onNavigate: (screen: Screen) => void;
};

const navButtonStyle = (active: boolean): React.CSSProperties => ({
  flex: '1 1 25%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--space-1)',
  padding: 'var(--space-2)',
  background: 'transparent',
  border: 'none',
  color: active ? 'var(--color-light-green)' : 'var(--color-text-secondary)',
  fontWeight: active ? 'var(--font-weight-bold)' : 'var(--font-weight-regular)',
  cursor: 'pointer',
});

const BottomNav: React.FC<BottomNavProps> = ({ items, active, onNavigate }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
      {items.map((item) => (
        <button
          key={item.screen}
          type="button"
          onClick={() => onNavigate(item.screen)}
          style={navButtonStyle(item.screen === active)}
        >
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default BottomNav;
