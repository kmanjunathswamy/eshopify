// /eshopify/js/product.js

// This file handles all logic for the products.html page.

document.addEventListener('DOMContentLoaded', () => {
    // Check if the product list container exists
    const productListContainer = document.getElementById('product-list');
    if (!productListContainer) return;

    // Get the catalog from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const catalogName = urlParams.get('catalog');
    
    // Filter products based on the catalog, or show all
    let productsToDisplay = shopData.products;
    if (catalogName && catalogName !== 'all') {
        productsToDisplay = shopData.products.filter(p => p.catalog.toLowerCase() === catalogName);
        // Update the page title
        const catalogTitle = document.getElementById('catalog-title');
        if (catalogTitle) {
            catalogTitle.textContent = catalogName.charAt(0).toUpperCase() + catalogName.slice(1);
        }
    }

    let currentProducts = [...productsToDisplay];

    // Function to render products
    const renderProducts = (products) => {
        productListContainer.innerHTML = '';
        if (products.length === 0) {
            productListContainer.innerHTML = '<p>No products found.</p>';
            return;
        }
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <a href="product-details.html?id=${product.id}">
                    <img src="images/${product.image}" alt="${product.name}">
                </a>
                <div class="product-info">
                    <h3><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
                    <p>₹${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                </div>
            `;
            productListContainer.appendChild(productCard);
        });

        // Add event listeners for "Add to Cart" buttons
        document.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = e.target.dataset.productId;
                addToCart(productId);
            });
        });
    };

    // Initial render
    renderProducts(currentProducts);

    // Search functionality
    const searchInput = document.getElementById('product-search');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = productsToDisplay.filter(p => 
            p.name.toLowerCase().includes(searchTerm)
        );
        currentProducts = filteredProducts; // Update current products for sorting
        renderProducts(currentProducts);
    });

    // Sort functionality
    const sortBySelect = document.getElementById('sort-by');
    sortBySelect.addEventListener('change', (e) => {
        const sortValue = e.target.value;
        let sortedProducts = [...currentProducts];
        
        if (sortValue === 'price-asc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        } else if (sortValue === 'name-asc') {
            sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortValue === 'name-desc') {
            sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        }

        renderProducts(sortedProducts);
    });
});