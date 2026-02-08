# Gaming Center Billing Website

A static billing/POS system for gaming centers. No backend required—runs entirely in the browser with localStorage.

## Features

- **Menu by category**: PS5, PS4, PC, VR, Car Simulation
- **One-click add to cart**: Click any item to add it
- **Cart**: Adjust quantities, view total
- **Pay Now**: QR code for UPI payment
- **Print Bill**: Printable receipt, saved to sales history
- **Clear Cart**: Empty cart with confirmation
- **Monthly Sales Report**: Filter by month, view revenue and order count
- **Manage Menu**: Full CRUD (add, edit, delete items)
- **Settings**: UPI ID and business name

## How to Run

1. Use a local server (recommended): `npx serve` or `python3 -m http.server 8080`
2. Or open `index.html` directly in a browser (some browsers restrict localStorage for file://)
2. Configure UPI ID and business name in Settings
3. Use Manage Menu to add/edit games
4. On POS: click items to add to cart, then Pay Now or Print Bill

## Data

All data is stored in browser localStorage. Clearing site data will erase menu, sales, and settings. Use one machine for the POS.

## File Structure

```
├── index.html      # Main POS
├── admin.html      # Manage menu
├── report.html     # Monthly sales report
├── settings.html   # UPI ID, business name
├── css/style.css
├── js/
│   ├── storage.js  # localStorage helpers
│   ├── app.js      # POS logic
│   ├── admin.js    # Menu CRUD
│   └── report.js   # Sales report
└── images/
```
