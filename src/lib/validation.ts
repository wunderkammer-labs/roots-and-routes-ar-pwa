import { AccessibilitySettings, JournalEntryType } from './types';

export const isValidTextSize = (value: unknown): value is AccessibilitySettings['textSize'] => {
  return value === 'normal' || value === 'large' || value === 'xl';
};

export const isAccessibilitySettings = (value: unknown): value is AccessibilitySettings => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (
    isValidTextSize(obj.textSize) &&
    typeof obj.highContrast === 'boolean' &&
    typeof obj.reduceMotion === 'boolean' &&
    typeof obj.narration === 'boolean'
  );
};

export const isJournalEntry = (value: unknown): value is JournalEntryType => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (
    typeof obj.id === 'string' &&
    typeof obj.plantName === 'string' &&
    typeof obj.date === 'string' &&
    (obj.route === 'cultural' || obj.route === 'stem') &&
    typeof obj.notes === 'string'
  );
};

export const isJournalEntryArray = (value: unknown): value is JournalEntryType[] => {
  return Array.isArray(value) && value.every(isJournalEntry);
};

export const isThemeMode = (value: unknown): value is 'light' | 'dark' => {
  return value === 'light' || value === 'dark';
};

export const sanitizeString = (input: string, maxLength = 10000): string => {
  if (typeof input !== 'string') {
    return '';
  }
  return input.slice(0, maxLength).trim();
};

export const generateId = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `${timestamp}-${randomPart}`;
};
