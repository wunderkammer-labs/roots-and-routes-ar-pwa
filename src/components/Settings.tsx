import React from 'react';
import Screen from '../layout/Screen';
import Stack from '../layout/Stack';
import Card from '../ui/Card';
import Button from '../ui/Button';
import HStack from '../layout/HStack';
import { AccessibilitySettings, Screen as ScreenType } from '../lib/types';
import BottomNav from './navigation/BottomNav';

export type SettingsProps = {
  accessibility: AccessibilitySettings;
  updateAccessibility: (updates: Partial<AccessibilitySettings>) => void;
  theme: 'light' | 'dark';
  setTheme: (mode: 'light' | 'dark') => void;
  resetApp: () => void;
  go: (screen: ScreenType) => void;
};

const Settings: React.FC<SettingsProps> = ({
  accessibility,
  updateAccessibility,
  theme,
  setTheme,
  resetApp,
  go,
}) => {
  return (
    <Screen
      title="Settings"
      description="Adjust accessibility, theme, and privacy preferences."
      bottomNav={
        <BottomNav
          active="settings"
          onNavigate={go}
          items={[
            { label: 'Home', screen: 'home' },
            { label: 'Scan', screen: 'scan-idle' },
            { label: 'Journal', screen: 'journal-list' },
            { label: 'Settings', screen: 'settings' },
          ]}
        />
      }
    >
      <Stack gap="lg">
        <Card title="Text size">
          <HStack gap="sm" wrap>
            {(['normal', 'large', 'xl'] as const).map((size) => (
              <Button
                key={size}
                variant={accessibility.textSize === size ? 'primary' : 'secondary'}
                onClick={() => updateAccessibility({ textSize: size })}
              >
                {size === 'normal' ? 'Normal' : size === 'large' ? 'Large' : 'Extra Large'}
              </Button>
            ))}
          </HStack>
        </Card>

        <Card title="Visual preferences">
          <Stack gap="sm">
            <label style={labelStyle}>
              <input
                type="checkbox"
                checked={accessibility.highContrast}
                onChange={(event) => updateAccessibility({ highContrast: event.target.checked })}
              />
              High contrast colors
            </label>
            <label style={labelStyle}>
              <input
                type="checkbox"
                checked={accessibility.reduceMotion}
                onChange={(event) => updateAccessibility({ reduceMotion: event.target.checked })}
              />
              Reduce motion
            </label>
            <label style={labelStyle}>
              <input
                type="checkbox"
                checked={accessibility.narration}
                onChange={(event) => updateAccessibility({ narration: event.target.checked })}
              />
              Narration support
            </label>
          </Stack>
        </Card>

        <Card title="Theme">
          <HStack gap="sm">
            <Button
              variant={theme === 'light' ? 'primary' : 'secondary'}
              onClick={() => setTheme('light')}
            >
              Light
            </Button>
            <Button
              variant={theme === 'dark' ? 'primary' : 'secondary'}
              onClick={() => setTheme('dark')}
            >
              Dark
            </Button>
          </HStack>
        </Card>

        <Card title="Privacy">
          <p style={{ margin: 0 }}>
            Analytics integration is optional and currently disabled. All journal data remains on
            this device unless exported.
          </p>
        </Card>

        <Card title="Danger zone">
          <Stack gap="sm">
            <p style={{ margin: 0 }}>
              Resetting clears onboarding progress, accessibility preferences, and journals from
              this device.
            </p>
            <Button variant="destructive" onClick={resetApp}>
              Reset App
            </Button>
          </Stack>
        </Card>
      </Stack>
    </Screen>
  );
};

const labelStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--space-2)',
};

export default Settings;
