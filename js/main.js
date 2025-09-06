// /eshopify/js/main.js

// This file handles global functionalities like data management and navigation updates.

// Array of catalog names and their representative images
const catalogs = [
    { name: 'Electronics', img: 'electronics/electronics1.jpg' },
    { name: 'Fashion', img: 'fashion/fashion1.jpg' },
    { name: 'Home', img: 'home/home1.jpg' },
    { name: 'Books', img: 'books/books1.jpg' },
    { name: 'Sports', img: 'sports/sports1.jpg' },
    { name: 'Toys', img: 'toys/toys1.jpg' },
    { name: 'Groceries', img: 'groceries/groceries1.jpg' },
    { name: 'Health', img: 'health/health1.jpg' },
    { name: 'Beauty', img: 'beauty/beauty1.jpg' },
    { name: 'Automotive', img: 'automotive/automotive1.jpg' },
    { name: 'Garden', img: 'garden/garden1.jpg' },
    { name: 'Furniture', img: 'furniture/furniture1.jpg' },
    { name: 'Music', img: 'music/music1.jpg' },
    { name: 'Movies', img: 'movies/movies1.jpg' },
    { name: 'Pets', img: 'pets/pets1.jpg' }
];

// Function to generate a random price
const generateRandomPrice = () => (Math.random() * (1500 - 10) + 10).toFixed(2);

// Function to generate dummy product data
const generateProducts = () => {
    const products = [];
    catalogs.forEach(catalog => {
        for (let i = 1; i <= 10; i++) {
            products.push({
                id: `${catalog.name.toLowerCase()}-${i}`,
                name: `${catalog.name} Product ${i}`,
                price: parseFloat(generateRandomPrice()),
                catalog: catalog.name,
                image: `products/${catalog.name.toLowerCase()}/product${i}.jpg`,
                description: `This is a detailed description for ${catalog.name} Product ${i}. It is a high-quality item designed to meet your needs.`
            });
        }
    });
    return products;
};

// Data storage in a single object for easy access
const shopData = {
    catalogs,
    products: generateProducts()
};

// Function to update the cart count in the header
const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = cart.length;
    }
};

// Function to add a product to the cart
const addToCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = shopData.products.find(p => p.id === productId);

    if (product) {
        const existingItem = cart.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${product.name} added to cart!`);
    }
};

// Function to remove a product from the cart
const removeFromCart = (productId) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    // This is a placeholder; actual DOM manipulation will be in cart.js
};

// Function to handle quantity change in cart
const updateQuantity = (productId, change) => {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    updateCartCount();
    // This is a placeholder; actual DOM manipulation will be in cart.js
};

// --- Initial setup on page load ---
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();

    // Check which page is loaded and run the appropriate function
    if (document.getElementById('catalog-cards')) {
        renderCatalogCards();
    }
});

// Function to dynamically render catalog cards on the index page
const renderCatalogCards = () => {
    const catalogGrid = document.getElementById('catalog-cards');
    if (catalogGrid) {
        catalogGrid.innerHTML = ''; // Clear existing content
        shopData.catalogs.forEach(catalog => {
            const card = document.createElement('a');
            card.href = `products.html?catalog=${catalog.name.toLowerCase()}`;
            card.className = 'catalog-card';
            card.innerHTML = `
                <img src="images/catalogs/${catalog.img}" alt="${catalog.name}">
                <h3>${catalog.name}</h3>
            `;
            catalogGrid.appendChild(card);
        });
    }
};