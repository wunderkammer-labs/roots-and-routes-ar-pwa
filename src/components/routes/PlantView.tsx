import React from 'react';
import CulturalTab from './CulturalTab';
import STEMTab from './STEMTab';
import { PlantDetails, Screen } from '../../lib/types';

export type PlantViewProps = {
  screen: Screen;
  plant: PlantDetails | null;
  go: (screen: Screen) => void;
};

const PlantView: React.FC<PlantViewProps> = ({ screen, plant, go }) => {
  if (!plant) {
    return (
      <div style={{ padding: 'var(--space-3)' }}>
        <p>
          No plant data available yet. Try scanning again from the home screen to explore cultural
          or STEM journeys.
        </p>
      </div>
    );
  }

  if (screen === 'cultural') {
    return <CulturalTab plant={plant} go={go} />;
  }

  return <STEMTab plant={plant} go={go} />;
};

export default PlantView;
