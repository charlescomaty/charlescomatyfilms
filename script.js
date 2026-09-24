/* =========================================================================
   Site logic â€” reads all content from SITE_CONFIG (config.js).
   You shouldn't need to edit this file to update your content.
   ========================================================================= */

const app = document.getElementById('app');
const loadbar = document.getElementById('loadbar');
const navBrand = document.getElementById('navBrand');
const navLinks = document.querySelectorAll('.nav-link');

// ---- Custom cursor ----
const cursorDot = document.getElementById('cursorDot');
const cursorRing = document.getElementById('cursorRing');
if (cursorDot && cursorRing && matchMedia('(hover: hover)').matches) {
  let ringX = 0, ringY = 0, mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });
  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .film-card')) cursorRing.classList.add('hovering');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .film-card')) cursorRing.classList.remove('hovering');
  });
}

// wraps each character of a string in a span with a staggered animation delay
function staggerLetters(text) {
  return text.split('').map((ch, i) =>
    `<span style="animation-delay:${i * 0.035}s">${ch === ' ' ? '&nbsp;' : ch}</span>`
  ).join('');
}

// fades/slides in elements marked data-reveal as they enter the viewport
function initScrollReveal() {
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach(el => io.observe(el));
}

function playLoadbar() {
  loadbar.classList.remove('active');
  // force reflow so the animation restarts each time
  void loadbar.offsetWidth;
  loadbar.classList.add('active');
  setTimeout(() => loadbar.classList.remove('active'), 900);
}

// Detects youtube.com/watch?v=..., youtu.be/..., and youtube.com/embed/...
// links and returns just the video ID, or null if it's not a YouTube URL.
function getYouTubeId(url) {
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]+)/,
    /(?:youtu\.be\/)([\w-]+)/,
    /(?:youtube\.com\/embed\/)([\w-]+)/
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

function videoBlock(item, opts = {}) {
  const url = (item.videoUrl || '').trim();
  if (url === '') {
    return `<div class="video-frame">
      <div class="video-placeholder">Video not linked yet.<br>Add a videoUrl in config.js for "${item.title}".</div>
    </div>`;
  }

  const ytId = getYouTubeId(url);
  if (ytId) {
    // YouTube (including unlisted) must be embedded via iframe â€” YouTube
    // doesn't provide a direct file URL a <video> tag can play.
    return `<div class="video-frame">
      <iframe
        src="https://www.youtube.com/embed/${ytId}"
        title="${item.title}"
        style="width:100%;height:100%;border:0;"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen></iframe>
    </div>`;
  }

  // Direct video file link (Cloudflare Stream, Bunny.net, self-hosted, etc.)
  const poster = item.posterUrl ? ` poster="${item.posterUrl}"` : '';
  return `<div class="video-frame">
    <video src="${url}"${poster} controls ${opts.autoplay ? 'muted autoplay loop playsinline' : ''}></video>
  </div>`;
}

function renderHome() {
  const f = SITE_CONFIG.featured;
  return `
    <section class="page">
      <h1 class="home-name">${staggerLetters(SITE_CONFIG.name)}</h1>
      <div class="home-role" data-reveal>${SITE_CONFIG.role}</div>
      <p class="home-tagline" data-reveal>${SITE_CONFIG.tagline}</p>

      <div class="featured" data-reveal>
        <div class="featured-eyebrow">Featured Film</div>
        <h2 class="featured-title">${f.title}</h2>
        <p class="featured-desc">${f.description}</p>
        ${videoBlock(f)}
      </div>
    </section>
  `;
}

function renderFilms() {
  const cards = SITE_CONFIG.films.map((film, i) => {
    let thumb = film.posterUrl;
    if (!thumb) {
      const ytId = getYouTubeId(film.videoUrl || '');
      if (ytId) thumb = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`;
    }
    return `
    <div class="film-card" data-index="${i}">
      <div class="film-card-media">${thumb ? `<img src="${thumb}" style="width:100%;height:100%;object-fit:cover;" alt="${film.title}">` : 'No poster set'}</div>
      <div class="film-card-body">
        <div class="film-card-title">${film.title}</div>
        <div class="film-card-year">${film.year}</div>
      </div>
    </div>
  `;
  }).join('');

  return `
    <section class="page">
      <h1 class="section-title">Films</h1>
      <div class="film-grid">${cards}</div>
    </section>
    <div class="modal-overlay" id="modalOverlay">
      <div class="modal-box">
        <button class="modal-close" id="modalClose">Close âœ•</button>
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
      <p class="about-bio" data-reveal>${SITE_CONFIG.bio}</p>
      <div class="skills" data-reveal>${tags}</div>
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

  // brief film-wipe transition between pages
  const wipe = document.createElement('div');
  wipe.className = 'wipe play';
  document.body.appendChild(wipe);
  setTimeout(() => wipe.remove(), 550);

  app.innerHTML = PAGES[page]();

  navLinks.forEach(link => {
    link.classList.toggle('active', link.dataset.page === page);
  });

  if (page === 'films') attachFilmModalHandlers();
  initScrollReveal();
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
