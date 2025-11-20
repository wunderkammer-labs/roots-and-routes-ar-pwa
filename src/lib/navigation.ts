import { Screen } from './types';

/**
 * Central navigation guard mapping of allowed screen transitions.
 */
export const ALLOWED_TRANSITIONS: Record<Screen, Screen[]> = {
  welcome: ['permissions', 'home'],
  permissions: ['accessibility', 'welcome', 'home', 'error-camera'],
  accessibility: ['privacy', 'home'],
  privacy: ['home'],
  home: [
    'scan-idle',
    'scan-detecting',
    'scan-detected',
    'cultural',
    'stem',
    'simulation',
    'journal-list',
    'journal-entry',
    'settings',
    'educator',
    'error-camera',
    'offline',
    'no-plant',
    'poster',
    'welcome',
  ],
  'scan-idle': ['scan-detecting', 'home', 'error-camera', 'no-plant'],
  'scan-detecting': ['scan-detected', 'scan-idle', 'home'],
  'scan-detected': ['cultural', 'stem', 'scan-idle', 'home'],
  cultural: ['stem', 'simulation', 'home', 'journal-entry', 'journal-list', 'scan-idle'],
  stem: ['cultural', 'simulation', 'home', 'journal-entry', 'journal-list', 'scan-idle'],
  simulation: ['home', 'journal-entry', 'journal-list', 'stem', 'cultural'],
  'journal-list': ['journal-entry', 'home', 'scan-idle', 'settings'],
  'journal-entry': ['journal-list', 'home'],
  settings: ['home', 'welcome', 'scan-idle', 'journal-list'],
  educator: ['home'],
  'error-camera': ['settings', 'home', 'permissions'],
  offline: ['home', 'journal-list', 'journal-entry'],
  'no-plant': ['scan-idle', 'home', 'poster'],
  poster: ['home', 'scan-idle'],
};
