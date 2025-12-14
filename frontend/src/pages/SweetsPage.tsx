import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Button,
  Container,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import SweetGrid from '../components/sweets/SweetGrid';
import SweetFilters from '../components/sweets/SweetFilters';
import SweetForm from '../components/sweets/SweetForm';
import { useAuth } from '../contexts/AuthContext';
import { sweetService } from '../services/sweet.service';
import { Sweet, SweetFilters as SweetFiltersType } from '../types';

const SweetsPage: React.FC = () => {
  const { authState } = useAuth();
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [currentSweet, setCurrentSweet] = useState<Sweet | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [filters, setFilters] = useState<SweetFiltersType>({});
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [sweetToDelete, setSweetToDelete] = useState<string | null>(null);
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'info'
  });

  // Load sweets on component mount
  useEffect(() => {
    fetchSweets();
  }, []);

  // Fetch sweets from API
  const fetchSweets = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let result: Sweet[];
      
      if (Object.keys(filters).length > 0) {
        result = await sweetService.searchSweets(filters);
      } else {
        result = await sweetService.getAllSweets();
      }
      
      setSweets(result);

      // Calculate max price for filter slider
      if (result.length > 0) {
        const highest = Math.max(...result.map(sweet => sweet.price));
        setMaxPrice(Math.ceil(highest * 1.2)); // Add 20% margin
      }
    } catch (error) {
      console.error('Error fetching sweets:', error);
      setError('Failed to load sweets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: SweetFiltersType) => {
    setFilters(newFilters);
    setTimeout(() => fetchSweets(), 0);
  };

  // Open form to add a new sweet
  const handleAddNew = () => {
    setCurrentSweet(null);
    setOpenForm(true);
  };

  // Open form to edit a sweet
  const handleEditSweet = async (id: string) => {
    try {
      const sweet = await sweetService.getSweetById(id);
      setCurrentSweet(sweet);
      setOpenForm(true);
    } catch (error) {
      console.error('Error fetching sweet details:', error);
      showNotification('Failed to load sweet details', 'error');
    }
  };

  // Handle form submission success
  const handleFormSuccess = () => {
    setOpenForm(false);
    fetchSweets();
    showNotification(currentSweet ? 'Sweet updated successfully' : 'Sweet added successfully', 'success');
  };

  // Confirm delete sweet
  const handleDeleteConfirm = (id: string) => {
    setSweetToDelete(id);
    setDeleteConfirmOpen(true);
  };

  // Delete sweet
  const handleDeleteSweet = async () => {
    if (!sweetToDelete) return;
    
    try {
      await sweetService.deleteSweet(sweetToDelete);
      setDeleteConfirmOpen(false);
      fetchSweets();
      showNotification('Sweet deleted successfully', 'success');
    } catch (error) {
      console.error('Error deleting sweet:', error);
      showNotification('Failed to delete sweet', 'error');
    }
  };

  // Show notification
  const showNotification = (message: string, type: 'success' | 'error' | 'info') => {
    setNotification({
      open: true,
      message,
      type
    });
  };

  // Close notification
  const handleCloseNotification = () => {
    setNotification({
      ...notification,
      open: false
    });
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Sweet Collection
          </Typography>
          
          {authState.user?.isAdmin && (
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={handleAddNew}
            >
              Add New Sweet
            </Button>
          )}
        </Box>

        {/* Filters */}
        <SweetFilters onFilterChange={handleFilterChange} maxPrice={maxPrice} />

        {/* Sweet Grid */}
        <SweetGrid 
          sweets={sweets} 
          loading={loading} 
          error={error}
          onUpdate={() => fetchSweets()}
          onDeleteSweet={handleDeleteConfirm}
        />
      </Box>

      {/* Floating add button (for mobile) */}
      {authState.user?.isAdmin && (
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
          onClick={handleAddNew}
        >
          <AddIcon />
        </Fab>
      )}

      {/* Add/Edit Sweet Form Dialog */}
      <SweetForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        sweet={currentSweet}
        onSuccess={handleFormSuccess}
      />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this sweet? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteSweet} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <Alert
          onClose={handleCloseNotification}
          severity={notification.type}
          sx={{ width: '100%' }}
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SweetsPage;
