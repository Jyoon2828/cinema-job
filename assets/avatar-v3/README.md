# Film-card avatar art, version 3

The built-in image generation tool was used with the original female sound professional and original male/female job atlases as style references. The brief was to match their simple warm opaque gouache, modest dark-brown eyes with white crescents, small pink nose and soft painted hair. Glossy 3D skin, photorealistic hair and oversized glassy anime eyes were excluded.

## Files and registration

Each head sheet is a 1536×1024 transparent 3-column × 2-row atlas:

1. Boy, original short hair
2. Girl, bob
3. Girl, long side-parted hair
4. Girl, tied hair
5. Girl, pigtails
6. Girl, shoulder-length hair with bangs

- `heads-open-soft.webp`: open eyes, gentle small smile
- `heads-closed-soft.webp`: smiling closed eyes, small smile
- `heads-open-wide.webp`: open eyes, open happy smile
- `heads-closed-wide.webp`: smiling closed eyes, open happy smile

The base sheet was edited three times with only the corresponding eye/mouth expression changed. Heads stay registered as full painted sprites. `app.js` uses measured eye centers and spans to keep all hairstyles aligned. Largest-alpha-component cleanup discards adjacent sheet fragments without cutting the head silhouette.

`accessories.webp` supplies front-only eyeglass frames, the blue cap and hairpins. The glasses have transparent lenses, no temples and no arms. `hat-bucket-v2.webp` supplies a separately fitted beige bucket hat, without a visible inner cavity. The bucket keeps its natural aspect ratio and has its own width and vertical registration; the cap retains its own fit. Hair crowns are occluded beneath both hats. Hats follow the registered head center in all eight costumes. The lighting fixture renders behind the head as a whole, preserving a consistent overlap with hair and hats.

The original male job atlas was separately edited to use the same eye design and saved as `../careers-male-v3.webp`. The female atlas is retained. The existing transparent costume atlases are retained; primary garment hue changes preserve image alpha, paint shading, skin and professional equipment.

## Prompt summary

- Base: six complete front-facing heads, identical face/eye style and proportions, six specified hairstyles, no torso or accessories, true transparent background, match the original film-card reference.
- Expression edits: change only eyes to smiling arcs and/or mouth to a small open happy smile; preserve hairstyle, face, pose, scale, layout and texture.
- Accessories: six painted front-view dress-up accessories, glasses consisting of front rims and bridge only, no temples or tinted lenses, same warm gouache style, transparent background.
- Male job atlas: replace only the eight male characters’ eyes with the female reference eye style; retain all costumes, props, poses, layout and background.

- Bucket fit revision: built-in image generation, edit target/style references `accessories.webp` and `heads-open-soft.webp`; one isolated cream/beige bucket hat worn on an invisible child, straight front view, short crown, gently sloping fabric brim, no visible oval opening/inside cavity/underside, no head or hair, warm gouache texture, transparent background. Output converted losslessly to `hat-bucket-v2.webp`.
