import React from 'react';
import Screen from '../../layout/Screen';
import Stack from '../../layout/Stack';
import Card from '../../ui/Card';
import Button from '../../ui/Button';
import HStack from '../../layout/HStack';
import Icon from '../../ui/Icon';
import BottomNav from '../navigation/BottomNav';
import { JournalEntryType, Screen as ScreenType } from '../../lib/types';

export type JournalListProps = {
  /**
   * Existing journal entries.
   */
  entries: JournalEntryType[];
  /**
   * Navigates to a target screen.
   */
  go: (screen: ScreenType) => void;
};

const ROUTE_LABEL: Record<JournalEntryType['route'], string> = {
  cultural: 'Cultural',
  stem: 'STEM',
};

/**
 * Journal overview with quick creation entry points.
 */
const JournalList: React.FC<JournalListProps> = ({ entries, go }) => {
  const hasEntries = entries.length > 0;

  return (
    <Screen
      title="Journal"
      description="Capture reflections, photos, and standards alignment from each plant exploration."
      bottomNav={
        <BottomNav
          active="journal-list"
          onNavigate={go}
          items={[
            { label: 'Home', screen: 'home', icon: <Icon name="home" /> },
            { label: 'Scan', screen: 'scan-idle', icon: <Icon name="scan" /> },
            { label: 'Journal', screen: 'journal-list', icon: <Icon name="journal" /> },
            { label: 'Settings', screen: 'settings', icon: <Icon name="settings" /> },
          ]}
        />
      }
    >
      <Stack gap="lg">
        {!hasEntries && (
          <Card
            title="No entries yet"
            subtitle="Start exploring to document cultural stories or STEM insights."
            actions={<Button onClick={() => go('journal-entry')}>New Entry</Button>}
          >
            <p style={{ margin: 0 }}>
              Journals store locally so you can reflect even when offline. Capture observations
              after each scan or simulation.
            </p>
          </Card>
        )}

        {hasEntries && (
          <Stack gap="md">
            {entries.map((entry) => (
              <Card
                key={entry.id}
                title={entry.plantName}
                subtitle={`${new Date(entry.date).toLocaleDateString()} · ${ROUTE_LABEL[entry.route]}`}
                actions={
                  <Button variant="secondary" onClick={() => go('journal-entry')}>
                    Open Entry
                  </Button>
                }
              >
                <Stack gap="sm">
                  <p style={{ margin: 0 }}>{entry.notes.slice(0, 140)}...</p>
                  {entry.standards && entry.standards.length > 0 && (
                    <HStack gap="sm" wrap>
                      {entry.standards.map((standard) => (
                        <span
                          key={standard}
                          style={{
                            padding: 'var(--space-1) var(--space-2)',
                            borderRadius: 'var(--radius-base)',
                            background: 'rgba(22, 139, 95, 0.12)',
                            color: 'var(--color-dark-green)',
                          }}
                        >
                          {standard}
                        </span>
                      ))}
                    </HStack>
                  )}
                </Stack>
              </Card>
            ))}
          </Stack>
        )}
      </Stack>

      <button
        type="button"
        aria-label="Create new journal entry"
        onClick={() => go('journal-entry')}
        style={fabStyle}
      >
        +
      </button>
    </Screen>
  );
};

const fabStyle: React.CSSProperties = {
  position: 'fixed',
  right: 'var(--space-4)',
  bottom: 'var(--space-5)',
  width: 56,
  height: 56,
  borderRadius: 'var(--radius-full)',
  background: 'var(--color-light-green)',
  color: 'var(--color-text-inverse)',
  fontSize: '2rem',
  border: 'none',
  display: 'grid',
  placeItems: 'center',
  boxShadow: 'var(--shadow-card)',
};

export default JournalList;
