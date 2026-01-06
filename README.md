# Student Recommendation Website

An interactive, modern Next.js website showcasing academic achievements, research projects, extracurriculars, and personal media for teachers writing recommendation letters for a competitive program.

## Features

- 🎨 Modern, interactive design with smooth animations
- 📊 Animated statistics and achievements
- 🔬 Detailed research project showcases
- 🏆 Awards and recognition gallery
- 📸 Media gallery with lightbox functionality
- 📱 Fully responsive design
- ⚡ Fast loading with Next.js optimization

## Technology Stack

- **Framework**: Next.js 14+ (App Router) with TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── Navigation.tsx      # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About me section
│   ├── AcademicAchievements.tsx
│   ├── ResearchProjects.tsx
│   ├── Extracurriculars.tsx
│   ├── Awards.tsx
│   ├── MediaGallery.tsx
│   └── RecommendationRequest.tsx
├── data/
│   ├── academic.ts         # Academic data
│   ├── research.ts         # Research projects
│   ├── extracurriculars.ts # Extracurriculars
│   ├── awards.ts           # Awards data
│   └── personal.ts         # Personal information
└── public/                 # Static assets (images, videos)
```

## Customization

### Adding Media

1. Add your images and videos to the `public/` folder
2. Update the `mediaItems` array in `components/MediaGallery.tsx` with your actual media files

### Updating Content

All content is organized in the `data/` folder:
- `academic.ts` - GPA, classes, favorite courses
- `research.ts` - Research project details
- `extracurriculars.ts` - All extracurricular activities
- `awards.ts` - Awards and recognition
- `personal.ts` - Personal info, hobbies, leadership positions

### Styling

The site uses Tailwind CSS. Customize colors and styles in:
- `tailwind.config.ts` - Theme configuration
- `app/globals.css` - Global styles

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will automatically detect Next.js and deploy

### Deploy to GitHub Pages

1. Install `gh-pages`: `npm install --save-dev gh-pages`
2. Add to `package.json`:
```json
"scripts": {
  "deploy": "next build && next export && gh-pages -d out"
}
```
3. Run `npm run deploy`

## Notes

- Update contact information in `components/RecommendationRequest.tsx`
- Add your actual email address where indicated
- Replace placeholder images/videos in the media gallery
- Customize colors and branding as needed

## License

Personal project for student application.
