import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { T, AF } from "../config/tokens";
import { useTranslatedConfig } from "../hooks/useTranslatedConfig";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=DM+Sans:wght@300;400;500&display=swap');

  :root {
    --black: #0f0f0d;
    --white: #fdfaf5;
    --cream: #f0ead8;
    --gold: #c8a96e;
    --gold-light: #e2c99a;
    --warm-gray: #8a8480;
    --dark-gray: #1e1c18;
    --serif: 'Cormorant Garamond', serif;
    --sans: 'DM Sans', sans-serif;
    --nav-h: 80px;
  }

  html { scroll-behavior: smooth; font-size: 16px; }
  .lpg-body { font-family: var(--sans); background: var(--white); color: var(--black); overflow-x: hidden; }
  .lpg-a { text-decoration: none; color: inherit; }
  .lpg-img { display: block; width: 100%; height: 100%; object-fit: cover; }

  /* ─── SCROLLBAR ─── */
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: var(--cream); }
  ::-webkit-scrollbar-thumb { background: var(--gold); }

  /* ─── NAV ─── */
  .nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 200;
    height: var(--nav-h);
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 3.5rem;
    background: rgba(253,250,245,0.88);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid rgba(200,169,110,0.18);
    transition: all 0.4s ease;
  }
  .nav.scrolled { background: rgba(253,250,245,0.97); box-shadow: 0 1px 30px rgba(0,0,0,0.06); }

  .nav-left { display: flex; align-items: center; gap: 3rem; }
  .logo { font-family: var(--serif); font-size: 1.7rem; font-weight: 400; letter-spacing: 0.28em; text-transform: uppercase; color: var(--black); }
  .logo span { color: var(--gold); }

  .nav-links { display: flex; gap: 2rem; list-style: none; }
  .nav-links a {
    font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase;
    font-weight: 500; color: var(--warm-gray);
    position: relative; padding-bottom: 3px; transition: color 0.3s;
  }
  .nav-links a::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 100%; height: 1px;
    background: var(--gold); transition: right 0.35s ease;
  }
  .nav-links a:hover { color: var(--black); }
  .nav-links a:hover::after { right: 0; }

  .nav-right { display: flex; align-items: center; gap: 1.2rem; }
  .nav-icon-btn {
    width: 40px; height: 40px; border-radius: 50%; border: none; background: transparent;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background 0.25s; color: var(--black);
  }
  .nav-icon-btn:hover { background: rgba(0,0,0,0.06); }
  .nav-icon-btn svg { width: 18px; height: 18px; stroke-width: 1.5; }

  .cart-badge { position: relative; }
  .cart-dot {
    position: absolute; top: -2px; right: -2px; width: 14px; height: 14px;
    background: var(--gold); border-radius: 50%;
    font-size: 8px; font-weight: 700; color: var(--white);
    display: flex; align-items: center; justify-content: center;
  }

  /* ─── HERO ─── */
  .hero {
    position: relative; height: 100vh; min-height: 700px; overflow: hidden;
    background: var(--dark-gray);
  }
  .slides { position: absolute; inset: 0; display: flex; }
  .slide {
    position: absolute; inset: 0; opacity: 0; transition: opacity 1.2s ease;
  }
  .slide.active { opacity: 1; }
  .slide img { position: absolute; inset: 0; object-fit: cover; width: 100%; height: 100%; }
  .slide-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(90deg,rgba(15,15,13,0.72) 0%,rgba(15,15,13,0.3) 60%,transparent 100%);
  }

  .hero-wave {
    position: absolute; bottom: -2px; left: 0; right: 0; z-index: 10; line-height: 0;
  }
  .hero-wave svg { width: 100%; height: 80px; display: block; }

  .slide-content {
    position: absolute; z-index: 5; top: 50%; left: 8%; transform: translateY(-50%);
    max-width: 560px;
  }
  .slide-eyebrow {
    font-size: 0.6rem; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.8rem;
  }
  .slide-eyebrow::before {
    content: ''; display: block; width: 32px; height: 1px; background: var(--gold);
  }
  .slide-headline {
    font-family: var(--serif); font-size: clamp(2.8rem,5vw,5.5rem);
    font-weight: 300; line-height: 1.05; color: var(--white);
    margin-bottom: 1.2rem;
    opacity: 0; transform: translateY(24px);
    transition: opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s;
    white-space: pre-line;
  }
  .slide.active .slide-headline { opacity: 1; transform: translateY(0); }
  .slide-sub {
    font-size: 0.95rem; color: rgba(255,255,255,0.6);
    line-height: 1.8; max-width: 400px; margin-bottom: 2.5rem;
    opacity: 0; transition: opacity 0.8s ease 0.4s;
  }
  .slide.active .slide-sub { opacity: 1; }
  .btn-hero {
    display: inline-flex; align-items: center; gap: 0.8rem;
    background: var(--gold); color: var(--black);
    padding: 0.9rem 2.2rem;
    font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500;
    border: none; cursor: pointer; transition: background 0.3s, gap 0.3s;
    opacity: 0; transition: opacity 0.8s ease 0.6s, background 0.3s;
  }
  .slide.active .btn-hero { opacity: 1; }
  .btn-hero:hover { background: var(--gold-light); gap: 1.2rem; }

  .slider-dots {
    position: absolute; bottom: 100px; left: 8%; z-index: 10;
    display: flex; align-items: center; gap: 1rem;
  }
  .slider-dot {
    height: 3px; background: rgba(255,255,255,0.3); cursor: pointer;
    transition: all 0.4s; border-radius: 2px; width: 24px;
  }
  .slider-dot.active { width: 48px; background: var(--gold); }
  .slide-counter {
    position: absolute; bottom: 95px; right: 8%; z-index: 10;
    font-size: 0.65rem; letter-spacing: 0.25em; color: rgba(255,255,255,0.4);
  }

  /* ─── MARQUEE ─── */
  .marquee-bar {
    background: var(--black); padding: 1.2rem 0; overflow: hidden;
    border-top: 1px solid rgba(200,169,110,0.15);
    border-bottom: 1px solid rgba(200,169,110,0.15);
  }
  .marquee-track {
    display: flex; gap: 4rem; white-space: nowrap;
    animation: marquee 22s linear infinite;
  }
  .marquee-track:hover { animation-play-state: paused; }
  @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
  .marquee-item {
    font-family: var(--serif); font-size: 1.1rem; font-style: italic;
    color: rgba(200,169,110,0.45); letter-spacing: 0.05em; flex-shrink: 0;
  }
  .marquee-sep { color: rgba(200,169,110,0.25); margin: 0 1rem; }

  /* ─── CATEGORIES ─── */
  .categories { display: flex; flex-direction: column; gap: 0; }
  .cat-card {
    position: relative; width: 100%; height: 92vh; min-height: 520px;
    overflow: hidden; cursor: pointer; display: flex; align-items: flex-end;
  }
  .cat-img {
    position: absolute; inset: 0; width: 100%; height: 100%;
    object-fit: cover; object-position: center;
    transform: scale(1); transition: transform 1.2s ease, filter 0.6s ease;
    filter: brightness(0.68); z-index: 0;
  }
  .cat-card:hover .cat-img { transform: scale(1.06); filter: brightness(0.45); }
  .cat-card-overlay {
    position: absolute; inset: 0; z-index: 1;
    background: linear-gradient(to top,rgba(8,8,6,0.9) 0%,rgba(8,8,6,0.15) 45%,transparent 100%);
  }
  .cat-card-body {
    position: relative; z-index: 2;
    padding: 3.5rem 8%; width: 100%;
    display: flex; align-items: flex-end; justify-content: space-between;
  }
  .cat-number {
    font-family: var(--serif); font-size: 1.1rem; color: var(--gold);
    font-style: italic; margin-bottom: 0.8rem; display: block;
  }
  .cat-title {
    font-family: var(--serif); font-size: clamp(3rem,6vw,5.5rem); font-weight: 300;
    color: var(--white); line-height: 1.0; white-space: pre-line;
  }
  .cat-link {
    display: inline-flex; align-items: center; gap: 0.6rem;
    font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: rgba(255,255,255,0.45); transition: color 0.3s, gap 0.3s;
    padding-bottom: 0.3rem; border-bottom: 1px solid rgba(255,255,255,0.2);
    white-space: nowrap; margin-bottom: 0.8rem; align-self: flex-end;
  }
  .cat-card:hover .cat-link { color: var(--gold); gap: 1rem; border-bottom-color: var(--gold); }

  /* ─── FEATURES ─── */
  .features {
    display: grid; grid-template-columns: repeat(4,1fr);
    background: var(--dark-gray);
    border-top: 1px solid rgba(200,169,110,0.12);
    border-bottom: 1px solid rgba(200,169,110,0.12);
  }
  .feat {
    padding: 2.5rem 2rem; border-right: 1px solid rgba(200,169,110,0.12); text-align: center;
  }
  .feat:last-child { border-right: none; }
  .feat-icon {
    width: 40px; height: 40px; border-radius: 50%; background: rgba(200,169,110,0.12);
    display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;
  }
  .feat-icon svg { width: 18px; height: 18px; color: var(--gold); stroke: var(--gold); }
  .feat-title { font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--white); margin-bottom: 0.5rem; font-weight: 500; }
  .feat-desc { font-size: 0.8rem; color: rgba(255,255,255,0.4); line-height: 1.7; }

  /* ─── WHY US ─── */
  .why {
    padding: 7rem 8%; background: var(--white);
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
  }
  .why-img-wrap {
    position: relative; aspect-ratio: 4/5; overflow: hidden; border-radius: 2px;
  }
  .why-img-wrap img { object-fit: cover; }
  .why-accent {
    position: absolute; bottom: -1.5rem; right: -1.5rem;
    width: 45%; aspect-ratio: 1; border: 1px solid rgba(200,169,110,0.35); border-radius: 50%;
  }
  .why-eyebrow {
    font-size: 0.6rem; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.8rem;
  }
  .why-eyebrow::before {
    content: ''; display: block; width: 32px; height: 1px; background: var(--gold);
  }
  .why-title {
    font-family: var(--serif); font-size: clamp(2rem,3vw,3.2rem); font-weight: 300;
    line-height: 1.15; color: var(--black); margin-bottom: 1.5rem; white-space: pre-line;
  }
  .why-body { font-size: 0.95rem; color: var(--warm-gray); line-height: 1.9; margin-bottom: 2.5rem; }
  .why-stats {
    display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; margin-bottom: 3rem;
  }
  .why-stat-num {
    font-family: var(--serif); font-size: 2.2rem; color: var(--gold); font-weight: 300;
    display: block; line-height: 1; margin-bottom: 0.3rem;
  }
  .why-stat-label {
    font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--warm-gray);
  }
  .btn-dark {
    display: inline-flex; align-items: center; gap: 0.8rem;
    background: var(--black); color: var(--white);
    padding: 0.95rem 2.4rem;
    font-size: 0.65rem; letter-spacing: 0.25em; text-transform: uppercase; font-weight: 500;
    border: none; cursor: pointer; border-radius: 2px; transition: background 0.3s, gap 0.3s;
  }
  .btn-dark:hover { background: var(--dark-gray); gap: 1.2rem; }

  /* ─── BESTSELLERS ─── */
  .bestsellers { padding: 7rem 8%; background: var(--cream); }
  .section-header {
    display: flex; align-items: flex-end; justify-content: space-between; margin-bottom: 4rem;
  }
  .section-eyebrow {
    font-size: 0.6rem; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1rem; display: flex; align-items: center; gap: 0.8rem;
  }
  .section-eyebrow::before {
    content: ''; display: block; width: 32px; height: 1px; background: var(--gold);
  }
  .section-title {
    font-family: var(--serif); font-size: clamp(1.8rem,2.5vw,2.8rem); font-weight: 300;
    color: var(--black); line-height: 1.15; white-space: pre-line;
  }
  .view-all {
    font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase;
    color: var(--warm-gray); display: flex; align-items: center; gap: 0.5rem;
    padding-bottom: 3px; border-bottom: 1px solid currentColor;
    transition: color 0.3s;
  }
  .view-all:hover { color: var(--gold); }

  /* ─── SHOWCASE ─── */
  .showcase {
    padding: 7rem 8%; background: var(--dark-gray);
    display: grid; grid-template-columns: 1fr 1fr; gap: 6rem; align-items: center;
  }
  .showcase-eyebrow {
    font-size: 0.6rem; letter-spacing: 0.4em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.2rem; display: flex; align-items: center; gap: 0.8rem;
  }
  .showcase-eyebrow::before {
    content: ''; display: block; width: 32px; height: 1px; background: var(--gold);
  }
  .showcase-title {
    font-family: var(--serif); font-size: clamp(2rem,3vw,3.2rem); font-weight: 300;
    color: var(--white); line-height: 1.15; margin-bottom: 1.5rem; white-space: pre-line;
  }
  .showcase-body { font-size: 0.9rem; color: rgba(255,255,255,0.5); line-height: 1.9; margin-bottom: 3rem; }
  .hot-list { display: flex; flex-direction: column; gap: 0; }
  .hot-item {
    padding: 1.5rem 1.5rem; border-left: 2px solid rgba(200,169,110,0.18); cursor: pointer; transition: all 0.3s;
  }
  .hot-item:hover, .hot-item.active {
    border-left-color: var(--gold); background: rgba(200,169,110,0.05);
  }
  .hot-item-title {
    font-size: 0.8rem; font-weight: 500; letter-spacing: 0.1em; color: rgba(255,255,255,0.8); margin-bottom: 0.4rem;
  }
  .hot-item-desc {
    font-size: 0.8rem; color: rgba(255,255,255,0.35); line-height: 1.6;
  }
  .showcase-img {
    position: relative; aspect-ratio: 1;
    border: 1px solid rgba(200,169,110,0.12); border-radius: 2px; overflow: hidden;
  }
  .showcase-img img { object-fit: cover; }
  .hotspot-btn {
    position: absolute; width: 32px; height: 32px; border-radius: 50%;
    background: rgba(200,169,110,0.3); border: 2px solid var(--gold);
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    font-size: 0.65rem; font-weight: 700; color: var(--white);
    transition: all 0.3s;
    animation: pulse-gold 2.5s infinite;
  }
  @keyframes pulse-gold {
    0%, 100% { box-shadow: 0 0 0 0 rgba(200,169,110,0.4); }
    50% { box-shadow: 0 0 0 10px rgba(200,169,110,0); }
  }
  .hotspot-btn:hover, .hotspot-btn.active {
    background: var(--gold); transform: scale(1.15);
  }

  /* ─── LOOKBOOK ─── */
  .lookbook { padding: 7rem 8%; background: var(--white); }
  .look-grid {
    display: grid;
    grid-template-columns: 1.6fr 1fr 1fr;
    grid-template-rows: 260px 260px;
    gap: 1.5rem; margin-top: 3.5rem;
  }
  .look-card {
    position: relative; overflow: hidden; cursor: pointer; border-radius: 2px;
  }
  .look-card:first-child { grid-row: 1/3; }
  .look-card img { transition: transform 0.9s ease; }
  .look-card:hover img { transform: scale(1.08); }
  .look-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top,rgba(15,15,13,0.7) 0%,transparent 55%);
    opacity: 0; transition: opacity 0.4s;
  }
  .look-card:hover .look-card-overlay { opacity: 1; }
  .look-card-label {
    position: absolute; bottom: 1.5rem; left: 1.5rem; right: 1.5rem;
    font-size: 0.6rem; letter-spacing: 0.25em; text-transform: uppercase;
    color: rgba(255,255,255,0.85); display: flex; align-items: center; gap: 0.5rem;
  }
  .look-card-label::before { content: '+'; color: var(--gold); font-size: 1rem; }

  /* ─── FOOTER ─── */
  .footer {
    background: var(--black); padding: 5rem 8%;
    border-top: 1px solid rgba(200,169,110,0.12);
  }
  .footer-top {
    display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 4rem; margin-bottom: 4rem;
  }
  .footer-logo {
    font-family: var(--serif); font-size: 2rem; letter-spacing: 0.2em;
    text-transform: uppercase; color: rgba(255,255,255,0.8); margin-bottom: 1.2rem;
  }
  .footer-logo span { color: var(--gold); }
  .footer-tagline {
    font-size: 0.85rem; color: rgba(255,255,255,0.35); line-height: 1.8; max-width: 280px; margin-bottom: 1.5rem;
  }
  .footer-socials { display: flex; gap: 0.8rem; }
  .footer-social {
    width: 36px; height: 36px; border-radius: 50%;
    border: 1px solid rgba(200,169,110,0.25);
    display: flex; align-items: center; justify-content: center;
    color: rgba(255,255,255,0.4); transition: all 0.3s; font-size: 0.75rem;
  }
  .footer-social:hover { border-color: var(--gold); color: var(--gold); }
  .footer-col-title {
    font-size: 0.6rem; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--gold); margin-bottom: 1.5rem; font-weight: 500;
  }
  .footer-links { display: flex; flex-direction: column; gap: 0.8rem; list-style: none; }
  .footer-links a {
    font-size: 0.85rem; color: rgba(255,255,255,0.4); transition: color 0.3s;
  }
  .footer-links a:hover { color: rgba(255,255,255,0.85); }
  .footer-newsletter-desc {
    font-size: 0.85rem; color: rgba(255,255,255,0.35); margin-bottom: 1rem; line-height: 1.7;
  }
  .footer-form { display: flex; gap: 0; }
  .footer-input {
    flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(200,169,110,0.2);
    border-right: none; padding: 0.75rem 1rem;
    color: var(--white); font-size: 0.85rem; outline: none;
  }
  .footer-input::placeholder { color: rgba(255,255,255,0.25); }
  .footer-submit {
    padding: 0.75rem 1.2rem; background: var(--gold); border: none; cursor: pointer;
    color: var(--black); transition: background 0.3s;
  }
  .footer-submit:hover { background: var(--gold-light); }
  .footer-submit svg { width: 18px; height: 18px; }
  .footer-bottom {
    display: flex; justify-content: space-between; align-items: center;
    padding-top: 2rem; border-top: 1px solid rgba(255,255,255,0.07);
  }
  .footer-copy {
    font-size: 0.65rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.25);
  }
  .footer-legal { display: flex; gap: 2rem; list-style: none; }
  .footer-legal a {
    font-size: 0.65rem; letter-spacing: 0.1em; color: rgba(255,255,255,0.25); transition: color 0.3s;
  }
  .footer-legal a:hover { color: rgba(255,255,255,0.6); }

  /* ─── PRODUCTS GRID ─── */
  .prod-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 2.5rem; }
  .prod-card { cursor: pointer; }
  .prod-img-wrap {
    position: relative; aspect-ratio: 4/5; overflow: hidden; background: var(--white); margin-bottom: 1.2rem;
  }
  .prod-img-wrap img { transition: transform 0.8s ease, opacity 0.5s ease; width: 100%; height: 100%; object-fit: cover; }
  .prod-name { font-family: var(--serif); font-size: 1.1rem; color: var(--black); margin-bottom: 0.3rem; }
  .prod-cat { font-size: 0.65rem; letter-spacing: 0.15em; text-transform: uppercase; color: var(--warm-gray); margin-bottom: 0.5rem; }
  .prod-price { font-family: var(--serif); font-size: 1.1rem; color: var(--gold); }

  /* ─── RESPONSIVE ─── */
  @media(max-width:1024px){
    :root { --nav-h: 70px; }
    .nav { padding: 0 2.5rem; }
    .nav-left { gap: 2rem; }
    .logo { font-size: 1.4rem; }
    .nav-links { gap: 1.5rem; }
    .prod-grid { grid-template-columns: repeat(2,1fr); gap: 2rem; }
    .look-grid { grid-template-columns: 1fr 1fr; grid-template-rows: auto; gap: 1.2rem; }
    .look-card:first-child { grid-row: auto; grid-column: 1/3; }
    .footer-top { grid-template-columns: repeat(2,1fr); gap: 3rem; }
  }

  @media(max-width:768px){
    :root { --nav-h: 64px; }
    .nav { padding: 0 1.5rem; }
    .nav-left { gap: 1.5rem; }
    .logo { font-size: 1.2rem; letter-spacing: 0.2em; }
    .nav-links { display: none; }
    .nav-icon-btn { width: 36px; height: 36px; }
    .slide-content { left: 5%; max-width: 95%; }
    .slide-headline { font-size: clamp(2rem,4vw,4.5rem); }
    .slide-eyebrow { font-size: 0.55rem; }
    .btn-hero { padding: 0.8rem 1.8rem; font-size: 0.6rem; }
    .slider-dots { bottom: 80px; left: 5%; }
    .slider-dot { width: 20px; }
    .slider-dot.active { width: 40px; }
    .slide-counter { bottom: 78px; right: 5%; font-size: 0.6rem; }
    .cat-card { height: 60vh; min-height: 350px; }
    .cat-card-body { padding: 2rem 5%; }
    .cat-title { font-size: clamp(2rem,5vw,4rem); }
    .cat-number { font-size: 0.9rem; }
    .features { grid-template-columns: repeat(2,1fr); }
    .feat { padding: 2rem 1.5rem; }
    .feat-title { font-size: 0.7rem; }
    .feat-desc { font-size: 0.75rem; }
    .why { padding: 4rem 5%; gap: 2.5rem; grid-template-columns: 1fr; }
    .why-title { font-size: clamp(1.5rem,2.5vw,2.5rem); }
    .bestsellers { padding: 4rem 5%; }
    .section-title { font-size: clamp(1.4rem,2vw,2.2rem); }
    .prod-grid { grid-template-columns: repeat(2,1fr); gap: 1.5rem; }
    .prod-name { font-size: 0.95rem; }
    .prod-price { font-size: 0.95rem; }
    .showcase { padding: 4rem 5%; grid-template-columns: 1fr; gap: 2.5rem; }
    .showcase-title { font-size: clamp(1.5rem,2.5vw,2.5rem); }
    .hot-item { padding: 1.2rem 1rem; }
    .hot-item-title { font-size: 0.75rem; }
    .hot-item-desc { font-size: 0.75rem; }
    .lookbook { padding: 4rem 5%; }
    .look-grid { grid-template-columns: 1fr; grid-template-rows: auto; gap: 1rem; }
    .look-card:first-child { grid-column: auto; grid-row: auto; }
    .look-card-label { font-size: 0.55rem; bottom: 1rem; left: 1rem; right: 1rem; }
    .footer { padding: 3rem 5%; }
    .footer-top { grid-template-columns: 1fr; gap: 2.5rem; }
    .footer-logo { font-size: 1.5rem; }
    .footer-bottom { flex-direction: column; gap: 1rem; text-align: center; }
    .marquee-item { font-size: 0.9rem; }
  }

  @media(max-width:480px){
    :root { --nav-h: 56px; }
    html { font-size: 14px; }
    .nav { padding: 0 1rem; }
    .nav-left { gap: 1rem; }
    .logo { font-size: 1rem; letter-spacing: 0.15em; }
    .nav-icon-btn { width: 32px; height: 32px; }
    .slide-content { left: 4%; max-width: 96%; top: 45%; }
    .slide-headline { font-size: clamp(1.5rem,3.5vw,3rem); line-height: 1rem; margin-bottom: 0.8rem; }
    .slide-eyebrow { font-size: 0.5rem; margin-bottom: 0.8rem; }
    .slide-eyebrow::before { width: 24px; }
    .slide-sub { font-size: 0.85rem; margin-bottom: 1.5rem; }
    .btn-hero { padding: 0.7rem 1.5rem; font-size: 0.55rem; }
    .slider-dots { bottom: 70px; left: 4%; gap: 0.7rem; }
    .slider-dot { width: 16px; height: 2px; }
    .slider-dot.active { width: 32px; }
    .slide-counter { bottom: 68px; right: 4%; font-size: 0.55rem; }
    .hero-wave svg { height: 60px; }
    .marquee-item { font-size: 0.75rem; }
    .cat-card { height: 50vh; min-height: 250px; }
    .cat-card-body { padding: 1.5rem 4%; }
    .cat-title { font-size: clamp(1.2rem,4vw,3rem); line-height: 0.95; }
    .cat-number { font-size: 0.8rem; margin-bottom: 0.5rem; }
    .cat-link { font-size: 0.55rem; margin-bottom: 0.5rem; }
    .features { grid-template-columns: 1fr; }
    .feat { padding: 1.5rem 1rem; border-right: none; border-bottom: 1px solid rgba(200,169,110,0.12); }
    .feat:last-child { border-bottom: none; }
    .feat-icon { width: 36px; height: 36px; }
    .feat-title { font-size: 0.65rem; }
    .feat-desc { font-size: 0.7rem; }
    .why { padding: 3rem 4%; gap: 1.5rem; }
    .why-img-wrap { aspect-ratio: 3/4; }
    .why-accent { width: 60%; bottom: -1rem; right: -1rem; }
    .why-title { font-size: clamp(1.2rem,2vw,2rem); }
    .why-body { font-size: 0.85rem; margin-bottom: 1.5rem; }
    .why-stats { gap: 1rem; margin-bottom: 2rem; }
    .why-stat-num { font-size: 1.8rem; }
    .why-stat-label { font-size: 0.6rem; }
    .bestsellers { padding: 3rem 4%; }
    .section-eyebrow { font-size: 0.55rem; }
    .section-eyebrow::before { width: 24px; }
    .section-header { flex-direction: column; gap: 1rem; margin-bottom: 2.5rem; }
    .section-title { font-size: clamp(1.2rem,2vw,2rem); }
    .view-all { font-size: 0.55rem; }
    .prod-grid { grid-template-columns: 1fr; gap: 1.2rem; }
    .prod-img-wrap { margin-bottom: 0.8rem; }
    .prod-name { font-size: 0.9rem; }
    .prod-cat { font-size: 0.6rem; }
    .prod-price { font-size: 0.9rem; }
    .showcase { padding: 3rem 4%; gap: 1.5rem; }
    .showcase-eyebrow { font-size: 0.55rem; }
    .showcase-eyebrow::before { width: 24px; }
    .showcase-title { font-size: clamp(1.2rem,2vw,2rem); }
    .showcase-body { font-size: 0.85rem; margin-bottom: 2rem; }
    .hot-item { padding: 1rem 0.8rem; }
    .hot-item-title { font-size: 0.7rem; }
    .hot-item-desc { font-size: 0.7rem; }
    .lookbook { padding: 3rem 4%; }
    .look-grid { gap: 0.8rem; }
    .look-card-label { font-size: 0.5rem; bottom: 0.8rem; left: 0.8rem; right: 0.8rem; }
    .look-card-label::before { font-size: 0.8rem; }
    .footer { padding: 2.5rem 4%; }
    .footer-top { gap: 1.5rem; }
    .footer-logo { font-size: 1.2rem; margin-bottom: 0.8rem; }
    .footer-tagline { font-size: 0.75rem; }
    .footer-col-title { font-size: 0.55rem; margin-bottom: 1rem; }
    .footer-links a { font-size: 0.75rem; }
    .footer-newsletter-desc { font-size: 0.75rem; margin-bottom: 0.8rem; }
    .footer-input { font-size: 0.75rem; padding: 0.5rem 0.7rem; }
    .footer-copy { font-size: 0.6rem; }
    .footer-legal a { font-size: 0.6rem; gap: 1rem; }
  }

  /* RTL Support */
  [dir="rtl"] .slide-overlay { background: linear-gradient(-90deg,rgba(15,15,13,0.72) 0%,rgba(15,15,13,0.3) 60%,transparent 100%); }
  [dir="rtl"] .slide-content { left: auto; right: 8%; }
  [dir="rtl"] .nav-left { flex-direction: row-reverse; }
  [dir="rtl"] .nav-links { flex-direction: row-reverse; }
  [dir="rtl"] .section-eyebrow::before { margin-left: 0; margin-right: 0.8rem; order: 2; }
  [dir="rtl"] .section-eyebrow { display: flex; flex-direction: row-reverse; }
  [dir="rtl"] .why-eyebrow { display: flex; flex-direction: row-reverse; }
  [dir="rtl"] .why-eyebrow::before { margin-left: 0.8rem; margin-right: 0; }
  [dir="rtl"] .showcase-eyebrow { display: flex; flex-direction: row-reverse; }
  [dir="rtl"] .showcase-eyebrow::before { margin-left: 0.8rem; margin-right: 0; }
  [dir="rtl"] .view-all { flex-direction: row-reverse; }
  [dir="rtl"] .footer-bottom { flex-direction: row-reverse; }
`;

export function LandingPage({ onLoginClick }) {
  const { t, i18n } = useTranslation();
  const config = useTranslatedConfig();
  const [current, setCurrent] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState(0);
  const [navScrolled, setNavScrolled] = useState(false);
  const total = config.heroSlides.length;

  // Slider logic
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [total]);

  // Nav scroll listener
  useEffect(() => {
    const handleScroll = () => setNavScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Set RTL direction based on language
  useEffect(() => {
    const isArabic = i18n.language === "ar";
    document.documentElement.dir = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  const goSlide = (idx) => setCurrent((idx + total) % total);

  const SVGIcons = {
    search: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
    cart: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    menu: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </svg>
    ),
    arrow: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" width="16" height="16">
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    )
  };

  return (
    <div className="lpg-body">
      <style>{CSS}</style>

      {/* NAV */}
      <nav className={`nav${navScrolled ? " scrolled" : ""}`}>
        <div className="nav-left">
          <a className="logo" href="#top">
            TIP<span>·</span>TOP
          </a>
          <ul className="nav-links">
            {config.navLinks.map((link) => (
              <li key={link.id}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div className="nav-right">
          <button className="nav-icon-btn" aria-label={t("nav.search")} title={t("nav.search")}>{SVGIcons.search}</button>
          <div className="cart-badge">
            <button className="nav-icon-btn" aria-label={t("nav.cart")} title={t("nav.cart")}>{SVGIcons.cart}</button>
            <span className="cart-dot">0</span>
          </div>
          <button
            onClick={() => i18n.changeLanguage(i18n.language === "en" ? "ar" : "en")}
            aria-label={`Switch to ${i18n.language === "en" ? "العربية" : "English"}`}
            title={`Switch to ${i18n.language === "en" ? "العربية" : "English"}`}
            style={{
              padding: "0.4rem 0.8rem",
              borderRadius: 4,
              border: `1px solid var(--gold)`,
              background: "transparent",
              color: "var(--gold)",
              cursor: "pointer",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              fontWeight: 600,
              transition: "all 0.2s",
              fontFamily: "var(--sans)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--gold)";
              e.currentTarget.style.color = "var(--black)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--gold)";
            }}
          >
            {i18n.language === "en" ? "عربي" : "EN"}
          </button>
          {onLoginClick && (
            <button
              onClick={onLoginClick}
              aria-label={t("nav.admin")}
              title={t("nav.admin")}
              style={{
                padding: "0.4rem 1rem",
                borderRadius: 4,
                border: `1px solid var(--gold)`,
                background: "transparent",
                color: "var(--gold)",
                cursor: "pointer",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
                transition: "all 0.2s",
                fontFamily: "var(--sans)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--gold)";
                e.currentTarget.style.color = "var(--black)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--gold)";
              }}
            >
              {t("nav.admin")}
            </button>
          )}
        </div>
      </nav>

      {/* HERO SLIDER */}
      <section className="hero" id="hero">
        <div className="slides">
          {config.heroSlides.map((slide, idx) => (
            <div key={slide.id} className={`slide${current === idx ? " active" : ""}`}>
              <img src={slide.img} alt={slide.alt} />
              <div className="slide-overlay" />
              <div className="slide-content">
                <div className="slide-eyebrow">{slide.eyebrow}</div>
                <h1 className="slide-headline">{slide.headline}</h1>
                <p className="slide-sub">{slide.subheading}</p>
                <a href={slide.ctaHref} className="btn-hero">
                  {slide.cta} {SVGIcons.arrow}
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C200,80 400,0 600,40 C800,80 1000,0 1200,40 C1320,65 1380,30 1440,40 L1440,80 L0,80 Z" fill="#f0ead8" />
          </svg>
        </div>
        <div className="slider-dots">
          {config.heroSlides.map((_, idx) => (
            <div
              key={idx}
              className={`slider-dot${current === idx ? " active" : ""}`}
              onClick={() => goSlide(idx)}
            />
          ))}
        </div>
        <div className="slide-counter">{String(current + 1).padStart(2, "0")} / 0{total}</div>
      </section>

      {/* CATEGORIES */}
      <section className="categories" id="categories">
        {config.categoryCards.map((cat) => (
          <div key={cat.id} className="cat-card" onClick={() => (window.location.href = cat.link)}>
            <img className="cat-img" src={cat.img} alt={cat.alt} />
            <div className="cat-card-overlay" />
            <div className="cat-card-body">
              <div>
                <h2 className="cat-title">{cat.title}</h2>
              </div>
              <span className="cat-link">
                {t("categories.explore")} {SVGIcons.arrow}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* FEATURES */}
      <div className="features">
        {config.features.map((feat) => (
          <div key={feat.id} className="feat">
            <div className="feat-icon">{SVGIcons.arrow}</div>
            <div className="feat-title">{feat.title}</div>
            <div className="feat-desc">{feat.description}</div>
          </div>
        ))}
      </div>

      {/* ABOUT */}
      <section className="why" id="about">
        <div className="why-img-wrap">
          <img src={config.about.img} alt="About" />
          <div className="why-accent" />
        </div>
        <div>
          <div className="why-eyebrow">{config.about.eyebrow}</div>
          <h2 className="why-title">{config.about.title}</h2>
          <p className="why-body">{config.about.body}</p>
          <div className="why-stats">
            {config.about.stats.map((stat, idx) => (
              <div key={idx} className="why-stat">
                <span className="why-stat-num">{stat.value}</span>
                <span className="why-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>
          <a href={config.about.ctaHref} className="btn-dark">
            {config.about.cta} {SVGIcons.arrow}
          </a>
        </div>
      </section>

      {/* SHOWCASE */}
      <section className="showcase" id="showcase">
        <div>
          <div className="showcase-eyebrow">{config.showcase.eyebrow}</div>
          <h2 className="showcase-title">{config.showcase.title}</h2>
          <p className="showcase-body">{config.showcase.body}</p>
          <div className="hot-list">
            {config.showcase.hotspots.map((spot) => (
              <div
                key={spot.id}
                className={`hot-item${activeHotspot === spot.id ? " active" : ""}`}
                onMouseEnter={() => setActiveHotspot(spot.id)}
              >
                <div className="hot-item-title">{spot.title}</div>
                <div className="hot-item-desc">{spot.description}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="showcase-img">
          <img src={config.showcase.img} alt="Showcase" />
          {config.showcase.hotspots.map((spot) => (
            <button
              key={spot.id}
              className={`hotspot-btn${activeHotspot === spot.id ? " active" : ""}`}
              style={{ top: spot.top, left: spot.left }}
              onMouseEnter={() => setActiveHotspot(spot.id)}
            >
              {spot.id + 1}
            </button>
          ))}
        </div>
      </section>

      {/* LOOKBOOK */}
      <section className="lookbook" id="gallery">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">{config.lookbook.eyebrow}</div>
            <h2 className="section-title">{config.lookbook.title}</h2>
          </div>
          <a href="#" className="view-all">
            {t("lookbook.cta")} {SVGIcons.arrow}
          </a>
        </div>
        <div className="look-grid">
          {config.lookbook.items.map((item) => (
            <div key={item.id} className="look-card">
              <img src={item.img} alt={item.alt} />
              <div className="look-card-overlay" />
              <div className="look-card-label">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer" id="contact">
        <div className="footer-top">
          <div>
            <div className="footer-logo">
              TIP<span>·</span>TOP
            </div>
            <p className="footer-tagline">{config.footer.tagline}</p>
            <div className="footer-socials">
              {config.footer.socials.map((social, idx) => (
                <a key={idx} className="footer-social" href={social.href} title={social.title}>
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Shop</div>
            <ul className="footer-links">
              {config.footer.shopLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">Company</div>
            <ul className="footer-links">
              {config.footer.companyLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-col-title">{t("footer.newsTitle")}</div>
            <p className="footer-newsletter-desc">{t("footer.newsDesc")}</p>
            <div className="footer-form">
              <input className="footer-input" type="email" placeholder={t("footer.emailPlaceholder")} />
              <button className="footer-submit">{SVGIcons.arrow}</button>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">{config.footer.copyright}</p>
          <ul className="footer-legal">
            {config.footer.legalLinks.map((link, idx) => (
              <li key={idx}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
