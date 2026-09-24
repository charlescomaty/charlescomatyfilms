/* =========================================================================
   SITE CONFIG — this is the ONLY file you should need to edit.
   Replace every EDIT_ME value below with your own info.
   Do not touch style.css or script.js unless you want to change the design.
   ========================================================================= */

const SITE_CONFIG = {

  // ---- Identity -----------------------------------------------------
  name: "Charles Comaty",
  role: "Director / Screenwriter",

  // Shown on the Home page under your name
  tagline: "I am a teenager making short films with the hopes of making feature films in the future",

  // ---- Featured film (shown big on the Home page) -------------------
  featured: {
    title: "The Epic Fury",
    description: "The Epic Fury is a drama/thriller taking place during the war of 2026, about a Lebanese vlogger who must keep his sanity against solitude after being stuck in his house for days as the American Iranian war intensifies.",
    // Paste the direct video URL from your host (Cloudflare Stream, Bunny.net, etc.)
    // Leave as "" if you don't have one yet — a placeholder will show instead.
    videoUrl: "",
    // Optional: a poster/thumbnail image URL shown before the video plays
    posterUrl: ""
  },

  // ---- All films (shown in the grid on the Films page) ---------------
  // Add or remove entries freely — the grid updates automatically.
  films: [
    {
      title: "The Epic Fury",
      year: "2026",
      description: "The Epic Fury is a drama/thriller taking place during the war of 2026, about a Lebanese vlogger who must keep his sanity against solitude after being stuck in his house for days as the American Iranian war intensifies..",
      videoUrl: "",
      posterUrl: ""
    },
    {
      title: "",
      year: "",
      description: "",
      videoUrl: "",
      posterUrl: ""
    },
    {
      title: "",
      year: "",
      description: "",
      videoUrl: "",
      posterUrl: ""
    }
  ],

  // ---- About page -----------------------------------------------------
  bio: "I am a teen filmmaker making short films with a dream to do feature films in the future. I write, direct, act and edit in all of my short films. Every single one of them is crafted with care and a meaning behind every shot or creative decision. I am self-taught (with the use of YouTube tutorials, books and own experience, as well as what I've learned from every film I watch). I like crime, sci-fi and fantasy movies. My two favorite directors are Christopher Nolan and David Fincher",

  skills: [
    "Director",
    "Writer",
    "Editor"
  ],

  // ---- Contact page -----------------------------------------------------
  email: "charlescomaty@gmail.com",

  // Add/remove as needed. "icon" uses simple text initials — see script.js
  // if you want to swap in real icons later.
  socials: [
    { label: "Instagram", url: "https://www.instagram.com/charlescomaty" }
  ]
};
