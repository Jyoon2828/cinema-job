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

Components were separated into individual assets, cropped with their transparency intact, and calibrated against common face landmarks in app.js. manifest.json documents the active registration coordinates.

Proportion and costume correction (2026-10-30):
- Each left/right eye and brow is measured by its own alpha bounds, keeping spacing stable across expressions.
- All face shapes use a shared chin/neck origin and normalized height. Hair has independent registered bounds, a rear layer, and a front fringe/side-lock layer.
- Thumbnail, tablet editor, and exported card use the same paintAvatar/drawCostume composition.
- avatar-costumes-0.webp and avatar-costumes-1.webp are clean, headless costume atlases for the eight jobs in each style. They were edited from the original careers atlases with the built-in image tool, preserving clothing, hands, props, and painterly style while removing all stock heads, ears, hair, and head-worn headphones.
- The painted sheet's row gutter is used to prevent adjacent costume fragments. Each collar has a measured registration; screens render behind the head and clothing below the chin renders in front.
- The photo-mode atlases and masks are separate from avatar-mode costumes.

Costume edit prompt: Remove heads, hair, ears and facial features from the 4-by-2 film crew atlas; retain torsos, short necks, hands, costumes, professional props and positions; reconstruct shoulders hidden by hair; use a true transparent background, no labels or drawn checkerboard.
