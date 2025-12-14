import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Alert,
} from '@mui/material';
import { Sweet, CreateSweetData, UpdateSweetData } from '../../types';
import { sweetService } from '../../services/sweet.service';
import { GridContainer, GridItem } from '../common/GridWrapper';

interface SweetFormProps {
  open: boolean;
  onClose: () => void;
  sweet?: Sweet | null;
  onSuccess: () => void;
}

const SweetForm: React.FC<SweetFormProps> = ({
  open,
  onClose,
  sweet,
  onSuccess,
}) => {
  const isEdit = !!sweet;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CreateSweetData | UpdateSweetData>({
    name: '',
    category: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  // Initialize form with sweet data when editing
  useEffect(() => {
    if (sweet) {
      setFormData({
        name: sweet.name,
        category: sweet.category,
        description: sweet.description || '',
        price: sweet.price,
        quantity: sweet.quantity,
      });
    } else {
      // Reset form for new sweet
      setFormData({
        name: '',
        category: '',
        description: '',
        price: 0,
        quantity: 0,
      });
    }
  }, [sweet]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs
    if (name === 'price' || name === 'quantity') {
      setFormData((prev) => ({
        ...prev,
        [name]: value === '' ? '' : Number(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isEdit && sweet) {
        // Update existing sweet
        await sweetService.updateSweet(sweet.id, formData);
      } else {
        // Create new sweet
        await sweetService.createSweet(formData as CreateSweetData);
      }
      
      setLoading(false);
      onSuccess();
      onClose();
    } catch (error: any) {
      setError(error.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={loading ? undefined : onClose} maxWidth="sm" fullWidth>
      <form onSubmit={handleSubmit}>
        <DialogTitle>
          {isEdit ? `Edit Sweet: ${sweet?.name}` : 'Add New Sweet'}
        </DialogTitle>
        
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          
          <GridContainer spacing={2}>
            <GridItem xs={12}>
              <TextField
                name="name"
                label="Sweet Name"
                fullWidth
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                autoFocus
              />
            </GridItem>
            
            <GridItem xs={12}>
              <TextField
                name="category"
                label="Category"
                fullWidth
                value={formData.category}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </GridItem>
            
            <GridItem xs={12}>
              <TextField
                name="description"
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
              />
            </GridItem>
            
            <GridItem xs={12} md={6}>
              <TextField
                name="price"
                label="Price"
                type="number"
                fullWidth
                value={formData.price}
                onChange={handleChange}
                required
                disabled={loading}
                inputProps={{ min: 0, step: 0.01 }}
                InputProps={{ startAdornment: '₹' }}
              />
            </GridItem>
            
            <GridItem xs={12} md={6}>
              <TextField
                name="quantity"
                label="Quantity"
                type="number"
                fullWidth
                value={formData.quantity}
                onChange={handleChange}
                required
                disabled={loading}
                inputProps={{ min: 0, step: 1 }}
              />
            </GridItem>
          </GridContainer>
        </DialogContent>
        
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : null}
          >
            {isEdit ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default SweetForm;
