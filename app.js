/**
 * Main POS - Menu, Cart, Pay Now, Print, Clear Cart
 */

let cart = [];
let currentCategory = 'PS5';

function init() {
  cart = getCart();
  renderCategoryTabs();
  renderMenu();
  renderCart();
  loadHeaderName();
  bindEvents();
}

function loadHeaderName() {
  const settings = getSettings();
  const h1 = document.querySelector('.app-header h1');
  if (h1) h1.textContent = settings.businessName || 'GameZone Center';
}

function renderCategoryTabs() {
  const container = document.getElementById('categoryTabs');
  container.innerHTML = CATEGORIES.map(cat => `
    <button class="category-tab ${cat === currentCategory ? 'active' : ''}" data-category="${cat}">
      ${cat}
    </button>
  `).join('');
}

function renderMenu() {
  const items = getMenuItems().filter(i => i.category === currentCategory);
  const grid = document.getElementById('menuGrid');
  grid.innerHTML = items.map(item => `
    <div class="menu-item" data-id="${item.id}">
      <img src="${item.imageUrl}" alt="${item.name}" onerror="this.src='https://placehold.co/200x120/1a1a2e/666?text=No+Image'">
      <div class="menu-item-info">
        <div class="name">${item.name}</div>
        <div class="meta">${item.duration} • ₹${item.price}</div>
        <div class="price">₹${item.price}</div>
      </div>
    </div>
  `).join('');
}

function renderCart() {
  const container = document.getElementById('cartItems');
  const summary = document.getElementById('cartSummary');

  if (cart.length === 0) {
    container.innerHTML = '<div class="cart-empty">Cart is empty</div>';
    summary.style.display = 'none';
    return;
  }

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);

  container.innerHTML = cart.map((c, i) => `
    <div class="cart-row" data-index="${i}">
      <div class="cart-row-info">
        <div class="name">${c.name}</div>
        <div class="price">₹${c.price} × ${c.qty}</div>
      </div>
      <div class="cart-row-qty">
        <button data-action="minus" data-index="${i}">−</button>
        <span>${c.qty}</span>
        <button data-action="plus" data-index="${i}">+</button>
      </div>
      <div class="cart-row-total">₹${c.price * c.qty}</div>
    </div>
  `).join('');

  document.getElementById('cartTotal').textContent = `₹${total}`;
  summary.style.display = 'block';
  saveCart(cart);
}

function addToCart(item) {
  const existing = cart.find(c => c.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: item.id, name: item.name, price: item.price, qty: 1 });
  }
  renderCart();
}

function updateQty(index, delta) {
  const c = cart[index];
  if (!c) return;
  c.qty += delta;
  if (c.qty <= 0) {
    cart.splice(index, 1);
  }
  renderCart();
}

function clearCart() {
  if (cart.length === 0) return;
  if (!confirm('Clear all items from cart?')) return;
  cart = [];
  renderCart();
}

function showPayModal() {
  if (cart.length === 0) {
    alert('Cart is empty');
    return;
  }

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  document.getElementById('modalAmount').textContent = `₹${total}`;
  document.getElementById('payModal').style.display = 'flex';
}

function hidePayModal() {
  document.getElementById('payModal').style.display = 'none';
}

function printBill() {
  if (cart.length === 0) {
    alert('Cart is empty');
    return;
  }

  const total = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const settings = getSettings();
  const billId = `BILL-${Date.now()}`;
  const dateStr = new Date().toLocaleString('en-IN');

  const sale = {
    id: billId,
    items: cart.map(c => ({ name: c.name, price: c.price, qty: c.qty })),
    total,
    date: new Date().toISOString(),
    paymentMethod: 'QR'
  };
  saveSale(sale);

  const billHtml = `
      <h2>${settings.businessName}</h2>
      <p>Bill No: ${billId}</p>
      <p>Date: ${dateStr}</p>
      <table>
        <thead>
          <tr><th>Item</th><th>Qty</th><th>Price</th><th>Subtotal</th></tr>
        </thead>
        <tbody>
          ${cart.map(c => `
            <tr>
              <td>${c.name}</td>
              <td>${c.qty}</td>
              <td>₹${c.price}</td>
              <td>₹${c.price * c.qty}</td>
            </tr>
          `).join('')}
        </tbody>
        <tfoot>
          <tr><td colspan="3"><strong>Total</strong></td><td><strong>₹${total}</strong></td></tr>
        </tfoot>
      </table>
      <p>Thank you for visiting!</p>
  `;

  const billEl = document.getElementById('billContent');
  billEl.className = 'bill-content';
  billEl.innerHTML = billHtml;

  window.print();

  cart = [];
  renderCart();
  hidePayModal();
}

function bindEvents() {
  document.getElementById('categoryTabs').addEventListener('click', (e) => {
    const btn = e.target.closest('.category-tab');
    if (!btn) return;
    currentCategory = btn.dataset.category;
    renderCategoryTabs();
    renderMenu();
  });

  document.getElementById('menuGrid').addEventListener('click', (e) => {
    const card = e.target.closest('.menu-item');
    if (!card) return;
    const id = card.dataset.id;
    const item = getMenuItems().find(i => i.id === id);
    if (item) addToCart(item);
  });

  document.getElementById('cartItems').addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const index = parseInt(btn.dataset.index, 10);
    updateQty(index, btn.dataset.action === 'plus' ? 1 : -1);
  });

  document.getElementById('payNowBtn').addEventListener('click', showPayModal);
  document.getElementById('printBillBtn').addEventListener('click', printBill);
  document.getElementById('clearCartBtn').addEventListener('click', clearCart);

  document.getElementById('printFromModalBtn').addEventListener('click', printBill);
  document.getElementById('closeModalBtn').addEventListener('click', hidePayModal);

  document.getElementById('payModal').addEventListener('click', (e) => {
    if (e.target.id === 'payModal') hidePayModal();
  });
}

document.addEventListener('DOMContentLoaded', init);
