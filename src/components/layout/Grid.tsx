import React from 'react';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';

interface FlexGridProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  width?: string;
  margin?: string;
  marginTop?: string;
  marginBottom?: string;
  padding?: string | number;
  spacing?: number;
  gap?: string | number;
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  className?: string;
  style?: React.CSSProperties;
}

const StyledGrid = styled(Box)<FlexGridProps>(
  ({ direction, padding, gap, marginTop, marginBottom, width, margin }) => ({
    display: 'flex',
    flexDirection: direction,
    padding: padding,
    gap: gap,
    margin: margin,
    width: width,
    marginTop: marginTop,
    marginBottom: marginBottom,
  })
);

const FlexGrid: React.FC<FlexGridProps> = ({
  children,
  width,
  direction,
  padding,
  spacing,
  gap,
  margin,
  justifyContent,
  alignItems,
  marginTop,
  marginBottom,
  className,
  style,
}) => {
  return (
    <StyledGrid
      className={className}
      direction={direction}
      padding={padding}
      width={width}
      gap={gap || spacing}
      margin={margin}
      marginTop={marginTop}
      marginBottom={marginBottom}
      justifyContent={justifyContent}
      alignItems={alignItems}
      style={style}
    >
      {children}
    </StyledGrid>
  );
};

export default FlexGrid;
