# Film-card avatar art, version 3

The built-in image generation tool was used with the original female sound professional and original male/female job atlases as style references. The brief was to match their simple warm opaque gouache, modest dark-brown eyes with white crescents, small pink nose and soft painted hair. Glossy 3D skin, photorealistic hair and oversized glassy anime eyes were excluded.

## Files and registration

The four original head sheets are 1536×1024 transparent 3-column × 2-row atlases:

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

## Additional boy hairstyles

`heads-male-extra.webp` is a 1774×887 transparent 4-column × 2-row atlas. Row 1 is a tidy short side part; row 2 is short downward bangs. Columns are open-soft, closed-soft, open-wide, closed-wide. Both are full painted head sprites, using the original boy as the face/eye/style reference. They are registered separately from the original six heads, preserving a target eye separation of 104px. The original short haircut stays available. Male and female selections use separate saved fields. Hair-choice thumbnails show the haircut without a hat so all three choices remain visible.

Generation prompt summary: change only the original boy's hair to a neat short side part and short bangs; keep his peach face, modest dark-brown eyes/white crescents, eyebrows, pink nose, ears, neck and opaque warm gouache brushwork. Eight front-facing complete heads in four columns and two rows, identical face scale and neck alignment, four eye/mouth combinations per hairstyle, generous transparent gutters, no torso, accessories, text or background. Generated with the built-in image tool and converted losslessly to WebP.

Garment recoloring uses a fixed five-color palette and per-costume lightness normalization. It preserves the original painted shading, protects the registered skin and professional equipment, and uses a continuous mapping across the camera operator's shirt and overalls. The original costume atlases are unchanged.
