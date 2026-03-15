// ============================================
// DHIVE Marketplace - Main Application
// ============================================

const App = {
    currentPage: 'marketplace',
    filteredProducts: [...PRODUCTS],
    
    // Initialize the app
    init() {
        this.render();
        this.setupEventListeners();
        Cart.init();
        Wishlist.init();
        Auth.init();
    },
    
    // Setup global event listeners
    setupEventListeners() {
        // Search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterProducts({ search: e.target.value });
            });
        }
        
        // Close panels when clicking overlay
        const overlay = document.getElementById('cartOverlay');
        if (overlay) {
            overlay.addEventListener('click', () => {
                document.getElementById('cartPanel')?.classList.remove('open');
                document.getElementById('wishlistPanel')?.classList.remove('open');
                overlay.classList.remove('open');
            });
        }
        
        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        if (mobileMenuBtn) {
            mobileMenuBtn.addEventListener('click', () => {
                document.getElementById('navLinks')?.classList.toggle('open');
            });
        }
        
        // Close modals on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-overlay.open').forEach(modal => {
                    modal.classList.remove('open');
                });
                document.getElementById('cartPanel')?.classList.remove('open');
                document.getElementById('wishlistPanel')?.classList.remove('open');
                document.getElementById('cartOverlay')?.classList.remove('open');
            }
        });
    },
    
    // Navigate to a page
    navigate(page) {
        this.currentPage = page;
        this.render();
        window.scrollTo(0, 0);
        
        // Update nav link states
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
    },
    
    // Main render function
    render() {
        const appEl = document.getElementById('app');
        if (!appEl) return;
        
        let content = '';
        
        switch (this.currentPage) {
            case 'marketplace':
                content = this.renderMarketplace();
                break;
            case 'sell':
                content = this.renderSell();
                break;
            case 'build':
                content = this.renderBuild();
                break;
            case 'support':
                content = this.renderSupport();
                break;
            case 'login':
                content = this.renderLogin();
                break;
            default:
                content = this.renderMarketplace();
        }
        
        appEl.innerHTML = content;
        this.setupPageListeners();
        Auth.updateUI();
    },
    
    // Setup page-specific event listeners after render
    setupPageListeners() {
        // Category filter
        const categoryFilter = document.getElementById('categoryFilter');
        if (categoryFilter) {
            categoryFilter.addEventListener('change', (e) => {
                this.filterProducts({ category: e.target.value });
            });
        }
        
        // Price filter
        const priceFilter = document.getElementById('priceFilter');
        if (priceFilter) {
            priceFilter.addEventListener('change', (e) => {
                this.filterProducts({ price: e.target.value });
            });
        }
    },
    
    // Filter products
    filterProducts(filters = {}) {
        let filtered = [...PRODUCTS];
        
        // Search filter
        const searchTerm = filters.search || document.getElementById('searchInput')?.value || '';
        if (searchTerm) {
            const term = searchTerm.toLowerCase();
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(term) ||
                p.category.toLowerCase().includes(term) ||
                p.desc.toLowerCase().includes(term) ||
                p.seller.toLowerCase().includes(term)
            );
        }
        
        // Category filter
        const category = filters.category || document.getElementById('categoryFilter')?.value || '';
        if (category && category !== 'All Categories') {
            filtered = filtered.filter(p => p.category === category);
        }
        
        // Price filter
        const priceRange = filters.price || document.getElementById('priceFilter')?.value || '';
        if (priceRange) {
            switch (priceRange) {
                case 'free':
                    filtered = filtered.filter(p => p.price === 0);
                    break;
                case '0-500':
                    filtered = filtered.filter(p => p.currency === 'ZAR' && p.price > 0 && p.price <= 500);
                    break;
                case '500-2000':
                    filtered = filtered.filter(p => p.currency === 'ZAR' && p.price >= 500 && p.price <= 2000);
                    break;
                case '2000+':
                    filtered = filtered.filter(p => p.currency === 'ZAR' && p.price > 2000);
                    break;
                case 'premium':
                    filtered = filtered.filter(p => p.currency === 'USD');
                    break;
            }
        }
        
        this.filteredProducts = filtered;
        this.updateProductsGrid();
    },
    
    // Update products grid without full re-render
    updateProductsGrid() {
        const gridEl = document.getElementById('productsGrid');
        if (gridEl) {
            if (this.filteredProducts.length === 0) {
                gridEl.innerHTML = `
                    <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: #64748b;">
                        <div style="font-size: 48px; margin-bottom: 16px;">🔍</div>
                        <h3 style="margin-bottom: 8px;">No products found</h3>
                        <p>Try adjusting your filters or search term</p>
                    </div>
                `;
            } else {
                gridEl.innerHTML = this.filteredProducts.map(p => this.renderProductCard(p)).join('');
            }
        }
    },
    
    // Render product card
    renderProductCard(product) {
        const priceDisplay = product.price === 0 
            ? '<span class="product-price free">✓ FREE</span>' 
            : `<span class="product-price">${product.currency === 'USD' ? '$' : 'R'}${product.price.toLocaleString()}</span>`;
        
        const originalPrice = product.special && product.originalPrice 
            ? `<span class="product-original-price">R${product.originalPrice}</span>` 
            : '';
        
        const badge = product.free ? '<div class="product-badge free">FREE</div>'
            : product.trending ? '<div class="product-badge trending">🔥 Trending</div>'
            : product.premium ? '<div class="product-badge premium">⭐ Premium</div>'
            : product.special ? '<div class="product-badge special">SALE</div>'
            : '';
        
        const rating = product.rating 
            ? `<div class="product-rating">
                <span class="product-rating-stars">⭐ ${product.rating}</span>
                <span class="product-rating-count">(${product.reviews} reviews)</span>
               </div>`
            : '';
        
        const isInWishlist = Wishlist.isInWishlist(product.id);
        
        return `
            <div class="product-card" onclick="App.viewProduct(${product.id})">
                ${badge}
                <div class="product-icon">${product.icon}</div>
                <div class="product-name">${product.name}</div>
                <div class="product-category">${product.category}</div>
                <div class="product-desc">${product.desc}</div>
                ${rating}
                <div>${priceDisplay}${originalPrice}</div>
                <div class="product-seller">by ${product.seller}</div>
                <div class="product-actions">
                    <button class="btn-primary" onclick="event.stopPropagation(); App.addToCart(${product.id})">
                        Add to Cart
                    </button>
                    <button class="btn-wishlist ${isInWishlist ? 'active' : ''}" data-product-id="${product.id}" onclick="event.stopPropagation(); App.toggleWishlist(${product.id})">
                        ${isInWishlist ? '❤️' : '🤍'}
                    </button>
                </div>
            </div>
        `;
    },
    
    // Add product to cart
    addToCart(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            Cart.add(product);
        }
    },
    
    // Toggle wishlist
    toggleWishlist(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (product) {
            Wishlist.toggle(product);
            // Update button state
            const btn = document.querySelector(`.btn-wishlist[data-product-id="${productId}"]`);
            if (btn) {
                const isInWishlist = Wishlist.isInWishlist(productId);
                btn.classList.toggle('active', isInWishlist);
                btn.innerHTML = isInWishlist ? '❤️' : '🤍';
            }
        }
    },
    
    // View product details
    viewProduct(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;
        
        const modal = document.getElementById('productDetailModal');
        const content = document.getElementById('productDetailContent');
        if (!modal || !content) return;
        
        // Check if it's an inquiry-only product
        if (product.inquiryOnly) {
            content.innerHTML = this.renderInquiryForm(product);
        } else {
            content.innerHTML = this.renderProductDetail(product);
        }
        
        modal.classList.add('open');
    },
    
    // Render product detail view
    renderProductDetail(product) {
        const priceDisplay = product.price === 0 
            ? '<span class="free" style="color: #10b981; font-size: 28px; font-weight: 700;">✓ FREE</span>' 
            : `<span style="font-size: 28px; font-weight: 700;">${product.currency === 'USD' ? '$' : 'R'}${product.price.toLocaleString()}</span>`;
        
        const originalPrice = product.special && product.originalPrice 
            ? `<span class="product-original-price">was R${product.originalPrice}</span>` 
            : '';
        
        return `
            <div class="product-detail-header">
                <div class="product-detail-icon">${product.icon}</div>
                <h2 class="modal-title" style="padding-right: 0;">${product.name}</h2>
                <div style="color: #2563eb; font-weight: 600; margin-bottom: 12px;">${product.category}</div>
                <div>${priceDisplay} ${originalPrice}</div>
            </div>
            
            <div class="product-detail-section">
                <div class="product-detail-label">Description</div>
                <div class="product-detail-text">${product.desc}</div>
            </div>
            
            <div class="product-detail-section">
                <div class="product-detail-label">Integrates With</div>
                <div class="integration-tags">
                    ${product.integrations.map(i => `<span class="integration-tag">${i}</span>`).join('')}
                </div>
            </div>
            
            <div class="product-detail-section">
                <div class="product-detail-label">Seller</div>
                <div class="product-detail-text">${product.seller}</div>
            </div>
            
            ${product.rating ? `
                <div class="product-detail-section">
                    <div class="product-detail-label">Rating</div>
                    <div class="product-detail-text">⭐ ${product.rating} (${product.reviews} reviews)</div>
                </div>
            ` : ''}
            
            <div style="display: flex; gap: 12px; margin-top: 32px;">
                <button class="btn-primary" style="flex: 1;" onclick="App.addToCart(${product.id}); document.getElementById('productDetailModal').classList.remove('open'); Cart.showNotification('Added to cart!');">
                    Add to Cart
                </button>
                <button class="btn-secondary" style="flex: 1;" onclick="document.getElementById('productDetailModal').classList.remove('open')">
                    Close
                </button>
            </div>
        `;
    },
    
    // Render inquiry form for special products
    renderInquiryForm(product) {
        return `
            <div class="product-detail-header">
                <div class="product-detail-icon">${product.icon}</div>
                <h2 class="modal-title" style="padding-right: 0;">${product.name}</h2>
                <div style="color: #2563eb; font-weight: 600; margin-bottom: 12px;">${product.category}</div>
                <div style="font-size: 28px; font-weight: 700;">${product.currency === 'USD' ? '$' : 'R'}${product.price.toLocaleString()}</div>
            </div>
            
            <div class="product-detail-section">
                <div class="product-detail-label">Description</div>
                <div class="product-detail-text">${product.desc}</div>
            </div>
            
            <div class="product-detail-section">
                <div class="product-detail-label">Integrates With</div>
                <div class="integration-tags">
                    ${product.integrations.map(i => `<span class="integration-tag">${i}</span>`).join('')}
                </div>
            </div>
            
            <div class="product-detail-section">
                <div class="product-detail-label">📋 Interested? Fill the form below</div>
                <form id="inquiryForm" style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">
                    <input type="text" id="inquiryName" class="form-input" placeholder="Your Name" required>
                    <input type="email" id="inquiryEmail" class="form-input" placeholder="Your Email" required>
                    <input type="text" id="inquiryCompany" class="form-input" placeholder="Company Name" required>
                    <input type="tel" id="inquiryPhone" class="form-input" placeholder="Phone Number" required>
                    <textarea id="inquiryMessage" class="form-textarea" placeholder="Tell us about your requirements..." rows="4" required></textarea>
                </form>
            </div>
            
            <div style="display: flex; gap: 12px; margin-top: 24px;">
                <button class="btn-primary" style="flex: 1;" onclick="App.submitInquiry(${product.id})">
                    Send Inquiry
                </button>
                <button class="btn-secondary" style="flex: 1;" onclick="document.getElementById('productDetailModal').classList.remove('open')">
                    Close
                </button>
            </div>
        `;
    },
    
    // Submit product inquiry
    submitInquiry(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;
        
        const name = document.getElementById('inquiryName')?.value.trim();
        const email = document.getElementById('inquiryEmail')?.value.trim();
        const company = document.getElementById('inquiryCompany')?.value.trim();
        const phone = document.getElementById('inquiryPhone')?.value.trim();
        const message = document.getElementById('inquiryMessage')?.value.trim();
        
        if (!name || !email || !company || !phone || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        const emailBody = `
NEW PRODUCT INQUIRY
===================

Product: ${product.name}
Price: ${product.currency === 'USD' ? '$' : 'R'}${product.price.toLocaleString()}
Integrations: ${product.integrations.join(', ')}

CUSTOMER DETAILS:
Name: ${name}
Email: ${email}
Company: ${company}
Phone: ${phone}

MESSAGE:
${message}

---
Reply to: ${email}
        `.trim();
        
        const mailtoLink = `mailto:trevorbosch4@gmail.com?subject=INQUIRY: ${encodeURIComponent(product.name)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoLink);
        
        alert(`✅ Email client opened!\n\nSend the inquiry to complete your request.\nWe'll respond to: ${email}`);
        document.getElementById('productDetailModal').classList.remove('open');
    },
    
    // Render marketplace page
    renderMarketplace() {
        this.filteredProducts = [...PRODUCTS];
        
        return `
            <!-- Hero Section -->
            <div class="hero">
                <div class="hero-content">
                    <h1>Welcome to <span class="hero-highlight">DHIVE</span></h1>
                    <p>Discover AI tools, automation solutions, templates, and digital products that grow your business</p>
                    <div class="hero-stats">
                        <div class="hero-stat">
                            <div class="hero-stat-number">${PRODUCTS.length}+</div>
                            <div class="hero-stat-label">Products</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat-number">100%</div>
                            <div class="hero-stat-label">Creator Revenue</div>
                        </div>
                        <div class="hero-stat">
                            <div class="hero-stat-number">24/7</div>
                            <div class="hero-stat-label">AI Support</div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="container">
                <!-- How It Works -->
                <div class="how-it-works">
                    <h2>How It Works</h2>
                    <div class="how-it-works-grid">
                        <div class="how-it-works-step">
                            <div class="step-number">1</div>
                            <h3>Browse & Discover</h3>
                            <p>Explore our curated collection of AI tools, templates, courses, and automation solutions</p>
                        </div>
                        <div class="how-it-works-step">
                            <div class="step-number">2</div>
                            <h3>Choose & Purchase</h3>
                            <p>Find what fits your needs, add to cart, and complete your order with our simple checkout</p>
                        </div>
                        <div class="how-it-works-step">
                            <div class="step-number">3</div>
                            <h3>Implement & Grow</h3>
                            <p>Get your tools delivered, implement with our support, and watch your business grow</p>
                        </div>
                    </div>
                </div>
                
                <!-- Filters -->
                <div class="filter-bar">
                    <select class="filter-select" id="categoryFilter">
                        ${CATEGORIES.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                    </select>
                    <select class="filter-select" id="priceFilter">
                        ${PRICE_RANGES.map(range => `<option value="${range.value}">${range.label}</option>`).join('')}
                    </select>
                </div>
                
                <!-- Products Grid -->
                <div class="products-grid" id="productsGrid">
                    ${PRODUCTS.map(p => this.renderProductCard(p)).join('')}
                </div>
            </div>
        `;
    },
    
    // Render sell page (seller dashboard)
    renderSell() {
        if (!Auth.isLoggedIn()) {
            return `
                <div class="container">
                    <div class="page-header">
                        <h1>Sell Your Products</h1>
                        <p>Join our marketplace and earn 100% on every sale</p>
                    </div>
                    <div class="form-container">
                        <p style="text-align: center; color: #64748b; margin-bottom: 24px;">
                            Sign in to access your seller dashboard
                        </p>
                        <button class="btn-primary btn-block" onclick="App.navigate('login')">
                            Sign In / Create Account
                        </button>
                    </div>
                </div>
            `;
        }
        
        // Mock seller stats
        const totalSales = 47500;
        const monthlyEarnings = (totalSales * 1.00).toFixed(0);
        const productsListed = 3;
        
        return `
            <div class="container">
                <div class="page-header">
                    <h1>Seller Dashboard</h1>
                    <p>Manage your products and track your earnings</p>
                </div>
                
                <div class="dashboard-stats">
                    <div class="stat-card blue">
                        <div class="stat-number">R${parseInt(totalSales).toLocaleString()}</div>
                        <div class="stat-label">Total Sales</div>
                    </div>
                    <div class="stat-card green">
                        <div class="stat-number">R${parseInt(monthlyEarnings).toLocaleString()}</div>
                        <div class="stat-label">Your Earnings (100%)</div>
                    </div>
                    <div class="stat-card orange">
                        <div class="stat-number">${productsListed}</div>
                        <div class="stat-label">Products Listed</div>
                    </div>
                </div>
                
                <div class="dashboard-section">
                    <h2>Your Products</h2>
                    <table class="products-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Sales</th>
                                <th>You Earn</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>🤖 Lead Generation Chatbot</td>
                                <td>R2,500</td>
                                <td>12</td>
                                <td class="earnings">R25,500</td>
                            </tr>
                            <tr>
                                <td>💬 Customer Support AI</td>
                                <td>R3,500</td>
                                <td>5</td>
                                <td class="earnings">R14,875</td>
                            </tr>
                            <tr>
                                <td>📋 B2B Quote Manager</td>
                                <td>$800</td>
                                <td>2</td>
                                <td class="earnings">$1,360</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                
                <button class="btn-primary btn-block" style="margin-top: 24px;">
                    + List New Product
                </button>
            </div>
        `;
    },
    
    // Render build page
    renderBuild() {
        return `
            <div class="container">
                <div class="build-hero">
                    <h1>🛠️ Build Your AI Tool</h1>
                    <p>Turn your ideas into products and sell them on DHIVE. We help you build, launch, and earn.</p>
                </div>
                
                <div class="build-steps">
                    <div class="build-step">
                        <div class="build-step-icon">💡</div>
                        <h3>Share Your Idea</h3>
                        <p>Tell us what problem you want to solve. Whether it's a chatbot, automation tool, or template - we'll help shape it into a sellable product.</p>
                    </div>
                    <div class="build-step">
                        <div class="build-step-icon">🤖</div>
                        <h3>Build with Claude</h3>
                        <p>We use AI to help you build fast. No coding required - just describe what you want and we'll make it happen together.</p>
                    </div>
                    <div class="build-step">
                        <div class="build-step-icon">🚀</div>
                        <h3>Launch & Earn</h3>
                        <p>List your product on DHIVE and start selling. You keep 100% of every sale. We handle the marketplace, you collect the revenue.</p>
                    </div>
                </div>
                
                <div class="build-cta">
                    <h2>Ready to build something?</h2>
                    <p>Submit your idea and we'll get back to you within 24 hours</p>
                    <button class="btn-primary" onclick="App.navigate('support')" style="margin-top: 8px;">
                        Submit Your Idea →
                    </button>
                </div>
            </div>
        `;
    },
    
    // Render support page
    renderSupport() {
        return `
            <div class="container">
                <div class="page-header">
                    <h1>Support & Implementation</h1>
                    <p>Get expert help implementing AI solutions for your business</p>
                </div>
                
                <div class="form-container">
                    <form id="supportForm" onsubmit="App.submitSupport(event)">
                        <div class="form-group">
                            <label>Your Name *</label>
                            <input type="text" id="supportName" class="form-input" placeholder="Full name" required>
                        </div>
                        <div class="form-group">
                            <label>Email Address *</label>
                            <input type="email" id="supportEmail" class="form-input" placeholder="your@email.com" required>
                        </div>
                        <div class="form-group">
                            <label>Company Name *</label>
                            <input type="text" id="supportCompany" class="form-input" placeholder="Your company" required>
                        </div>
                        <div class="form-group">
                            <label>Phone Number</label>
                            <input type="tel" id="supportPhone" class="form-input" placeholder="Contact number">
                        </div>
                        <div class="form-group">
                            <label>What do you want to achieve? *</label>
                            <textarea id="supportGoal" class="form-textarea" placeholder="Describe your goal, problem, or idea..." required></textarea>
                        </div>
                        <div class="form-group">
                            <label>Would you like a strategy call?</label>
                            <select id="supportCall" class="form-select">
                                <option value="yes">Yes - Let's discuss</option>
                                <option value="no">No - Just send recommendations</option>
                                <option value="maybe">Maybe - Show me options first</option>
                            </select>
                        </div>
                        <button type="submit" class="btn-primary btn-block">
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
        `;
    },
    
    // Submit support form
    submitSupport(event) {
        event.preventDefault();
        
        const name = document.getElementById('supportName')?.value.trim();
        const email = document.getElementById('supportEmail')?.value.trim();
        const company = document.getElementById('supportCompany')?.value.trim();
        const phone = document.getElementById('supportPhone')?.value.trim();
        const goal = document.getElementById('supportGoal')?.value.trim();
        const call = document.getElementById('supportCall')?.value;
        
        if (!name || !email || !company || !goal) {
            alert('Please fill in all required fields');
            return;
        }
        
        const emailBody = `
NEW SUPPORT REQUEST FROM DHIVE
==============================

CUSTOMER DETAILS:
Name: ${name}
Email: ${email}
Company: ${company}
Phone: ${phone || 'Not provided'}

GOAL/REQUIREMENT:
${goal}

STRATEGY CALL: ${call === 'yes' ? 'Yes - wants to discuss' : call === 'no' ? 'No - just recommendations' : 'Maybe - show options first'}

---
Reply to: ${email}
        `.trim();
        
        const mailtoLink = `mailto:trevorbosch4@gmail.com?subject=SUPPORT REQUEST - ${encodeURIComponent(company)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailtoLink);
        
        alert(`✅ Request ready!\n\nYour email client has opened with the details.\nSend it to submit your request.\n\nWe'll respond to: ${email}`);
        document.getElementById('supportForm')?.reset();
    },
    
    // Render login page
    renderLogin() {
        return `
            <div class="container">
                <div class="page-header">
                    <h1>Welcome to DHIVE</h1>
                    <p>Sign in or create an account to get started</p>
                </div>
                
                <div class="form-container">
                    <div class="form-tabs">
                        <button class="form-tab active" id="loginTab" onclick="Auth.switchTab('login')">Sign In</button>
                        <button class="form-tab" id="signupTab" onclick="Auth.switchTab('signup')">Create Account</button>
                    </div>
                    
                    <!-- Login Form -->
                    <div id="loginFormContent">
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="loginEmail" class="form-input" placeholder="your@email.com">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="loginPassword" class="form-input" placeholder="Password">
                        </div>
                        <button class="btn-primary btn-block" onclick="Auth.handleLogin()">
                            Sign In
                        </button>
                    </div>
                    
                    <!-- Signup Form -->
                    <div id="signupFormContent" style="display: none;">
                        <div class="form-group">
                            <label>Full Name</label>
                            <input type="text" id="signupName" class="form-input" placeholder="Your name">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" id="signupEmail" class="form-input" placeholder="your@email.com">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input type="password" id="signupPassword" class="form-input" placeholder="Min 6 characters">
                        </div>
                        <button class="btn-primary btn-block" onclick="Auth.handleSignup()">
                            Create Account
                        </button>
                    </div>
                </div>
            </div>
        `;
    },
    
    // Helper: Escape HTML
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});
