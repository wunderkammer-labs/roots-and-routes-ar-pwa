import { Screen } from './types';

/**
 * Gap sizes mapped to CSS spacing tokens.
 */
export type GapSize = 'none' | 'xs' | 'sm' | 'md' | 'lg';

export const GAP_MAP: Record<GapSize, string> = {
  none: '0',
  xs: 'var(--space-1)',
  sm: 'var(--space-2)',
  md: 'var(--space-3)',
  lg: 'var(--space-4)',
};

export type ThemeMode = 'light' | 'dark';

export type TextSize = 'normal' | 'large' | 'xl';

export const TEXT_SIZE_OPTIONS: TextSize[] = ['normal', 'large', 'xl'];

export const TEXT_SIZE_LABELS: Record<TextSize, string> = {
  normal: 'Normal',
  large: 'Large',
  xl: 'Extra Large',
};

export const DEFAULT_NAV_ITEMS: Array<{
  label: string;
  screen: Screen;
}> = [
  { label: 'Home', screen: 'home' },
  { label: 'Scan', screen: 'scan-idle' },
  { label: 'Journal', screen: 'journal-list' },
  { label: 'Settings', screen: 'settings' },
];

export const STORAGE_KEYS = {
  accessibility: 'rr_accessibility',
  theme: 'rr_theme',
  camera: 'rr_camera',
  journal: 'rr_journal',
} as const;
