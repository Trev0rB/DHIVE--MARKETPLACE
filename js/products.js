// ============================================
// DHIVE Marketplace - Products Data
// ============================================

const PRODUCTS = [
    // Free Product
    {
        id: 0,
        name: 'Free AI Audit Tool',
        category: 'Free Tools',
        price: 0,
        currency: 'ZAR',
        icon: '🔍',
        desc: 'Identify where AI fits best in your business - no credit card required',
        seller: 'DHIVE',
        trending: false,
        premium: false,
        special: false,
        free: true,
        integrations: ['Email', 'Web Form', 'Dashboard']
    },

    // AI & Automation Products
    {
        id: 1,
        name: 'Lead Generation Chatbot',
        category: 'AI & Automation',
        price: 2500,
        currency: 'ZAR',
        icon: '🤖',
        desc: 'WhatsApp lead qualifier that captures & scores leads 24/7',
        seller: 'DHIVE',
        trending: true,
        premium: false,
        special: false,
        integrations: ['WhatsApp', 'Telegram', 'Web Chat'],
        rating: 4.8,
        reviews: 234
    },
    {
        id: 4,
        name: 'Customer Support AI Bot',
        category: 'AI & Automation',
        price: 3500,
        currency: 'ZAR',
        icon: '💬',
        desc: '24/7 automated customer support that never sleeps',
        seller: 'DHIVE',
        trending: true,
        premium: false,
        special: false,
        integrations: ['Facebook Messenger', 'Slack', 'WhatsApp'],
        rating: 4.9,
        reviews: 345
    },
    {
        id: 6,
        name: 'Job Application Automation',
        category: 'AI & Automation',
        price: 499,
        currency: 'ZAR',
        icon: '🎯',
        desc: 'Auto-apply to 100+ jobs daily while you sleep',
        seller: 'JobHelper',
        trending: true,
        premium: false,
        special: false,
        integrations: ['LinkedIn', 'Indeed', 'Email'],
        rating: 4.3,
        reviews: 89
    },
    {
        id: 9,
        name: 'Content Writing AI',
        category: 'AI & Automation',
        price: 1999,
        currency: 'ZAR',
        icon: '✍️',
        desc: 'SEO-optimized article generator that ranks',
        seller: 'WritePro',
        trending: true,
        premium: false,
        special: false,
        integrations: ['WordPress', 'Medium', 'Email'],
        rating: 4.7,
        reviews: 201
    },
    {
        id: 11,
        name: 'Email Sequence Automation',
        category: 'AI & Automation',
        price: 1299,
        currency: 'ZAR',
        icon: '📬',
        desc: 'Automated nurture campaigns that convert',
        seller: 'EmailPro',
        trending: false,
        premium: false,
        special: false,
        integrations: ['Mailchimp', 'ActiveCampaign', 'ConvertKit']
    },
    {
        id: 12,
        name: 'Lead Scoring Engine',
        category: 'AI & Automation',
        price: 2999,
        currency: 'ZAR',
        icon: '⭐',
        desc: 'Qualify leads automatically with AI precision',
        seller: 'SalesAI',
        trending: false,
        premium: false,
        special: false,
        integrations: ['Salesforce', 'HubSpot', 'Pipedrive'],
        rating: 4.6,
        reviews: 178
    },
    {
        id: 13,
        name: 'Time Tracking Bot',
        category: 'AI & Automation',
        price: 599,
        currency: 'ZAR',
        icon: '⏱️',
        desc: 'Automatic time logging for remote teams',
        seller: 'ProductivityTools',
        trending: false,
        premium: false,
        special: true,
        originalPrice: 899,
        integrations: ['Slack', 'Teams', 'Email']
    },
    {
        id: 14,
        name: 'Interview Prep AI',
        category: 'AI & Automation',
        price: 399,
        currency: 'ZAR',
        icon: '🎤',
        desc: 'Practice with AI interviewer, get feedback',
        seller: 'CareerBoost',
        trending: false,
        premium: false,
        special: false,
        integrations: ['Video Call', 'Email', 'PDF Export']
    },
    {
        id: 15,
        name: 'Customer Sentiment Analyzer',
        category: 'AI & Automation',
        price: 1799,
        currency: 'ZAR',
        icon: '😊',
        desc: 'Analyze customer emotions in real-time',
        seller: 'SentimentAI',
        trending: false,
        premium: false,
        special: false,
        integrations: ['Twitter', 'Facebook', 'Email', 'Surveys']
    },

    // Templates
    {
        id: 2,
        name: 'Email Marketing Template',
        category: 'Templates',
        price: 199,
        currency: 'ZAR',
        icon: '📧',
        desc: 'Professional HTML email templates that convert',
        seller: 'TemplateHub',
        trending: false,
        premium: false,
        special: true,
        originalPrice: 299,
        integrations: ['Gmail', 'Mailchimp', 'ConvertKit'],
        rating: 4.5,
        reviews: 156
    },
    {
        id: 10,
        name: 'Excel Dashboard Templates',
        category: 'Templates',
        price: 149,
        currency: 'ZAR',
        icon: '📈',
        desc: '20+ ready-to-use business dashboards',
        seller: 'ExcelPro',
        trending: false,
        premium: false,
        special: false,
        integrations: ['Excel', 'Google Sheets']
    },

    // Online Courses
    {
        id: 3,
        name: 'Python Web Development',
        category: 'Online Courses',
        price: 599,
        currency: 'ZAR',
        icon: '🐍',
        desc: 'Complete beginner to advanced course',
        seller: 'CodeMaster',
        trending: false,
        premium: false,
        special: false,
        integrations: ['Udemy', 'Self-Hosted']
    },

    // Ebooks
    {
        id: 5,
        name: 'Affiliate Marketing Ebook',
        category: 'Ebooks',
        price: 99,
        currency: 'ZAR',
        icon: '📚',
        desc: '200-page comprehensive guide to earning',
        seller: 'MarketingGuru',
        trending: false,
        premium: false,
        special: false,
        integrations: ['PDF', 'Email']
    },

    // Plugins
    {
        id: 7,
        name: 'WordPress SEO Plugin',
        category: 'Plugins',
        price: 79,
        currency: 'ZAR',
        icon: '🔍',
        desc: 'Boost your site rankings automatically',
        seller: 'PluginCentral',
        trending: false,
        premium: false,
        special: true,
        originalPrice: 149,
        integrations: ['WordPress', 'Google Search Console']
    },
    {
        id: 21,
        name: 'B2B Sales Quote Manager',
        category: 'Plugins',
        price: 800,
        currency: 'USD',
        icon: '📋',
        desc: 'Plug & play sales tool for B2B quote generation and approval',
        seller: 'DHIVE',
        trending: false,
        premium: false,
        special: false,
        integrations: ['Email', 'WhatsApp', 'CRM', 'Admin Dashboard'],
        rating: 4.6,
        reviews: 45,
        inquiryOnly: true
    },

    // Subscriptions
    {
        id: 8,
        name: 'Social Media Scheduler',
        category: 'Subscriptions',
        price: 299,
        currency: 'ZAR',
        icon: '📱',
        desc: 'Monthly social media management made easy',
        seller: 'SocialManager',
        trending: false,
        premium: false,
        special: false,
        integrations: ['Instagram', 'Twitter', 'LinkedIn', 'Facebook']
    },

    // Premium Products (USD)
    {
        id: 16,
        name: 'Enterprise CRM with AI',
        category: 'AI & Automation',
        price: 699,
        currency: 'USD',
        icon: '🤝',
        desc: 'Full CRM system with AI-powered insights',
        seller: 'EnterpriseAI',
        trending: false,
        premium: true,
        special: false,
        integrations: ['Salesforce', 'HubSpot', 'Custom CRM', 'Email', 'Calendar'],
        rating: 4.8,
        reviews: 92
    },
    {
        id: 17,
        name: 'Custom AI Solution (Basic)',
        category: 'AI & Automation',
        price: 799,
        currency: 'USD',
        icon: '⚙️',
        desc: 'Custom-built AI solution for your business',
        seller: 'DHIVE',
        trending: false,
        premium: true,
        special: false,
        integrations: ['Any Platform', 'Custom Integration', 'API']
    },
    {
        id: 18,
        name: 'Advanced Data Analytics',
        category: 'AI & Automation',
        price: 899,
        currency: 'USD',
        icon: '📊',
        desc: 'Complex data analysis and visualization',
        seller: 'DataDriven',
        trending: false,
        premium: true,
        special: false,
        integrations: ['PostgreSQL', 'MongoDB', 'BigQuery', 'Power BI', 'Tableau']
    },
    {
        id: 19,
        name: 'Custom AI Solution (Advanced)',
        category: 'AI & Automation',
        price: 1299,
        currency: 'USD',
        icon: '🚀',
        desc: 'Advanced custom-built AI system',
        seller: 'DHIVE',
        trending: false,
        premium: true,
        special: false,
        integrations: ['Any Platform', 'Custom Integration', 'API', 'Machine Learning'],
        rating: 4.9,
        reviews: 67
    },
    {
        id: 20,
        name: 'Enterprise AI Suite',
        category: 'AI & Automation',
        price: 1999,
        currency: 'USD',
        icon: '🏢',
        desc: 'Complete enterprise automation solution',
        seller: 'EnterpriseAI',
        trending: false,
        premium: true,
        special: false,
        integrations: ['All Platforms', 'Custom Integration', 'Multi-Team', 'API', 'Custom Reports']
    }
];

// Categories for filtering
const CATEGORIES = [
    'All Categories',
    'AI & Automation',
    'Templates',
    'Online Courses',
    'Ebooks',
    'Plugins',
    'Subscriptions',
    'Free Tools'
];

// Price ranges for filtering
const PRICE_RANGES = [
    { label: 'All Prices', value: '' },
    { label: 'Free', value: 'free' },
    { label: 'R0 - R500', value: '0-500' },
    { label: 'R500 - R2,000', value: '500-2000' },
    { label: 'R2,000+', value: '2000+' },
    { label: 'Premium (USD)', value: 'premium' }
];

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PRODUCTS, CATEGORIES, PRICE_RANGES };
}
