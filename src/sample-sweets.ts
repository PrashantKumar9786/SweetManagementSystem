// Define a local version of the Sweet type to avoid import errors
interface Sweet {
  id: string;
  name: string;
  category: string;
  description?: string;
  price: number;
  quantity: number;
  created_at: string;
  updated_at: string;
}

// Sample data for Indian sweets with prices in INR
export const sampleSweets: Omit<Sweet, 'id' | 'created_at' | 'updated_at'>[] = [
  // Laddu varieties
  {
    name: 'Motichoor Laddu',
    category: 'Laddu',
    description: 'Small gram flour balls soaked in sugar syrup, a festive favorite',
    price: 350,
    quantity: 50
  },
  {
    name: 'Besan Laddu',
    category: 'Laddu',
    description: 'Traditional sweet made with gram flour, ghee and sugar',
    price: 320,
    quantity: 40
  },
  {
    name: 'Coconut Laddu',
    category: 'Laddu',
    description: 'Sweet balls made with fresh coconut and condensed milk',
    price: 280,
    quantity: 35
  },
  
  // Barfi varieties
  {
    name: 'Kaju Katli',
    category: 'Barfi',
    description: 'Diamond-shaped cashew fudge with silver varq topping',
    price: 750,
    quantity: 30
  },
  {
    name: 'Pista Barfi',
    category: 'Barfi',
    description: 'Sweet fudge made with pistachio and milk solids',
    price: 680,
    quantity: 25
  },
  {
    name: 'Chocolate Barfi',
    category: 'Barfi',
    description: 'Modern twist on traditional barfi with chocolate flavor',
    price: 450,
    quantity: 45
  },
  {
    name: 'Coconut Barfi',
    category: 'Barfi',
    description: 'Sweet made with freshly grated coconut and condensed milk',
    price: 380,
    quantity: 40
  },
  
  // Halwa varieties
  {
    name: 'Gajar Halwa',
    category: 'Halwa',
    description: 'Traditional carrot-based pudding with nuts',
    price: 420,
    quantity: 20
  },
  {
    name: 'Moong Dal Halwa',
    category: 'Halwa',
    description: 'Rich dessert made with yellow moong lentils and ghee',
    price: 520,
    quantity: 15
  },
  {
    name: 'Sooji Halwa',
    category: 'Halwa',
    description: 'Semolina pudding with cardamom and saffron',
    price: 280,
    quantity: 30
  },
  
  // Regional specialties
  {
    name: 'Rasgulla',
    category: 'Bengali Sweets',
    description: 'Soft spongy balls made of chhena soaked in sugar syrup',
    price: 320,
    quantity: 50
  },
  {
    name: 'Sandesh',
    category: 'Bengali Sweets',
    description: 'Traditional Bengali sweet made with chhena and sugar',
    price: 420,
    quantity: 30
  },
  {
    name: 'Mysore Pak',
    category: 'South Indian',
    description: 'Traditional sweet from Karnataka made with gram flour, ghee and sugar',
    price: 450,
    quantity: 25
  },
  {
    name: 'Jalebi',
    category: 'Syrup-based',
    description: 'Deep-fried flour batter soaked in sugar syrup',
    price: 250,
    quantity: 60
  },
  {
    name: 'Gulab Jamun',
    category: 'Syrup-based',
    description: 'Deep-fried milk solids soaked in rose-flavored sugar syrup',
    price: 350,
    quantity: 70
  },
  
  // Milk-based sweets
  {
    name: 'Rasmalai',
    category: 'Milk-based',
    description: 'Flattened balls of chhena soaked in malai and flavored with cardamom',
    price: 550,
    quantity: 30
  },
  {
    name: 'Rabri',
    category: 'Milk-based',
    description: 'Sweet, condensed milk dish made by boiling milk with sugar',
    price: 380,
    quantity: 20
  },
  {
    name: 'Kulfi',
    category: 'Frozen Dessert',
    description: 'Traditional Indian ice cream with nuts and cardamom',
    price: 120,
    quantity: 80
  },
  {
    name: 'Peda',
    category: 'Milk-based',
    description: 'Sweet made from khoya, sugar and traditional flavorings',
    price: 420,
    quantity: 40
  },
  
  // Festive specials
  {
    name: 'Gujiya',
    category: 'Festive',
    description: 'Sweet dumpling filled with khoya mixture, popular during Holi',
    price: 320,
    quantity: 25
  },
  {
    name: 'Modak',
    category: 'Festive',
    description: 'Sweet dumpling filled with coconut and jaggery, favorite of Lord Ganesha',
    price: 380,
    quantity: 20
  },
  {
    name: 'Malpua',
    category: 'Festive',
    description: 'Sweet pancakes dipped in sugar syrup',
    price: 280,
    quantity: 30
  },
  
  // Regional varieties
  {
    name: 'Agra Petha',
    category: 'Regional',
    description: 'Translucent soft candy made from ash gourd/winter melon',
    price: 320,
    quantity: 35
  },
  {
    name: 'Shrikhand',
    category: 'Regional',
    description: 'Sweetened yogurt dessert with cardamom and saffron',
    price: 380,
    quantity: 25
  },
  {
    name: 'Chenna Murki',
    category: 'Regional',
    description: 'Small cubes of chhena cooked in sugar syrup',
    price: 250,
    quantity: 40
  },
  {
    name: 'Kalakand',
    category: 'Milk-based',
    description: 'Milk cake garnished with nuts',
    price: 420,
    quantity: 30
  },
  {
    name: 'Patishapta',
    category: 'Bengali Sweets',
    description: 'Bengali crepes with coconut and khoya filling',
    price: 350,
    quantity: 20
  },
  {
    name: 'Kheer',
    category: 'Rice-based',
    description: 'Traditional rice pudding flavored with cardamom and saffron',
    price: 280,
    quantity: 40
  },
  {
    name: 'Phirni',
    category: 'Rice-based',
    description: 'Ground rice pudding served in earthen pots',
    price: 320,
    quantity: 25
  },
  
  // Special variations
  {
    name: 'Dry Fruit Laddu',
    category: 'Premium',
    description: 'Nutritious sweet made with assorted dry fruits and nuts',
    price: 850,
    quantity: 15
  },
  {
    name: 'Saffron Peda',
    category: 'Premium',
    description: 'Milk sweet infused with premium saffron',
    price: 580,
    quantity: 20
  },
  {
    name: 'Rose Kalakand',
    category: 'Fusion',
    description: 'Traditional kalakand flavored with rose essence',
    price: 450,
    quantity: 25
  },
  {
    name: 'Badam Puri',
    category: 'Regional',
    description: 'Sweet flatbread stuffed with almond mixture',
    price: 320,
    quantity: 30
  },
  {
    name: 'Anjeer Barfi',
    category: 'Fusion',
    description: 'Fig-based sweet with cardamom and pistachios',
    price: 620,
    quantity: 20
  },
  {
    name: 'Paan Laddu',
    category: 'Fusion',
    description: 'Modern sweet with flavors of betel leaf and gulkand',
    price: 380,
    quantity: 25
  },
  {
    name: 'Malai Chamcham',
    category: 'Bengali Sweets',
    description: 'Oblong-shaped chhena dessert soaked in cream',
    price: 480,
    quantity: 30
  },
  {
    name: 'Doda Barfi',
    category: 'Regional',
    description: 'Sweet made with wheat flour and jaggery, popular in Punjab',
    price: 350,
    quantity: 25
  },
  {
    name: 'Chhena Jhili',
    category: 'Regional',
    description: 'Juicy sweet from Odisha made with chhena and sugar syrup',
    price: 320,
    quantity: 40
  },
  {
    name: 'Dharwad Peda',
    category: 'Regional',
    description: 'Famous milk-based sweet from Karnataka with unique taste',
    price: 420,
    quantity: 30
  }
];
