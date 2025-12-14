import api from './api';
import { 
  Sweet, 
  CreateSweetData, 
  UpdateSweetData, 
  SweetFilters, 
  ApiResponse 
} from '../types';

interface SweetsResponse extends ApiResponse<Sweet[]> {
  sweets: Sweet[];
}

interface SweetResponse extends ApiResponse<Sweet> {
  sweet: Sweet;
}

export const sweetService = {
  async getAllSweets(): Promise<Sweet[]> {
    const response = await api.get<SweetsResponse>('/sweets');
    return response.data.sweets;
  },

  async getSweetById(id: string): Promise<Sweet> {
    const response = await api.get<SweetResponse>(`/sweets/${id}`);
    return response.data.sweet;
  },

  async createSweet(sweetData: CreateSweetData): Promise<Sweet> {
    const response = await api.post<SweetResponse>('/sweets', sweetData);
    return response.data.sweet;
  },

  async updateSweet(id: string, sweetData: UpdateSweetData): Promise<Sweet> {
    const response = await api.put<SweetResponse>(`/sweets/${id}`, sweetData);
    return response.data.sweet;
  },

  async deleteSweet(id: string): Promise<boolean> {
    const response = await api.delete<ApiResponse<null>>(`/sweets/${id}`);
    return response.data.success;
  },

  async purchaseSweet(id: string, quantity: number): Promise<Sweet> {
    const response = await api.post<SweetResponse>(`/sweets/${id}/purchase`, { quantity });
    return response.data.sweet;
  },

  async restockSweet(id: string, quantity: number): Promise<Sweet> {
    const response = await api.post<SweetResponse>(`/sweets/${id}/restock`, { quantity });
    return response.data.sweet;
  },

  async searchSweets(filters: SweetFilters): Promise<Sweet[]> {
    // Convert filters to URL query parameters
    const params = new URLSearchParams();
    
    if (filters.name) {
      params.append('name', filters.name);
    }
    
    if (filters.category) {
      params.append('category', filters.category);
    }
    
    if (filters.minPrice !== undefined) {
      params.append('minPrice', filters.minPrice.toString());
    }
    
    if (filters.maxPrice !== undefined) {
      params.append('maxPrice', filters.maxPrice.toString());
    }
    
    const response = await api.get<SweetsResponse>(`/sweets/search?${params.toString()}`);
    return response.data.sweets;
  }
};
