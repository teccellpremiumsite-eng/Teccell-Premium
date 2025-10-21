# ✨ Teccell Premium Application

Welcome to Teccell Premium! This is a modern React application built with Vite, TypeScript, and integrated with Supabase for backend functionality.

## 🚀 What's Inside?

- **React 19** with TypeScript
- **Vite** for fast development and building
- **TailwindCSS** for styling
- **Supabase** for authentication and database
- **Radix UI** components
- **Framer Motion** for animations
- **D3.js & Recharts** for data visualization

## 🛠️ Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/teccellpremiumsite-eng/Teccell-Premium.git
   cd Teccell-Premium
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Then edit `.env` with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

## 🗄️ Supabase Configuration

The application is pre-configured with Supabase for:
- **Authentication** (Sign up, Sign in, Sign out)
- **Database** operations
- **Real-time** subscriptions

### Usage Examples:

```typescript
// Import the configured client
import { supabase } from './src/lib/supabase'

// Use the auth hook
import { useAuth } from './src/hooks/useAuth'

// In your component
const { user, signIn, signOut } = useAuth()
```

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

This project is configured for easy deployment on Vercel:
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

## 📄 License

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.