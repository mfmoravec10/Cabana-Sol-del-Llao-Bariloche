const settingsKey = 'solDelLlaoLocalSettings';
const galleryItems = [['invierno','Invierno'],['living','Living'],['comedor','Comedor'],['cocina','Cocina'],['principal','Dormitorio principal'],['segundo','Segundo dormitorio'],['bano-principal','Baño principal'],['bano-dos','Segundo baño'],['fogon','Fogón'],['entorno','Entorno']];
const form = document.querySelector('#admin-form');
const toggles = document.querySelector('#gallery-toggles');
const message = document.querySelector('#save-message');
const existing = JSON.parse(localStorage.getItem(settingsKey) || '{}');
document.querySelector('#hero-title-input').value = existing.heroTitle || '';
document.querySelector('#hero-copy-input').value = existing.heroCopy || '';
document.querySelector('#extra-caption-input').value = existing.extraGalleryCaption || '';
galleryItems.forEach(([id, label]) => { const checked = !(existing.hiddenGallery || []).includes(id); toggles.insertAdjacentHTML('beforeend', `<label><input type="checkbox" name="gallery" value="${id}" ${checked ? 'checked' : ''}> ${label}</label>`); });
function fileToDataUrl(input) { return new Promise((resolve) => { if (!input.files[0]) return resolve(null); const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.readAsDataURL(input.files[0]); }); }
form.addEventListener('submit', async (event) => { event.preventDefault(); const settings = { ...existing }; settings.heroTitle = document.querySelector('#hero-title-input').value.trim(); settings.heroCopy = document.querySelector('#hero-copy-input').value.trim(); settings.hiddenGallery = galleryItems.map(([id]) => id).filter((id) => !document.querySelector(`[name="gallery"][value="${id}"]`).checked); settings.extraGalleryCaption = document.querySelector('#extra-caption-input').value.trim(); const heroImage = await fileToDataUrl(document.querySelector('#hero-image-input')); const extraImage = await fileToDataUrl(document.querySelector('#extra-image-input')); if (heroImage) settings.heroImage = heroImage; if (extraImage) settings.extraGalleryImage = extraImage; try { localStorage.setItem(settingsKey, JSON.stringify(settings)); message.textContent = 'Listo. Abrí la página principal o actualizala para ver los cambios.'; } catch { message.textContent = 'La imagen es demasiado grande para guardarla acá. Usá una foto más liviana o pedime que la incorpore al sitio.'; } });
document.querySelector('#reset-settings').addEventListener('click', () => { localStorage.removeItem(settingsKey); location.reload(); });
