import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import { Edit, Delete, ShoppingCart, Add } from '@mui/icons-material';
import { Sweet } from '../../types';
import { sweetService } from '../../services/sweet.service';
import { useAuth } from '../../contexts/AuthContext';

interface SweetCardProps {
  sweet: Sweet;
  onUpdate: () => void;
  onDelete: (id: string) => void;
}

const SweetCard: React.FC<SweetCardProps> = ({ sweet, onUpdate, onDelete }) => {
  const { authState } = useAuth();
  const [openPurchase, setOpenPurchase] = React.useState(false);
  const [purchaseQuantity, setPurchaseQuantity] = React.useState(1);
  const [isPurchasing, setIsPurchasing] = React.useState(false);

  const handlePurchase = async () => {
    if (!authState.isAuthenticated) {
      // Redirect to login or show login dialog
      return;
    }
    
    setIsPurchasing(true);
    
    try {
      await sweetService.purchaseSweet(sweet.id, purchaseQuantity);
      setOpenPurchase(false);
      setPurchaseQuantity(1);
      onUpdate();
    } catch (error) {
      console.error('Purchase error:', error);
    } finally {
      setIsPurchasing(false);
    }
  };

  const formatPrice = (price: number): string => {
    return `₹${price.toFixed(2)}`;
  };

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Typography variant="h6" component="h2" gutterBottom>
            {sweet.name}
          </Typography>
          <Chip
            label={sweet.category}
            size="small"
            color="primary"
            sx={{ fontSize: '0.7rem' }}
          />
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {sweet.description || 'No description available'}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Typography variant="h6" color="primary">
            {formatPrice(sweet.price)}
          </Typography>
          <Typography
            variant={sweet.quantity > 0 ? 'body1' : 'body2'}
            color={sweet.quantity > 0 ? 'success.main' : 'error.main'}
            fontWeight="medium"
          >
            {sweet.quantity > 0 ? `${sweet.quantity} in stock` : 'Out of stock'}
          </Typography>
        </Box>
      </CardContent>

      <CardActions>
        <Button
          startIcon={<ShoppingCart />}
          variant="contained"
          size="small"
          color="primary"
          disabled={sweet.quantity <= 0 || !authState.isAuthenticated}
          onClick={() => setOpenPurchase(true)}
          sx={{ flex: 1, mr: 1 }}
        >
          Purchase
        </Button>

        {authState.user?.isAdmin && (
          <Box>
            <IconButton
              size="small"
              color="primary"
              onClick={() => onUpdate()}
              title="Edit"
            >
              <Edit fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => onDelete(sweet.id)}
              title="Delete"
            >
              <Delete fontSize="small" />
            </IconButton>
          </Box>
        )}
      </CardActions>

      {/* Purchase Dialog */}
      <Dialog open={openPurchase} onClose={() => setOpenPurchase(false)}>
        <DialogTitle>Purchase {sweet.name}</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            Price: {formatPrice(sweet.price)} each
          </Typography>
          <Typography gutterBottom sx={{ mb: 2 }}>
            Available: {sweet.quantity} in stock
          </Typography>
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={purchaseQuantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setPurchaseQuantity(
                value > 0
                  ? Math.min(value, sweet.quantity)
                  : 1
              );
            }}
            inputProps={{ min: 1, max: sweet.quantity }}
            variant="outlined"
          />
          <Typography sx={{ mt: 2 }} variant="h6">
            Total: {formatPrice(sweet.price * purchaseQuantity)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPurchase(false)}>Cancel</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePurchase}
            disabled={isPurchasing}
            startIcon={<ShoppingCart />}
          >
            Confirm Purchase
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default SweetCard;
