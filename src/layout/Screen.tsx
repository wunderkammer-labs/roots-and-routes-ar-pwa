import React, { useId } from 'react';
import Container from './Container';

export type ScreenProps = {
  title: string;
  description?: string;
  header?: React.ReactNode;
  children: React.ReactNode;
  bottomNav?: React.ReactNode;
  skipLinkLabel?: string;
};

const DEFAULT_SKIP_TARGET = 'main-content';

const Screen: React.FC<ScreenProps> = ({
  title,
  description,
  header,
  children,
  bottomNav,
  skipLinkLabel = 'Skip to content',
}) => {
  const headingId = useId();
  const mainUniqueId = useId();
  const mainId = `${DEFAULT_SKIP_TARGET}-${mainUniqueId}`;

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--color-surface)',
      }}
    >
      <a className="skip-link" href={`#${mainId}`}>
        {skipLinkLabel}
      </a>

      {header}

      <main
        id={mainId}
        aria-labelledby={headingId}
        style={{
          flex: '1 1 auto',
          paddingInline: 'var(--space-3)',
          paddingBlock: 'var(--space-4)',
        }}
      >
        <Container width="md" padding="none">
          <h1
            id={headingId}
            data-screen-heading
            tabIndex={-1}
            style={{ marginBottom: 'var(--space-3)' }}
          >
            {title}
          </h1>
          {description && <p style={{ marginBottom: 'var(--space-4)' }}>{description}</p>}
          {children}
        </Container>
      </main>

      {bottomNav && (
        <nav
          aria-label="Primary navigation"
          style={{
            borderTop: '1px solid var(--color-border)',
            background: 'var(--color-surface-elevated)',
            paddingInline: 'var(--space-3)',
            paddingBlock: 'calc(var(--space-2) + 2px)',
          }}
        >
          <Container width="md" padding="none">
            {bottomNav}
          </Container>
        </nav>
      )}
    </div>
  );
};

export default Screen;
