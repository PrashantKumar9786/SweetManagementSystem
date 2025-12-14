import React, { ReactNode } from 'react';
import { Box } from '@mui/material';

interface GridItemProps {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  children: ReactNode;
}

/**
 * A component to replace Material UI's Grid with a simpler flexbox-based layout
 * This is used as a workaround for TypeScript errors with Material UI Grid
 */
export const GridContainer: React.FC<{ spacing?: number; children: ReactNode }> = ({ 
  spacing = 2, 
  children 
}) => {
  const spacingInPx = spacing * 8; // Material UI's spacing unit is 8px
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexWrap: 'wrap', 
        margin: `-${spacingInPx/2}px` 
      }}
    >
      {children}
    </Box>
  );
};

/**
 * A component to replace Material UI's Grid item with a simpler flexbox-based layout
 */
export const GridItem: React.FC<GridItemProps> = ({ 
  xs = 12, 
  sm, 
  md, 
  lg, 
  children 
}) => {
  // Calculate flex basis based on breakpoints (similar to Material UI Grid)
  // xs: 0px, sm: 600px, md: 900px, lg: 1200px, xl: 1536px
  const getWidth = () => {
    return {
      width: `${(xs / 12) * 100}%`,
      ...(sm && { '@media (min-width: 600px)': { width: `${(sm / 12) * 100}%` } }),
      ...(md && { '@media (min-width: 900px)': { width: `${(md / 12) * 100}%` } }),
      ...(lg && { '@media (min-width: 1200px)': { width: `${(lg / 12) * 100}%` } })
    };
  };
  
  return (
    <Box
      sx={{
        ...getWidth(),
        padding: 1 // Equivalent to spacing={2} in Material UI Grid
      }}
    >
      {children}
    </Box>
  );
};
