import React from 'react';
import Screen from '../layout/Screen';
import Container from '../layout/Container';
import Stack from '../layout/Stack';
import HStack from '../layout/HStack';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import ImageWithFallback from './figma/ImageWithFallback';
import { AccessibilitySettings, Screen as ScreenType } from '../lib/types';
import { TEXT_SIZE_OPTIONS, TEXT_SIZE_LABELS, ThemeMode, DEFAULT_NAV_ITEMS } from '../lib/constants';

export type HomeProps = {
  go: (screen: ScreenType) => void;
  accessibility: AccessibilitySettings;
  updateAccessibility: (updates: Partial<AccessibilitySettings>) => void;
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
};

type QuickAction = {
  label: string;
  description: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const createQuickActions = (go: (screen: ScreenType) => void): QuickAction[] => [
  {
    label: 'Start Exploring (AR Scan)',
    description: 'Identify nearby plants and launch immersive stories.',
    icon: <Icon name="scan" />,
    onClick: () => go('scan-idle'),
  },
  {
    label: 'Learn by Topic',
    description: 'Jump straight into cultural or STEM journeys.',
    icon: <Icon name="leaf" />,
    onClick: () => go('cultural'),
  },
];

type SecondaryCard = {
  title: string;
  description: string;
  icon: React.ReactNode;
  action: () => void;
};

const createSecondaryCards = (go: (screen: ScreenType) => void): SecondaryCard[] => [
  {
    title: 'Journal',
    description: 'Capture reflections and photos from today’s explorations.',
    icon: <Icon name="journal" />,
    action: () => go('journal-list'),
  },
  {
    title: 'Settings',
    description: 'Adjust accessibility, themes, and privacy preferences.',
    icon: <Icon name="settings" />,
    action: () => go('settings'),
  },
  {
    title: 'Educator Mode',
    description: 'Access dashboards, classroom resources, and standards.',
    icon: <Icon name="educator" />,
    action: () => go('educator'),
  },
];

const NAV_ICONS: Record<string, React.ReactNode> = {
  home: <Icon name="home" />,
  'scan-idle': <Icon name="scan" />,
  'journal-list': <Icon name="journal" />,
  settings: <Icon name="settings" />,
};

const Home: React.FC<HomeProps> = ({ go, accessibility, updateAccessibility, theme, setTheme }) => {
  const quickActions = createQuickActions(go);
  const secondaryCards = createSecondaryCards(go);

  return (
    <Screen
      title="Roots & Routes"
      description="Choose how you want to explore today. Start an AR scan, dive into a topic, or reflect in your journal."
      header={
        <header
          style={{
            background: 'var(--color-deep-green)',
            color: 'var(--color-text-inverse)',
            paddingInline: 'var(--space-3)',
            paddingBlock: 'var(--space-4)',
          }}
        >
          <Container width="md" padding="none">
            <HStack justify="space-between" align="center">
              <Stack gap="xs">
                <span style={{ opacity: 0.8 }}>Welcome back</span>
                <h2 style={{ margin: 0, color: 'var(--color-text-inverse)' }}>Roots & Routes</h2>
              </Stack>
              <Button
                variant="outline"
                onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              >
                {theme === 'light' ? 'Dark mode' : 'Light mode'}
              </Button>
            </HStack>
          </Container>
        </header>
      }
      bottomNav={
        <HStack justify="space-between" wrap>
          {DEFAULT_NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => go(item.screen)}
              style={{
                flex: '1 1 25%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-1)',
                padding: 'var(--space-2)',
                background: 'transparent',
                border: 'none',
                color:
                  item.screen === 'home'
                    ? 'var(--color-light-green)'
                    : 'var(--color-text-secondary)',
                fontWeight:
                  item.screen === 'home' ? 'var(--font-weight-bold)' : 'var(--font-weight-regular)',
                cursor: 'pointer',
              }}
            >
              {NAV_ICONS[item.screen]}
              <span>{item.label}</span>
            </button>
          ))}
        </HStack>
      }
    >
      <Stack gap="lg">
        <ImageWithFallback
          src="/images/hero-garden.png"
          fallbackSrc="/images/hero-placeholder.png"
          alt="Learners exploring plants with augmented reality overlays"
          aspectRatio="16 / 9"
        />

        <section
          aria-label="Quick actions"
          style={{
            display: 'grid',
            gap: 'var(--space-3)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          }}
        >
          {quickActions.map((action) => (
            <Card
              key={action.label}
              title={action.label}
              subtitle={action.description}
              actions={
                <Button size="md" onClick={action.onClick}>
                  Begin
                </Button>
              }
            >
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(22, 139, 95, 0.12)',
                  display: 'grid',
                  placeItems: 'center',
                }}
                aria-hidden
              >
                {action.icon}
              </div>
            </Card>
          ))}
        </section>

        <section
          aria-label="Secondary options"
          style={{
            display: 'grid',
            gap: 'var(--space-3)',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          }}
        >
          {secondaryCards.map((card) => (
            <Card
              key={card.title}
              title={card.title}
              subtitle={card.description}
              actions={
                <Button variant="secondary" onClick={card.action}>
                  Open
                </Button>
              }
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(5, 40, 33, 0.08)',
                  display: 'grid',
                  placeItems: 'center',
                }}
                aria-hidden
              >
                {card.icon}
              </div>
            </Card>
          ))}
        </section>

        <section aria-label="Accessibility quick settings">
          <Card
            title="Accessibility"
            subtitle="Adjust text size to fit the moment. More options in Settings."
          >
            <HStack gap="sm" wrap>
              {TEXT_SIZE_OPTIONS.map((size) => (
                <Button
                  key={size}
                  variant={accessibility.textSize === size ? 'primary' : 'secondary'}
                  onClick={() => updateAccessibility({ textSize: size })}
                >
                  {TEXT_SIZE_LABELS[size]}
                </Button>
              ))}
            </HStack>
          </Card>
        </section>
      </Stack>
    </Screen>
  );
};

export default Home;
