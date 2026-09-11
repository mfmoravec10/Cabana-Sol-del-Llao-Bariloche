const settingsKey = 'solDelLlaoLocalSettings';

function readSettings() {
  try { return JSON.parse(localStorage.getItem(settingsKey)) || {}; }
  catch { return {}; }
}

const siteSettings = readSettings();
document.querySelectorAll('[data-setting]').forEach((element) => {
  const value = siteSettings[element.dataset.setting];
  if (value) element.textContent = value;
});

if (siteSettings.heroImage) {
  const heroImage = document.querySelector('.hero-image');
  if (heroImage) heroImage.src = siteSettings.heroImage;
}

document.querySelectorAll('[data-gallery-id]').forEach((item) => {
  if (siteSettings.hiddenGallery?.includes(item.dataset.galleryId)) item.hidden = true;
});

if (siteSettings.extraGalleryImage) {
  const gallery = document.querySelector('#gallery-grid');
  if (gallery) {
    gallery.insertAdjacentHTML('beforeend', `<figure><img src="${siteSettings.extraGalleryImage}" alt="Nueva imagen de la cabaña" /><figcaption>${siteSettings.extraGalleryCaption || 'Nuevo espacio'}</figcaption></figure>`);
  }
}
