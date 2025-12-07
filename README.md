# 🌤️ Weather App

SPA for viewing weather in selected cities using OpenWeatherMap API.

## 🚀 Quick Start

### Installation

```bash
npm install
```

### Setup

1. Create `.env.local` file in the project root:

```env
NEXT_PUBLIC_OPENWEATHERMAP_API_KEY=your_api_key
```

2. Get your API key from [openweathermap.org](https://openweathermap.org/api)

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📦 Technologies

- **Next.js 16** - React framework
- **Zustand** - State management
- **SCSS** - Styling
- **TypeScript** - Type safety
- **Jest + Testing Library** - Testing
- **OpenWeatherMap API** - Weather data

## ✨ Features

- ✅ Search and add cities
- ✅ City cards with current weather
- ✅ Detailed weather page
- ✅ Hourly forecast chart (24 hours)
- ✅ Weather refresh
- ✅ Cities saved in LocalStorage
- ✅ Mobile responsive

## 🧪 Testing

```bash
npm test
```

## 📱 Deployment

Detailed deployment guide for Vercel: [DEPLOY.md](./DEPLOY.md)

**Quick steps:**
1. Connect repository to Vercel
2. Add `NEXT_PUBLIC_OPENWEATHERMAP_API_KEY` environment variable
3. Deploy!

## 📄 Project Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components
├── lib/              # API functions
├── store/            # Zustand store
├── types/            # TypeScript types
└── __tests__/        # Tests
```

## 📝 Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Lint code

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [OpenWeatherMap API](https://openweathermap.org/api)
- [Vercel Platform](https://vercel.com)
