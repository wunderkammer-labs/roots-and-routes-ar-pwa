import { CSSProperties, ElementType, ReactNode } from 'react';
import { GAP_MAP, GapSize } from '../lib/constants';

export type HStackProps = {
  gap?: GapSize;
  align?: CSSProperties['alignItems'];
  justify?: CSSProperties['justifyContent'];
  as?: ElementType;
  wrap?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export default function HStack({
  gap = 'md',
  align = 'center',
  justify,
  wrap = false,
  as: Component = 'div',
  className,
  style,
  children,
}: HStackProps) {
  return (
    <Component
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: align,
        justifyContent: justify,
        gap: GAP_MAP[gap],
        flexWrap: wrap ? 'wrap' : 'nowrap',
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
