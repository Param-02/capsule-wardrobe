const form = document.getElementById('capsule-form');
const results = document.getElementById('results');

const stylePresets = {
  Classic: {
    essentials: ['Tailored blazer', 'Silk blouse', 'Cigarette trousers', 'Trench coat', 'Cashmere sweater', 'Leather belt'],
    accessories: ['Structured tote', 'Pearl earrings', 'Leather watch'],
    footwear: ['Pointed flats', 'Block-heel pumps', 'Polished loafers'],
    tips: [
      'Balance fitted and fluid silhouettes to accentuate your proportions.',
      'Layer neutral tones and add a single contrasting accessory for focus.',
      'Steam garments regularly for a fresh, refined finish.'
    ],
    trending: ['Pleated midi skirt', 'Sculptural gold cuff', 'Two-tone slingbacks']
  },
  Edgy: {
    essentials: ['Cropped moto jacket', 'Graphic tee', 'Coated skinny jeans', 'Mesh layering top', 'Oversized blazer', 'Wide-leg cargo pants'],
    accessories: ['Chain-link necklace', 'Statement belt', 'Mini crossbody bag'],
    footwear: ['Platform boots', 'Chunky sneakers', 'Cutout heels'],
    tips: [
      'Mix matte leather with high-shine hardware for instant attitude.',
      'Play with asymmetry by half-tucking tops or adding diagonal zippers.',
      'Keep makeup minimal and focus on bold liner or lip for cohesion.'
    ],
    trending: ['Silver metallic trousers', 'Moto-inspired corset top', 'Angular sunglasses']
  },
  Romantic: {
    essentials: ['Wrap midi dress', 'Lace blouse', 'Soft cardigan', 'High-waist wide-leg pants', 'Pleated camisole', 'Floral skirt'],
    accessories: ['Ribbon hair tie', 'Pearlescent clip', 'Mini satchel'],
    footwear: ['Ankle-tie heels', 'Mary Jane flats', 'Kitten-heel mules'],
    tips: [
      'Layer translucent fabrics like chiffon over satin for dimension.',
      'Incorporate blush, mauve, and warm ivory to echo your palette.',
      'Define the waist with belts or tie details to keep silhouettes shapely.'
    ],
    trending: ['Rosette choker', 'Corset-inspired blazer', 'Organza overlay dress']
  },
  Minimalist: {
    essentials: ['Relaxed blazer', 'Column dress', 'Wide-leg trousers', 'Boxy tee', 'Fine-knit sweater', 'Structured coat'],
    accessories: ['Sculptural tote', 'Geometric cuff', 'Minimal stud earrings'],
    footwear: ['Sleek ankle boots', 'Minimalist sneakers', 'Slide sandals'],
    tips: [
      'Stick to a restrained palette of three core colors for maximum versatility.',
      'Choose natural fibers with subtle texture to add quiet luxury.',
      'Use clean lines and precise tailoring to create effortless drape.'
    ],
    trending: ['Utility waistcoat', 'Chocolate brown leather skirt', 'Column maxi dress']
  },
  Bohemian: {
    essentials: ['Printed maxi dress', 'Fringed jacket', 'Wide-leg denim', 'Crochet tank', 'Kimono wrap', 'Relaxed jumpsuit'],
    accessories: ['Layered pendant necklaces', 'Braided belt', 'Oversized hat'],
    footwear: ['Suede ankle boots', 'Embellished sandals', 'Stacked-heel clogs'],
    tips: [
      'Blend earthy hues with jewel tones for a collected-over-time feel.',
      'Mix handcrafted textures like crochet, macramé, and embroidered cotton.',
      'Stack bracelets and rings in varying metals to emphasize the free-spirited vibe.'
    ],
    trending: ['Patchwork denim duster', 'Beaded bucket bag', 'Velvet flare pants']
  },
  Modernist: {
    essentials: ['Architectural coat', 'Mock-neck top', 'Pleated culottes', 'Structured jumpsuit', 'Asymmetric blouse', 'Tailored shorts'],
    accessories: ['Mod earrings', 'Sleek backpack', 'Minimal belt bag'],
    footwear: ['Square-toe boots', 'Hybrid sneakers', 'Low-profile mules'],
    tips: [
      'Seek clean shapes with unexpected cut-outs or sculptural draping.',
      'Color-block with saturated brights against grounded neutrals.',
      'Lean into technical fabrics that move with you all day.'
    ],
    trending: ['Liquid metal skirt', 'Cut-out knit dress', 'Color-blocked trench']
  }
};

const paletteNotes = {
  'Bright Spring': 'Lean into clear, warm hues like coral, golden yellow, and teal. Add reflective metals to mirror your natural brightness.',
  'True Spring': 'Fresh warms such as buttercream, apple green, and turquoise will light up your complexion.',
  'Light Spring': 'Keep things airy with pastel peach, powder blue, and light camel layered together.',
  'Bright Winter': 'Vivid contrast is key: think fuchsia, cobalt, and crisp white with mirror-shine accessories.',
  'True Winter': 'Icy jewel tones like ruby, emerald, and sapphire paired with inky black feel powerful.',
  'Dark Winter': 'Deep, cool tones such as blackberry, charcoal, and midnight teal create dramatic elegance.',
  'Light Summer': 'Whisper-soft shades like lavender, misty grey, and soft navy make your wardrobe feel weightless.',
  'True Summer': 'Cool mids like raspberry, denim blue, and plum keep outfits serene and refined.',
  'Soft Summer': 'Dusty rose, sage, and heathered neutrals offer gentle sophistication.',
  'Soft Autumn': 'Muted warmth &mdash; think cinnamon, dusty teal, and mushroom &mdash; harmonizes beautifully.',
  'True Autumn': 'Rich spices like terracotta, olive, and mustard bring out your glow.',
  'Dark Autumn': 'Deep earthy hues including espresso, aubergine, and forest green add luxe depth.'
};

const bodyHighlights = {
  Hourglass: 'Define the waist with wrap silhouettes, high-rise bottoms, and belted outerwear.',
  Rectangle: 'Create curves using layered textures, peplums, and cinched details around the midline.',
  Pear: 'Balance your frame with structured shoulders, statement necklines, and elongated outer layers.',
  Apple: 'Elongate your torso with V-necks, fluid fabrics, and column dressing anchored by strong footwear.',
  'Inverted Triangle': 'Soften the shoulders with A-line skirts, wide-leg pants, and darker tops paired with lighter bottoms.'
};

function buildList(items) {
  return items.map((item) => `<li>${item}</li>`).join('');
}

function buildTips(items) {
  return items.map((tip) => `<li><span>•</span>${tip}</li>`).join('');
}

function renderResults(values) {
  const preset = stylePresets[values.style];
  const intro = `<header class="output-header">
    <h2>${values.style} capsule blueprint</h2>
    <p>${values.gender} &middot; ${values.body} body balance &middot; ${values.palette}</p>
  </header>`;

  const sections = `
    <section class="output-section">
      <h3>Core wardrobe essentials</h3>
      <ul class="pill-list">${buildList(preset.essentials)}</ul>
    </section>
    <section class="output-section">
      <h3>Accessories to rotate</h3>
      <ul class="pill-list small">${buildList(preset.accessories)}</ul>
    </section>
    <section class="output-section">
      <h3>Footwear focus</h3>
      <ul class="pill-list small">${buildList(preset.footwear)}</ul>
    </section>
    <section class="output-section">
      <h3>Styling prompts</h3>
      <ul class="tip-list">${buildTips(preset.tips)}</ul>
    </section>
    <section class="output-section highlight">
      <h3>Palette direction</h3>
      <p>${paletteNotes[values.palette]}</p>
    </section>
    <section class="output-section highlight">
      <h3>Body balance note</h3>
      <p>${bodyHighlights[values.body]}</p>
    </section>
    <section class="output-section">
      <h3>Trending pieces to shop</h3>
      <div class="trending-grid">
        ${preset.trending
          .map(
            (item) => `
              <article class="trend-card">
                <div class="trend-meta">
                  <span class="trend-tag">Now</span>
                  <h4>${item}</h4>
                </div>
                <button type="button" class="btn ghost sm">Add to wish list</button>
              </article>
            `
          )
          .join('')}
      </div>
    </section>
  `;

  results.innerHTML = `<div class="output-panel">${intro}${sections}</div>`;
  results.scrollIntoView({ behavior: 'smooth' });
}

if (form && results) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const values = Object.fromEntries(data.entries());
    renderResults(values);
  });
}
