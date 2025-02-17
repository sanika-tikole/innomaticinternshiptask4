document.addEventListener('DOMContentLoaded', () => {
    // Sample product data
    const products = [
      { id: 1, name: 'Smartphone', price: 599 },
      { id: 2, name: 'Laptop', price: 999 },
      { id: 3, name: 'Headphones', price: 199 },
      { id: 4, name: 'Smartwatch', price: 299 }
    ];
  
    // Retrieve cart from localStorage or initialize an empty cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // DOM Elements
    const productContainer = document.getElementById('product-container');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const cartCountEl = document.getElementById('cart-count');
    const cartIcon = document.getElementById('cart-icon');
    const cartPanel = document.getElementById('cart-panel');
    const emptyCartBtn = document.getElementById('empty-cart');
    const closeCartBtn = document.getElementById('close-cart');
  
    // Display Products on the page
    function displayProducts() {
      products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
          <h4>${product.name}</h4>
          <p>$${product.price}</p>
          <button data-id="${product.id}">Add to Cart</button>
        `;
        productContainer.appendChild(productCard);
      });
    }
  
    // Save cart to localStorage
    function saveCart() {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    // Update the cart display in the sliding panel
    function updateCartDisplay() {
      cartItemsContainer.innerHTML = '';
      let total = 0;
  
      cart.forEach(item => {
        total += item.price * item.quantity;
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <div class="cart-item-details">
            <p>${item.name}</p>
            <p>$${item.price} x ${item.quantity}</p>
          </div>
          <div class="cart-item-actions">
            <button class="decrease" data-id="${item.id}">-</button>
            <button class="increase" data-id="${item.id}">+</button>
            <button class="remove" data-id="${item.id}">Remove</button>
          </div>
        `;
        cartItemsContainer.appendChild(cartItem);
      });
  
      cartTotalEl.textContent = total.toFixed(2);
      updateCartCount();
      saveCart();
    }
  
    // Update the cart icon with the current item count
    function updateCartCount() {
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartCountEl.textContent = count;
    }
  
    // Add a product to the cart
    function addToCart(productId) {
      const product = products.find(p => p.id === parseInt(productId));
      const cartItem = cart.find(item => item.id === product.id);
  
      if (cartItem) {
        cartItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
      updateCartDisplay();
    }
  
    // Increase the quantity of a product in the cart
    function increaseQuantity(productId) {
      const cartItem = cart.find(item => item.id === parseInt(productId));
      if (cartItem) {
        cartItem.quantity++;
        updateCartDisplay();
      }
    }
  
    // Decrease the quantity or remove the product if quantity is 1
    function decreaseQuantity(productId) {
      const cartItem = cart.find(item => item.id === parseInt(productId));
      if (cartItem) {
        if (cartItem.quantity > 1) {
          cartItem.quantity--;
        } else {
          cart = cart.filter(item => item.id !== parseInt(productId));
        }
        updateCartDisplay();
      }
    }
  
    // Remove an item from the cart completely
    function removeItem(productId) {
      cart = cart.filter(item => item.id !== parseInt(productId));
      updateCartDisplay();
    }
  
    // Event Listeners
  
    // Listen for clicks on "Add to Cart" buttons in the product list
    productContainer.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const productId = e.target.getAttribute('data-id');
        addToCart(productId);
      }
    });
  
    // Listen for clicks on cart action buttons (increase, decrease, remove)
    cartItemsContainer.addEventListener('click', (e) => {
      const productId = e.target.getAttribute('data-id');
      if (e.target.classList.contains('increase')) {
        increaseQuantity(productId);
      }
      if (e.target.classList.contains('decrease')) {
        decreaseQuantity(productId);
      }
      if (e.target.classList.contains('remove')) {
        removeItem(productId);
      }
    });
  
    // Toggle cart visibility when clicking the cart icon
    cartIcon.addEventListener('click', () => {
      cartPanel.classList.toggle('active');
    });
  
    // Close the cart panel
    closeCartBtn.addEventListener('click', () => {
      cartPanel.classList.remove('active');
    });
  
    // Empty the entire cart
    emptyCartBtn.addEventListener('click', () => {
      cart = [];
      updateCartDisplay();
    });
  
    // Initialize the app
    displayProducts();
    updateCartDisplay();
  });
  