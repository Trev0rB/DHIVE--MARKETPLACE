// ============================================
// DHIVE Marketplace - Authentication
// ============================================

const Auth = {
    user: null,
    
    // Initialize auth state from localStorage
    init() {
        const saved = localStorage.getItem('dhive_user');
        if (saved) {
            this.user = JSON.parse(saved);
        }
        this.updateUI();
    },
    
    // Save user to localStorage
    save() {
        if (this.user) {
            localStorage.setItem('dhive_user', JSON.stringify(this.user));
        } else {
            localStorage.removeItem('dhive_user');
        }
    },
    
    // Check if user is logged in
    isLoggedIn() {
        return this.user !== null;
    },
    
    // Login
    login(email, password) {
        if (!email || !password) {
            alert('Please fill in all fields');
            return false;
        }
        
        if (!this.validateEmail(email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        // In a real app, this would validate against a backend
        // For now, we just create a session
        const name = email.split('@')[0];
        this.user = {
            name: this.capitalizeFirstLetter(name),
            email: email,
            createdAt: new Date().toISOString()
        };
        
        this.save();
        this.updateUI();
        
        // Navigate to marketplace
        if (typeof App !== 'undefined') {
            App.navigate('marketplace');
        }
        
        return true;
    },
    
    // Sign up
    signup(name, email, password) {
        if (!name || !email || !password) {
            alert('Please fill in all fields');
            return false;
        }
        
        if (!this.validateEmail(email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        if (password.length < 6) {
            alert('Password must be at least 6 characters');
            return false;
        }
        
        // In a real app, this would create an account on the backend
        this.user = {
            name: name,
            email: email,
            createdAt: new Date().toISOString()
        };
        
        this.save();
        this.updateUI();
        
        alert(`✅ Welcome to DHIVE, ${name}!`);
        
        // Navigate to marketplace
        if (typeof App !== 'undefined') {
            App.navigate('marketplace');
        }
        
        return true;
    },
    
    // Logout
    logout() {
        this.user = null;
        this.save();
        this.updateUI();
        
        // Navigate to marketplace
        if (typeof App !== 'undefined') {
            App.navigate('marketplace');
        }
    },
    
    // Update UI based on auth state
    updateUI() {
        const userNameEl = document.getElementById('userNameDisplay');
        const signInBtn = document.getElementById('signInBtn');
        
        if (this.user) {
            if (userNameEl) {
                userNameEl.textContent = `Hi, ${this.user.name}`;
                userNameEl.style.display = 'flex';
            }
            if (signInBtn) {
                signInBtn.textContent = 'Logout';
                signInBtn.onclick = () => Auth.logout();
            }
        } else {
            if (userNameEl) {
                userNameEl.style.display = 'none';
            }
            if (signInBtn) {
                signInBtn.textContent = 'Sign In';
                signInBtn.onclick = () => {
                    if (typeof App !== 'undefined') {
                        App.navigate('login');
                    }
                };
            }
        }
    },
    
    // Switch between login and signup tabs
    switchTab(tab) {
        const loginTab = document.getElementById('loginTab');
        const signupTab = document.getElementById('signupTab');
        const loginForm = document.getElementById('loginFormContent');
        const signupForm = document.getElementById('signupFormContent');
        
        if (tab === 'login') {
            loginTab?.classList.add('active');
            signupTab?.classList.remove('active');
            if (loginForm) loginForm.style.display = 'block';
            if (signupForm) signupForm.style.display = 'none';
        } else {
            loginTab?.classList.remove('active');
            signupTab?.classList.add('active');
            if (loginForm) loginForm.style.display = 'none';
            if (signupForm) signupForm.style.display = 'block';
        }
    },
    
    // Handle login form submission
    handleLogin() {
        const email = document.getElementById('loginEmail')?.value;
        const password = document.getElementById('loginPassword')?.value;
        this.login(email, password);
    },
    
    // Handle signup form submission
    handleSignup() {
        const name = document.getElementById('signupName')?.value;
        const email = document.getElementById('signupEmail')?.value;
        const password = document.getElementById('signupPassword')?.value;
        this.signup(name, email, password);
    },
    
    // Require login for certain actions
    requireLogin(callback) {
        if (this.isLoggedIn()) {
            callback();
        } else {
            if (typeof App !== 'undefined') {
                App.navigate('login');
            }
        }
    },
    
    // Helper: Validate email format
    validateEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    },
    
    // Helper: Capitalize first letter
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
};

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    Auth.init();
});
