import React, { useId } from 'react';

export type SliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  description?: string;
  valueFormatter?: (value: number) => string;
};

const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  description,
  valueFormatter,
}) => {
  const id = useId();
  const descriptionId = description ? `${id}-description` : undefined;

  return (
    <label htmlFor={id} style={{ display: 'block' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-2)',
        }}
      >
        <span style={{ fontWeight: 'var(--font-weight-medium)' }}>{label}</span>
        <span style={{ color: 'var(--color-text-secondary)' }}>
          {valueFormatter ? valueFormatter(value) : value}
        </span>
      </div>
      {description && (
        <p id={descriptionId} style={{ marginBottom: 'var(--space-2)' }}>
          {description}
        </p>
      )}
      <input
        id={id}
        type="range"
        role="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-describedby={descriptionId}
        onChange={(event) => onChange(Number(event.target.value))}
        style={{
          width: '100%',
          accentColor: 'var(--color-light-green)',
          height: '44px',
        }}
      />
    </label>
  );
};

export default Slider;
