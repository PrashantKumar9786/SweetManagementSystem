import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import { Add, Edit, Delete, Inventory } from '@mui/icons-material';
import { sweetService } from '../services/sweet.service';
import { Sweet } from '../types';
import SweetForm from '../components/sweets/SweetForm';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`admin-tabpanel-${index}`}
    aria-labelledby={`admin-tab-${index}`}
    {...other}
    style={{ paddingTop: 16 }}
  >
    {value === index && children}
  </div>
);

const AdminDashboard: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [openSweetForm, setOpenSweetForm] = useState(false);
  const [currentSweet, setCurrentSweet] = useState<Sweet | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Load sweets on component mount
  useEffect(() => {
    loadSweets();
  }, []);

  // Load all sweets from API
  const loadSweets = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await sweetService.getAllSweets();
      setSweets(result);
    } catch (error: any) {
      console.error('Error loading sweets:', error);
      setError('Failed to load sweets. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle tab change
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Handle open form for new sweet
  const handleAddNewSweet = () => {
    setCurrentSweet(null);
    setOpenSweetForm(true);
  };

  // Handle open form for edit sweet
  const handleEditSweet = (sweet: Sweet) => {
    setCurrentSweet(sweet);
    setOpenSweetForm(true);
  };

  // Handle delete sweet
  const handleDeleteSweet = async (sweet: Sweet) => {
    if (!window.confirm(`Are you sure you want to delete ${sweet.name}?`)) {
      return;
    }
    
    setLoading(true);
    try {
      await sweetService.deleteSweet(sweet.id);
      setNotification({ message: `${sweet.name} has been deleted`, type: 'success' });
      loadSweets(); // Reload sweets after deletion
    } catch (error: any) {
      console.error('Error deleting sweet:', error);
      setNotification({ message: `Failed to delete sweet: ${error.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle restock sweet
  const handleRestockSweet = async (sweet: Sweet) => {
    const quantity = prompt(`How many units of ${sweet.name} would you like to add to the inventory?`, '10');
    
    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      return;
    }
    
    setLoading(true);
    try {
      await sweetService.restockSweet(sweet.id, Number(quantity));
      setNotification({ message: `Added ${quantity} units to ${sweet.name}`, type: 'success' });
      loadSweets(); // Reload sweets after restock
    } catch (error: any) {
      console.error('Error restocking sweet:', error);
      setNotification({ message: `Failed to restock: ${error.message}`, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  // Handle form success
  const handleFormSuccess = () => {
    loadSweets(); // Reload sweets after form submission
    setNotification({ 
      message: currentSweet 
        ? `${currentSweet.name} has been updated` 
        : 'New sweet has been added', 
      type: 'success' 
    });
  };

  // Clear notification after 5 seconds
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      {notification && (
        <Alert 
          severity={notification.type} 
          sx={{ mb: 3 }}
          onClose={() => setNotification(null)}
        >
          {notification.message}
        </Alert>
      )}

      <Paper sx={{ mt: 3 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Inventory Management" />
          <Tab label="User Management" />
          <Tab label="Sales Reports" />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Add />}
              onClick={handleAddNewSweet}
            >
              Add New Sweet
            </Button>
          </Box>
          
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
              <CircularProgress />
            </Box>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {!loading && !error && (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>Stock</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sweets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No sweets found. Create some to get started!
                      </TableCell>
                    </TableRow>
                  ) : (
                    sweets.map((sweet) => (
                      <TableRow key={sweet.id}>
                        <TableCell>{sweet.name}</TableCell>
                        <TableCell>{sweet.category}</TableCell>
                        <TableCell>₹{sweet.price.toFixed(2)}</TableCell>
                        <TableCell>{sweet.quantity}</TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() => handleEditSweet(sweet)}
                            title="Edit"
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="secondary"
                            onClick={() => handleRestockSweet(sweet)}
                            title="Restock"
                          >
                            <Inventory />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleDeleteSweet(sweet)}
                            title="Delete"
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">User Management</Typography>
            <Typography variant="body1" color="text.secondary">
              This feature will be available in a future update.
            </Typography>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6">Sales Reports</Typography>
            <Typography variant="body1" color="text.secondary">
              This feature will be available in a future update.
            </Typography>
          </Box>
        </TabPanel>
      </Paper>
      
      <SweetForm
        open={openSweetForm}
        onClose={() => setOpenSweetForm(false)}
        sweet={currentSweet}
        onSuccess={handleFormSuccess}
      />
    </Box>
  );
};

export default AdminDashboard;
