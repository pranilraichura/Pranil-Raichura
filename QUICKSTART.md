# Quick Start Guide

## First Time Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Next Steps

### 1. Add Your Media Files
- Add images and videos to the `public/` folder
- For the `/gallery` page, run `scripts/prepare-gallery-images.sh <source-folder>` and add the resulting entries to `data/gallery.ts`

### 2. Update Contact Information
- Edit `components/RecommendationRequest.tsx`
- Replace `[Your Email]` with your actual email address

### 3. Customize Content
All content is in the `data/` folder - edit these files to update:
- `academic.ts` - GPA, classes
- `research.ts` - Research projects
- `extracurriculars.ts` - Activities
- `awards.ts` - Awards
- `personal.ts` - Personal info

### 4. Customize Design
- Edit `tailwind.config.ts` for colors and theme
- Edit `app/globals.css` for global styles

### 5. Deploy
- Push to GitHub
- Deploy to Vercel (recommended) or GitHub Pages
- See README.md for detailed deployment instructions

## Tips

- The site is fully responsive - test on mobile, tablet, and desktop
- All animations use Framer Motion - smooth and performant
- Images are optimized automatically by Next.js
- The build process creates an optimized production version

## Troubleshooting

**Build errors?**
- Run `npm run build` to check for errors
- Make sure all TypeScript types are correct
- Check ESLint errors with `npm run lint`

**Styles not updating?**
- Clear `.next` folder: `rm -rf .next`
- Restart dev server

**Dependencies issues?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

