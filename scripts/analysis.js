const initAnalysisTool = () => {
  const tabButtons = Array.from(document.querySelectorAll('.tool-tab'));
  const panels = Array.from(document.querySelectorAll('.tool-panel'));

  const activatePanel = (id) => {
    tabButtons.forEach((button) => {
      const isActive = button.dataset.target === id;
      button.classList.toggle('active', isActive);
      button.setAttribute('aria-selected', String(isActive));
    });

    panels.forEach((panel) => {
      const isActive = panel.id === id;
      panel.classList.toggle('active', isActive);
      panel.toggleAttribute('hidden', !isActive);
    });
  };

  tabButtons.forEach((button) => {
    button.addEventListener('click', () => activatePanel(button.dataset.target));
  });

  const bodyForm = document.getElementById('body-form');
  const bodyResult = document.getElementById('body-result');

  if (bodyResult && bodyResult.innerHTML.trim() === '') {
    bodyResult.innerHTML = '<p class="result-placeholder">Enter your measurements to uncover your silhouette.</p>';
  }

  bodyForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(bodyForm);
    const shoulder = Number(formData.get('shoulder'));
    const bust = Number(formData.get('bust'));
    const waist = Number(formData.get('waist'));
    const hips = Number(formData.get('hips'));

    if ([shoulder, bust, waist, hips].some((value) => !value || value <= 0)) {
      bodyResult.textContent = 'Please enter all measurements to receive a recommendation.';
      return;
    }

    const percentDiff = (a, b) => Math.abs(a - b) / b;
    const waistToHip = waist / hips;
    const shoulderToHipDiff = percentDiff(shoulder, hips);
    let type = 'Rectangle';
    let summary = 'Your proportions appear balanced through the shoulders, waist, and hips.';
    let tips = 'Play with structure by belting or layering to add definition when you crave it.';

    if (shoulderToHipDiff < 0.05 && percentDiff(waist, shoulder) > 0.15 && percentDiff(waist, hips) > 0.15) {
      type = 'Hourglass';
      summary = 'Your shoulders and hips align with a distinctly defined waist.';
      tips = 'Highlight your waist with wrap silhouettes, high-rise trousers, and structured dresses.';
    } else if (hips > shoulder * 1.05 && waistToHip < 0.85) {
      type = 'Pear';
      summary = 'Your hips carry more width than your shoulders with a defined waistline.';
      tips = 'Balance proportions with shoulder details, open necklines, and A-line skirts.';
    } else if (shoulder > hips * 1.05 && bust > hips * 0.98) {
      type = 'Inverted triangle';
      summary = 'Your frame is broader through the shoulders or bust than the hips.';
      tips = 'Lean into streamlined tops and add volume with wide-leg pants or bias skirts.';
    } else if (waist > hips * 0.9 && waist > shoulder * 0.9) {
      type = 'Apple';
      summary = 'Your midsection is fuller with comparatively slimmer limbs.';
      tips = 'Create movement with draped layers, column dresses, and elongating V-necklines.';
    }

    bodyResult.innerHTML = `
      <div class="result-card">
        <h3>${type} silhouette</h3>
        <p>${summary}</p>
        <p class="result-tip">${tips}</p>
      </div>
    `;
  });

  const colourForm = document.getElementById('colour-form');
  const colourResult = document.getElementById('colour-result');

  if (colourResult && colourResult.innerHTML.trim() === '') {
    colourResult.innerHTML = '<p class="result-placeholder">Select your undertone, depth, and contrast to reveal a palette.</p>';
  }

  const paletteMatrix = {
    warm: {
      light: { low: 'Light Spring', medium: 'True Spring', high: 'Bright Spring' },
      medium: { low: 'Soft Autumn', medium: 'True Autumn', high: 'Warm Spring' },
      deep: { low: 'Soft Autumn', medium: 'Deep Autumn', high: 'Vivid Autumn' },
    },
    cool: {
      light: { low: 'Light Summer', medium: 'True Summer', high: 'Bright Winter' },
      medium: { low: 'Soft Summer', medium: 'True Summer', high: 'Cool Winter' },
      deep: { low: 'Soft Summer', medium: 'Deep Winter', high: 'Bright Winter' },
    },
    neutral: {
      light: { low: 'Light Summer', medium: 'Light Spring', high: 'Bright Spring' },
      medium: { low: 'Soft Autumn', medium: 'Soft Summer', high: 'Clear Winter' },
      deep: { low: 'Soft Autumn', medium: 'Deep Autumn', high: 'Deep Winter' },
    },
  };

  const paletteNotes = {
    'Light Spring': 'Fresh sorbet shades, light gold metals, and airy textures keep your look radiant.',
    'True Spring': 'Lean into warm brights like melon, coral, and jade with glowy neutrals.',
    'Bright Spring': 'High-energy hues such as poppy red, vivid turquoise, and crisp navy sing on you.',
    'Soft Autumn': 'Earthy olives, clay, and misted teal create a refined, grounded wardrobe.',
    'True Autumn': 'Rich spice tones, antique gold, and textured fabrics highlight your warmth.',
    'Warm Spring': 'Golden apricot, warm turquoise, and camel neutrals deliver your best contrast.',
    'Deep Autumn': 'Deep teal, espresso, and saffron yellow enhance your saturated coloring.',
    'Vivid Autumn': 'Embrace dramatic warmth with bronze, paprika, and lush forest greens.',
    'Light Summer': 'Powdery blues, seashell pinks, and silvery jewelry keep things breezy.',
    'True Summer': 'Cool mid-tones like raspberry, soft navy, and plum offer effortless polish.',
    'Bright Winter': 'High-contrast brights—fuchsia, cobalt, icy lemon—deliver striking clarity.',
    'Cool Winter': 'Opt for crisp black and white with jewel tones like emerald and royal blue.',
    'Soft Summer': 'Muted cool shades such as smoky mauve, sage, and pewter flatter softly.',
    'Deep Winter': 'Inky hues, black, and electric jewel tones mirror your dramatic contrast.',
    'Clear Winter': 'Glossy primaries and chromatic accents keep your neutral undertone luminous.',
  };

  colourForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(colourForm);
    const undertone = formData.get('undertone');
    const depth = formData.get('depth');
    const contrast = formData.get('contrast');

    if (!undertone || !depth || !contrast) {
      colourResult.textContent = 'Complete each dropdown to unlock your palette.';
      return;
    }

    const palette = paletteMatrix[undertone][depth][contrast];
    const note = paletteNotes[palette] || 'Lean into harmonious shades drawn from your natural colouring.';

    colourResult.innerHTML = `
      <div class="result-card">
        <h3>${palette}</h3>
        <p>${note}</p>
        <p class="result-tip">Save these colours to your shopping list and cross-check with our lookbooks.</p>
      </div>
    `;
  });

  const styleForm = document.getElementById('style-form');
  const styleResult = document.getElementById('style-result');

  if (styleResult && styleResult.innerHTML.trim() === '') {
    styleResult.innerHTML = '<p class="result-placeholder">Share how you dress and we’ll suggest your signature aesthetic.</p>';
  }

  const textureMap = {
    tailored: 'classic',
    denim: 'edgy',
    lace: 'romantic',
    knit: 'minimalist',
    woven: 'bohemian',
    sculptural: 'modernist',
  };

  const styleNotes = {
    classic: {
      title: 'Classic muse',
      copy: 'You favour clean lines, sharp tailoring, and polished details that never date.',
      tip: 'Build capsules around navy, ivory, camel, and add heritage prints sparingly.',
    },
    edgy: {
      title: 'Edgy trailblazer',
      copy: 'Bold contrasts, leather moments, and statement accessories fuel your looks.',
      tip: 'Play with asymmetric cuts and metallic accents to keep outfits high-impact.',
    },
    romantic: {
      title: 'Romantic dreamer',
      copy: 'Soft fabrics, drape, and delicate embellishments make you feel at home.',
      tip: 'Layer textures like lace and satin, and embrace blush, mauve, and soft florals.',
    },
    minimalist: {
      title: 'Minimalist curator',
      copy: 'Streamlined silhouettes and tonal colour stories keep your wardrobe serene.',
      tip: 'Mix matte and glossy neutrals, and invest in elevated basics with impeccable fit.',
    },
    bohemian: {
      title: 'Bohemian storyteller',
      copy: 'Artful prints, relaxed shapes, and tactile accessories are your staples.',
      tip: 'Blend earthy hues with handcrafted jewellery and breezy layers.',
    },
    modernist: {
      title: 'Modernist visionary',
      copy: 'Architectural shapes, monochrome palettes, and inventive styling speak to you.',
      tip: 'Experiment with proportion play, sculptural bags, and bold silhouettes.',
    },
  };

  styleForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(styleForm);
    const scores = {
      classic: 0,
      edgy: 0,
      romantic: 0,
      minimalist: 0,
      bohemian: 0,
      modernist: 0,
    };

    const mood = formData.get('mood');
    const weekend = formData.get('weekend');
    const textures = formData.getAll('textures');

    if (!mood || !weekend) {
      styleResult.textContent = 'Select your outfit preferences to uncover your style direction.';
      return;
    }

    scores[mood] += 2;
    scores[weekend] += 2;
    textures.forEach((texture) => {
      const mapped = textureMap[texture];
      if (mapped) {
        scores[mapped] += 1;
      }
    });

    const topStyle = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const note = styleNotes[topStyle];

    styleResult.innerHTML = `
      <div class="result-card">
        <h3>${note.title}</h3>
        <p>${note.copy}</p>
        <p class="result-tip">${note.tip}</p>
      </div>
    `;
  });
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnalysisTool);
} else {
  initAnalysisTool();
}
