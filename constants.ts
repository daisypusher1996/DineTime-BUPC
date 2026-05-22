import { MenuItem, Stall, User, Notification, Review } from './types';

export const STALLS: Stall[] = [
  {
    id: 's1',
    name: 'Kapi Kita',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80',
    description: 'Cozily styled campus coffee nook & bistro serving delicious chicken platters, specialty coffee series, and scrumptious student snacks.',
    phone: '0912-345-6789',
    schedule: 'Mon - Fri',
    openTime: '7:00 AM',
    closeTime: '6:00 PM',
    location: 'BUPC Canteen - Stall 1'
  },
  {
    id: 's2',
    name: 'YUMPEROR',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80',
    description: 'The ultimate emperor of campus comfort food! Serving hot, budget-friendly rice meals, monster burgers, loaded hotdogs, and great-value snack combos.',
    phone: '0998-765-4321',
    schedule: 'Mon - Sat',
    openTime: '6:30 AM',
    closeTime: '5:00 PM',
    location: 'BUPC Canteen - Stall 2'
  },
  {
    id: 's3',
    name: 'Mix N Macheeze',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80',
    description: 'The cheesy fusion cafe where every dish gets a warm, melty cheese touch. Home of Bicol-style silogs, gourmet milk drinks, and loaded cheesy combos.',
    phone: '0917-111-2222',
    schedule: 'Mon - Fri',
    openTime: '9:00 AM',
    closeTime: '4:00 PM',
    location: 'BUPC Kiosk Area'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // --- Kapi Kita (S1) ---
  // Chicken Meals (Meals)
  {
    id: 'kk_m1',
    name: 'Chicken Ala King',
    description: 'Crispy chicken fillet smothered in a rich, creamy white sauce with bell peppers and green peas, served over warm rice.',
    price: 85,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.8,
    isPopular: true
  },
  {
    id: 'kk_m2',
    name: 'Chicken Fillet',
    description: 'Crispy, golden-brown chicken fillet breast seasoned with local spices, served with a side of savory gravy and warm rice.',
    price: 75,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.5
  },
  {
    id: 'kk_m3',
    name: 'Chicken Sisig',
    description: 'Sizzling chopped crispy chicken tossed with onions, chilies, and citrusy calamansi sauce, topped with mayonnaise and egg, served with rice.',
    price: 85,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.9,
    isSpicy: true,
    isPopular: true
  },
  {
    id: 'kk_m4',
    name: 'Chicken Pastil',
    description: 'Authentic Muslim-Filipino dish featuring flavorful shredded chicken breast topping over garlic rice, wrapped in a fresh banana leaf.',
    price: 60,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1626844131082-256783844137?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.6
  },
  {
    id: 'kk_m5',
    name: 'Tenders',
    description: 'Succulent, hand-breaded chicken tenders fried to a perfect golden crisp, with your choice of sauce: KK Cheesy, Honey Butter, Sweet & Spicy, or Teriyaki.',
    price: 70,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.7
  },

  // Beverages: Coffee (Drinks)
  {
    id: 'kk_d1',
    name: 'Salted Caramel Kita Coffee',
    description: 'Special blend sweet iced espresso combined with fresh milk, dynamic caramel syrup, topped with a pinch of premium sea salt.',
    price: 85,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1557925923-cd4648e21187?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.9,
    isPopular: true
  },
  {
    id: 'kk_d2',
    name: 'Mocha Kita Coffee',
    description: 'Robust espresso shot blended with rich dark Bicolano chocolate sauce, cold fresh milk, and ice.',
    price: 85,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.6
  },
  {
    id: 'kk_d3',
    name: 'Caramel Macchiato Coffee',
    description: 'Creamy layered espresso beverage featuring sweet vanilla-flavored milk marked with rich caramel drizzle.',
    price: 80,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.7
  },
  {
    id: 'kk_d4',
    name: 'Spanish Latte Coffee',
    description: 'Smooth espresso poured over sweet condensed milk and fresh dairy milk, creating a balanced and rich Spanish coffee experience.',
    price: 80,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.8
  },

  // Beverages: Non-Coffee (Drinks)
  {
    id: 'kk_d5',
    name: 'Ube Kita',
    description: 'Decadent creamy purple yam beverage crafted with real ube halaya, whole milk, and ice.',
    price: 75,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1628254826288-5131345d315d?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.6
  },
  {
    id: 'kk_d6',
    name: 'Matcha Kita',
    description: 'Premium barista-grade Japanese matcha green tea whisked and sweetened, layered beautifully with creamy milk.',
    price: 75,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.7
  },
  {
    id: 'kk_d7',
    name: 'Strawberry Kita',
    description: 'Sweet, refreshing beverage made of premium strawberry compote and creamy chilled whole milk.',
    price: 80,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.8
  },
  {
    id: 'kk_d8',
    name: 'Choco Kita',
    description: 'Velvety-smooth rich chocolate milkshake made with local and premium imported cocoa powders.',
    price: 70,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.5
  },

  // Beverages: Seasalt Series (Drinks)
  {
    id: 'kk_d9',
    name: 'Ube Seasalt Kita',
    description: 'Creamy iced ube milk topped with our signature savory and thick salted cheese foam layer.',
    price: 85,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.9,
    isPopular: true
  },
  {
    id: 'kk_d10',
    name: 'Spanish Seasalt Kita',
    description: 'Classic condensed milk Spanish latte topped with a luxurious layer of savory sea salt cream.',
    price: 85,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.8
  },
  {
    id: 'kk_d11',
    name: 'Matcha Seasalt Kita',
    description: 'Earthy sweetened Japanese matcha layered with thick, velvety, and savory sea salt cheese foam.',
    price: 85,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.8
  },

  // Snacks (Snacks)
  {
    id: 'kk_s1',
    name: 'KK Fries',
    description: 'Crisp, golden-brown skin-on french fries seasoned with classic salt or savory spices.',
    price: 50,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.4
  },
  {
    id: 'kk_s2',
    name: 'KK Carbonara',
    description: 'Rich, creamy white sauce pasta loaded with bacon bits, mushrooms, grated parmesan, served with a slice of buttery garlic bread.',
    price: 80,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.7
  },
  {
    id: 'kk_s3',
    name: 'KK Burger Overload',
    description: 'Our ultimate burger stacked with double beef patties, melted yellow cheddar, fried egg, lettuce, tomatoes, and home-style sauce.',
    price: 95,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.9,
    isPopular: true
  },
  {
    id: 'kk_s4',
    name: 'Cheesy Hotdog',
    description: 'Juicy jumbo red hotdog topped with melted quick-melt cheese and sweet pickle relish, served in a warm bun.',
    price: 60,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.3
  },
  {
    id: 'kk_s5',
    name: 'KK Hotdog Sandwich Overload',
    description: 'Loaded hotdog sandwich piled high with ground beef, cheese sauce, mayo, mustard, onions, and crispy fries on the side.',
    price: 85,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1549464700-11142510b66b?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.6
  },
  {
    id: 'kk_s6',
    name: 'Chicken Fries',
    description: 'Crisp chicken strip fries, seasoned to perfection and served with a tangy honey mustard dipping sauce.',
    price: 65,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.4
  },
  {
    id: 'kk_s7',
    name: 'KK Salad',
    description: "Fresh, crisp garden greens tossed with shredded carrots, cucumbers, cherry tomatoes, and hard-boiled egg with chef's sesame dressing.",
    price: 75,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.5
  },
  {
    id: 'kk_s8',
    name: 'Regular Burger',
    description: 'Classic grilled beef patty topped with our special house dressing on a soft toasted bun.',
    price: 45,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.2
  },
  {
    id: 'kk_s9',
    name: 'Cheesy Burger',
    description: 'Our classic grilled beef patty topped with a slice of melted American cheddar cheese and signature dressing.',
    price: 55,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.5
  },
  {
    id: 'kk_s10',
    name: 'Egg Burger',
    description: 'Flame-grilled beef patty paired with a perfectly fried sunny-side-up egg and sweet burger dressing.',
    price: 55,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c894d37922?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.3
  },
  {
    id: 'kk_s11',
    name: 'Hotdog Sandwich',
    description: 'Classic Filipino-style red hotdog served in a toasted bun with a generous drizzle of ketchup and mayo.',
    price: 45,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1627059318426-47209bb2510a?auto=format&fit=crop&w=800&q=80',
    stallName: 'Kapi Kita',
    stallId: 's1',
    rating: 4.1
  },

  // --- YUMPEROR (S2) ---
  // Rice Meals (Meals)
  {
    id: 'ye_m1',
    name: 'Chicken Pastil',
    description: 'Authentic spiced shredded chicken over steaming white rice, wrapped in healthy banana leaves for that earthy aroma. Available with or without drinks.',
    price: 55,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.6
  },
  {
    id: 'ye_m2',
    name: 'Fried Chicken',
    description: 'Crispiest, juices-locked fried chicken drumstick served with a mountain of warm rice and rich chicken gravy. Available with or without drinks.',
    price: 70,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.8,
    isPopular: true
  },
  {
    id: 'ye_m3',
    name: 'Buffalo Wings',
    description: 'Deep-fried crispy chicken wings glazed in a spicy, buttery buffalo sauce, served with steamed white rice. Available with or without drinks.',
    price: 85,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.7,
    isSpicy: true
  },
  {
    id: 'ye_m4',
    name: 'Chicken Teriyaki',
    description: 'Perfectly grilled chicken pieces glazed in sweet and savory teriyaki sauce, served over hot steamed rice. Available with or without drinks.',
    price: 80,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1552590635-27c2c2128abf?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.6
  },
  {
    id: 'ye_m5',
    name: 'Cheesy Chilli Fried Chicken',
    description: 'Golden fried chicken drenched in a spicy chili-infused cheese sauce, served with fluffy white rice. Available with or without drinks.',
    price: 85,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.9,
    isSpicy: true,
    isPopular: true
  },
  {
    id: 'ye_m6',
    name: 'Chicken Ala King',
    description: 'Crispy chicken golden fingers bathed in rich bell pepper cream sauce over hot rice. Available with or without drinks.',
    price: 80,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.7
  },

  // Snacks: Burgers (Snacks)
  {
    id: 'ye_s1',
    name: 'Regular Burger',
    description: 'Juicy, grilled beef-blend patty on a soft toasted bun with our signature burger sauce.',
    price: 40,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.2
  },
  {
    id: 'ye_s2',
    name: 'Cheese Burger',
    description: 'Classic grilled patty topped with a slice of creamy melted cheese and house burger sauce.',
    price: 48,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.5
  },
  {
    id: 'ye_s3',
    name: 'Burger w/ Egg',
    description: 'Perfect combination of a juicy beef patty and a fresh, sunny-side-up egg in a soft toasted bun.',
    price: 50,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1582196016295-f8c894d37922?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.4
  },
  {
    id: 'ye_s4',
    name: 'Special Burger',
    description: 'Stuffed with double beef patties, melted cheese, egg, fresh lettuce, and tomato slices.',
    price: 65,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.8,
    isPopular: true
  },
  {
    id: 'ye_s5',
    name: 'Chicken Burger',
    description: 'Crisp chicken fillet with shredded lettuce and creamy mayonnaise on a toasted sesame seed bun.',
    price: 55,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.4
  },

  // Snacks: Hotdogs (Snacks)
  {
    id: 'ye_s6',
    name: 'Hotdog Sandwich',
    description: 'Premium, Filipino red hotdog cooked to perfection and nestled in a toasted bun with dynamic ketchup/mayo drizzle.',
    price: 40,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1627059318426-47209bb2510a?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.1
  },
  {
    id: 'ye_s7',
    name: 'Cheesy Hotdog',
    description: 'Toasty hotdog sandwich slathered with rich, gooey warm cheese sauce.',
    price: 48,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.3
  },
  {
    id: 'ye_s8',
    name: 'Hotdog w/ Egg',
    description: 'Classic red hotdog sandwich topped with a fresh, hot-fried sunny-side-up egg.',
    price: 50,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.3
  },
  {
    id: 'ye_s9',
    name: 'Hotdog Special',
    description: 'Double red hotdogs in a single bun topped with meat sauce, egg, and warm cheese.',
    price: 65,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1549464700-11142510b66b?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.7
  },

  // Snacks: Egg (Snacks)
  {
    id: 'ye_s10',
    name: 'Egg Sandwich',
    description: 'Toasted sliced bread filled with dynamic sliced hard-boiled egg and creamy mayo salad.',
    price: 35,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.1
  },
  {
    id: 'ye_s11',
    name: 'Cheesy Egg Sandwich',
    description: 'Soft fluffy toast with a fried egg, cheddar slice, and creamy butter spread.',
    price: 45,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.4
  },

  // Snacks: Sides & Pasta (Snacks)
  {
    id: 'ye_s12',
    name: 'Fries',
    description: 'Crispy salted french fries served blazing hot.',
    price: 45,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.3
  },
  {
    id: 'ye_s13',
    name: 'Creamy Tuna Spaghetti',
    description: 'Rich, creamy white carbonara-style pasta filled with select tuna flakes and herbs.',
    price: 60,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.6
  },

  // Snack Combos (Snacks)
  {
    id: 'ye_c1',
    name: 'Fies w/ Drinks',
    description: 'Crisp salted fries served with your choice of refreshing ice-cold soda or fruit beverage.',
    price: 60,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.5
  },
  {
    id: 'ye_c2',
    name: 'Regular Burger w/ Fries',
    description: 'Our standard grilled beef burger paired with crisp fries and optional cold drink (+₱15).',
    price: 70,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.6,
    isPopular: true
  },
  {
    id: 'ye_c3',
    name: 'Egg Sandwich w/ Fries',
    description: 'Savoury hard-boiled egg salad sandwich served with a crisp side of golden french fries.',
    price: 65,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.3
  },
  {
    id: 'ye_c4',
    name: 'Cheesy Egg Sandwich w/ Fries',
    description: 'Rich cheesy fried egg sandwich matched with golden salted french fries.',
    price: 75,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1550507992-eb63ffee0847?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.5
  },
  {
    id: 'ye_c5',
    name: 'Egg Sandwich w/ Fries & Drinks',
    description: 'The complete meal: Egg salad sandwich, crisp potato fries, and a cold soft drink.',
    price: 85,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.6
  },
  {
    id: 'ye_c6',
    name: 'Hotdog Sandwich w/ Fries',
    description: 'Classic hotdog in a toasted bun alongside our signature crisp salted fries.',
    price: 70,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.4
  },
  {
    id: 'ye_c7',
    name: 'Cheesy Hotdog Sandwich w/ Fries',
    description: 'Hotdog sandwich with melted cheddar sauce, served with hot golden french fries.',
    price: 78,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.5
  },
  {
    id: 'ye_c8',
    name: 'Hotdog Sandwich w/ Fries & Drinks',
    description: 'Premium hotdog sandwich in a toasted bun, crispy french fries, and ice-cold soft drink.',
    price: 88,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?auto=format&fit=crop&w=800&q=80',
    stallName: 'YUMPEROR',
    stallId: 's2',
    rating: 4.7
  },

  // --- Mix N Macheeze (S3) ---
  // Beverages: Coffee (Drinks)
  {
    id: 'mm_d1',
    name: 'Matcha Latte',
    description: 'Robust espresso shot poured over premium Japanese matcha green tea and sweet chilled milk.',
    price: 75,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.7
  },
  {
    id: 'mm_d2',
    name: 'Hazelnut Latte',
    description: 'Creamy iced espresso infused with aromatic sweet hazelnut syrup and cold farm fresh milk.',
    price: 80,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fc9f?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.8
  },
  {
    id: 'mm_d3',
    name: 'Spanish Latte',
    description: 'Traditional sweet and strong Spanish latte layered with sweet condensed milk, ice, and espresso.',
    price: 80,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.8
  },
  {
    id: 'mm_d4',
    name: 'Strawberry Mocha',
    description: 'Delicious blend of rich chocolate mocha, fresh sweetened strawberry coulis, espresso, and cold milk.',
    price: 85,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.9,
    isPopular: true
  },
  {
    id: 'mm_d5',
    name: 'Caramel Machiatto',
    description: 'Rich and frothy espresso marked with vanilla bean milk and topped with deep caramel syrup swirls.',
    price: 80,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.6
  },

  // Beverages: Non-Coffee (Drinks)
  {
    id: 'mm_d6',
    name: 'Matcha Milk',
    description: 'Sweetened imported Japanese matcha powder whisked with milk and shaken with ice.',
    price: 70,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.6
  },
  {
    id: 'mm_d7',
    name: 'Chocolate Milk',
    description: 'Thick, creamy blend of Premium Dutch cocoa and condensed sweet milk over ice.',
    price: 65,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.5
  },
  {
    id: 'mm_d8',
    name: 'Ube Milk',
    description: 'Locally-sourced purple yam paste sweetened and blended with velvety milk and ice.',
    price: 65,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1628254826288-5131345d315d?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.6
  },
  {
    id: 'mm_d9',
    name: 'Ube Choco Milk',
    description: 'A marvelous layered creation of sweet ube halaya paste at the bottom, topped with rich cold chocolate milk.',
    price: 75,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1553177595-4de2bb0842b9?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.8,
    isPopular: true
  },
  {
    id: 'mm_d10',
    name: 'Strawberry Matcha',
    description: 'A visually stunning drink layering fresh strawberry reduction, cold whole milk, and earthy Japanese whisked matcha.',
    price: 85,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.8
  },
  {
    id: 'mm_d11',
    name: 'Hazelnut Choco Milk',
    description: 'Premium chocolate milk infused with sweet nutty hazelnut syrup, served ice-cold.',
    price: 75,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.5
  },

  // Beverages: Fruit Soda (Drinks)
  {
    id: 'mm_d12',
    name: 'Lychee',
    description: 'Fizzy, ice-cold soda infused with aromatic lychee syrup and real sweet lychee fruit chunks.',
    price: 60,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.5
  },
  {
    id: 'mm_d13',
    name: 'Strawberry',
    description: 'Bubbling, cooling soda loaded with sweetened strawberry compote and lots of ice.',
    price: 60,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1497534446932-c925b458314e?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.6
  },
  {
    id: 'mm_d14',
    name: 'Blueberry',
    description: 'Electric fizzing soda with deep purple-blue sweetened blueberry preserves.',
    price: 60,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.5
  },
  {
    id: 'mm_d15',
    name: 'Lemon',
    description: 'Classic refreshing soda with freshly squeezed sour yellow lemon juice and simple syrup.',
    price: 55,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.4
  },
  {
    id: 'mm_d16',
    name: 'Green Apple',
    description: 'Crisp, sweet, and slightly tart green apple-infused sparkling soda served with a fresh slice.',
    price: 60,
    category: 'Drinks',
    image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.5
  },

  // Rice Meals (Meals)
  {
    id: 'mm_m1',
    name: 'Chicken Ala King',
    description: 'Crispy fried chicken breast slices in a heavy bell pepper & mushroom cream sauce, served with rice.',
    price: 80,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.6
  },
  {
    id: 'mm_m2',
    name: 'Chicken Cheesy Tenders',
    description: 'Hand-breaded crunchy chicken tenders drizzled with thick cheese sauce, served with plain rice.',
    price: 85,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.7,
    isPopular: true
  },
  {
    id: 'mm_m3',
    name: 'Chicken Sisig',
    description: 'Savory chopped sizzling chicken seasoned with local spices, a hint of citrus and mayonnaise, served over hot rice.',
    price: 80,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.8
  },
  {
    id: 'mm_m4',
    name: 'Grilled Liempo',
    description: 'Mouth-watering charcoal-grilled local pork belly in sweet Filipino BBQ sauce, served with hot rice.',
    price: 90,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.8,
    isPopular: true
  },
  {
    id: 'mm_m5',
    name: 'Pork Bulgogi',
    description: 'Korean-style marinated thin pork slices cooked in sweet-savory sesame ginger sauce, served with steamed white rice.',
    price: 95,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1552590635-27c2c2128abf?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.7
  },
  {
    id: 'mm_m6',
    name: 'Chicken Teriyaki',
    description: 'Grilled chicken pieces coated with sweet teriyaki syrup, paired with fluffy rice.',
    price: 85,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1552590635-27c2c2128abf?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.6
  },

  // Silog Meals (Meals)
  {
    id: 'mm_s1',
    name: 'Tocheesylog',
    description: 'Sweet cured pork (Tocino), golden garlic fried rice, sunny-side-up egg, drizzled with a rich cheese sauce.',
    price: 85,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.8,
    isPopular: true
  },
  {
    id: 'mm_s2',
    name: 'Hamcheesylog',
    description: 'Pan-fried savory sweet ham slices, garlic rice, egg, and a rich drizzling of cheddar cheese sauce.',
    price: 75,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.4
  },
  {
    id: 'mm_s3',
    name: 'Spamcheesylog',
    description: 'Thick slices of premium Spam fried crispy, served with garlic rice, fried egg, and local melted cheese sauce.',
    price: 85,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.9,
    isPopular: true
  },
  {
    id: 'mm_s4',
    name: 'Lumpcheesylog',
    description: 'Golden crispy fried spring rolls (Lumpia), served with garlic fried rice, egg, and a yummy cheese dipping sauce.',
    price: 75,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.6
  },
  {
    id: 'mm_s5',
    name: 'Hotcheesylog',
    description: 'Filipino red hotdog slit and fried, garlic rice, egg, and warm cheddar cheese blanket.',
    price: 75,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.4
  },

  // Combos (Meals)
  {
    id: 'mm_c1',
    name: 'Combo Meal',
    description: 'Signature high-value meal: Rice, Pancit Guisado, 2pcs Lumpia, and a choice side of Spam, Ham, Hotdog, or Tocino.',
    price: 110,
    category: 'Meals',
    image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.9,
    isPopular: true
  },

  // Snacks (Snacks)
  {
    id: 'mm_sn1',
    name: 'Cheesy Hotdog',
    description: 'Sizzled hotdog in hot-dog bun drowned in delicious melted cheddar cheese sauce.',
    price: 50,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.4
  },
  {
    id: 'mm_sn2',
    name: 'Pansit Guisado',
    description: 'Authentic stir-fried canton and bihon noodles with fresh sliced farm vegetable toppings, pork cubes, and lemon squeeze.',
    price: 55,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.6
  },
  {
    id: 'mm_sn3',
    name: 'Fies (Cheese/Barbecue/Sour Cream)',
    description: 'Crispy skin-on potato fries tossed in your favorite flavor choice: Cheese, Barbecue, or Sour Cream.',
    price: 45,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.5
  },
  {
    id: 'mm_sn4',
    name: 'Pancake',
    description: 'Two soft, fluffy golden pancakes served hot with sweet maple syrup and margarine melting on top.',
    price: 40,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.4
  },
  {
    id: 'mm_sn5',
    name: 'Sweet Corn',
    description: 'Warm, sweet local shredded kernels loaded with melted butter, condensed milk, and optional grated cheese toppings.',
    price: 35,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.3
  },
  {
    id: 'mm_sn6',
    name: 'Nachos',
    description: 'Layered crisp tortilla chips topped with a savory beef sauce, creamy mayonnaise, and piping-hot cheddar cheese drizzle.',
    price: 65,
    category: 'Snacks',
    image: 'https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=80',
    stallName: 'Mix N Macheeze',
    stallId: 's3',
    rating: 4.7,
    isPopular: true
  }
];

export const CATEGORIES = ['All', 'Meals', 'Snacks', 'Drinks', 'Desserts'];

export const MOCK_USER: User = {
  id: 'u1',
  name: 'Juan Dela Cruz',
  email: 'juan.delacruz@bupc.edu.ph',
  avatar: 'https://ui-avatars.com/api/?name=Juan+Dela+Cruz&background=random',
  userType: 'Student',
  course: 'BS Information Technology',
  age: 21,
  address: 'Polangui, Albay',
  phone: '09123456789'
};

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: 'n1',
    title: 'Order Ready!',
    message: 'Your order #ORD-9921 is ready for pickup at Kapi Kita.',
    type: 'order',
    isRead: false,
    date: new Date()
  },
  {
    id: 'n2',
    title: 'Lunch Promo',
    message: 'Get 10% off on all rice meals today from 11AM to 1PM!',
    type: 'promo',
    isRead: true,
    date: new Date(Date.now() - 3600000)
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userId: 'u2',
    userName: 'Maria Santos',
    targetId: 'ye_m5',
    targetType: 'menu_item',
    rating: 5,
    comment: 'The Cheesy Chilli Fried Chicken at YUMPEROR is the best! Very spicy and rich.',
    date: new Date(Date.now() - 86400000)
  },
  {
    id: 'r2',
    userId: 'u3',
    userName: 'Pedro Reyes',
    targetId: 'kk_d1',
    targetType: 'menu_item',
    rating: 5,
    comment: 'The Salted Caramel Latte at Kapi Kita is my absolute go-to cup of motivation before morning lectures!',
    date: new Date(Date.now() - 172800000)
  },
  {
    id: 'r3',
    userId: 'u4',
    userName: 'Anna Li',
    targetId: 's3',
    targetType: 'stall',
    rating: 5,
    comment: 'Mix N Macheeze is really awesome! Fast service and super cheesy combos. Highly recommend!',
    date: new Date(Date.now() - 250000000)
  }
];
