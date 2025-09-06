// /eshopify/js/product-details.js

// This file handles the logic for the product-details.html page.

document.addEventListener('DOMContentLoaded', () => {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Find the product in the global data
    const product = shopData.products.find(p => p.id === productId);

    const container = document.getElementById('product-details-container');

    if (product) {
        // Render product details
        container.innerHTML = `
            <img src="images/${product.image}" alt="${product.name}" class="details-image">
            <div class="details-info">
                <h1>${product.name}</h1>
                <p class="details-price">₹${product.price.toFixed(2)}</p>
                <p class="details-description">${product.description}</p>
                <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
            </div>
        `;

        // Add event listener to the "Add to Cart" button
        document.querySelector('.add-to-cart-btn').addEventListener('click', () => {
            addToCart(product.id);
        });

    } else {
        // Product not found
        container.innerHTML = `<p>Product not found.</p>`;
    }
});