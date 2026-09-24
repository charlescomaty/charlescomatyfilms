# Portfolio Site

A dark, cinematic personal portfolio: Home / Films / About / Contact,
with animated page transitions. Pure HTML/CSS/JS — no build step, no
dependencies, works directly on GitHub Pages.

## Editing your content

Open **`config.js`**. Every value that says `EDIT_ME` is something you
should replace with your own info: your name, bio, skills, email,
social links, and film details.

For each film (including the featured one), set `videoUrl` to a
direct video link from your video host (e.g. Cloudflare Stream,
Bunny.net Stream). Leave it as `""` and the site will show a
"video not linked yet" placeholder instead of breaking.

`posterUrl` is optional — a thumbnail image shown before playback.

You never need to touch `style.css`, `script.js`, or `index.html`
unless you want to change the design itself.

## Previewing locally

Open `index.html` directly in a browser, or for full compatibility
run a tiny local server from this folder:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Publishing

See the step-by-step GitHub Pages guide provided alongside this file.
