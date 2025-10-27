const styleSpotlights = {
  Classic: {
    title: 'Classic capsule formula',
    tagline: 'Boardroom to brunch',
    description:
      'Structured tailoring, soft silk layers, and a hint of shine keep this capsule endlessly versatile.',
    items: ['Tailored blazer', 'Silk blouse', 'Cigarette trousers', 'Block-heel pumps'],
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=900&q=80',
    alt: 'Classic neutral outfit styled on a rack',
    href: 'lookbooks.html#classic',
    cta: 'Open the classic lookbook'
  },
  Edgy: {
    title: 'Edgy capsule formula',
    tagline: 'After-dark attitude',
    description:
      'High-shine leather, graphic layers, and hardware accents add instant drama to everyday basics.',
    items: ['Moto jacket', 'Mesh layering top', 'Coated denim', 'Platform boots'],
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80',
    alt: 'Edgy capsule with leather jacket and bold accessories',
    href: 'lookbooks.html#edgy',
    cta: 'See the edgy lookbook'
  },
  Romantic: {
    title: 'Romantic capsule formula',
    tagline: 'Soft-focus glamour',
    description:
      'Floaty fabrics, rose tones, and delicate embellishments create dreamy outfits for date night and beyond.',
    items: ['Wrap midi dress', 'Lace blouse', 'Soft cardigan', 'Mary Jane flats'],
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80',
    alt: 'Romantic pastel outfit hanging on a wardrobe rail',
    href: 'lookbooks.html#romantic',
    cta: 'See the romantic lookbook'
  },
  Minimalist: {
    title: 'Minimalist capsule formula',
    tagline: 'Luxury in balance',
    description:
      'Clean silhouettes, sculptural accessories, and a restrained palette create elevated ease.',
    items: ['Relaxed blazer', 'Column dress', 'Wide-leg trousers', 'Sleek ankle boots'],
    image: 'https://images.unsplash.com/photo-1520420097861-8a5d61b3a99a?auto=format&fit=crop&w=900&q=80',
    alt: 'Minimalist capsule pieces in neutral colours',
    href: 'lookbooks.html#minimalist',
    cta: 'Browse the minimalist lookbook'
  }
};

const spotlightTabs = document.querySelectorAll('[data-style-tab]');
const spotlightImage = document.querySelector('[data-style-image]');
const spotlightTitle = document.querySelector('[data-style-title]');
const spotlightTagline = document.querySelector('[data-style-tagline]');
const spotlightDescription = document.querySelector('[data-style-description]');
const spotlightList = document.querySelector('[data-style-list]');
const spotlightLink = document.querySelector('[data-style-link]');
const spotlightDisplay = document.querySelector('.spotlight-display');

function updateSpotlight(styleKey) {
  const data = styleSpotlights[styleKey];
  if (
    !data ||
    !spotlightImage ||
    !spotlightTitle ||
    !spotlightDescription ||
    !spotlightList ||
    !spotlightLink ||
    !spotlightTagline
  ) {
    return;
  }

  if (spotlightDisplay) {
    spotlightDisplay.classList.remove('animate');
    // Trigger reflow for animation restart
    void spotlightDisplay.offsetWidth;
  }

  spotlightImage.src = data.image;
  spotlightImage.alt = data.alt;
  spotlightTitle.textContent = data.title;
  spotlightTagline.textContent = data.tagline;
  spotlightDescription.textContent = data.description;
  spotlightList.innerHTML = data.items.map((item) => `<li>${item}</li>`).join('');
  spotlightLink.href = data.href;
  spotlightLink.textContent = data.cta;

  if (spotlightDisplay) {
    spotlightDisplay.classList.add('animate');
  }
}

if (spotlightTabs.length) {
  spotlightTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      if (tab.classList.contains('active')) return;

      spotlightTabs.forEach((button) => {
        button.classList.remove('active');
        button.setAttribute('aria-pressed', 'false');
      });

      tab.classList.add('active');
      tab.setAttribute('aria-pressed', 'true');
      updateSpotlight(tab.dataset.styleTab);
    });
  });
}

const carouselTrack = document.querySelector('[data-carousel-track]');
const carouselCards = carouselTrack ? Array.from(carouselTrack.querySelectorAll('.carousel-card')) : [];
const prevControl = document.querySelector('[data-carousel-control="prev"]');
const nextControl = document.querySelector('[data-carousel-control="next"]');
let carouselIndex = 0;
let carouselTimer;

function setActiveCard(newIndex) {
  if (!carouselCards.length) return;
  carouselIndex = (newIndex + carouselCards.length) % carouselCards.length;
  const targetCard = carouselCards[carouselIndex];

  carouselCards.forEach((card, idx) => {
    card.classList.toggle('is-active', idx === carouselIndex);
    card.setAttribute('tabindex', idx === carouselIndex ? '0' : '-1');
  });

  if (carouselTrack && targetCard) {
    const offset = targetCard.offsetLeft - carouselTrack.offsetLeft;
    carouselTrack.scrollTo({ left: offset, behavior: 'smooth' });
  }
}

function queueCarousel() {
  if (!carouselCards.length) return;
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    setActiveCard(carouselIndex + 1);
  }, 6000);
}

if (carouselCards.length) {
  setActiveCard(0);
  queueCarousel();

  const handleNav = (direction) => {
    setActiveCard(carouselIndex + direction);
    queueCarousel();
  };

  if (prevControl) {
    prevControl.addEventListener('click', () => handleNav(-1));
  }

  if (nextControl) {
    nextControl.addEventListener('click', () => handleNav(1));
  }

  const pauseCarousel = () => clearInterval(carouselTimer);

  carouselTrack?.addEventListener('mouseover', pauseCarousel);
  carouselTrack?.addEventListener('mouseleave', queueCarousel);
  carouselTrack?.addEventListener('focusin', pauseCarousel);
  carouselTrack?.addEventListener('focusout', queueCarousel);
}

// Set initial spotlight state if tabs exist
if (spotlightTabs.length) {
  const activeTab = document.querySelector('.spotlight-tab.active');
  if (activeTab) {
    updateSpotlight(activeTab.dataset.styleTab);
  }
}
