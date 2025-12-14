import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Avatar, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  Chip,
  Button,
  CircularProgress,
  Tabs,
  Tab,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { 
  Person, 
  Email, 
  AccessTime, 
  ShoppingBag, 
  Edit,
  AdminPanelSettings
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { GridContainer, GridItem } from '../components/common/GridWrapper';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`profile-tabpanel-${index}`}
    aria-labelledby={`profile-tab-${index}`}
    {...other}
    style={{ paddingTop: 16 }}
  >
    {value === index && children}
  </div>
);

const ProfilePage: React.FC = () => {
  const { authState } = useAuth();
  const { user } = authState;
  const navigate = useNavigate();
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(false);

  // Mock purchase history data
  const purchaseHistory = [
    { id: '1', name: 'Chocolate Truffle', quantity: 2, date: '2025-12-05', totalPrice: 5.00 },
    { id: '2', name: 'Vanilla Fudge', quantity: 3, date: '2025-12-01', totalPrice: 5.25 },
    { id: '3', name: 'Strawberry Candy', quantity: 5, date: '2025-11-28', totalPrice: 4.95 }
  ];

  if (!user) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleEditProfile = () => {
    // In a real app, this would open a modal to edit profile
    alert('Edit profile functionality would be implemented here');
  };

  const handleGoToAdmin = () => {
    navigate('/admin');
  };

  const getInitials = (name: string): string => {
    return name.charAt(0).toUpperCase();
  };

  // Format date to readable format
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Mock registration date
  const registrationDate = new Date();
  registrationDate.setMonth(registrationDate.getMonth() - 2);

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <GridContainer spacing={3}>
        {/* Profile sidebar */}
        <GridItem xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  mb: 2,
                  bgcolor: 'primary.main',
                  fontSize: '3rem'
                }}
              >
                {getInitials(user.username)}
              </Avatar>
              
              <Typography variant="h5" component="h1">
                {user.username}
              </Typography>
              
              {user.isAdmin && (
                <Chip 
                  color="secondary" 
                  icon={<AdminPanelSettings />} 
                  label="Administrator" 
                  sx={{ mt: 1 }}
                />
              )}
            </Box>

            <Divider sx={{ mb: 2 }} />

            <List>
              <ListItem>
                <ListItemIcon>
                  <Person color="primary" />
                </ListItemIcon>
                <ListItemText primary="Username" secondary={user.username} />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <Email color="primary" />
                </ListItemIcon>
                <ListItemText primary="Email" secondary={user.email} />
              </ListItem>
              
              <ListItem>
                <ListItemIcon>
                  <AccessTime color="primary" />
                </ListItemIcon>
                <ListItemText 
                  primary="Member Since" 
                  secondary={formatDate(registrationDate.toISOString())} 
                />
              </ListItem>
            </List>
            
            <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Edit />}
                onClick={handleEditProfile}
                fullWidth
              >
                Edit Profile
              </Button>
              
              {user.isAdmin && (
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<AdminPanelSettings />}
                  onClick={handleGoToAdmin}
                  fullWidth
                >
                  Admin Dashboard
                </Button>
              )}
            </Box>
          </Paper>
        </GridItem>

        {/* Main content */}
        <GridItem xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Purchase History" icon={<ShoppingBag />} />
              <Tab label="Settings" icon={<Edit />} />
            </Tabs>

            <TabPanel value={tabValue} index={0}>
              <Typography variant="h6" gutterBottom>
                Your Purchase History
              </Typography>
              
              {purchaseHistory.length === 0 ? (
                <Box sx={{ py: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    You haven't made any purchases yet.
                  </Typography>
                </Box>
              ) : (
                <Box>
                  {purchaseHistory.map((purchase) => (
                    <Card 
                      key={purchase.id} 
                      variant="outlined" 
                      sx={{ mb: 2 }}
                    >
                      <CardContent>
                        <GridContainer spacing={2}>
                          <GridItem xs={7}>
                            <Typography variant="subtitle1">
                              {purchase.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Purchased on {formatDate(purchase.date)}
                            </Typography>
                          </GridItem>
                          <GridItem xs={5}>
                            <Box sx={{ textAlign: 'right' }}>
                              <Typography variant="subtitle1">
                                ₹{purchase.totalPrice.toFixed(2)}
                              </Typography>
                              <Typography variant="body2">
                                Quantity: {purchase.quantity}
                              </Typography>
                            </Box>
                          </GridItem>
                        </GridContainer>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                Account Settings
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Account settings functionality would be implemented here in a real application.
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Button variant="contained" color="primary">
                  Change Password
                </Button>
              </Box>
            </TabPanel>
          </Paper>
        </GridItem>
      </GridContainer>
    </Box>
  );
};

export default ProfilePage;
