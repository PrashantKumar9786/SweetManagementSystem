import React from 'react';
import { Typography, Box, CircularProgress } from '@mui/material';
import SweetCard from './SweetCard';
import { Sweet } from '../../types';
import { GridContainer, GridItem } from '../common/GridWrapper';

interface SweetGridProps {
  sweets: Sweet[];
  loading: boolean;
  error: string | null;
  onUpdate: () => void;
  onDeleteSweet: (id: string) => void;
}

const SweetGrid: React.FC<SweetGridProps> = ({ 
  sweets, 
  loading, 
  error, 
  onUpdate,
  onDeleteSweet 
}) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        sx={{
          backgroundColor: 'error.light',
          color: 'error.contrastText',
          p: 2,
          borderRadius: 1,
        }}
      >
        <Typography>Error: {error}</Typography>
      </Box>
    );
  }

  if (sweets.length === 0) {
    return (
      <Box 
        sx={{
          backgroundColor: 'background.paper',
          p: 3,
          borderRadius: 1,
          textAlign: 'center',
          border: 1,
          borderColor: 'divider',
        }}
      >
        <Typography variant="h6">No sweets found</Typography>
        <Typography variant="body2" color="textSecondary">
          Try adjusting your search or filters
        </Typography>
      </Box>
    );
  }

  return (
    <GridContainer spacing={3}>
      {sweets.map((sweet) => (
        <GridItem key={sweet.id} xs={12} sm={6} md={4}>
          <SweetCard 
            sweet={sweet} 
            onUpdate={onUpdate}
            onDelete={onDeleteSweet}
          />
        </GridItem>
      ))}
    </GridContainer>
  );
};

export default SweetGrid;
