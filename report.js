/**
 * Monthly Sales Report
 */

function init() {
  populateYearSelect();
  populateMonthSelect();
  document.getElementById('monthSelect').addEventListener('change', renderReport);
  document.getElementById('yearSelect').addEventListener('change', renderReport);
  renderReport();
}

function populateYearSelect() {
  const select = document.getElementById('yearSelect');
  const year = new Date().getFullYear();
  for (let y = year; y >= year - 5; y--) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    if (y === year) opt.selected = true;
    select.appendChild(opt);
  }
}

function populateMonthSelect() {
  const select = document.getElementById('monthSelect');
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonth = new Date().getMonth();
  months.forEach((name, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = name;
    if (i === currentMonth) opt.selected = true;
    select.appendChild(opt);
  });
}

function renderReport() {
  const month = parseInt(document.getElementById('monthSelect').value, 10);
  const year = parseInt(document.getElementById('yearSelect').value, 10);

  const sales = getSalesHistory();
  const filtered = sales.filter(s => {
    const d = new Date(s.date);
    return d.getMonth() === month && d.getFullYear() === year;
  });

  const totalRevenue = filtered.reduce((sum, s) => sum + s.total, 0);

  document.getElementById('totalRevenue').textContent = `₹${totalRevenue}`;
  document.getElementById('orderCount').textContent = filtered.length;

  const tbody = document.getElementById('reportTableBody');
  const noData = document.getElementById('noData');

  if (filtered.length === 0) {
    tbody.innerHTML = '';
    noData.style.display = 'block';
    return;
  }

  noData.style.display = 'none';
  tbody.innerHTML = filtered.map(s => {
    const dateStr = new Date(s.date).toLocaleString('en-IN');
    const itemCount = s.items.reduce((n, i) => n + i.qty, 0);
    return `
      <tr>
        <td>${dateStr}</td>
        <td>${s.id}</td>
        <td>${itemCount}</td>
        <td class="total-col">₹${s.total}</td>
      </tr>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', init);
