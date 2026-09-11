(() => {
  const storageKey = 'solDelLlaoEditor';
  let settings;
  try { settings = JSON.parse(localStorage.getItem(storageKey) || 'null'); } catch (_) { return; }
  if (!settings) return;
  const title = document.querySelector('.hero-content h1');
  const description = document.querySelector('.hero-content > p:not(.eyebrow)');
  const hero = document.querySelector('.hero');
  if (title && settings.title) { title.textContent = settings.title; title.style.whiteSpace = 'pre-line'; }
  if (description && settings.description) description.textContent = settings.description;
  if (hero && settings.heroImage) hero.style.backgroundImage = `linear-gradient(90deg, rgba(9, 18, 15, .72), rgba(9, 18, 15, .2)), url("${settings.heroImage}")`;
  const gallery = document.querySelector('.gallery-grid');
  if (!gallery || !Array.isArray(settings.galleryPhotos)) return;
  settings.galleryPhotos.forEach((photo, index) => {
    if (!photo || !photo.src) return;
    const figure = document.createElement('figure'); figure.className = 'admin-gallery-photo';
    const image = document.createElement('img'); image.src = photo.src; image.alt = photo.caption || `Foto agregada ${index + 1}`; image.loading = 'lazy';
    const caption = document.createElement('figcaption'); caption.textContent = photo.caption || 'Foto de la cabaña';
    figure.append(image, caption); gallery.append(figure);
  });
})();
