/**
 * Admin - Menu CRUD
 */

let editingId = null;

function init() {
  renderMenuList();
  document.getElementById('menuForm').addEventListener('submit', handleSubmit);
}

function renderMenuList() {
  const items = getMenuItems();
  const tbody = document.getElementById('menuTableBody');

  if (items.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;">No menu items. Add one above.</td></tr>';
    return;
  }

  tbody.innerHTML = items.map(item => `
    <tr>
      <td>
        <img src="${item.imageUrl}" alt="" onerror="this.src='https://placehold.co/48x32/1a1a2e/666?text=?'">
      </td>
      <td>${item.name}</td>
      <td>${item.category}</td>
      <td>₹${item.price}</td>
      <td>${item.duration || '-'}</td>
      <td>
        <div class="actions">
          <button class="btn btn-secondary btn-small" data-edit="${item.id}">Edit</button>
          <button class="btn btn-danger btn-small" data-delete="${item.id}">Delete</button>
        </div>
      </td>
    </tr>
  `).join('');

  tbody.querySelectorAll('[data-edit]').forEach(btn => {
    btn.addEventListener('click', () => editItem(btn.dataset.edit));
  });
  tbody.querySelectorAll('[data-delete]').forEach(btn => {
    btn.addEventListener('click', () => deleteItem(btn.dataset.delete));
  });
}

function handleSubmit(e) {
  e.preventDefault();
  const items = getMenuItems();
  const id = document.getElementById('itemId').value;
  const name = document.getElementById('itemName').value.trim();
  const category = document.getElementById('itemCategory').value;
  const price = parseInt(document.getElementById('itemPrice').value, 10);
  const duration = document.getElementById('itemDuration').value.trim() || '1 hour';
  const imageUrl = document.getElementById('itemImage').value.trim() || 'https://placehold.co/200x120/1a1a2e/4a9eff?text=' + encodeURIComponent(category);

  if (editingId) {
    const idx = items.findIndex(i => i.id === editingId);
    if (idx >= 0) {
      items[idx] = { ...items[idx], name, category, price, duration, imageUrl };
    }
  } else {
    items.push({
      id: crypto.randomUUID(),
      name,
      category,
      price,
      duration,
      imageUrl
    });
  }

  saveMenuItems(items);
  resetForm();
  renderMenuList();
  editingId = null;
}

function editItem(id) {
  const item = getMenuItems().find(i => i.id === id);
  if (!item) return;

  editingId = id;
  document.getElementById('itemId').value = id;
  document.getElementById('itemName').value = item.name;
  document.getElementById('itemCategory').value = item.category;
  document.getElementById('itemPrice').value = item.price;
  document.getElementById('itemDuration').value = item.duration || '';
  document.getElementById('itemImage').value = item.imageUrl || '';
  document.getElementById('itemName').focus();
}

function deleteItem(id) {
  if (!confirm('Delete this menu item?')) return;

  const items = getMenuItems().filter(i => i.id !== id);
  saveMenuItems(items);
  if (editingId === id) resetForm();
  editingId = null;
  renderMenuList();
}

function resetForm() {
  document.getElementById('menuForm').reset();
  document.getElementById('itemId').value = '';
  editingId = null;
}

document.addEventListener('DOMContentLoaded', init);
