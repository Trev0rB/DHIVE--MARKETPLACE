// ============================================
// DHIVE Marketplace - Cart & Checkout
// ============================================

const Cart = {
    items: [],
    
    // Initialize cart from localStorage
    init() {
        const saved = localStorage.getItem('dhive_cart');
        if (saved) {
            this.items = JSON.parse(saved);
        }
        this.updateUI();
    },
    
    // Save cart to localStorage
    save() {
        localStorage.setItem('dhive_cart', JSON.stringify(this.items));
    },
    
    // Add item to cart
    add(product) {
        const existing = this.items.find(item => item.id === product.id);
        if (existing) {
            existing.quantity++;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                currency: product.currency,
                icon: product.icon,
                quantity: 1
            });
        }
        this.save();
        this.updateUI();
        this.showNotification(`${product.name} added to cart!`);
    },
    
    // Remove item from cart
    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
    },
    
    // Update quantity
    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.save();
            this.updateUI();
        }
    },
    
    // Get cart count
    getCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    
    // Get cart total in ZAR
    getTotal() {
        return this.items.reduce((sum, item) => {
            const priceInZAR = item.currency === 'USD' ? item.price * 18 : item.price;
            return sum + (priceInZAR * item.quantity);
        }, 0);
    },
    
    // Clear cart
    clear() {
        this.items = [];
        this.save();
        this.updateUI();
    },
    
    // Update cart UI elements
    updateUI() {
        const count = this.getCount();
        const total = this.getTotal();
        
        // Update cart count badge
        const countEl = document.getElementById('cartCount');
        if (countEl) {
            countEl.textContent = count;
            countEl.style.display = count > 0 ? 'flex' : 'none';
        }
        
        // Update cart items list
        const itemsEl = document.getElementById('cartItems');
        if (itemsEl) {
            if (this.items.length === 0) {
                itemsEl.innerHTML = `
                    <div class="cart-empty">
                        <div class="cart-empty-icon">🛒</div>
                        <p>Your cart is empty</p>
                    </div>
                `;
            } else {
                itemsEl.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.icon} ${item.name}</h4>
                            <div class="cart-item-price">
                                ${item.currency === 'USD' ? '$' : 'R'}${item.price} × ${item.quantity}
                            </div>
                        </div>
                        <button class="cart-item-remove" onclick="Cart.remove(${item.id})" title="Remove">×</button>
                    </div>
                `).join('');
            }
        }
        
        // Update total
        const totalEl = document.getElementById('cartTotal');
        if (totalEl) {
            totalEl.textContent = 'R' + total.toLocaleString();
        }
    },
    
    // Show notification
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <span>✓</span> ${message}
        `;
        notification.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 24px;
            background: #10b981;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-weight: 600;
            font-size: 14px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideInUp 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutDown 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 2500);
    },
    
    // Toggle cart panel
    toggle() {
        const panel = document.getElementById('cartPanel');
        const overlay = document.getElementById('cartOverlay');
        if (panel && overlay) {
            panel.classList.toggle('open');
            overlay.classList.toggle('open');
        }
    },
    
    // Open checkout modal
    checkout() {
        if (this.items.length === 0) {
            alert('Your cart is empty');
            return;
        }
        
        // Build order summary
        const summary = this.items.map(item => {
            return `
                <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                    <span>${item.name} ×${item.quantity}</span>
                    <span>${item.currency === 'USD' ? '$' : 'R'}${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            `;
        }).join('');
        
        const total = this.getTotal();
        const summaryHTML = summary + `
            <div style="display: flex; justify-content: space-between; padding: 12px 0; margin-top: 8px; border-top: 2px solid #1e293b; font-weight: 700;">
                <span>Total:</span>
                <span>R${total.toLocaleString()}</span>
            </div>
        `;
        
        document.getElementById('checkoutSummary').innerHTML = summaryHTML;
        document.getElementById('paymentModal').classList.add('open');
        
        // Close cart panel
        this.toggle();
    },
    
    // Submit checkout form
    submitCheckout() {
        const name = document.getElementById('checkoutName').value.trim();
        const email = document.getElementById('checkoutEmail').value.trim();
        const phone = document.getElementById('checkoutPhone').value.trim();
        const company = document.getElementById('checkoutCompany').value.trim();
        const message = document.getElementById('checkoutMessage').value.trim();
        
        // Validation
        if (!name || !email || !phone || !company) {
            alert('Please fill in all required fields');
            return;
        }
        
        if (!this.validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        // Calculate total
        const total = this.getTotal();
        
        // Create order details
        const orderItems = this.items.map(item => {
            return `• ${item.name} (${item.quantity}x) - ${item.currency === 'USD' ? '$' : 'R'}${(item.price * item.quantity).toLocaleString()}`;
        }).join('\n');
        
        // Create email body
        const emailBody = `
NEW ORDER REQUEST FROM DHIVE
============================

CUSTOMER DETAILS:
Name: ${name}
Email: ${email}
Phone: ${phone}
Company: ${company}

ORDER ITEMS:
${orderItems}

TOTAL: R${total.toLocaleString()}

SPECIAL REQUESTS/MESSAGE:
${message || 'None'}

---
Customer is waiting for your response at: ${email}
Reply ASAP to close this sale!
        `.trim();
        
        // Create mailto link
        const mailtoLink = `mailto:trevorbosch4@gmail.com?subject=NEW ORDER REQUEST - ${encodeURIComponent(company)}&body=${encodeURIComponent(emailBody)}`;
        
        // Open email client
        window.open(mailtoLink);
        
        alert(`✅ Order request ready!\n\nYour email client has opened with the order details.\nSend it to complete your request.\n\nWe'll contact you at: ${email}`);
        
        // Clear cart and close modal
        this.clear();
        document.getElementById('paymentModal').classList.remove('open');
        document.getElementById('checkoutForm').reset();
    },
    
    // Email validation helper
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
};

// Wishlist functionality
const Wishlist = {
    items: [],
    
    init() {
        const saved = localStorage.getItem('dhive_wishlist');
        if (saved) {
            this.items = JSON.parse(saved);
        }
        this.updateUI();
    },
    
    save() {
        localStorage.setItem('dhive_wishlist', JSON.stringify(this.items));
    },
    
    toggle(product) {
        const index = this.items.findIndex(item => item.id === product.id);
        if (index > -1) {
            this.items.splice(index, 1);
            this.showNotification(`Removed from wishlist`);
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                currency: product.currency,
                icon: product.icon
            });
            this.showNotification(`Added to wishlist! ❤️`);
        }
        this.save();
        this.updateUI();
    },
    
    isInWishlist(productId) {
        return this.items.some(item => item.id === productId);
    },
    
    remove(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.save();
        this.updateUI();
    },
    
    updateUI() {
        const count = this.items.length;
        
        // Update wishlist count badge
        const countEl = document.getElementById('wishlistCount');
        if (countEl) {
            countEl.textContent = count;
            countEl.style.display = count > 0 ? 'flex' : 'none';
        }
        
        // Update wishlist items list
        const itemsEl = document.getElementById('wishlistItems');
        if (itemsEl) {
            if (this.items.length === 0) {
                itemsEl.innerHTML = `
                    <div class="cart-empty">
                        <div class="cart-empty-icon">❤️</div>
                        <p>Your wishlist is empty</p>
                    </div>
                `;
            } else {
                itemsEl.innerHTML = this.items.map(item => `
                    <div class="cart-item">
                        <div class="cart-item-info">
                            <h4>${item.icon} ${item.name}</h4>
                            <div class="cart-item-price">
                                ${item.currency === 'USD' ? '$' : 'R'}${item.price.toLocaleString()}
                            </div>
                        </div>
                        <button class="cart-item-remove" onclick="Wishlist.remove(${item.id})" title="Remove">×</button>
                    </div>
                `).join('');
            }
        }
        
        // Update wishlist button states on product cards
        document.querySelectorAll('.btn-wishlist').forEach(btn => {
            const productId = parseInt(btn.dataset.productId);
            if (this.isInWishlist(productId)) {
                btn.classList.add('active');
                btn.innerHTML = '❤️';
            } else {
                btn.classList.remove('active');
                btn.innerHTML = '🤍';
            }
        });
    },
    
    showNotification(message) {
        Cart.showNotification(message);
    },
    
    togglePanel() {
        const panel = document.getElementById('wishlistPanel');
        const overlay = document.getElementById('cartOverlay');
        if (panel && overlay) {
            // Close cart if open
            document.getElementById('cartPanel')?.classList.remove('open');
            panel.classList.toggle('open');
            overlay.classList.toggle('open');
        }
    }
};

// Add CSS for notifications
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideOutDown {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(20px);
        }
    }
`;
document.head.appendChild(notificationStyles);

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    Cart.init();
    Wishlist.init();
});
