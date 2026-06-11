# Image slots - where to drop the founder's photos

Every slot below shows a labelled placeholder on the site until a real file is added.
**Drop the file at the exact path and it appears automatically** - no code change, no redeploy
needed beyond the normal git push. Use JPG or PNG. Keep names lowercase, exactly as shown.

All paths are under `public/`.

## Homepage hero carousel (5 portrait photos, ~1200x1500)
- `public/images/hero/1.jpg` - Sir teaching in class
- `public/images/hero/2.jpg` - Students in classroom
- `public/images/hero/3.jpg` - Sir explaining on board
- `public/images/hero/4.jpg` - Students solving problems
- `public/images/hero/5.jpg` - Test or practice session

## About page (portrait + landscape)
- `public/images/about/portrait.jpg` - Portrait of Sir (~1200x1500)
- `public/images/about/teaching.jpg` - Sir teaching / with students (~1600x900)

## Teaching method page
- `public/images/method.jpg` - Sir explaining on the board (~1600x900)

## Courses page
- `public/images/courses/main.jpg` - Classroom / Sir teaching (landscape, ~1600x900)

## Results page (4 posters, portrait ~1080x1350)
- `public/images/results/1.jpg`
- `public/images/results/2.jpg`
- `public/images/results/3.jpg`
- `public/images/results/4.jpg`

## Contact page (optional)
- `public/images/contact.jpg` - Academy / entrance photo (~1600x900)

## Logo + app icon (handled elsewhere, but for reference)
- `public/brand/logo.png` - website logo (~1000x300, transparent PNG). The navbar shows it automatically when present.
- `public/icons/icon.svg` - app/PWA icon (already a placeholder teal "f(x)"; replace with a real 512x512 PNG/SVG when ready).

After adding files: `git add -A && git commit && git push` so Vercel rebuilds with the images.
