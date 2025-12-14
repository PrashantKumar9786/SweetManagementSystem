import React, { useState, useEffect } from 'react';
import {
  Paper,
  TextField,
  Box,
  Button,
  Typography,
  Slider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search, Clear } from '@mui/icons-material';
import { SweetFilters as SweetFiltersType } from '../../types';
import { GridContainer, GridItem } from '../common/GridWrapper';

interface SweetFiltersProps {
  onFilterChange: (filters: SweetFiltersType) => void;
  maxPrice: number;
}

const SweetFilters: React.FC<SweetFiltersProps> = ({ onFilterChange, maxPrice = 100 }) => {
  const [filters, setFilters] = useState<SweetFiltersType>({
    name: '',
    category: '',
    minPrice: undefined,
    maxPrice: undefined,
  });

  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);

  useEffect(() => {
    // Update price range when maxPrice changes
    setPriceRange([priceRange[0], maxPrice]);
  }, [maxPrice]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    const [min, max] = newValue as number[];
    setPriceRange([min, max]);
    setFilters((prev) => ({
      ...prev,
      minPrice: min > 0 ? min : undefined,
      maxPrice: max < maxPrice ? max : undefined,
    }));
  };

  const handleFilterApply = () => {
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setFilters({
      name: '',
      category: '',
      minPrice: undefined,
      maxPrice: undefined,
    });
    setPriceRange([0, maxPrice]);
    onFilterChange({});
  };

  return (
    <Paper 
      elevation={2} 
      sx={{ 
        p: 2, 
        mb: 3,
        background: (theme) => 
          theme.palette.mode === 'dark' 
            ? theme.palette.background.paper 
            : theme.palette.grey[50]
      }}
    >
      <Typography variant="h6" gutterBottom>
        Filter Sweets
      </Typography>

      <GridContainer spacing={2}>
        <GridItem xs={12} md={6}>
          <TextField
            name="name"
            label="Sweet Name"
            fullWidth
            variant="outlined"
            value={filters.name}
            onChange={handleInputChange}
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: filters.name ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setFilters((prev) => ({ ...prev, name: '' }))}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </GridItem>

        <GridItem xs={12} md={6}>
          <TextField
            name="category"
            label="Category"
            fullWidth
            variant="outlined"
            value={filters.category}
            onChange={handleInputChange}
            margin="dense"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
              endAdornment: filters.category ? (
                <InputAdornment position="end">
                  <IconButton
                    size="small"
                    onClick={() => setFilters((prev) => ({ ...prev, category: '' }))}
                  >
                    <Clear fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </GridItem>

        <GridItem xs={12}>
          <Typography id="price-range-slider" gutterBottom>
            Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
          </Typography>
          <Box px={1}>
            <Slider
              value={priceRange}
              onChange={handlePriceChange}
              valueLabelDisplay="auto"
              min={0}
              max={maxPrice}
              step={1}
              marks={[
                { value: 0, label: '₹0' },
                { value: maxPrice, label: `₹${maxPrice}` },
              ]}
              valueLabelFormat={(value) => `₹${value}`}
              getAriaLabel={() => 'Price range'}
              getAriaValueText={(value) => `₹${value}`}
            />
          </Box>
        </GridItem>

        <GridItem xs={12}>
          <Box display="flex" justifyContent="space-between" mt={1}>
            <Button 
              variant="outlined" 
              color="secondary" 
              onClick={handleClearFilters}
              startIcon={<Clear />}
            >
              Clear Filters
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              onClick={handleFilterApply}
              startIcon={<Search />}
            >
              Apply Filters
            </Button>
          </Box>
        </GridItem>
      </GridContainer>
    </Paper>
  );
};

export default SweetFilters;
