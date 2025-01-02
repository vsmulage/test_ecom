$(document).ready(function () {
    // Featured products for the carousel
    const featuredProducts = [
      { id: 5, name: "Laptop", price: 500, image: "img/laptop.jpg" },
      { id: 6, name: "Tablet", price: 200, image: "img/tablet.jpg" },
      { id: 7, name: "Camera", price: 350, image: "img/camera.jpg" }
    ];
  
    // Main products
    const products = [
      { id: 1, name: "Wireless Headphones", price: 50, image: "img/headphone.jpg" },
      { id: 2, name: "Smartphone", price: 300, image: "img/smartphone.jpg" },
      { id: 3, name: "Smartwatch", price: 150, image: "img/smartwatch.jpg" },
      { id: 4, name: "Gaming Mouse", price: 25, image: "img/mouse.jpg" }
    ];
  
    const cart = [];
  
    // Load carousel
    function loadCarousel() {
      let carouselHtml = '';
      featuredProducts.forEach((product, index) => {
        carouselHtml += `
          <div class="carousel-item ${index === 0 ? "active" : ""}" data-id="${product.id}">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        `;
      });
  
      carouselHtml += `
        <button class="carousel-button left">&lt;</button>
        <button class="carousel-button right">&gt;</button>
      `;
  
      $('#carousel').html(carouselHtml);
  
      // Carousel navigation
      let currentIndex = 0;
  
      function updateCarousel(direction) {
        const items = $('.carousel-item');
        $(items[currentIndex]).removeClass('active'); // Remove active class from current item
  
        // Update index based on direction
        if (direction === 'next') {
          currentIndex = (currentIndex + 1) % items.length; // Go to the next item
        } else {
          currentIndex = (currentIndex - 1 + items.length) % items.length; // Go to the previous item
        }
  
        $(items[currentIndex]).addClass('active'); // Add active class to new item
      }
  
      // Event listeners for left and right buttons
      $('.carousel-button.left').click(() => updateCarousel('prev'));
      $('.carousel-button.right').click(() => updateCarousel('next'));
    }
  
    // Load products page
    function loadProducts() {
      let productHtml = '<div class="products">';
      products.forEach(product => {
        productHtml += `
          <div class="product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Price: $${product.price}</p>
            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
          </div>
        `;
      });
      productHtml += '</div>';
      $('#content').html(productHtml);
    }
  
    // Load cart page
    function loadCart() {
      if (cart.length === 0) {
        $('#content').html('<p>Your cart is empty.</p>');
        return;
      }
  
      let cartHtml = '<div class="cart">';
      cart.forEach(item => {
        cartHtml += `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>Price: $${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="remove-from-cart" data-id="${item.id}">Remove</button>
          </div>
        `;
      });
      cartHtml += '</div>';
  
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      cartHtml += `
        <div class="cart-summary">
          Total: $${total}
          <button id="checkout">Checkout</button>
        </div>
      `;
  
      $('#content').html(cartHtml);
    }
  
    // Handle adding to cart
    $(document).on('click', '.add-to-cart', function () {
      const productId = $(this).data('id');
      const product = [...products, ...featuredProducts].find(p => p.id === productId);
  
      const existingItem = cart.find(item => item.id === productId);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
  
      alert(`${product.name} added to cart!`);
    });
  
    // Handle removing from cart
    $(document).on('click', '.remove-from-cart', function () {
      const productId = $(this).data('id');
      const index = cart.findIndex(item => item.id === productId);
      if (index !== -1) {
        cart.splice(index, 1);
      }
  
      loadCart();
    });
  
    // Handle checkout
    $(document).on('click', '#checkout', function () {
      if (cart.length === 0) {
        alert('Your cart is empty.');
      } else {
        alert('Thank you for your purchase!');
        cart.length = 0; // Clear the cart
        loadCart(); // Reload the cart page
      }
    });
  
    // Handle navigation
    $('.nav-link').on('click', function (e) {
      e.preventDefault();
      const page = $(this).data('page');
      if (page === 'products') loadProducts();
      if (page === 'cart') loadCart();
    });
  
    // Load the default page (Products)
    loadCarousel();
    loadProducts();
  });
  