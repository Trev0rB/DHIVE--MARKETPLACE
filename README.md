# DHIVE - AI Marketplace

A modern marketplace for AI tools, automation solutions, templates, and digital products.

## 🚀 Features

- **Product Marketplace** - Browse and purchase AI tools, templates, courses, and more
- **Smart Search & Filters** - Find products by category, price range, or keywords
- **Shopping Cart & Wishlist** - Save items and checkout when ready
- **AI Chatbot Assistant** - Get help finding products and answers to questions
- **Seller Dashboard** - List products and track earnings (85-90% revenue share)
- **Build with Claude** - Create your own AI tools with assistance
- **Support System** - Get implementation help and strategy calls

## 📁 Project Structure

```
dhive-marketplace/
├── index.html          # Main entry point
├── css/
│   └── styles.css      # All styling
├── js/
│   ├── products.js     # Product data & categories
│   ├── cart.js         # Cart & wishlist functionality
│   ├── chatbot.js      # AI assistant logic
│   ├── auth.js         # Login/signup functionality
│   └── app.js          # Main application logic
└── README.md           # This file
```

## 🛠️ Setup

### Local Development

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/dhive-marketplace.git
cd dhive-marketplace
```

2. Open `index.html` in your browser, or use a local server:
```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve
```

3. Visit `http://localhost:8000`

### Deploy to Vercel

1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Deploy - no configuration needed!

## 📦 Adding Products

Edit `js/products.js` to add or modify products:

```javascript
{
    id: 22,                           // Unique ID
    name: 'Your Product Name',
    category: 'AI & Automation',      // See CATEGORIES array
    price: 999,
    currency: 'ZAR',                  // or 'USD'
    icon: '🤖',
    desc: 'Short description here',
    seller: 'Your Name',
    trending: false,                  // Shows trending badge
    premium: false,                   // Shows premium badge
    special: false,                   // Shows sale badge
    originalPrice: 1299,              // For sale items
    integrations: ['WhatsApp', 'Email'],
    rating: 4.5,                      // Optional
    reviews: 123,                     // Optional
    inquiryOnly: false                // If true, shows inquiry form instead of cart
}
```

## 🎨 Customization

### Colors
Edit CSS variables in `css/styles.css`:
```css
:root {
    --primary: #2563eb;
    --accent: #f59e0b;
    /* ... more variables */
}
```

### Email Configuration
Update email addresses in these files:
- `js/cart.js` - Checkout emails
- `js/app.js` - Support & inquiry emails

Search for `trevorbosch4@gmail.com` and replace with your email.

## 📧 How Orders Work

1. Customer adds items to cart
2. Clicks checkout and fills form
3. Email client opens with order details
4. Customer sends email to you
5. You respond with payment/delivery info

## 🔐 Authentication

Currently uses localStorage for demo purposes. User sessions persist until logout or data clear.

For production, integrate with:
- Firebase Auth
- Supabase
- Custom backend

## 📱 Mobile Responsive

Fully responsive design that works on:
- Desktop (1400px+)
- Tablet (768px - 1024px)
- Mobile (< 768px)

## 🤖 Chatbot

The AI assistant (`js/chatbot.js`) provides keyword-based responses. Customize responses in the `getResponse()` method.

## 📊 Seller Dashboard

Mock data for demo. To connect real data:
1. Add backend API
2. Update `renderSell()` in `js/app.js`
3. Fetch actual sales data

## 🚀 Production Checklist

- [ ] Replace demo email with your business email
- [ ] Add real payment integration (Stripe, PayFast, etc.)
- [ ] Connect to database for products
- [ ] Add user authentication backend
- [ ] Set up analytics (Google Analytics, etc.)
- [ ] Add terms of service & privacy policy
- [ ] Configure custom domain

## 📄 License

© 2024 DHIVE by BoschTech. All rights reserved.

---

Built with ❤️ in South Africa
