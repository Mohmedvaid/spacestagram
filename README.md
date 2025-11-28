# Spacestagram

A modern, responsive web application to browse and explore stunning images from NASA's image library. Built with Next.js, TypeScript, and Tailwind CSS.

## ✨ Features

- 🔍 **Search Functionality** - Search NASA's vast image library with instant results
- 📅 **Date Filtering** - Filter images by date range using intuitive date pickers
- 🎨 **Dark Mode** - Beautiful dark theme with smooth transitions
- 📱 **Responsive Design** - Optimized for all devices (mobile, tablet, desktop)
- 🖼️ **Image Gallery** - Responsive grid layout with hover effects
- 🔄 **Infinite Scroll** - Load more images with pagination
- 🎯 **Sorting Options** - Sort by latest or popular images
- ⌨️ **Keyboard Navigation** - Full keyboard support (ESC to close modals)
- ⚡ **Performance Optimized** - Request cancellation, memoization, and lazy loading

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Fonts**: Geist Sans, Geist Mono, Oswald

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
```bash
git clone https://github.com/mohmedvaid/spacestagram.git
cd spacestagram
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
spacestagram/
├── app/                    # Next.js app directory
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Main home page
│   └── globals.css         # Global styles and Tailwind config
├── components/             # React components
│   ├── Banner.tsx          # Search banner with popular tags
│   ├── ContentHeader.tsx   # Image count and sorting
│   ├── Filters.tsx         # Date range filters
│   ├── Header.tsx          # App header with logo
│   ├── ImageCard.tsx       # Individual image card
│   ├── ImageGrid.tsx       # Responsive image grid
│   ├── ImageModal.tsx      # Full-screen image modal
│   ├── LoadMore.tsx        # Load more button
│   └── ThemeToggle.tsx     # Dark mode toggle
├── lib/                    # Utility functions and API
│   ├── api.ts             # NASA API integration
│   ├── constants.ts       # App constants
│   ├── theme-provider.tsx  # Theme context provider
│   └── utils.ts           # Helper utilities
└── public/                 # Static assets
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production (static export)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality

## 🌐 API

This project uses the [NASA Image and Video Library API](https://api.nasa.gov/).

- **Base URL**: `https://images-api.nasa.gov/search`
- **Media Type**: Images only
- **Authentication**: Not required (public API)

See `API_DOCUMENTATION.md` for detailed API information.

## 🎨 Features in Detail

### Search & Filter
- Real-time search with popular tag suggestions
- Date range filtering with date pickers
- Year validation (1900 to current year)

### Image Display
- Responsive grid layout (2-5 columns based on screen size)
- Image lazy loading with loading states
- Hover effects and smooth transitions
- Click to view full-size in modal

### Dark Mode
- System preference detection
- Persistent theme preference (localStorage)
- Smooth transitions between themes
- All components fully support dark mode

### Performance
- Request cancellation on new searches
- Memoized sorting and filtering
- Optimized re-renders with React hooks
- Image optimization with Next.js Image component

## 🚢 Deployment

This project automatically deploys to GitHub Pages at `https://mohmedvaid.github.io/spacestagram/` when changes are pushed to the `main` branch.

### Automatic Deployment
- Pushes to `main` branch trigger GitHub Actions
- Builds static site with correct basePath
- Deploys to `gh-pages` branch automatically

### Manual Setup
1. Go to repository Settings → Pages
2. Set source to "Deploy from a branch"
3. Select `gh-pages` branch
4. Set folder to `/ (root)`

See `DEPLOYMENT.md` for detailed deployment information.

## 🧪 Code Quality

- **TypeScript** - Full type safety
- **ESLint** - Code linting and best practices
- **JSDoc** - Comprehensive function documentation
- **Error Handling** - Graceful error handling throughout
- **Accessibility** - ARIA labels and keyboard navigation

## 📝 License

MIT

## 🙏 Acknowledgments

- [NASA](https://www.nasa.gov/) for providing the amazing image library API
- [Next.js](https://nextjs.org/) for the excellent framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
