import { describe, expect, test } from 'vitest';
import { Screen } from '../lib/types';
import { ALLOWED_TRANSITIONS } from '../lib/navigation';

describe('Screen transition map', () => {
  test('every target is a valid screen key', () => {
    const screens = Object.keys(ALLOWED_TRANSITIONS) as Screen[];
    const screenSet = new Set(screens);

    screens.forEach((screen) => {
      ALLOWED_TRANSITIONS[screen].forEach((target) => {
        expect(screenSet.has(target)).toBe(true);
      });
    });
  });
});
