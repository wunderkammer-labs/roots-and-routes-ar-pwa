import { CSSProperties, ElementType, ReactNode } from 'react';
import { GAP_MAP, GapSize } from '../lib/constants';

export type StackProps = {
  gap?: GapSize;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export default function Stack({
  gap = 'md',
  align,
  justify,
  as: Component = 'div',
  className,
  style,
  children,
}: StackProps) {
  return (
    <Component
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: align,
        justifyContent: justify,
        gap: GAP_MAP[gap],
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
