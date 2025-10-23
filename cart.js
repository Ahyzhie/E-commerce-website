// Cart functionality using localStorage

function getCart() {
  const cart = localStorage.getItem('cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(name, price, quantity) {
  const cart = getCart();
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity });
  }
  saveCart(cart);
  alert(`${name} added to cart!`);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  loadCart();
}

function loadCart() {
  const cart = getCart();
  const tbody = document.querySelector('tbody');
  tbody.innerHTML = '';
  let total = 0;
  cart.forEach((item, index) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;
    tbody.innerHTML += `
      <tr class="text-white">
        <td>${item.name}</td>
        <td>${item.quantity}</td>
        <td>P${item.price.toFixed(2)}</td>
        <td>P${itemTotal.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button></td>
      </tr>
    `;
  });
  document.querySelector('.d-flex.justify-content-between h4').textContent = `Total: P${total.toFixed(2)}`;
}

// Load cart on page load for cart.html
if (window.location.pathname.includes('cart.html')) {
  loadCart();
}
