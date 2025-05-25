# Portfolio-Website

A secure, modern portfolio website built with React, TypeScript, and Star Wars theming.

## 🛡️ Security Features

This portfolio has been hardened with multiple security measures:

### ✅ Implemented Security Controls
- **Environment Variables**: EmailJS credentials moved to secure environment variables
- **XSS Prevention**: HTML sanitization and Content Security Policy headers
- **Modern React**: Updated to React 18 createRoot API
- **Link Security**: All external links use `rel="noopener noreferrer"`
- **Input Validation**: Form validation with length limits and email format checking
- **Build Security**: Source maps disabled and console logs removed in production
- **Development Headers**: Security headers configured for development server

### 🚀 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Create `.env.local` with your EmailJS credentials:
   ```
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```
4. Start development server: `npm start`
5. Build for production: `npm run build`

### 📋 Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run lint` - Lint code
- `npm run type-check` - TypeScript checking

### 🔒 Security Documentation

See [SECURITY.md](./SECURITY.md) for detailed security information and best practices.

---

*May the Force be with you* ⚡
