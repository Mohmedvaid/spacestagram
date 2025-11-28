# Spacestagram

A modern web application to browse and explore stunning images from NASA's image library.

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
spacestagram/
├── app/              # Next.js app directory
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── lib/              # Utility functions and API
│   ├── api.ts        # NASA API functions
│   ├── constants.ts  # App constants
│   └── utils.ts      # Helper utilities
├── components/       # React components (to be created)
└── public/           # Static assets
```

## API

This project uses the [NASA Image and Video Library API](https://api.nasa.gov/).

See `API_DOCUMENTATION.md` for detailed API information.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

This project automatically deploys to GitHub Pages at `https://mohmedvaid.github.io/spacestagram/` when changes are pushed to the `main` branch.

See `DEPLOYMENT.md` for detailed deployment information.

## License

MIT
