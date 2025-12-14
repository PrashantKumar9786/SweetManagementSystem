import { ElementType } from 'react';
import { GridProps } from '@mui/material';

/**
 * Custom hook to provide proper typing for Grid components
 */
export const useResponsiveGrid = () => {
  /**
   * Creates properly typed Grid item props
   */
  const gridItemProps = (xs: number, sm?: number, md?: number, lg?: number, component: ElementType = 'div') => {
    return {
      item: true,
      xs,
      ...(sm ? { sm } : {}),
      ...(md ? { md } : {}),
      ...(lg ? { lg } : {}),
      component,
    } as GridProps;
  };

  /**
   * Creates properly typed Grid container props
   */
  const gridContainerProps = (spacing: number, component: ElementType = 'div') => {
    return {
      container: true,
      spacing,
      component,
    } as GridProps;
  };

  return {
    gridItemProps,
    gridContainerProps
  };
};
