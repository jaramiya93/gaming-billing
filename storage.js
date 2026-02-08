/**
 * Shared localStorage helpers for Gaming Center Billing
 */

const STORAGE_KEYS = {
  MENU_ITEMS: 'gamingCenter_menuItems',
  SALES_HISTORY: 'gamingCenter_salesHistory',
  SETTINGS: 'gamingCenter_settings',
  CART: 'gamingCenter_cart'
};

const CATEGORIES = ['PS5', 'PS4', 'PC', 'VR', 'Car Simulation'];

const DEFAULT_SETTINGS = {
  upiId: 'yourname@upi',
  businessName: 'GameZone Center'
};

function getDefaultMenu() {
  const img = (cat) => `https://placehold.co/200x120/1a1a2e/4a9eff?text=${encodeURIComponent(cat)}`;
  return [
    { id: crypto.randomUUID(), name: 'FIFA 24', category: 'PS5', price: 80, imageUrl: img('PS5'), duration: '1 hour' },
    { id: crypto.randomUUID(), name: 'Spider-Man 2', category: 'PS5', price: 100, imageUrl: img('PS5'), duration: '1 hour' },
    { id: crypto.randomUUID(), name: 'God of War Ragnarök', category: 'PS5', price: 90, imageUrl: img('PS5'), duration: '1 hour' },
    { id: crypto.randomUUID(), name: 'Fortnite', category: 'PS4', price: 50, imageUrl: img('PS4'), duration: '1 hour' },
    { id: crypto.randomUUID(), name: 'GTA V', category: 'PS4', price: 60, imageUrl: img('PS4'), duration: '1 hour' },
    { id: crypto.randomUUID(), name: 'Valorant', category: 'PC', price: 40, imageUrl: img('PC'), duration: '1 hour' },
    { id: crypto.randomUUID(), name: 'CS2', category: 'PC', price: 40, imageUrl: img('PC'), duration: '1 hour' },
    { id: crypto.randomUUID(), name: 'Dota 2', category: 'PC', price: 40, imageUrl: img('PC'), duration: '1 hour' },
    { id: crypto.randomUUID(), name: 'Beat Saber', category: 'VR', price: 120, imageUrl: img('VR'), duration: '30 min' },
    { id: crypto.randomUUID(), name: 'Half-Life Alyx', category: 'VR', price: 150, imageUrl: img('VR'), duration: '1 hour' },
    { id: crypto.randomUUID(), name: 'F1 24', category: 'Car Simulation', price: 100, imageUrl: img('Racing'), duration: '1 hour' },
    { id: crypto.randomUUID(), name: 'Gran Turismo 7', category: 'Car Simulation', price: 90, imageUrl: img('Racing'), duration: '1 hour' }
  ];
}

function getMenuItems() {
  const stored = localStorage.getItem(STORAGE_KEYS.MENU_ITEMS);
  if (!stored) {
    const defaultMenu = getDefaultMenu();
    saveMenuItems(defaultMenu);
    return defaultMenu;
  }
  return JSON.parse(stored);
}

function saveMenuItems(items) {
  localStorage.setItem(STORAGE_KEYS.MENU_ITEMS, JSON.stringify(items));
}

function getSalesHistory() {
  const stored = localStorage.getItem(STORAGE_KEYS.SALES_HISTORY);
  return stored ? JSON.parse(stored) : [];
}

function saveSale(sale) {
  const history = getSalesHistory();
  history.push(sale);
  localStorage.setItem(STORAGE_KEYS.SALES_HISTORY, JSON.stringify(history));
}

function getSettings() {
  const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
  return stored ? { ...DEFAULT_SETTINGS, ...JSON.parse(stored) } : { ...DEFAULT_SETTINGS };
}

function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
}

function getCart() {
  const stored = localStorage.getItem(STORAGE_KEYS.CART);
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
}
