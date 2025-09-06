// /eshopify/js/checkout.js

// This file handles the logic for the checkout.html page.

document.addEventListener('DOMContentLoaded', () => {
    const checkoutForm = document.getElementById('checkout-form');
    const checkoutMessage = document.getElementById('checkout-message');

    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent form submission

            // Simple validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const address = document.getElementById('address').value;
            const card = document.getElementById('card').value;

            if (name && email && address && card) {
                // Simulate a successful order
                setTimeout(() => {
                    localStorage.removeItem('cart'); // Clear the cart
                    updateCartCount(); // Update the cart count in the header

                    // Display success message
                    checkoutMessage.textContent = 'Thank you for your order! Your purchase has been confirmed.';
                    checkoutMessage.classList.remove('hidden');
                    checkoutMessage.style.backgroundColor = '#d4edda';
                    checkoutMessage.style.color = '#155724';
                    
                    checkoutForm.reset(); // Clear the form
                }, 1000);
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
});