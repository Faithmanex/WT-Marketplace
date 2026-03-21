# 📚 Dr. William Triplett Marketplace

A modern, responsive marketplace platform featuring digital content, consultations, and membership plans from **Dr. William Triplett**. This application provides a comprehensive showcase of leadership books, audio/video series, courses, and consultative packages with robust visual layouts and navigation paths.

## ✨ Features

- **🛍️ Digital Marketplace**: Explore books, audio series, video courses, premium podcasts, toolkits, and apparel.
- **💼 Professional Services**: Consulting sessions, keynote speaking, executive workshops, and organizational development.
- **👑 Membership Benefits**: Access exclusive content and community benefits with the *Leadership & Ethics Collective*.
- **⚡ Streamlined Navigation**: Easy browsing with category cards, quick filter sections, and rich detail information views.
- **🎨 Responsive Visuals**: Clean and professional grid layouts featuring Framer Motion micro-animations and Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Routing**: [React Router 7](https://reactrouter.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (version 18+ recommended)

### Installation

1. **Clone or Download** this repository.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Ensure you set your API keys as needed in `.env.local` for dynamic AI integrations if supported, e.g.:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
4. **Run the development server**:
   ```bash
   npm run dev
   ```
   *The app is configured to load at `http://localhost:3000`*

## 📁 Project Structure

```text
src/
├── components/   # UI elements (Cards, Layout, Navigation)
├── data/         # Mock data and Types (Categories, Product configurations)
├── pages/        # Main views (Home, CategoryPage, ProductDetails, Membership)
└── App.tsx       # Main router and layout orchestrator
```

## 📜 Available Scripts

- `npm run dev` - Launches Vite local server on port 3000.
- `npm run build` - Builds optimized package for production deployment.
- `npm run preview` - Locally review the production build.
- `npm run lint` - Runs Type checks using `tsc`.

