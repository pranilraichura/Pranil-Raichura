# Image Guide - How to Add Images to Your Website

## Quick Start
1. **Add your images to the `/public` folder**
2. **Update the image paths in the components** (see below)
3. **That's it!** Next.js will automatically serve files from `/public`

## Image Locations

### 1. Hero Section - Profile Picture
**File:** `components/Hero.tsx` (around line 95)
- Replace the placeholder div with an `<Image>` component
- Recommended size: 512x512px or larger (square)
- Path example: `/profile-picture.jpg`

### 2. About Section
**File:** `components/About.tsx`
- **Service Image** (line ~32): `/images/service.jpg`
- **Technology Image** (line ~50): `/images/technology.jpg`

### 3. Academic Achievements
**File:** `components/AcademicAchievements.tsx` (line ~149)
- One image per favorite course
- Update in the `favoriteCourses` map function
- Paths: `/images/ap-calculus.jpg`, `/images/psychology.jpg`, `/images/statistics.jpg`

### 4. Research Projects
**File:** `components/ResearchProjects.tsx` (lines ~40-47)
- **Research Program Image**: `/images/research-program.jpg`
- **AI Game Development Image**: `/images/ai-game-dev.jpg`
- **ML Structural Engineering Image**: `/images/ml-engineering.jpg`

### 5. Extracurriculars
**File:** `components/Extracurriculars.tsx` (line ~73)
- Images are dynamically generated from the `extracurriculars` data
- Add image paths to each item in `data/extracurriculars.ts`

### 6. Awards
**File:** `components/Awards.tsx` (line ~81)
- Images are dynamically generated from the `awards` data
- Add image paths to each item in `data/awards.ts`

### 7. Media Gallery
**File:** `components/MediaGallery.tsx` (lines ~10-43)
- Update the `mediaItems` array with your actual image/video paths
- Supports both images and videos

## Recommended Folder Structure
```
public/
├── profile-picture.jpg
├── images/
│   ├── service.jpg
│   ├── technology.jpg
│   ├── research-program.jpg
│   ├── ai-game-dev.jpg
│   ├── ml-engineering.jpg
│   ├── ap-calculus.jpg
│   ├── psychology.jpg
│   ├── statistics.jpg
│   └── ...
├── media/
│   ├── volleyball-tournament.jpg
│   ├── research-presentation.jpg
│   ├── tech4silvers-event.jpg
│   └── personal-video.mp4
└── ...
```

## Image Format Recommendations
- **Format**: JPG or PNG (WebP for best performance)
- **Profile Picture**: Square, 512x512px minimum
- **Section Images**: 1200x800px or similar aspect ratio
- **Gallery Images**: 1920x1080px or higher for best quality
- **Optimize**: Use tools like TinyPNG or ImageOptim before uploading

## Next Steps
1. Add your images to `/public` folder
2. Update the paths in the components (see comments in code)
3. Test locally to make sure images load correctly

