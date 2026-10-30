# Painted avatar components

29 independent transparent WebP images in assets/avatar/:
- Hair: 6
- Face bases: 3
- Eye pairs, eyebrow pairs, noses, mouths, accessories: 4 each

Created with the built-in image generation tool; optimized for browser loading while preserving alpha transparency. Faces and hair reuse their painted textures when recolored. No geometric placeholder facial artwork is used.

Prompt set:
1. Hair: six isolated transparent wigs in a 3×2 grid (tousled short, bob, long, curly, ponytail, pigtails), warm shaded chestnut gouache/storybook style matching the film-crew reference, empty transparent face openings, no skin or facial features.
2. Faces: three blank front-facing round/oval/chubby face bases with ears and neck, rosy peach softly painted skin, no hair, eyes, brows, nose or mouth, transparent background.
3. Features: a 4×5 grid of independent eye pairs, eyebrow pairs, noses, mouths and glasses/hair clips; cute warm shaded watercolor/gouache style matching the film-crew reference, transparent gaps and no face or body.

Components were separated into individual assets, cropped with their transparency intact, and aligned in app.js. manifest.json records source anchor alignment for hair. The avatar editor and PNG card export use the same image layers.
