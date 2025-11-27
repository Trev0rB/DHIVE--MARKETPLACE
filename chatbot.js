// ============================================
// DHIVE Marketplace - AI Chatbot
// ============================================

const Chatbot = {
    isOpen: false,
    
    // Toggle chatbot panel
    toggle() {
        const panel = document.getElementById('chatbotPanel');
        const bubble = document.getElementById('chatbotBubble');
        
        if (panel) {
            this.isOpen = !this.isOpen;
            panel.classList.toggle('open', this.isOpen);
            
            if (this.isOpen) {
                document.getElementById('chatbotInput')?.focus();
            }
        }
    },
    
    // Send message
    send() {
        const input = document.getElementById('chatbotInput');
        const message = input?.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addMessage(message, 'user');
        input.value = '';
        
        // Show typing indicator
        this.showTyping();
        
        // Get response after delay (simulating thinking)
        setTimeout(() => {
            this.hideTyping();
            const response = this.getResponse(message);
            this.addMessage(response, 'bot');
        }, 800 + Math.random() * 500);
    },
    
    // Add message to chat
    addMessage(text, sender) {
        const messagesEl = document.getElementById('chatbotMessages');
        if (!messagesEl) return;
        
        const messageEl = document.createElement('div');
        messageEl.className = `chatbot-message ${sender}`;
        messageEl.innerHTML = text;
        messagesEl.appendChild(messageEl);
        
        // Scroll to bottom
        messagesEl.scrollTop = messagesEl.scrollHeight;
    },
    
    // Show typing indicator
    showTyping() {
        const messagesEl = document.getElementById('chatbotMessages');
        if (!messagesEl) return;
        
        const typingEl = document.createElement('div');
        typingEl.id = 'chatbotTyping';
        typingEl.className = 'chatbot-message bot';
        typingEl.innerHTML = '<span class="typing-dots">●●●</span>';
        typingEl.style.opacity = '0.7';
        messagesEl.appendChild(typingEl);
        messagesEl.scrollTop = messagesEl.scrollHeight;
    },
    
    // Hide typing indicator
    hideTyping() {
        document.getElementById('chatbotTyping')?.remove();
    },
    
    // Get intelligent response based on message
    getResponse(message) {
        const msg = message.toLowerCase();
        
        // Greetings
        if (this.matches(msg, ['hi', 'hello', 'hey', 'howzit', 'good morning', 'good afternoon'])) {
            return this.randomResponse([
                "Hey there! 👋 Welcome to DHIVE. Looking for AI tools, templates, or automation solutions? I'm here to help!",
                "Hi! Great to have you here. What can I help you find today? We've got AI tools, chatbots, templates and more.",
                "Hello! 👋 I'm your DHIVE assistant. Whether you need lead generation, customer support bots, or templates - I've got you covered."
            ]);
        }
        
        // Free products
        if (this.matches(msg, ['free', 'no cost', 'trial', 'test'])) {
            return "Great news! 🎉 We have a <strong>Free AI Audit Tool</strong> that helps identify where AI fits best in your business - no credit card needed. Want me to tell you more about it?";
        }
        
        // Trending / Popular
        if (this.matches(msg, ['trending', 'popular', 'best seller', 'recommended', 'best'])) {
            return "🔥 Our trending products right now:<br><br>• <strong>Lead Generation Chatbot</strong> (R2,500) - WhatsApp lead qualifier<br>• <strong>Customer Support AI</strong> (R3,500) - 24/7 automated support<br>• <strong>Content Writing AI</strong> (R1,999) - SEO articles that rank<br>• <strong>Job Application Automation</strong> (R499) - Auto-apply to 100+ jobs daily<br><br>Want details on any of these?";
        }
        
        // Pricing
        if (this.matches(msg, ['price', 'cost', 'how much', 'pricing', 'expensive', 'cheap', 'affordable'])) {
            return "💰 Our pricing ranges from <strong>FREE</strong> to premium enterprise solutions:<br><br>• Free tools available<br>• ZAR products: R79 - R3,500<br>• Premium (USD): $699 - $1,999<br><br>Use the filters on the marketplace to sort by price range. What's your budget?";
        }
        
        // Lead generation
        if (this.matches(msg, ['lead', 'leads', 'lead gen', 'prospect'])) {
            return "Looking to generate more leads? 🎯 We've got you covered:<br><br>• <strong>Lead Generation Chatbot</strong> (R2,500) - Qualifies leads on WhatsApp 24/7<br>• <strong>Lead Scoring Engine</strong> (R2,999) - AI-powered lead qualification<br><br>Both integrate with major CRMs. Want more details?";
        }
        
        // Customer support
        if (this.matches(msg, ['customer support', 'support bot', 'helpdesk', 'customer service'])) {
            return "Our <strong>Customer Support AI Bot</strong> (R3,500) is perfect! 💬<br><br>✓ 24/7 automated responses<br>✓ Works on WhatsApp, Messenger & Slack<br>✓ Handles FAQs automatically<br>✓ Escalates complex queries to humans<br><br>It's got a 4.9★ rating from 345 reviews!";
        }
        
        // WhatsApp
        if (this.matches(msg, ['whatsapp', 'wa'])) {
            return "Several of our tools integrate with WhatsApp! 📱<br><br>• Lead Generation Chatbot<br>• Customer Support AI Bot<br>• B2B Sales Quote Manager<br><br>Perfect for businesses in SA where WhatsApp is king. Which one interests you?";
        }
        
        // Custom solutions
        if (this.matches(msg, ['custom', 'bespoke', 'tailored', 'specific needs', 'enterprise'])) {
            return "🏢 Need something custom? We've got premium solutions:<br><br>• <strong>Custom AI Solution (Basic)</strong> - $799<br>• <strong>Custom AI Solution (Advanced)</strong> - $1,299<br>• <strong>Enterprise AI Suite</strong> - $1,999<br><br>These are built specifically for your business needs. Head to the Support page to discuss your requirements!";
        }
        
        // B2B / Sales
        if (this.matches(msg, ['b2b', 'sales', 'quote', 'quotation'])) {
            return "Check out our <strong>B2B Sales Quote Manager</strong> ($800)! 📋<br><br>It's a plug & play tool for:<br>✓ Quote generation<br>✓ Approval workflows<br>✓ Email & WhatsApp integration<br>✓ CRM connectivity<br><br>Click on it in the marketplace for more details!";
        }
        
        // Integration
        if (this.matches(msg, ['integrate', 'integration', 'connect', 'api', 'work with'])) {
            return "Our tools integrate with tons of platforms! 🔗<br><br>• <strong>Messaging:</strong> WhatsApp, Slack, Teams, Messenger<br>• <strong>CRM:</strong> Salesforce, HubSpot, Pipedrive<br>• <strong>Email:</strong> Mailchimp, Gmail, ConvertKit<br>• <strong>Social:</strong> Instagram, Twitter, LinkedIn, Facebook<br><br>Each product listing shows its integrations. What platform do you need?";
        }
        
        // Help / Support
        if (this.matches(msg, ['help', 'support', 'implementation', 'setup', 'assist'])) {
            return "Need help? We've got you! 🤝<br><br>Head to the <strong>Support</strong> page where you can:<br>• Submit your requirements<br>• Request a strategy call<br>• Get implementation assistance<br><br>Or tell me what you're trying to achieve and I'll point you in the right direction!";
        }
        
        // Selling
        if (this.matches(msg, ['sell', 'selling', 'list my', 'become seller', 'creator'])) {
            return "Want to sell on DHIVE? 💸<br><br>As a creator, you keep <strong>85-90% of revenue</strong>!<br><br>Click 'Sell Your Items' in the menu to access the seller dashboard. You can list AI tools, templates, courses, ebooks - whatever you've built!";
        }
        
        // Building
        if (this.matches(msg, ['build', 'create', 'make', 'develop'])) {
            return "🛠️ Want to build your own AI tool?<br><br>Check out 'Build AI Tool' in the menu! We help creators build and sell AI solutions on DHIVE.<br><br>Got an idea? We can help you turn it into a product.";
        }
        
        // About DHIVE
        if (this.matches(msg, ['what is dhive', 'about dhive', 'tell me about', 'how does this work'])) {
            return "DHIVE is an AI marketplace where you can:<br><br>🛒 <strong>Buy</strong> - AI tools, templates, courses & more<br>💰 <strong>Sell</strong> - List your products, keep 85-90%<br>🛠️ <strong>Build</strong> - Create AI tools with our help<br><br>We're focused on practical, revenue-generating solutions. Anything specific you want to know?";
        }
        
        // Payment
        if (this.matches(msg, ['payment', 'pay', 'checkout', 'buy', 'purchase'])) {
            return "When you're ready to buy, just add items to your cart and checkout! 🛒<br><br>Our checkout sends your order request via email, and our team will get back to you with payment details and next steps. Simple and personal!";
        }
        
        // Thanks
        if (this.matches(msg, ['thank', 'thanks', 'cheers', 'appreciated'])) {
            return this.randomResponse([
                "You're welcome! 😊 Let me know if you need anything else.",
                "Happy to help! Shout if you have more questions.",
                "Anytime! Good luck with your search. 🚀"
            ]);
        }
        
        // Default / fallback
        return this.randomResponse([
            "I can help with info on products, pricing, features, integrations, and support. Try asking about trending tools, custom solutions, or specific categories!",
            "Not sure I caught that. I'm great at helping you find products, comparing prices, or explaining features. What would you like to know?",
            "Hmm, let me try again. Ask me about our AI tools, templates, pricing, or how to sell on DHIVE!"
        ]);
    },
    
    // Helper: Check if message matches any keywords
    matches(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    },
    
    // Helper: Get random response from array
    randomResponse(responses) {
        return responses[Math.floor(Math.random() * responses.length)];
    }
};

// Handle Enter key in chat input
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('chatbotInput');
    if (input) {
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                Chatbot.send();
            }
        });
    }
});

// Add typing animation styles
const typingStyles = document.createElement('style');
typingStyles.textContent = `
    .typing-dots {
        display: inline-block;
        animation: typingPulse 1s infinite;
    }
    
    @keyframes typingPulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
    }
`;
document.head.appendChild(typingStyles);
