# Pakisthani Dress - Landing Page

A modern and responsive landing page built with Next.js 14, TypeScript, and Tailwind CSS for showcasing Pakistani traditional dresses.

## Features

- ⚡ Next.js 14 with App Router
- 💎 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 📱 Fully responsive design
- ✨ Modern and elegant UI
- 🚀 Optimized performance

## Getting Started

### Prerequisites

Make sure you have Node.js installed (version 18 or higher recommended).

### Installation

1. Install dependencies:

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
pakisthani-dress/
├── app/
│   ├── layout.tsx       # Root layout component
│   ├── page.tsx         # Home page
│   └── globals.css      # Global styles
├── components/
│   ├── Hero.tsx         # Hero section
│   ├── Features.tsx     # Features section
│   ├── Collection.tsx   # Collections showcase
│   └── Footer.tsx       # Footer component
├── public/              # Static files
├── package.json         # Dependencies
├── tsconfig.json        # TypeScript config
├── tailwind.config.js   # Tailwind CSS config
└── next.config.js       # Next.js config
```

## Customization

### Colors

Edit the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: '#8B4513',
  secondary: '#D2691E',
  accent: '#FFD700',
}
```

### Content

- Update hero text in `components/Hero.tsx`
- Modify features in `components/Features.tsx`
- Add/remove collections in `components/Collection.tsx`
- Update footer info in `components/Footer.tsx`

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **React 18** - UI library

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For any questions or issues, please contact: info@pakisthanidress.com
