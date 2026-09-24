/* =========================================================================
   Site logic — reads all content from SITE_CONFIG (config.js).
   You shouldn't need to edit this file to update your content.
   ========================================================================= */

const app = document.getElementById('app');
const loadbar = document.getElementById('loadbar');
const navBrand = document.getElementById('navBrand');
const navLinks = document.querySelectorAll('.nav-link');

function playLoadbar() {
  loadbar.classList.remove('active');
  // force reflow so the animation restarts each time
  void loadbar.offsetWidth;
  loadbar.classList.add('active');
  setTimeout(() => loadbar.classList.remove('active'), 900);
}

function videoBlock(item, opts = {}) {
  if (item.videoUrl && item.videoUrl.trim() !== '') {
    const poster = item.posterUrl ? ` poster="${item.posterUrl}"` : '';
    return `<div class="video-frame">
      <video src="${item.videoUrl}"${poster} controls ${opts.autoplay ? 'muted autoplay loop playsinline' : ''}></video>
    </div>`;
  }
  return `<div class="video-frame">
    <div class="video-placeholder">Video not linked yet.<br>Add a videoUrl in config.js for "${item.title}".</div>
  </div>`;
}

function renderHome() {
  const f = SITE_CONFIG.featured;
  return `
    <section class="page">
      <h1 class="home-name">${SITE_CONFIG.name}</h1>
      <div class="home-role">${SITE_CONFIG.role}</div>
      <p class="home-tagline">${SITE_CONFIG.tagline}</p>

      <div class="featured">
        <div class="featured-eyebrow">Featured Film</div>
        <h2 class="featured-title">${f.title}</h2>
        <p class="featured-desc">${f.description}</p>
        ${videoBlock(f)}
      </div>
    </section>
  `;
}

function renderFilms() {
  const cards = SITE_CONFIG.films.map((film, i) => `
    <div class="film-card" data-index="${i}">
      <div class="film-card-media">${film.posterUrl ? `<img src="${film.posterUrl}" style="width:100%;height:100%;object-fit:cover;" alt="${film.title}">` : 'No poster set'}</div>
      <div class="film-card-body">
        <div class="film-card-title">${film.title}</div>
        <div class="film-card-year">${film.year}</div>
      </div>
    </div>
  `).join('');

  return `
    <section class="page">
      <h1 class="section-title">Films</h1>
      <div class="film-grid">${cards}</div>
    </section>
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal-box">
        <button class="modal-close" id="modalClose">Close ✕</button>
        <div id="modalVideoWrap"></div>
        <h3 class="modal-title" id="modalTitle"></h3>
        <p class="modal-desc" id="modalDesc"></p>
      </div>
    </div>
  `;
}

function renderAbout() {
  const tags = SITE_CONFIG.skills.map(s => `<div class="skill-tag">${s}</div>`).join('');
  return `
    <section class="page">
      <h1 class="section-title">About</h1>
      <p class="about-bio">${SITE_CONFIG.bio}</p>
      <div class="skills">${tags}</div>
    </section>
  `;
}

function renderContact() {
  const links = SITE_CONFIG.socials.map(s => `<a class="social-link" href="${s.url}" target="_blank" rel="noopener">${s.label}</a>`).join('');
  return `
    <section class="page">
      <h1 class="section-title">Contact</h1>
      <a class="contact-email" href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a>
      <div class="socials">${links}</div>
    </section>
  `;
}

const PAGES = { home: renderHome, films: renderFilms, about: renderAbout, contact: renderContact };

function attachFilmModalHandlers() {
  const cards = document.querySelectorAll('.film-card');
  const overlay = document.getElementById('modalOverlay');
  if (!overlay) return;
  const wrap = document.getElementById('modalVideoWrap');
  const title = document.getElementById('modalTitle');
  const desc = document.getElementById('modalDesc');
  const closeBtn = document.getElementById('modalClose');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const film = SITE_CONFIG.films[card.dataset.index];
      wrap.innerHTML = videoBlock(film);
      title.textContent = film.title;
      desc.textContent = film.description;
      overlay.classList.add('open');
    });
  });

  function closeModal() {
    overlay.classList.remove('open');
    wrap.innerHTML = '';
  }
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
}

function route() {
  const hash = (window.location.hash || '#home').replace('#', '');
  const page = PAGES[hash] ? hash : 'home';

  playLoadbar();
  app.innerHTML = PAGES[page]();

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  if (page === 'films') attachFilmModalHandlers();
  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
}

// initialize brand initials from config name, e.g. "Jane Doe" -> "JD."
function setBrand() {
  const parts = SITE_CONFIG.name.trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map(p => p[0]).join('').toUpperCase();
  navBrand.textContent = (initials || 'DIR') + '.';
}

window.addEventListener('hashchange', route);
window.addEventListener('DOMContentLoaded', () => {
  setBrand();
  route();
});
