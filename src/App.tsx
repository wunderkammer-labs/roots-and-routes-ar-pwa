import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AccessibilitySettings, JournalEntryType, PlantDetails, Screen } from './lib/types';
import { ALLOWED_TRANSITIONS } from './lib/navigation';
import { STORAGE_KEYS, ThemeMode } from './lib/constants';
import {
  isAccessibilitySettings,
  isJournalEntryArray,
  isThemeMode,
} from './lib/validation';
import {
  enableDarkMode,
  setNarrationEnabled,
  setReduceMotion,
  setTextScale,
  toggleHighContrast,
} from './lib/theme';
import Welcome from './components/onboarding/Welcome';
import Permissions from './components/onboarding/Permissions';
import AccessibilitySetup from './components/onboarding/AccessibilitySetup';
import PrivacyStart from './components/onboarding/PrivacyStart';
import Home from './components/Home';
import ScreenLayout from './layout/Screen';
import Stack from './layout/Stack';
import Button from './ui/Button';
import ScanIdle from './components/scan/ScanIdle';
import ScanDetecting from './components/scan/ScanDetecting';
import ScanDetected from './components/scan/ScanDetected';
import PlantView from './components/routes/PlantView';
import TimeShiftSimulation from './components/TimeShiftSimulation';
import JournalList from './components/journal/JournalList';
import JournalEntry from './components/journal/JournalEntry';
import Settings from './components/Settings';
import EducatorDashboard from './components/EducatorDashboard';
import ErrorCamera from './components/errors/ErrorCamera';
import OfflineScreen from './components/errors/Offline';
import NoPlant from './components/errors/NoPlant';
import MarketingPoster from './components/MarketingPoster';

type AppContextState = {
  go: (screen: Screen) => void;
  accessibility: AccessibilitySettings;
  updateAccessibility: (updates: Partial<AccessibilitySettings>) => void;
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  cameraGranted: boolean;
  setCameraGranted: (granted: boolean) => void;
  journal: JournalEntryType[];
  addJournalEntry: (entry: Omit<JournalEntryType, 'date'>) => void;
  currentPlant: PlantDetails | null;
  setCurrentPlant: (plant: PlantDetails | null) => void;
};

type PlaceholderProps = {
  screen: Screen;
  description?: string;
  context: AppContextState;
};

const DEFAULT_ACCESSIBILITY: AccessibilitySettings = {
  textSize: 'normal',
  highContrast: false,
  reduceMotion: false,
  narration: false,
};

const SCREEN_HEADINGS: Record<Screen, string> = {
  welcome: 'Welcome',
  permissions: 'Camera Permissions',
  accessibility: 'Accessibility Setup',
  privacy: 'Privacy Overview',
  home: 'Home',
  'scan-idle': 'Ready to Scan',
  'scan-detecting': 'Scanning Plant',
  'scan-detected': 'Plant Identified',
  cultural: 'Cultural Route',
  stem: 'STEM Route',
  simulation: 'Climate Simulation',
  'journal-list': 'Journal Entries',
  'journal-entry': 'Journal Entry',
  settings: 'Settings',
  educator: 'Educator Dashboard',
  'error-camera': 'Camera Access Required',
  offline: 'Offline Mode',
  'no-plant': 'No Plant Detected',
  poster: 'Roots & Routes Poster',
};

const Placeholder: React.FC<PlaceholderProps> = ({ screen, description, context }) => {
  const targets = useMemo(() => ALLOWED_TRANSITIONS[screen] ?? [], [screen]);

  return (
    <ScreenLayout
      title={SCREEN_HEADINGS[screen]}
      description={
        description ?? 'This screen is under construction. Use the buttons below to navigate.'
      }
    >
      <Stack gap="md">
        {targets.length > 0 && (
          <Stack gap="sm">
            <p style={{ margin: 0 }}>Available routes:</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
              {targets.map((target) => (
                <Button key={target} variant="secondary" onClick={() => context.go(target)}>
                  Go to {SCREEN_HEADINGS[target]}
                </Button>
              ))}
            </div>
          </Stack>
        )}
      </Stack>
    </ScreenLayout>
  );
};

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [accessibility, setAccessibility] = useState<AccessibilitySettings>(DEFAULT_ACCESSIBILITY);
  const [cameraGranted, setCameraGranted] = useState(false);
  const [journal, setJournal] = useState<JournalEntryType[]>([]);
  const [currentPlant, setCurrentPlant] = useState<PlantDetails | null>(null);
  const [theme, setTheme] = useState<ThemeMode>('light');
  const [isOffline, setIsOffline] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  const updateAccessibility = useCallback((updates: Partial<AccessibilitySettings>) => {
    setAccessibility((prev) => ({ ...prev, ...updates }));
  }, []);

  const updateTheme = useCallback((mode: ThemeMode) => {
    setTheme(mode);
  }, []);

  const updateCameraPermission = useCallback((granted: boolean) => {
    setCameraGranted(granted);
  }, []);

  const addJournalEntry = useCallback(
    (entry: Omit<JournalEntryType, 'date'>) => {
      setJournal((prev) => [
        ...prev,
        { ...entry, date: new Date().toISOString() },
      ]);
    },
    [],
  );

  const resetApp = useCallback(() => {
    setCurrentScreen('welcome');
    setAccessibility(DEFAULT_ACCESSIBILITY);
    setCameraGranted(false);
    setJournal([]);
    setCurrentPlant(null);
    setTheme('light');
    localStorage.removeItem(STORAGE_KEYS.accessibility);
    localStorage.removeItem(STORAGE_KEYS.camera);
    localStorage.removeItem(STORAGE_KEYS.journal);
    localStorage.removeItem(STORAGE_KEYS.theme);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const storedAccessibility = localStorage.getItem(STORAGE_KEYS.accessibility);
      if (storedAccessibility) {
        const parsed = JSON.parse(storedAccessibility);
        if (isAccessibilitySettings(parsed)) {
          setAccessibility(parsed);
        }
      }

      const storedTheme = localStorage.getItem(STORAGE_KEYS.theme);
      if (isThemeMode(storedTheme)) {
        setTheme(storedTheme);
      }

      const storedCamera = localStorage.getItem(STORAGE_KEYS.camera);
      if (storedCamera === 'true' || storedCamera === 'false') {
        setCameraGranted(storedCamera === 'true');
      }

      const storedJournal = localStorage.getItem(STORAGE_KEYS.journal);
      if (storedJournal) {
        const parsedJournal = JSON.parse(storedJournal);
        if (isJournalEntryArray(parsedJournal)) {
          setJournal(parsedJournal);
        }
      }
    } catch (error) {
      console.error('Failed to restore persisted state', error);
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.accessibility, JSON.stringify(accessibility));
    } catch (error) {
      console.error('Failed to persist accessibility settings', error);
    }
  }, [accessibility]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.theme, theme);
    } catch (error) {
      console.error('Failed to persist theme selection', error);
    }
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const updateStatus = () => setIsOffline(!window.navigator.onLine);
    updateStatus();
    window.addEventListener('online', updateStatus);
    window.addEventListener('offline', updateStatus);
    return () => {
      window.removeEventListener('online', updateStatus);
      window.removeEventListener('offline', updateStatus);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.camera, cameraGranted ? 'true' : 'false');
    } catch (error) {
      console.error('Failed to persist camera permission state', error);
    }
  }, [cameraGranted]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(STORAGE_KEYS.journal, JSON.stringify(journal));
    } catch (error) {
      console.error('Failed to persist journal entries', error);
    }
  }, [journal]);

  useEffect(() => {
    setTextScale(accessibility.textSize);
  }, [accessibility.textSize]);

  useEffect(() => {
    toggleHighContrast(accessibility.highContrast);
  }, [accessibility.highContrast]);

  useEffect(() => {
    setReduceMotion(accessibility.reduceMotion);
  }, [accessibility.reduceMotion]);

  useEffect(() => {
    setNarrationEnabled(accessibility.narration);
    if (!accessibility.narration) {
      setAnnouncement('');
      return;
    }
    setAnnouncement(`Navigated to ${SCREEN_HEADINGS[currentScreen]}`);
  }, [accessibility.narration, currentScreen]);

  useEffect(() => {
    enableDarkMode(theme === 'dark');
  }, [theme]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      const heading = document.querySelector('[data-screen-heading]') as HTMLElement | null;
      heading?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [currentScreen]);

  const go = useCallback((to: Screen): void => {
    setCurrentScreen((prev) => {
      if (prev === to) {
        return prev;
      }

      const allowed = ALLOWED_TRANSITIONS[prev] ?? [];
      if (allowed.includes(to)) {
        return to;
      }

      console.error(`Navigation from ${prev} to ${to} is not permitted.`);
      return prev;
    });
  }, []);

  const retryConnection = useCallback(() => {
    if (typeof window === 'undefined') return;
    const online = window.navigator.onLine;
    setIsOffline(!online);
    if (online) go('home');
  }, [go]);

  const appContext = useMemo<AppContextState>(
    () => ({
      go,
      accessibility,
      updateAccessibility,
      theme,
      setTheme: updateTheme,
      cameraGranted,
      setCameraGranted: updateCameraPermission,
      journal,
      addJournalEntry,
      currentPlant,
      setCurrentPlant,
    }),
    [
      go,
      accessibility,
      updateAccessibility,
      theme,
      updateTheme,
      cameraGranted,
      updateCameraPermission,
      journal,
      addJournalEntry,
      currentPlant,
    ],
  );

  const renderScreen = useCallback(
    (screen: Screen): React.ReactNode => {
      switch (screen) {
        case 'welcome':
          return <Welcome go={go} />;
        case 'permissions':
          return <Permissions go={go} setCameraGranted={updateCameraPermission} />;
        case 'accessibility':
          return (
            <AccessibilitySetup
              accessibility={accessibility}
              updateAccessibility={updateAccessibility}
              go={go}
            />
          );
        case 'privacy':
          return <PrivacyStart go={go} />;
        case 'scan-idle':
          return <ScanIdle go={go} cameraGranted={cameraGranted} />;
        case 'scan-detecting':
          return <ScanDetecting go={go} setCurrentPlant={setCurrentPlant} />;
        case 'scan-detected':
          return <ScanDetected go={go} currentPlant={currentPlant} />;
        case 'cultural':
        case 'stem':
          return <PlantView screen={screen} plant={currentPlant} go={go} />;
        case 'simulation':
          return (
            <TimeShiftSimulation plant={currentPlant} go={go} addJournalEntry={addJournalEntry} />
          );
        case 'error-camera':
          return <ErrorCamera go={go} />;
        case 'offline':
          return <OfflineScreen go={go} retry={retryConnection} />;
        case 'no-plant':
          return <NoPlant go={go} />;
        case 'poster':
          return <MarketingPoster />;
        case 'journal-list':
          return <JournalList entries={journal} go={go} />;
        case 'journal-entry':
          return <JournalEntry plant={currentPlant} addJournalEntry={addJournalEntry} go={go} />;
        case 'settings':
          return (
            <Settings
              accessibility={accessibility}
              updateAccessibility={updateAccessibility}
              theme={theme}
              setTheme={updateTheme}
              resetApp={resetApp}
              go={go}
            />
          );
        case 'educator':
          return <EducatorDashboard journal={journal} go={go} />;
        case 'home':
          return (
            <Home
              go={go}
              accessibility={accessibility}
              updateAccessibility={updateAccessibility}
              theme={theme}
              setTheme={updateTheme}
            />
          );
        default:
          return <Placeholder screen={screen} context={appContext} />;
      }
    },
    [
      accessibility,
      go,
      cameraGranted,
      currentPlant,
      addJournalEntry,
      journal,
      resetApp,
      retryConnection,
      theme,
      appContext,
      updateAccessibility,
      updateCameraPermission,
      updateTheme,
    ],
  );

  const currentView = renderScreen(currentScreen);

  return (
    <>
      {isOffline && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            top: 'var(--space-3)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'var(--color-warning)',
            color: 'var(--color-text-primary)',
            padding: 'var(--space-2) var(--space-3)',
            borderRadius: 'var(--radius-base)',
            boxShadow: 'var(--shadow-card)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          <span>Offline mode — some features are limited.</span>
          <button
            type="button"
            onClick={() => go('offline')}
            style={{
              background: 'transparent',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-full)',
              padding: '0 var(--space-2)',
              cursor: 'pointer',
            }}
          >
            Offline tips
          </button>
        </div>
      )}
      {accessibility.narration && (
        <div
          aria-live="polite"
          style={{
            position: 'absolute',
            width: 1,
            height: 1,
            margin: -1,
            padding: 0,
            border: 0,
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            clipPath: 'inset(50%)',
            whiteSpace: 'nowrap',
          }}
        >
          {announcement}
        </div>
      )}
      {currentView}
      {import.meta.env.DEV && (
        <aside
          style={{
            position: 'fixed',
            right: 'var(--space-3)',
            bottom: 'var(--space-3)',
            width: 'min(360px, 90vw)',
            background: 'var(--color-surface-elevated)',
            borderRadius: 'var(--radius-base)',
            boxShadow: 'var(--shadow-card)',
            padding: 'var(--space-3)',
            fontSize: '0.85rem',
            maxHeight: '50vh',
            overflow: 'auto',
            border: '1px solid var(--color-border)',
          }}
        >
          <strong>Debug State</strong>
          <pre
            style={{
              margin: 'var(--space-2) 0 0',
              whiteSpace: 'pre-wrap',
            }}
          >
            {JSON.stringify(
              {
                currentScreen,
                accessibility,
                cameraGranted,
                theme,
                journalCount: journal.length,
                hasCurrentPlant: Boolean(currentPlant),
              },
              null,
              2,
            )}
          </pre>
        </aside>
      )}
    </>
  );
};

export default App;
