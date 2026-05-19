import { useState, useEffect, useRef } from "react";

/* ===================== GLOBAL STYLES ===================== */
const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;1,9..40,300&display=swap');

  *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --brand-red: #E8391D;
    --green:        #2d6a4f;
    --green-mid:    #40916c;
    --green-light:  #74c69d;
    --green-pale:   #b7e4c7;
    --green-ultra:  #d8f3dc;
    --green-faint:  #f0faf2;
    --white:        #ffffff;
    --off-white:    #f7faf6;
    --text-dark:    #1a2e22;
    --text-mid:     #3d5a47;
    --text-muted:   #6b8a74;
    --border:       rgba(45,106,79,0.14);
    --border-mid:   rgba(45,106,79,0.25);
    --card-bg:      #ffffff;
    --shadow-sm:    0 2px 12px rgba(45,106,79,0.08);
    --shadow-md:    0 8px 32px rgba(45,106,79,0.13);
    --shadow-lg:    0 20px 60px rgba(45,106,79,0.18);
  }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: var(--off-white);
    color: var(--text-dark);
    overflow-x: hidden;
    cursor: none;
  }

  /* ══════════════════════════════
     CUSTOM CURSOR
  ══════════════════════════════ */
  .cursor {
    position: fixed;
    width: 10px; height: 10px;
    background: var(--green);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99999;
    transform: translate(-50%, -50%);
    transition: transform 0.15s ease, background 0.2s, width 0.2s, height 0.2s;
  }
  .cursor-ring {
    position: fixed;
    width: 38px; height: 38px;
    border: 1.5px solid rgba(45,106,79,0.45);
    border-radius: 50%;
    pointer-events: none;
    z-index: 99998;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s, border-color 0.3s;
  }
  .cursor.hover  { transform: translate(-50%,-50%) scale(2.6); background: var(--green-mid); }
  .cursor-ring.hover { width: 58px; height: 58px; border-color: rgba(64,145,108,0.25); }

  /* ══════════════════════════════
     LIQUID BLOBS (background)
  ══════════════════════════════ */
  .blob-container {
    position: fixed; inset: 0;
    pointer-events: none; z-index: 0;
    overflow: hidden;
  }
  .blob {
    position: absolute;
    border-radius: 50%;
    filter: blur(80px);
    opacity: 0.38;
    animation: blobFloat 12s ease-in-out infinite;
  }
  .blob-1 {
    width: 600px; height: 600px;
    background: radial-gradient(circle, #b7e4c7 0%, #74c69d 50%, transparent 70%);
    top: -120px; left: -150px;
    animation-duration: 14s;
  }
  .blob-2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, #d8f3dc 0%, #b7e4c7 50%, transparent 70%);
    top: 40%; right: -100px;
    animation-duration: 18s;
    animation-delay: -5s;
  }
  .blob-3 {
    width: 400px; height: 400px;
    background: radial-gradient(circle, #74c69d 0%, #40916c 40%, transparent 70%);
    bottom: -80px; left: 30%;
    animation-duration: 16s;
    animation-delay: -9s;
    opacity: 0.22;
  }
  @keyframes blobFloat {
    0%,100% { transform: translate(0,0) scale(1) rotate(0deg); }
    25%      { transform: translate(40px,-30px) scale(1.07) rotate(3deg); }
    50%      { transform: translate(-20px,50px) scale(0.95) rotate(-2deg); }
    75%      { transform: translate(30px,20px) scale(1.04) rotate(2deg); }
  }

 
/* ══════════════════════════════
   MOVING TICKER ANNOUNCE BAR
══════════════════════════════ */

.announce {
  background: linear-gradient(90deg, var(--green) 0%, var(--green-mid) 100%);
  color: white;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  z-index: 100;
  height: 38px;
  display: flex;
  align-items: center;
}

.ticker-wrap {
  width: 100%;
  overflow: hidden;
}

.ticker {
  display: inline-block;
  padding-left: 100%;
  animation: tickerMove 18s linear infinite;
  font-size: 12px;
  letter-spacing: 0.12em;
  font-weight: 600;
}

.ticker span {
  margin-right: 60px;
}

.announce a {
  color: #fff;
  font-weight: 700;
  text-decoration: none;
  border-bottom: 1px solid rgba(255,255,255,0.6);
  cursor: pointer;
}

@keyframes tickerMove {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}

  /* ══════════════════════════════
     NAV
  ══════════════════════════════ */
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 52px;
    position: sticky; top: 0; z-index: 1000;
    background: rgba(247,250,246,0.82);
    backdrop-filter: blur(24px);
    -webkit-backdrop-filter: blur(24px);
    border-bottom: 1px solid var(--border);
    transition: padding 0.3s, box-shadow 0.3s;
  }
  nav.scrolled {
    padding: 12px 52px;
    box-shadow: var(--shadow-md);
  }
  .nav-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 34px;
    color: var(--brand-red);
    letter-spacing: 0.06em;
    cursor: pointer;
    transition: color 0.2s, transform 0.2s;
  }
  .nav-logo:hover { color: #c42e15; transform: scale(1.03); }
  .nav-links { display: flex; gap: 38px; list-style: none; }
  .nav-links a {
    color: var(--text-mid);
    text-decoration: none;
    font-size: 13px; font-weight: 500;
    letter-spacing: 0.06em; text-transform: uppercase;
    opacity: 0.75;
    transition: opacity 0.2s, color 0.2s;
    cursor: pointer;
    position: relative;
  }
  .nav-links a::after {
    content: '';
    position: absolute; bottom: -3px; left: 0; right: 0;
    height: 1.5px; background: var(--green);
    transform: scaleX(0); transform-origin: left;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .nav-links a:hover { opacity: 1; color: var(--green); }
  .nav-links a:hover::after { transform: scaleX(1); }
  .nav-right { display: flex; align-items: center; gap: 22px; }
  .nav-icon-btn {
    background: none; border: none;
    color: var(--text-muted); font-size: 18px;
    cursor: pointer; transition: color 0.2s;
    padding: 4px;
  }
  .nav-icon-btn:hover { color: var(--green); }
  .btn-cart {
    background: var(--green);
    color: white; border: none;
    padding: 10px 24px;
    font-family: 'DM Sans', sans-serif;
    font-size: 12px; font-weight: 600; cursor: pointer;
    letter-spacing: 0.08em; text-transform: uppercase;
    transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    position: relative; overflow: hidden;
    border-radius: 2px;
  }
  .btn-cart::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.2s;
  }
  .btn-cart:hover { background: var(--green-mid); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(45,106,79,0.35); }
  .btn-cart:hover::before { opacity: 1; }

  /* ══════════════════════════════
     AGE GATE
  ══════════════════════════════ */
  .age-gate-overlay {
    position: fixed; inset: 0; z-index: 99000;
    background: rgba(240,250,242,0.96);
    display: flex; align-items: center; justify-content: center;
    backdrop-filter: blur(12px);
    animation: fadeIn 0.4s ease;
  }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  .age-gate-box {
    background: white;
    border: 1.5px solid var(--border-mid);
    padding: 64px 56px;
    text-align: center;
    max-width: 480px; width: 90%;
    animation: slideUp 0.55s cubic-bezier(0.16,1,0.3,1);
    position: relative; overflow: hidden;
    box-shadow: var(--shadow-lg);
    border-radius: 4px;
  }
  .age-gate-box::before {
    content: '';
    position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, var(--green), var(--green-light), var(--green));
    background-size: 200% 100%;
    animation: gradShift 3s linear infinite;
  }
  @keyframes gradShift { from{background-position:0% 0%} to{background-position:200% 0%} }
  /* liquid blob inside age gate */
  .age-gate-box::after {
    content: '';
    position: absolute;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(183,228,199,0.4) 0%, transparent 70%);
    bottom: -100px; right: -80px;
    border-radius: 50%;
    animation: blobFloat 10s ease-in-out infinite;
    pointer-events: none;
  }
  @keyframes slideUp { from{transform:translateY(40px);opacity:0} to{transform:translateY(0);opacity:1} }
  .age-gate-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 52px; color: var(--green);
    letter-spacing: 0.06em; margin-bottom: 6px;
    position: relative; z-index: 1;
  }
  .age-gate-asterisk {
    color: var(--green-mid);
    animation: spin 6s linear infinite;
    display: inline-block; margin-right: 6px;
  }
  @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  .age-gate-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 38px; color: var(--text-dark);
    margin-bottom: 12px; position: relative; z-index: 1;
  }
  .age-gate-sub {
    font-size: 14px; color: var(--text-muted);
    margin-bottom: 44px; line-height: 1.6;
    position: relative; z-index: 1;
  }
  .age-gate-btns { display: flex; gap: 14px; position: relative; z-index: 1; }
  .age-btn-yes {
    flex: 1; background: var(--green); color: white; border: none;
    padding: 18px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px; letter-spacing: 0.1em; cursor: pointer;
    transition: all 0.25s; border-radius: 2px;
    position: relative; overflow: hidden;
  }
  .age-btn-yes::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%);
    opacity: 0; transition: opacity 0.2s;
  }
  .age-btn-yes:hover { background: var(--green-mid); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(45,106,79,0.38); }
  .age-btn-yes:hover::before { opacity: 1; }
  .age-btn-no {
    flex: 1; background: transparent; color: var(--text-mid);
    border: 1.5px solid var(--border-mid);
    padding: 18px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 24px; letter-spacing: 0.1em; cursor: pointer;
    transition: all 0.2s; border-radius: 2px;
  }
  .age-btn-no:hover { border-color: var(--green); color: var(--green); transform: translateY(-2px); }
  .age-gate-legal { font-size: 11px; color: var(--text-muted); margin-top: 28px; line-height: 1.6; position: relative; z-index: 1; }
  .age-gate-legal a { color: var(--green); text-decoration: underline; }
  .age-denied { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--green); padding: 20px 0; }

  /* ══════════════════════════════
     HERO
  ══════════════════════════════ */
  .hero {
    position: relative;
    min-height: 94vh;
    display: flex; align-items: center;
    overflow: hidden;
    background: linear-gradient(135deg, #e8f5ee 0%, #f0faf2 50%, #d8f3dc 100%);
  }
  .hero-bg {
    position: absolute; inset: 0;
    background-image: url('https://fizzyproducts.com/cdn/shop/files/Fizzy-Mushroom-Man3.jpg?v=1755127709&width=1920');
    background-size: cover; background-position: center 30%;
    opacity: 0.13;
    animation: heroBgZoom 14s ease-in-out infinite alternate;
    transform-origin: center 35%;
    will-change: transform;
  }
  @keyframes heroBgZoom {
    0%   { transform: scale(1)    translateY(0px); }
    40%  { transform: scale(1.05) translateY(-6px); }
    100% { transform: scale(1.12) translateY(-12px); }
  }
  .hero-vignette {
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 30% 50%, transparent 20%, rgba(240,250,242,0.6) 100%);
  }
  /* liquid morphing shape on hero */
  .hero-liquid {
    position: absolute;
    right: -80px; top: -60px;
    width: 720px; height: 720px;
    background: radial-gradient(circle at 40% 40%, rgba(116,198,157,0.35) 0%, rgba(183,228,199,0.2) 50%, transparent 70%);
    border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%;
    animation: liquidMorph 12s ease-in-out infinite;
    pointer-events: none;
  }
  .hero-liquid-2 {
    position: absolute;
    left: -60px; bottom: -80px;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(45,106,79,0.1) 0%, rgba(116,198,157,0.08) 50%, transparent 70%);
    border-radius: 40% 60% 30% 70% / 60% 40% 60% 40%;
    animation: liquidMorph 16s ease-in-out infinite reverse;
    pointer-events: none;
  }
  @keyframes liquidMorph {
    0%,100% { border-radius: 60% 40% 70% 30% / 50% 60% 40% 50%; transform: rotate(0deg) scale(1); }
    25%      { border-radius: 40% 60% 30% 70% / 60% 40% 70% 30%; transform: rotate(5deg) scale(1.05); }
    50%      { border-radius: 70% 30% 50% 50% / 30% 60% 40% 70%; transform: rotate(-3deg) scale(0.97); }
    75%      { border-radius: 30% 70% 60% 40% / 50% 30% 70% 50%; transform: rotate(4deg) scale(1.03); }
  }
  .hero-content {
    position: relative; z-index: 2;
    padding: 0 80px; max-width: 860px;
  }
  .hero-eyebrow {
    display: inline-flex; align-items: center; gap: 10px;
    font-size: 11px; letter-spacing: 0.35em; text-transform: uppercase;
    color: var(--green); margin-bottom: 24px; font-weight: 600;
    opacity: 0; animation: slideInLeft 0.8s 0.3s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .hero-eyebrow::before {
    content: ''; display: inline-block;
    width: 32px; height: 1.5px; background: var(--green);
  }
  @keyframes slideInLeft { from{transform:translateX(-30px);opacity:0} to{transform:translateX(0);opacity:1} }
  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(90px, 14vw, 164px);
    line-height: 0.88; color: var(--text-dark);
    margin-bottom: 32px;
    opacity: 0; animation: slideInLeft 0.9s 0.5s cubic-bezier(0.16,1,0.3,1) forwards;
    transition: color 0.6s cubic-bezier(0.16,1,0.3,1);
  }
  .hero-title.scrolled-red { color: var(--brand-red); }
  .hero-title span { color: var(--green); display: block; transition: color 0.6s cubic-bezier(0.16,1,0.3,1); }
  .hero-title.scrolled-red span { color: #c42e15; }

  /* ══════════════════════════════
     SEARCH MODAL
  ══════════════════════════════ */
  .search-overlay {
    position: fixed; inset: 0; z-index: 99500;
    background: rgba(26,46,34,0.55);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    display: flex; align-items: flex-start; justify-content: center;
    padding-top: 120px;
    animation: fadeIn 0.25s ease;
  }
  .search-box {
    background: white;
    width: 100%; max-width: 640px;
    padding: 0;
    box-shadow: 0 32px 80px rgba(0,0,0,0.22);
    border-radius: 6px;
    overflow: hidden;
    animation: slideUp 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .search-input-wrap {
    display: flex; align-items: center; gap: 14px;
    padding: 20px 24px;
    border-bottom: 1.5px solid rgba(45,106,79,0.12);
  }
  .search-icon { font-size: 20px; color: var(--green); flex-shrink: 0; }
  .search-field {
    flex: 1; border: none; outline: none;
    font-family: 'DM Sans', sans-serif;
    font-size: 18px; color: var(--text-dark);
    background: transparent;
    letter-spacing: 0.02em;
  }
  .search-field::placeholder { color: var(--text-muted); }
  .search-close {
    background: none; border: none; cursor: pointer;
    font-size: 22px; color: var(--text-muted);
    transition: color 0.2s; padding: 4px;
    line-height: 1;
  }
  .search-close:hover { color: var(--brand-red); }
  .search-suggestions { padding: 16px 24px 24px; }
  .search-hint { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 14px; }
  .search-tags { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 24px; }
  .search-tag {
    background: var(--green-faint); border: 1.5px solid var(--border);
    padding: 7px 18px; font-size: 13px; color: var(--text-mid);
    cursor: pointer; border-radius: 2px; font-family: 'DM Sans', sans-serif;
    transition: all 0.2s;
  }
  .search-tag:hover { background: var(--green); color: white; border-color: var(--green); }
  .search-results { display: flex; flex-direction: column; gap: 2px; }
  .search-result-item {
    display: flex; align-items: center; gap: 16px;
    padding: 12px 14px; cursor: pointer; border-radius: 4px;
    transition: background 0.15s;
  }
  .search-result-item:hover { background: var(--green-faint); }
  .search-result-img { width: 48px; height: 48px; object-fit: cover; border-radius: 4px; flex-shrink: 0; background: var(--green-faint); }
  .search-result-name { font-size: 14px; color: var(--text-dark); font-weight: 500; }
  .search-result-price { font-size: 13px; color: var(--text-muted); margin-top: 2px; }
  .hero-sub {
    font-size: 17px; line-height: 1.75;
    color: var(--text-mid); max-width: 460px;
    margin-bottom: 52px; font-weight: 300;
    opacity: 0; animation: slideInLeft 0.9s 0.7s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .hero-ctas {
    display: flex; gap: 16px; align-items: center;
    opacity: 0; animation: slideInLeft 0.9s 0.9s cubic-bezier(0.16,1,0.3,1) forwards;
  }
  .btn-primary {
    background: var(--green); color: white; border: none;
    padding: 18px 44px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px; letter-spacing: 0.12em; cursor: pointer;
    transition: all 0.25s; position: relative; overflow: hidden; border-radius: 2px;
  }
  .btn-primary::before {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 55%);
    opacity: 0; transition: opacity 0.25s;
  }
  .btn-primary:hover { background: var(--green-mid); transform: translateY(-3px); box-shadow: 0 14px 38px rgba(45,106,79,0.42); }
  .btn-primary:hover::before { opacity: 1; }
  /* ripple on btn-primary */
  .btn-primary .ripple {
    position: absolute; border-radius: 50%;
    background: rgba(255,255,255,0.3);
    transform: scale(0); animation: rippleAnim 0.6s linear;
    pointer-events: none;
  }
  @keyframes rippleAnim { to { transform: scale(4); opacity: 0; } }
  .btn-ghost {
    background: transparent; color: var(--green);
    border: 1.5px solid var(--green-pale);
    padding: 18px 38px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px; letter-spacing: 0.12em; cursor: pointer;
    transition: all 0.25s; border-radius: 2px;
  }
  .btn-ghost:hover { border-color: var(--green); background: rgba(45,106,79,0.06); transform: translateY(-3px); }
  .hero-scroll {
    position: absolute; bottom: 44px; left: 50%;
    transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    color: var(--text-muted); font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; z-index: 2;
  }
  .scroll-line {
    width: 1.5px; height: 44px;
    background: linear-gradient(to bottom, var(--green), transparent);
    animation: scrollAnim 2s ease-in-out infinite;
  }
  @keyframes scrollAnim {
    0%{opacity:0;transform:scaleY(0);transform-origin:top}
    50%{opacity:1;transform:scaleY(1)}
    100%{opacity:0;transform:scaleY(1);transform-origin:bottom}
  }
  .hero-stat-strip {
    position: absolute; right: 80px; bottom: 80px;
    display: flex; flex-direction: column; gap: 24px; z-index: 2;
    opacity: 0; animation: fadeInRight 1s 1.2s forwards;
  }
  @keyframes fadeInRight { from{transform:translateX(20px);opacity:0} to{transform:translateX(0);opacity:1} }
  .hero-stat { text-align: right; }
  .hero-stat-num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 42px; color: var(--green); line-height: 1;
  }
  .hero-stat-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--text-muted); }

  /* ══════════════════════════════
     VIBE PILLS
  ══════════════════════════════ */
  .vibes {
    padding: 44px 80px;
    display: flex; gap: 12px; align-items: center;
    border-bottom: 1px solid var(--border);
    overflow-x: auto; scrollbar-width: none;
    background: rgba(255,255,255,0.6);
    backdrop-filter: blur(10px);
    position: relative; z-index: 1;
  }
  .vibes::-webkit-scrollbar { display: none; }
  .vibe-label { font-size: 11px; letter-spacing: 0.25em; color: var(--text-muted); text-transform: uppercase; margin-right: 10px; white-space: nowrap; }
  .vibe-pill {
    padding: 10px 28px;
    border: 1.5px solid var(--border-mid);
    color: var(--text-mid); font-size: 12px; letter-spacing: 0.14em;
    text-transform: uppercase; cursor: pointer;
    background: white; font-family: 'DM Sans', sans-serif; font-weight: 500;
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    white-space: nowrap; position: relative; overflow: hidden;
    border-radius: 2px;
  }
  .vibe-pill::before {
    content: '';
    position: absolute; inset: 0;
    background: var(--green);
    transform: translateY(100%);
    transition: transform 0.35s cubic-bezier(0.16,1,0.3,1);
    z-index: 0;
  }
  .vibe-pill span { position: relative; z-index: 1; }
  .vibe-pill:hover::before, .vibe-pill.active::before { transform: translateY(0); }
  .vibe-pill:hover, .vibe-pill.active { border-color: var(--green); color: white; }

  /* ══════════════════════════════
     SECTION HEADERS
  ══════════════════════════════ */
  .section-header {
    padding: 88px 80px 52px;
    display: flex; align-items: flex-end; justify-content: space-between;
    position: relative; z-index: 1;
  }
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(52px, 6.5vw, 84px);
    line-height: 0.95; color: var(--text-dark);
  }
  .section-sub { font-size: 14px; color: var(--text-muted); max-width: 340px; line-height: 1.8; text-align: right; }

  /* ══════════════════════════════
     PRODUCT CARDS
  ══════════════════════════════ */
  .products {
    padding: 0 80px 100px;
    display: grid; grid-template-columns: repeat(2,1fr);
    gap: 3px; background: var(--border);
    position: relative; z-index: 1;
  }
  .product-card {
    position: relative; overflow: hidden; cursor: pointer;
    background: white;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .product-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); z-index: 2; }
  .product-img-wrap { height: 440px; overflow: hidden; position: relative; background: var(--green-faint); }
  .product-img-wrap img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform 0.7s cubic-bezier(0.16,1,0.3,1), opacity 0.4s; display: block;
  }
  .product-card:hover .product-img-wrap img { transform: scale(1.07); }
  .product-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(247,250,246,0.95) 0%, transparent 55%);
  }
  /* liquid shimmer on card hover */
  .product-card::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(116,198,157,0.12) 0%, transparent 50%);
    opacity: 0; transition: opacity 0.4s; pointer-events: none;
  }
  .product-card:hover::after { opacity: 1; }
  .product-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 28px 28px 32px; }
  .product-tag {
    display: inline-block; background: var(--green); color: white;
    font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase;
    padding: 4px 12px; margin-bottom: 12px; font-weight: 600; border-radius: 1px;
  }
  .product-name { font-family: 'Bebas Neue', sans-serif; font-size: 30px; color: var(--text-dark); margin-bottom: 6px; }
  .product-price { font-size: 17px; color: var(--text-mid); font-weight: 400; }
  .product-btn {
    position: absolute; top: 20px; right: 20px;
    background: rgba(255,255,255,0.88);
    border: 1.5px solid var(--green);
    color: var(--green); padding: 9px 20px;
    font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
    cursor: pointer; font-family: 'DM Sans', sans-serif; font-weight: 600;
    backdrop-filter: blur(8px);
    opacity: 0; transform: translateY(-6px);
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
    border-radius: 2px;
  }
  .product-btn:hover { background: var(--green); color: white; }
  .product-card:hover .product-btn { opacity: 1; transform: translateY(0); }

  /* ══════════════════════════════
     MARQUEE
  ══════════════════════════════ */
  .marquee-wrap {
    overflow: hidden;
    border-top: 1px solid var(--border); border-bottom: 1px solid var(--border);
    padding: 20px 0;
    background: linear-gradient(90deg, var(--green-faint), white, var(--green-faint));
    position: relative; z-index: 1;
  }
  .marquee-track { display: flex; animation: marquee 22s linear infinite; white-space: nowrap; }
  .marquee-track:hover { animation-play-state: paused; }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .marquee-item {
    font-family: 'Bebas Neue', sans-serif; font-size: 20px;
    letter-spacing: 0.1em; color: rgba(45,106,79,0.3);
    padding: 0 44px; flex-shrink: 0; transition: color 0.3s;
  }
  .marquee-item:hover { color: var(--green); }
  .marquee-item span { color: var(--green-light); }

  /* ══════════════════════════════
     CATEGORIES
  ══════════════════════════════ */
  .categories {
    display: grid; grid-template-columns: repeat(3,1fr);
    gap: 3px; margin: 0 80px 100px;
    background: var(--border); position: relative; z-index: 1;
  }
  .cat-item {
    position: relative; height: 500px; overflow: hidden; cursor: pointer;
    transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .cat-item:hover { transform: translateY(-4px); z-index: 2; box-shadow: var(--shadow-lg); }
  .cat-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.8s cubic-bezier(0.16,1,0.3,1); display: block; }
  .cat-item:hover .cat-img { transform: scale(1.09); }
  .cat-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(to top, rgba(247,250,246,0.97) 0%, rgba(247,250,246,0.15) 65%);
    transition: background 0.4s;
  }
  .cat-item:hover .cat-overlay { background: linear-gradient(to top, rgba(240,250,242,0.98) 0%, rgba(240,250,242,0.3) 65%); }
  /* green liquid tint on hover */
  .cat-item::after {
    content: '';
    position: absolute; inset: 0;
    background: linear-gradient(135deg, rgba(116,198,157,0.2) 0%, transparent 60%);
    opacity: 0; transition: opacity 0.4s; pointer-events: none;
  }
  .cat-item:hover::after { opacity: 1; }
  .cat-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 36px 30px; }
  .cat-number { font-family: 'Bebas Neue', sans-serif; font-size: 80px; color: rgba(45,106,79,0.1); line-height: 1; margin-bottom: -16px; }
  .cat-name { font-family: 'Bebas Neue', sans-serif; font-size: 46px; color: var(--text-dark); letter-spacing: 0.03em; margin-bottom: 10px; }
  .cat-desc { font-size: 13px; color: var(--text-muted); line-height: 1.65; font-weight: 300; }
  .cat-arrow {
    position: absolute; top: 24px; right: 24px;
    width: 44px; height: 44px;
    border: 1.5px solid var(--border-mid);
    background: rgba(255,255,255,0.8);
    display: flex; align-items: center; justify-content: center;
    color: var(--green); font-size: 18px;
    transition: all 0.3s; border-radius: 2px;
  }
  .cat-item:hover .cat-arrow { background: var(--green); border-color: var(--green); color: white; transform: rotate(45deg); }

  /* ══════════════════════════════
     TESTIMONIALS
  ══════════════════════════════ */
  .testimonials { padding: 0 80px 100px; position: relative; z-index: 1; }
  .testimonials-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 3px; background: var(--border); }
  .testimonial-card {
    background: white; padding: 44px 34px;
    display: flex; flex-direction: column; gap: 18px;
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s;
    position: relative; overflow: hidden;
  }
  .testimonial-card::before {
    content: '"';
    position: absolute; top: 16px; right: 24px;
    font-family: 'Bebas Neue', sans-serif; font-size: 120px;
    color: rgba(45,106,79,0.06); line-height: 1; pointer-events: none;
  }
  /* liquid blob accent */
  .testimonial-card::after {
    content: '';
    position: absolute; width: 180px; height: 180px;
    background: radial-gradient(circle, rgba(116,198,157,0.18) 0%, transparent 70%);
    bottom: -60px; left: -40px; border-radius: 50%;
    transition: transform 0.5s; pointer-events: none;
  }
  .testimonial-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-lg); }
  .testimonial-card:hover::after { transform: scale(1.3); }
  .test-product { font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: var(--green); font-weight: 600; }
  .test-stars { color: #f4a61d; font-size: 15px; letter-spacing: 3px; }
  .test-quote { font-size: 14px; line-height: 1.8; color: var(--text-mid); font-weight: 300; font-style: italic; flex: 1; position: relative; z-index: 1; }
  .test-author { font-size: 12px; font-weight: 600; color: var(--text-dark); letter-spacing: 0.06em; }

  /* ══════════════════════════════
     RETAILER BANNER
  ══════════════════════════════ */
  .retailer {
    margin: 0 80px 100px; padding: 80px;
    background: linear-gradient(135deg, var(--green) 0%, var(--green-mid) 100%);
    position: relative; overflow: hidden;
  }
  /* liquid shapes inside retailer */
  .retailer::before {
    content: '';
    position: absolute;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%);
    top: -150px; right: -100px; border-radius: 50%;
    animation: blobFloat 14s ease-in-out infinite;
  }
  .retailer::after {
    content: '';
    position: absolute;
    width: 300px; height: 300px;
    background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
    bottom: -80px; left: 30%; border-radius: 50%;
    animation: blobFloat 18s ease-in-out infinite reverse;
  }
  .retailer-bg-text {
    position: absolute; right: -40px; top: 50%; transform: translateY(-50%);
    font-family: 'Bebas Neue', sans-serif; font-size: 220px;
    color: rgba(255,255,255,0.06); line-height: 1; pointer-events: none; white-space: nowrap;
  }
  .retailer-content { position: relative; z-index: 1; max-width: 560px; }
  .retailer-tag { font-size: 10px; letter-spacing: 0.28em; text-transform: uppercase; color: rgba(255,255,255,0.65); margin-bottom: 16px; }
  .retailer-title { font-family: 'Bebas Neue', sans-serif; font-size: 68px; line-height: 0.93; color: white; margin-bottom: 20px; }
  .retailer-desc { font-size: 15px; line-height: 1.75; color: rgba(255,255,255,0.82); margin-bottom: 36px; font-weight: 300; }
  .btn-white {
    background: white; color: var(--green); border: none;
    padding: 16px 40px; font-family: 'Bebas Neue', sans-serif;
    font-size: 20px; letter-spacing: 0.12em; cursor: pointer;
    transition: all 0.25s; border-radius: 2px; position: relative; overflow: hidden;
  }
  .btn-white::before { content:''; position:absolute; inset:0; background:rgba(45,106,79,0.08); opacity:0; transition:opacity 0.2s; }
  .btn-white:hover { transform: translateY(-3px); box-shadow: 0 12px 32px rgba(0,0,0,0.2); }
  .btn-white:hover::before { opacity: 1; }

  /* ══════════════════════════════
     EMAIL SECTION
  ══════════════════════════════ */
  .email-section {
    padding: 110px 80px; text-align: center;
    background: linear-gradient(180deg, var(--off-white) 0%, var(--green-ultra) 100%);
    position: relative; overflow: hidden;
  }
  .email-glow {
    position: absolute; width: 700px; height: 500px;
    background: radial-gradient(ellipse, rgba(116,198,157,0.22) 0%, transparent 70%);
    top: 50%; left: 50%; transform: translate(-50%,-50%); pointer-events: none;
    animation: pulse 6s ease-in-out infinite;
  }
  @keyframes pulse { 0%,100%{opacity:1;transform:translate(-50%,-50%) scale(1)} 50%{opacity:0.7;transform:translate(-50%,-50%) scale(1.08)} }
  .email-eyebrow { font-size: 10px; letter-spacing: 0.35em; text-transform: uppercase; color: var(--green); margin-bottom: 20px; font-weight: 600; }
  .email-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(54px, 8vw, 100px); color: var(--text-dark);
    line-height: 0.93; margin-bottom: 20px; position: relative; z-index: 1;
  }
  .email-sub { font-size: 15px; color: var(--text-muted); max-width: 420px; margin: 0 auto 52px; line-height: 1.75; font-weight: 300; position: relative; z-index: 1; }
  .email-form { display: flex; max-width: 500px; margin: 0 auto; position: relative; z-index: 1; }
  .email-input {
    flex: 1; background: white;
    border: 1.5px solid var(--border-mid); border-right: none;
    color: var(--text-dark); padding: 16px 22px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .email-input::placeholder { color: var(--text-muted); }
  .email-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(45,106,79,0.08); }
  .email-btn {
    background: var(--green); color: white; border: none;
    padding: 16px 30px; font-family: 'Bebas Neue', sans-serif;
    font-size: 18px; letter-spacing: 0.1em; cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s; white-space: nowrap;
  }
  .email-btn:hover { background: var(--green-mid); box-shadow: 0 8px 24px rgba(45,106,79,0.35); }
  .email-note { margin-top: 18px; font-size: 11px; color: var(--text-muted); position: relative; z-index: 1; }

  /* ══════════════════════════════
     FOOTER
  ══════════════════════════════ */
  footer {
    border-top: 1px solid var(--border);
    padding: 64px 80px 44px;
    display: grid; grid-template-columns: 1.4fr 1fr 1fr 1fr; gap: 40px;
    background: white; position: relative; z-index: 1;
  }
  .footer-brand .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 44px; color: var(--green); margin-bottom: 14px; letter-spacing: 0.04em; }
  .footer-tagline { font-size: 13px; color: var(--text-muted); line-height: 1.75; max-width: 210px; }
  .footer-heading { font-size: 10px; letter-spacing: 0.24em; text-transform: uppercase; color: var(--text-dark); margin-bottom: 22px; font-weight: 600; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 13px; }
  .footer-links a { font-size: 14px; color: var(--text-muted); text-decoration: none; transition: color 0.2s; cursor: pointer; }
  .footer-links a:hover { color: var(--green); }
  .social-links { display: flex; gap: 14px; margin-top: 26px; }
  .social-link {
    width: 40px; height: 40px; border: 1.5px solid var(--border-mid);
    display: flex; align-items: center; justify-content: center;
    color: var(--text-muted); font-size: 13px; font-weight: 600;
    text-decoration: none; transition: all 0.25s; border-radius: 2px;
  }
  .social-link:hover { border-color: var(--green); color: var(--green); background: rgba(45,106,79,0.06); }
  .footer-bottom { border-top: 1px solid var(--border); margin-top: 40px; padding-top: 28px; display: flex; justify-content: space-between; align-items: center; grid-column: 1/-1; }
  .footer-bottom p { font-size: 12px; color: var(--text-muted); }
  .footer-bottom-links { display: flex; gap: 24px; }
  .footer-bottom-links a { font-size: 12px; color: var(--text-muted); text-decoration: none; transition: color 0.2s; }
  .footer-bottom-links a:hover { color: var(--green); }
  .payment-methods { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 20px; }
  .pay-badge { background: var(--green-faint); border: 1px solid var(--border); padding: 4px 10px; font-size: 10px; color: var(--text-muted); border-radius: 2px; }

  .disclaimer { padding: 24px 80px; border-top: 1px solid var(--border); background: white; }
  .disclaimer p { font-size: 11px; color: var(--text-muted); line-height: 1.75; max-width: 880px; opacity: 0.7; }

  /* ══════════════════════════════
     SUB PAGES
  ══════════════════════════════ */
  .page { min-height: 100vh; background: var(--off-white); position: relative; }
  .page-hero {
    padding: 120px 80px 80px;
    border-bottom: 1px solid var(--border);
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, var(--green-faint) 0%, white 60%, var(--green-ultra) 100%);
  }
  /* liquid in page hero */
  .page-hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse at 80% 40%, rgba(116,198,157,0.18) 0%, transparent 55%);
    pointer-events: none;
  }
  .page-hero::after {
    content: '';
    position: absolute;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(183,228,199,0.3) 0%, transparent 70%);
    top: -100px; right: -80px; border-radius: 50%;
    animation: blobFloat 14s ease-in-out infinite;
    pointer-events: none;
  }
  .page-hero-eyebrow {
    font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase;
    color: var(--green); margin-bottom: 20px; font-weight: 600;
    display: flex; align-items: center; gap: 12px; position: relative; z-index: 1;
  }
  .page-hero-eyebrow::before { content: ''; display: inline-block; width: 28px; height: 1.5px; background: var(--green); }
  .page-hero-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(64px,9vw,120px); line-height: 0.92; color: var(--text-dark); position: relative; z-index: 1; }
  .page-hero-title span { color: var(--green); }
  .page-hero-sub { font-size: 17px; color: var(--text-mid); max-width: 480px; margin-top: 24px; line-height: 1.7; font-weight: 300; position: relative; z-index: 1; }

  /* LOGIN */
  .login-wrap { min-height: 80vh; display: flex; align-items: center; justify-content: center; padding: 80px; }
  .login-box {
    background: white; border: 1.5px solid var(--border-mid);
    padding: 60px; width: 100%; max-width: 460px;
    position: relative; overflow: hidden;
    box-shadow: var(--shadow-lg); border-radius: 4px;
  }
  .login-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--green), var(--green-light), var(--green)); background-size: 200%; animation: gradShift 3s linear infinite; }
  /* liquid blob in login */
  .login-box::after { content: ''; position: absolute; width: 260px; height: 260px; background: radial-gradient(circle, rgba(116,198,157,0.14) 0%, transparent 70%); bottom: -80px; right: -60px; border-radius: 50%; pointer-events: none; animation: blobFloat 12s ease-in-out infinite; }
  .login-title { font-family: 'Bebas Neue', sans-serif; font-size: 48px; color: var(--text-dark); margin-bottom: 8px; }
  .login-sub { font-size: 14px; color: var(--text-muted); margin-bottom: 40px; }
  .login-field { margin-bottom: 20px; }
  .login-label { display: block; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; font-weight: 600; }
  .login-input {
    width: 100%; background: var(--green-faint); border: 1.5px solid var(--border);
    color: var(--text-dark); padding: 14px 18px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .login-input::placeholder { color: var(--text-muted); }
  .login-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(45,106,79,0.1); background: white; }
  .btn-login {
    width: 100%; background: var(--green); color: white; border: none; padding: 16px;
    font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.12em;
    cursor: pointer; transition: all 0.25s; margin-top: 8px; border-radius: 2px;
    position: relative; overflow: hidden;
  }
  .btn-login::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,0.18) 0%,transparent 60%); opacity:0; transition:opacity 0.2s; }
  .btn-login:hover { background: var(--green-mid); transform: translateY(-2px); box-shadow: 0 10px 30px rgba(45,106,79,0.38); }
  .btn-login:hover::before { opacity: 1; }
  .login-divider { text-align: center; margin: 24px 0; color: var(--text-muted); font-size: 12px; position: relative; }
  .login-divider::before, .login-divider::after { content: ''; position: absolute; top: 50%; width: 42%; height: 1px; background: var(--border); }
  .login-divider::before { left: 0; } .login-divider::after { right: 0; }
  .login-footer-links { text-align: center; font-size: 13px; color: var(--text-muted); }
  .login-footer-links a { color: var(--green); text-decoration: none; cursor: pointer; }
  .login-footer-links a:hover { color: var(--green-mid); }

  /* CART */
  .cart-wrap { padding: 60px 80px 100px; display: grid; grid-template-columns: 1fr 380px; gap: 60px; }
  .cart-items { display: flex; flex-direction: column; gap: 3px; background: var(--border); }
  .cart-item { display: flex; gap: 24px; padding: 28px; background: white; align-items: center; transition: box-shadow 0.2s, transform 0.2s; }
  .cart-item:hover { box-shadow: var(--shadow-md); transform: translateY(-2px); z-index: 1; position: relative; }
  .cart-item-img { width: 80px; height: 80px; object-fit: cover; flex-shrink: 0; background: var(--green-faint); }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-family: 'Bebas Neue', sans-serif; font-size: 20px; color: var(--text-dark); margin-bottom: 4px; }
  .cart-item-price { font-size: 14px; color: var(--text-muted); }
  .cart-qty { display: flex; align-items: center; gap: 14px; }
  .qty-btn { background: var(--green-faint); border: 1.5px solid var(--border-mid); color: var(--text-dark); width: 32px; height: 32px; cursor: pointer; transition: all 0.2s; font-size: 16px; display:flex;align-items:center;justify-content:center; border-radius: 2px; }
  .qty-btn:hover { border-color: var(--green); color: var(--green); background: white; }
  .cart-summary { background: white; border: 1.5px solid var(--border-mid); padding: 40px; height: fit-content; position: sticky; top: 120px; box-shadow: var(--shadow-md); border-radius: 4px; }
  .cart-summary-title { font-family: 'Bebas Neue', sans-serif; font-size: 28px; color: var(--text-dark); margin-bottom: 28px; }
  .cart-line { display: flex; justify-content: space-between; margin-bottom: 14px; font-size: 14px; }
  .cart-line span:first-child { color: var(--text-muted); }
  .cart-total { border-top: 1.5px solid var(--border); padding-top: 20px; margin-top: 20px; font-size: 18px; font-weight: 600; color: var(--text-dark); }
  .cart-remove { background: none; border: none; color: var(--text-muted); cursor: pointer; transition: color 0.2s; font-size: 18px; }
  .cart-remove:hover { color: #e53e3e; }
  .cart-empty { text-align: center; padding: 100px 40px; }
  .cart-empty-title { font-family: 'Bebas Neue', sans-serif; font-size: 52px; color: var(--green-pale); margin-bottom: 20px; }

  /* ABOUT */
  .about-hero-img { width: 100%; height: 500px; object-fit: cover; display: block; }
  .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; padding: 80px; }
  .about-stat-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 3px; background: var(--border); margin: 0 80px 80px; }
  .about-stat-box {
    background: white; padding: 48px 32px; text-align: center;
    transition: transform 0.3s, box-shadow 0.3s;
    position: relative; overflow: hidden;
  }
  .about-stat-box::after { content: ''; position: absolute; width: 120px; height: 120px; background: radial-gradient(circle, rgba(116,198,157,0.15) 0%, transparent 70%); bottom: -40px; right: -30px; border-radius: 50%; pointer-events: none; }
  .about-stat-box:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
  .about-stat-num { font-family: 'Bebas Neue', sans-serif; font-size: 64px; color: var(--green); line-height: 1; }
  .about-stat-label { font-size: 12px; letter-spacing: 0.18em; text-transform: uppercase; color: var(--text-muted); margin-top: 8px; }
  .about-mission-text { font-size: 21px; line-height: 1.7; color: var(--text-mid); font-weight: 300; }
  .about-values { display: flex; flex-direction: column; gap: 0; }
  .about-value { padding: 28px 0; border-bottom: 1.5px solid var(--border); transition: padding-left 0.3s; }
  .about-value:hover { padding-left: 12px; }
  .about-value-name { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--text-dark); margin-bottom: 8px; }
  .about-value-desc { font-size: 14px; color: var(--text-muted); line-height: 1.7; }

  /* WHOLESALE */
  .wholesale-wrap { padding: 60px 80px 100px; display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: start; }
  .wholesale-features { display: flex; flex-direction: column; gap: 0; }
  .wholesale-feature { padding: 36px 0; border-bottom: 1.5px solid var(--border); display: flex; gap: 24px; transition: padding-left 0.3s; }
  .wholesale-feature:hover { padding-left: 8px; }
  .wf-icon { font-size: 28px; flex-shrink: 0; margin-top: 4px; }
  .wf-title { font-family: 'Bebas Neue', sans-serif; font-size: 26px; color: var(--text-dark); margin-bottom: 8px; }
  .wf-desc { font-size: 14px; color: var(--text-muted); line-height: 1.7; }
  .wholesale-form-box {
    background: white; border: 1.5px solid var(--border-mid);
    padding: 52px; position: sticky; top: 120px;
    overflow: hidden; box-shadow: var(--shadow-lg); border-radius: 4px;
  }
  .wholesale-form-box::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--green), var(--green-light), var(--green)); background-size: 200%; animation: gradShift 3s linear infinite; }
  .wholesale-form-box::after { content: ''; position: absolute; width: 300px; height: 300px; background: radial-gradient(circle, rgba(116,198,157,0.1) 0%, transparent 70%); bottom: -100px; right: -80px; border-radius: 50%; pointer-events: none; animation: blobFloat 14s ease-in-out infinite; }
  .wholesale-input {
    width: 100%; background: var(--green-faint); border: 1.5px solid var(--border);
    color: var(--text-dark); padding: 14px 18px;
    font-family: 'DM Sans', sans-serif; font-size: 14px; outline: none;
    transition: border-color 0.2s, box-shadow 0.2s; margin-bottom: 16px; display: block;
  }
  .wholesale-input::placeholder { color: var(--text-muted); }
  .wholesale-input:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(45,106,79,0.1); background: white; }
  textarea.wholesale-input { resize: vertical; min-height: 120px; }
  .wholesale-select { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236b8a74' stroke-width='1.5' fill='none'/%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 16px center; }

  /* PRODUCTS FULL PAGE */
  .products-grid-full { display: grid; grid-template-columns: repeat(3, 1fr); gap: 3px; background: var(--border); }

  /* ══════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════ */
  .reveal { opacity: 0; transform: translateY(32px); transition: opacity 0.85s cubic-bezier(0.16,1,0.3,1), transform 0.85s cubic-bezier(0.16,1,0.3,1); }
  .reveal.visible { opacity: 1; transform: translateY(0); }

  /* staggered children */
  .reveal-stagger > * { opacity: 0; transform: translateY(24px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
  .reveal-stagger.visible > *:nth-child(1) { opacity:1; transform:translateY(0); transition-delay:0s; }
  .reveal-stagger.visible > *:nth-child(2) { opacity:1; transform:translateY(0); transition-delay:0.1s; }
  .reveal-stagger.visible > *:nth-child(3) { opacity:1; transform:translateY(0); transition-delay:0.2s; }
  .reveal-stagger.visible > *:nth-child(4) { opacity:1; transform:translateY(0); transition-delay:0.3s; }

  /* ══════════════════════════════
     GLASSMORPHISM CARD (floating)
  ══════════════════════════════ */
  .glass-card {
    background: rgba(255,255,255,0.7);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1.5px solid rgba(255,255,255,0.9);
    box-shadow: var(--shadow-md);
  }

  /* ══════════════════════════════
     RESPONSIVE
  ══════════════════════════════ */
  @media (max-width: 960px) {
    nav { padding: 14px 24px; }
    nav.scrolled { padding: 10px 24px; }
    .nav-links { display: none; }
    .hero-content { padding: 0 24px; }
    .hero-title { font-size: 72px; }
    .hero-stat-strip { display: none; }
    .vibes { padding: 36px 24px; }
    .section-header { padding: 60px 24px 36px; flex-direction: column; gap: 12px; align-items: flex-start; }
    .section-sub { text-align: left; max-width: 100%; }
    .products { padding: 0 24px 60px; grid-template-columns: 1fr; }
    .products-grid-full { grid-template-columns: 1fr; }
    .categories { grid-template-columns: 1fr; margin: 0 24px 60px; }
    .cat-item { height: 360px; }
    .retailer { margin: 0 24px 60px; padding: 48px 32px; }
    .retailer-title { font-size: 52px; }
    .testimonials { padding: 0 24px 60px; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .email-section { padding: 80px 24px; }
    footer { padding: 48px 24px 32px; grid-template-columns: 1fr 1fr; }
    .footer-bottom { flex-direction: column; gap: 14px; text-align: center; }
    .disclaimer { padding: 24px; }
    .page-hero { padding: 80px 24px 60px; }
    .cart-wrap { padding: 40px 24px 80px; grid-template-columns: 1fr; }
    .about-stat-grid { grid-template-columns: repeat(2,1fr); margin: 0 24px 60px; }
    .wholesale-wrap { grid-template-columns: 1fr; padding: 40px 24px 80px; }
    .about-grid { grid-template-columns: 1fr; gap: 40px; padding: 40px 24px; }
    .login-wrap { padding: 40px 24px; }
    .login-box { padding: 40px 28px; }
    .about-hero-img { height: 280px; }
    .blob-1 { width: 350px; height: 350px; }
    .blob-2 { width: 280px; height: 280px; }
    .blob-3 { display: none; }
  }
`;

/* ===================== DATA ===================== */
const products = [
  { name: "Mushroom Gummies — Blue Razz Fizz", price: "$19.99", tag: "Bestseller", vibe: "Elevate", img: "https://fizzyproducts.com/cdn/shop/files/Blue-Razz-Fizz_4d8b06b3-22da-45ac-8fe0-7987707f9342.png?v=1755127132&width=533", bg: "https://fizzyproducts.com/cdn/shop/files/Blue-Razz-Fizz-B.jpg?v=1755127131&width=533" },
  { name: "KAVA + Alkaloids Shot — POM Berry", price: "$9.99", tag: "Fan Favorite", vibe: "Calm", img: "https://fizzyproducts.com/cdn/shop/files/KAVA-POM-Berry-Trans.png?v=1756415877&width=533", bg: "https://fizzyproducts.com/cdn/shop/files/KAVA-POM-Berry-Bakc.jpg?v=1756415877&width=533" },
  { name: "Mushroom Gummies — Green Apple", price: "$19.99", tag: "New", vibe: "Focus", img: "https://fizzyproducts.com/cdn/shop/files/Green-Apple_daf5e1ae-78d8-4285-a53e-f01985b09476.png?v=1755127132&width=533", bg: "https://fizzyproducts.com/cdn/shop/collections/Fizzy-Mushroom-Picknick-Green-Apple.jpg?v=1755129737&width=800" },
  { name: "MIT Energy Shot — Original", price: "$9.99", tag: "Bestseller", vibe: "Focus", img: "https://fizzyproducts.com/cdn/shop/files/MIT-Shot-Trans.png?v=1756416000&width=533", bg: "https://fizzyproducts.com/cdn/shop/collections/Fizzy-352-Rooftop-Sunset.jpg?v=1756417147&width=800" },
];
const categories = [
  { name: "MIT", number: "01", desc: "The next evolution of Fizzy. Energy and focus — no crash, no jitters.", img: "https://fizzyproducts.com/cdn/shop/collections/Fizzy-352-Rooftop-Sunset.jpg?v=1756417147&width=800" },
  { name: "KAVA", number: "02", desc: "Your easy switch to calm. Each 2 oz shot delivers instant vacation mode.", img: "https://fizzyproducts.com/cdn/shop/collections/Fizzy-Beach-Sunset-KAVA-POM.jpg?v=1756419127&width=800" },
  { name: "Mushroom", number: "03", desc: "Functional mushrooms + nootropics. Vegan-friendly, lab-tested, bold flavors.", img: "https://fizzyproducts.com/cdn/shop/collections/Fizzy-Mushroom-Picknick-Green-Apple.jpg?v=1755129737&width=800" },
];
const testimonials = [
  { product: "Mushroom Gummies", quote: "Fizzy's Mushroom Gummies are my go-to when I need a clear, creative headspace. They hit in about 15 minutes and the flavor is seriously addictive.", author: "Jamie R., Portland OR", stars: 5 },
  { product: "KAVA Shots", quote: "Like instant vacation mode. I take one before social events and I'm relaxed but totally clear-headed. The POM Berry flavor is insane.", author: "Dana S., Seattle WA", stars: 5 },
  { product: "MIT Shots", quote: "My secret weapon for early mornings. Zero crash, zero jitters. I've completely changed how I start my day because of these.", author: "Alex M., Los Angeles CA", stars: 5 },
];
const marqueeItems = [
  "Fast-Acting","★","Lab Tested","★","Legal Everywhere","★","No THC","★","No Psilocybin","★",
  "Vegan Friendly","★","15 Min Onset","★","Bold Flavors","★","Shift Happens","★",
  "Fast-Acting","★","Lab Tested","★","Legal Everywhere","★","No THC","★","No Psilocybin","★",
  "Vegan Friendly","★","15 Min Onset","★","Bold Flavors","★","Shift Happens","★",
];

/* ===================== SUB-PAGES ===================== */
function LoginPage({ onNavigate }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const handle = (e) => { e.preventDefault(); setMsg("Welcome back! Redirecting…"); setTimeout(() => onNavigate("home"), 1500); };
  return (
    <div className="page">
      <div className="page-hero">
        <div className="page-hero-eyebrow">Account</div>
        <h1 className="page-hero-title">Sign <span>In.</span></h1>
        <p className="page-hero-sub">Welcome back to the Fizzy Fam.</p>
      </div>
      <div className="login-wrap">
        <div className="login-box">
          <div className="login-title">Sign In</div>
          <div className="login-sub">Enter your details below to continue.</div>
          <form onSubmit={handle}>
            <div className="login-field">
              <label className="login-label">Email</label>
              <input className="login-input" type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
            <div className="login-field">
              <label className="login-label">Password</label>
              <input className="login-input" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm({...form, password: e.target.value})} required />
            </div>
            {msg && <p style={{ color: "var(--green)", fontSize: 14, marginBottom: 14 }}>{msg}</p>}
            <button className="btn-login" type="submit">Enter The Fam</button>
          </form>
          <div className="login-divider">or</div>
          <div className="login-footer-links">
            <span>New here? </span><a onClick={() => {}}>Create an account</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a onClick={() => {}}>Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

function AboutPage({ onNavigate }) {
  return (
    <div className="page">
      <div className="page-hero">
        <div className="page-hero-eyebrow">Our Story</div>
        <h1 className="page-hero-title">We Built Fizzy<br /><span>For The Shift.</span></h1>
        <p className="page-hero-sub">Born out of frustration with supplements that do nothing — or too much — Fizzy is the real deal.</p>
      </div>
      <img className="about-hero-img" src="https://fizzyproducts.com/cdn/shop/files/Fizzy-Mushroom-Man3.jpg?v=1755127709&width=1920" alt="Fizzy Lifestyle" />
      <div className="about-stat-grid reveal-stagger">
        {[["15 Min","Onset Time"],["100%","Legal Nationwide"],["3+","Product Lines"],["21+","Age Required"]].map(([n,l]) => (
          <div key={l} className="about-stat-box">
            <div className="about-stat-num">{n}</div>
            <div className="about-stat-label">{l}</div>
          </div>
        ))}
      </div>
      <div className="about-grid reveal">
        <div>
          <p style={{fontSize:11,letterSpacing:"0.3em",textTransform:"uppercase",color:"var(--green)",marginBottom:20,fontWeight:600}}>Our Mission</p>
          <p className="about-mission-text">Fizzy exists to give you control over your mood, naturally. No pharmaceuticals. No gimmicks. Just legal, lab-tested ingredients that actually work — in 15 minutes or less.</p>
          <p className="about-mission-text" style={{marginTop:24}}>We believe mood modulation shouldn't require a prescription, a vice, or a wait. Shift Happens — on your terms.</p>
        </div>
        <div className="about-values">
          {[["Transparency","Every batch is third-party lab tested. Our COAs are public."],["Speed","We obsess over onset time. If it doesn't shift you in 15 minutes, we reformulate."],["Taste","Because supplements that taste like grass get ignored."],["Legality","Everything we sell is federally legal and compliant in all 50 states. 21+ only."]].map(([n,d]) => (
            <div key={n} className="about-value">
              <div className="about-value-name">{n}</div>
              <div className="about-value-desc">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function WholesalePage({ onNavigate }) {
  const [form, setForm] = useState({ name:"", business:"", email:"", phone:"", state:"", volume:"", message:"" });
  const [sent, setSent] = useState(false);
  const handle = (e) => { e.preventDefault(); setSent(true); };
  return (
    <div className="page">
      <div className="page-hero">
        <div className="page-hero-eyebrow">For Retailers</div>
        <h1 className="page-hero-title">Become A<br /><span>Fizzy Partner.</span></h1>
        <p className="page-hero-sub">Give your customers a reason to come back. Volume pricing, displays, and a dedicated rep.</p>
      </div>
      <div className="wholesale-wrap">
        <div className="wholesale-features reveal">
          {[["📦","Volume Pricing","Tiered wholesale pricing. The more you move, the more you save — no hidden minimums."],["🖼️","Display Kits","Every retailer gets branded shelf displays, signage, and compliant POS materials."],["⚡","Fast Shipping","Orders fulfilled in 48 hrs. Reorders ship same-day when placed before noon EST."],["🔬","Lab Reports","Full COA documentation for every SKU, ready for compliance teams."],["🤝","Dedicated Rep","A real human account manager — not a ticket system."]].map(([icon,title,desc]) => (
            <div key={title} className="wholesale-feature">
              <div className="wf-icon">{icon}</div>
              <div><div className="wf-title">{title}</div><div className="wf-desc">{desc}</div></div>
            </div>
          ))}
        </div>
        <div>
          <div className="wholesale-form-box reveal">
            {sent ? (
              <div style={{textAlign:"center",padding:"40px 0",position:"relative",zIndex:1}}>
                <div style={{fontFamily:"'Bebas Neue',sans-serif",fontSize:44,color:"var(--green)",marginBottom:12}}>Application Sent!</div>
                <p style={{fontSize:14,color:"var(--text-muted)",lineHeight:1.7}}>We'll be in touch within 24 hours.</p>
              </div>
            ) : (
              <div style={{position:"relative",zIndex:1}}>
                <div className="login-title" style={{marginBottom:8}}>Apply Now</div>
                <div className="login-sub" style={{marginBottom:32}}>Takes 2 minutes. Approval in 24 hrs.</div>
                <form onSubmit={handle}>
                  <input className="wholesale-input" placeholder="Your Name *" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required />
                  <input className="wholesale-input" placeholder="Business Name *" value={form.business} onChange={e=>setForm({...form,business:e.target.value})} required />
                  <input className="wholesale-input" type="email" placeholder="Email Address *" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required />
                  <input className="wholesale-input" placeholder="Phone Number" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} />
                  <input className="wholesale-input" placeholder="State / Location" value={form.state} onChange={e=>setForm({...form,state:e.target.value})} />
                  <select className="wholesale-input wholesale-select" value={form.volume} onChange={e=>setForm({...form,volume:e.target.value})}>
                    <option value="">Monthly Volume Estimate</option>
                    <option>Under $500</option><option>$500–$2,000</option><option>$2,000–$10,000</option><option>$10,000+</option>
                  </select>
                  <textarea className="wholesale-input" placeholder="Tell us about your store..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} />
                  <button className="btn-login" type="submit" style={{display:"block",width:"100%",marginTop:4}}>Submit Application</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsPage({ onNavigate }) {
  const [activeVibe, setActiveVibe] = useState("All");
  const [hovered, setHovered] = useState(null);
  const vibes = ["All","Calm","Elevate","Focus"];
  const filtered = activeVibe === "All" ? products : products.filter(p => p.vibe === activeVibe);
  return (
    <div className="page">
      <div className="page-hero">
        <div className="page-hero-eyebrow">The Line-Up</div>
        <h1 className="page-hero-title">All<br /><span>Products.</span></h1>
        <p className="page-hero-sub">Legal, lab-tested, built to hit in 15 minutes. Pick your vibe.</p>
      </div>
      <div className="vibes" style={{borderTop:"1px solid var(--border)"}}>
        <span className="vibe-label">Filter by vibe:</span>
        {vibes.map(v=><button key={v} className={`vibe-pill${activeVibe===v?" active":""}`} onClick={()=>setActiveVibe(v)}><span>{v}</span></button>)}
      </div>
      <div style={{padding:"0 80px 100px",position:"relative",zIndex:1}}>
        <div className="products-grid-full">
          {filtered.map((p,i)=>(
            <div key={i} className="product-card" style={{background:"white"}} onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}>
              <div className="product-img-wrap">
                <img src={hovered===i?p.bg:p.img} alt={p.name} />
                <div className="product-overlay"/>
              </div>
              <button className="product-btn">Add to Cart</button>
              <div className="product-info">
                <span className="product-tag">{p.tag} · {p.vibe}</span>
                <div className="product-name">{p.name}</div>
                <div className="product-price">{p.price} USD</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CartPage({ onNavigate, cartItems, updateCartQty }) {
  const items = cartItems;
  const updateQty = updateCartQty;
  const parsePrice = p => parseFloat(p.replace("$",""));
  const subtotal = items.reduce((sum,i) => sum + parsePrice(i.price) * i.qty, 0);
  return (
    <div className="page">
      <div className="page-hero" style={{minHeight:"auto",paddingBottom:60}}>
        <div className="page-hero-eyebrow">Your Bag</div>
        <h1 className="page-hero-title">Cart<span>.</span></h1>
      </div>
      {items.length===0 ? (
        <div className="cart-empty">
          <div className="cart-empty-title">Your cart is empty.</div>
          <button className="btn-primary" onClick={()=>onNavigate("products")}>Shop Now</button>
        </div>
      ) : (
        <div className="cart-wrap reveal">
          <div>
            <div className="cart-items">
              {items.map((item,i)=>(
                <div key={i} className="cart-item">
                  <img className="cart-item-img" src={item.img} alt={item.name} />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-price">{item.price} USD</div>
                  </div>
                  <div className="cart-qty">
                    <button className="qty-btn" onClick={()=>updateQty(i,-1)}>−</button>
                    <span style={{fontSize:16,color:"var(--text-dark)"}}>{item.qty}</span>
                    <button className="qty-btn" onClick={()=>updateQty(i,1)}>+</button>
                  </div>
                  <button className="cart-remove" onClick={()=>updateQty(i,-999)}>✕</button>
                </div>
              ))}
            </div>
          </div>
          <div className="cart-summary">
            <div className="cart-summary-title">Order Summary</div>
            <div className="cart-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="cart-line"><span>Shipping</span><span>{subtotal>=50?"FREE":"$5.99"}</span></div>
            <div className="cart-line"><span>Discount</span><span>—</span></div>
            <div className="cart-total cart-line"><span>Total</span><span>${(subtotal+(subtotal>=50?0:5.99)).toFixed(2)}</span></div>
            <button className="btn-primary" style={{width:"100%",marginTop:28,textAlign:"center"}}>Checkout →</button>
            <p style={{fontSize:12,color:"var(--text-muted)",textAlign:"center",marginTop:16}}>Free shipping over $50 · 21+ only</p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ===================== MAIN APP ===================== */
export default function FizzyApp() {
  const [page, setPage] = useState("home");
  const [ageCleared, setAgeCleared] = useState(false);
  const [ageDenied, setAgeDenied] = useState(false);
  const [activeVibe, setActiveVibe] = useState("All");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [cursorHover, setCursorHover] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [heroTitleRed, setHeroTitleRed] = useState(false);
  const [cartItems, setCartItems] = useState([
    { ...products[0], qty: 1 },
    { ...products[1], qty: 2 },
  ]);

  const totalCartQty = cartItems.reduce((sum, i) => sum + i.qty, 0);

  const updateCartQty = (i, delta) => {
    setCartItems(prev => {
      const next = [...prev];
      const newQty = next[i].qty + delta;
      if (newQty < 1) { next.splice(i, 1); } else { next[i] = { ...next[i], qty: newQty }; }
      return next;
    });
  };
  const cursorRingRef = useRef({ x:0, y:0, targetX:0, targetY:0 });
  const ringEl = useRef(null);
  const dotEl = useRef(null);

  const vibes = ["All","Calm","Elevate","Focus"];
  const filtered = activeVibe==="All" ? products : products.filter(p=>p.vibe===activeVibe);

  /* cursor */
  useEffect(() => {
    const move = (e) => {
      if (dotEl.current) { dotEl.current.style.left=e.clientX+"px"; dotEl.current.style.top=e.clientY+"px"; }
      cursorRingRef.current.targetX = e.clientX;
      cursorRingRef.current.targetY = e.clientY;
    };
    window.addEventListener("mousemove", move);
    let raf;
    const animate = () => {
      if (ringEl.current) {
        cursorRingRef.current.x += (cursorRingRef.current.targetX - cursorRingRef.current.x) * 0.12;
        cursorRingRef.current.y += (cursorRingRef.current.targetY - cursorRingRef.current.y) * 0.12;
        ringEl.current.style.left = cursorRingRef.current.x+"px";
        ringEl.current.style.top  = cursorRingRef.current.y+"px";
      }
      raf = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener("mousemove",move); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const over = (e) => {
      const el = e.target.closest("button,a,.product-card,.cat-item,.vibe-pill,.about-stat-box,.testimonial-card");
      setCursorHover(!!el);
    };
    document.addEventListener("mouseover", over);
    return () => document.removeEventListener("mouseover", over);
  }, []);

  /* scroll */
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY>60);
      setHeroTitleRed(window.scrollY > 180);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
    }, { threshold: 0.1 });
    document.querySelectorAll(".reveal, .reveal-stagger").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, [page]);

  const navigate = (p) => { setPage(p); window.scrollTo(0,0); };
  const handleEmail = (e) => { e.preventDefault(); if (email) { setSubmitted(true); setEmail(""); } };

  /* ripple on btn-primary */
  const addRipple = (e) => {
    const btn = e.currentTarget;
    const r = document.createElement("span");
    const d = Math.max(btn.clientWidth, btn.clientHeight);
    r.style.cssText = `width:${d}px;height:${d}px;left:${e.clientX-btn.getBoundingClientRect().left-d/2}px;top:${e.clientY-btn.getBoundingClientRect().top-d/2}px;`;
    r.className = "ripple";
    btn.appendChild(r);
    setTimeout(() => r.remove(), 700);
  };

  return (
    <>
      <style>{globalStyle}</style>

      {/* Liquid blobs background */}
      <div className="blob-container" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      {/* Custom cursor */}
      <div ref={dotEl}  className={`cursor${cursorHover?" hover":""}`} />
      <div ref={ringEl} className={`cursor-ring${cursorHover?" hover":""}`} />

      {/* Age Gate */}
      {!ageCleared && !ageDenied && (
        <div className="age-gate-overlay">
          <div className="age-gate-box">
            <div className="age-gate-logo"><span className="age-gate-asterisk">✳</span>Fizzy</div>
            <div className="age-gate-title">Are You 21 or Older?</div>
            <div className="age-gate-sub">Fizzy products are intended for adults 21 and over only. Please confirm your age to continue.</div>
            <div className="age-gate-btns">
              <button className="age-btn-yes" onClick={()=>setAgeCleared(true)}>Yes, I'm 21+</button>
              <button className="age-btn-no"  onClick={()=>setAgeDenied(true)}>No</button>
            </div>
            <div className="age-gate-legal">By entering you agree to our <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>. Must be 21+.</div>
          </div>
        </div>
      )}
      {ageDenied && (
        <div className="age-gate-overlay">
          <div className="age-gate-box">
            <div className="age-gate-logo"><span className="age-gate-asterisk">✳</span>Fizzy</div>
            <div className="age-denied">Sorry, you must be<br />21+ to enter.</div>
            <div className="age-gate-legal">This site is restricted to adults 21 and older.</div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      {searchOpen && (
        <div className="search-overlay" onClick={(e)=>{ if(e.target.classList.contains("search-overlay")) setSearchOpen(false); }}>
          <div className="search-box">
            <div className="search-input-wrap">
              <span className="search-icon">⌕</span>
              <input
                className="search-field"
                autoFocus
                placeholder="Search products, vibes, ingredients…"
                value={searchQuery}
                onChange={e=>setSearchQuery(e.target.value)}
                onKeyDown={e=>{ if(e.key==="Escape") setSearchOpen(false); if(e.key==="Enter"){ setSearchOpen(false); navigate("products"); } }}
              />
              <button className="search-close" onClick={()=>setSearchOpen(false)}>✕</button>
            </div>
            <div className="search-suggestions">
              {!searchQuery && (
                <>
                  <div className="search-hint">Popular Searches</div>
                  <div className="search-tags">
                    {["Mushroom Gummies","KAVA Shots","MIT Shots","Calm","Elevate","Focus"].map(t=>(
                      <button key={t} className="search-tag" onClick={()=>{ setSearchOpen(false); navigate("products"); }}>{t}</button>
                    ))}
                  </div>
                </>
              )}
              <div className="search-hint">{searchQuery ? "Results" : "All Products"}</div>
              <div className="search-results">
                {products.filter(p=>!searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.vibe.toLowerCase().includes(searchQuery.toLowerCase())).map((p,i)=>(
                  <div key={i} className="search-result-item" onClick={()=>{ setSearchOpen(false); navigate("products"); }}>
                    <img className="search-result-img" src={p.img} alt={p.name} />
                    <div>
                      <div className="search-result-name">{p.name}</div>
                      <div className="search-result-price">{p.price} · {p.vibe}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="announce">
  <div className="ticker-wrap">
    <div className="ticker">
      <span>🌿 Become a retailer — <a onClick={()=>navigate("wholesale")}>Bulk pricing available</a></span>
      <span>🚚 Free shipping on orders over $50</span>
      <span>✨ New Summer Collection Live</span>
      <span>💚 100% Natural Ingredients</span>
    </div>
  </div>
</div>

      {/* Nav */}
      <nav className={scrolled?"scrolled":""}>
        <div className="nav-logo" onClick={()=>navigate("home")}>✳ Fizzy</div>
        <ul className="nav-links">
          <li><a onClick={()=>navigate("products")}>Products</a></li>
          <li><a onClick={()=>navigate("about")}>About</a></li>
          <li><a onClick={()=>navigate("wholesale")}>Wholesale / Retail</a></li>
        </ul>
        <div className="nav-right">
          <button className="nav-icon-btn" onClick={()=>setSearchOpen(true)}>⌕</button>
          <a style={{color:"var(--text-muted)",fontSize:13,textDecoration:"none",letterSpacing:"0.04em",cursor:"pointer",transition:"color 0.2s"}} onMouseOver={e=>e.target.style.color="var(--green)"} onMouseOut={e=>e.target.style.color="var(--text-muted)"} onClick={()=>navigate("login")}>Log in</a>
          <button className="btn-cart" onClick={()=>navigate("cart")}>Cart ({totalCartQty})</button>
        </div>
      </nav>

      {/* Sub pages */}
      {page==="login"     && <LoginPage    onNavigate={navigate} />}
      {page==="about"     && <AboutPage    onNavigate={navigate} />}
      {page==="wholesale" && <WholesalePage onNavigate={navigate} />}
      {page==="products"  && <ProductsPage  onNavigate={navigate} />}
      {page==="cart"      && <CartPage      onNavigate={navigate} cartItems={cartItems} updateCartQty={updateCartQty} />}

      {/* ═══════ HOME PAGE ═══════ */}
      {page==="home" && (
        <>
          {/* HERO */}
          <section className="hero">
            <div className="hero-bg" />
            <div className="hero-vignette" />
            <div className="hero-liquid" />
            <div className="hero-liquid-2" />
            <div className="hero-content">
              <p className="hero-eyebrow">Fast-Acting · Legal · Natural</p>
              <h1 className={`hero-title${heroTitleRed?" scrolled-red":""}`}>Shift<span>Happens.</span></h1>
              <p className="hero-sub">Mood-modulating supplements that work in 15 minutes. No fluff. No waiting. Just legal, naturally-sourced ingredients that shift your state — on your terms.</p>
              <div className="hero-ctas">
                <button className="btn-primary" onClick={(e)=>{ addRipple(e); navigate("products"); }}>Shop By Vibe</button>
                <button className="btn-ghost"   onClick={()=>navigate("about")}>Our Story</button>
              </div>
            </div>
            <div className="hero-stat-strip">
              {[["15 Min","Onset Time"],["100%","Legal & Compliant"],["3","Product Lines"]].map(([n,l])=>(
                <div key={l} className="hero-stat">
                  <div className="hero-stat-num">{n}</div>
                  <div className="hero-stat-label">{l}</div>
                </div>
              ))}
            </div>
            <div className="hero-scroll"><div className="scroll-line"/><span>Scroll</span></div>
          </section>

          {/* Vibe Pills */}
          <div className="vibes reveal">
            <span className="vibe-label">Filter by vibe:</span>
            {vibes.map(v=><button key={v} className={`vibe-pill${activeVibe===v?" active":""}`} onClick={()=>setActiveVibe(v)}><span>{v}</span></button>)}
          </div>

          {/* Best Sellers */}
          <div className="section-header reveal">
            <h2 className="section-title">Best<br />Sellers</h2>
            <p className="section-sub">Pick your vibe, make the shift. Whether you're ramping up or dialing back, Fizzy delivers.</p>
          </div>
          <div className="products reveal">
            {filtered.map((p,i)=>(
              <div key={i} className="product-card" onMouseEnter={()=>setHovered(i)} onMouseLeave={()=>setHovered(null)}>
                <div className="product-img-wrap">
                  <img src={hovered===i?p.bg:p.img} alt={p.name} />
                  <div className="product-overlay"/>
                </div>
                <button className="product-btn" onClick={()=>navigate("cart")}>Add to Cart</button>
                <div className="product-info">
                  <span className="product-tag">{p.tag} · {p.vibe}</span>
                  <div className="product-name">{p.name}</div>
                  <div className="product-price">{p.price} USD</div>
                </div>
              </div>
            ))}
          </div>

          {/* Marquee */}
          <div className="marquee-wrap">
            <div className="marquee-track">
              {marqueeItems.map((item,i)=><span key={i} className="marquee-item">{item==="★"?<span>★</span>:item}</span>)}
            </div>
          </div>

          {/* Categories */}
          <div className="section-header reveal" style={{marginTop:100}}>
            <h2 className="section-title">How Do You<br />Want To Shift?</h2>
            <p className="section-sub">Three product lines, one mission — give you complete control over your mood.</p>
          </div>
          <div className="categories reveal-stagger">
            {categories.map((c,i)=>(
              <div key={i} className="cat-item" onClick={()=>navigate("products")}>
                <img className="cat-img" src={c.img} alt={c.name} />
                <div className="cat-overlay"/>
                <div className="cat-arrow">→</div>
                <div className="cat-content">
                  <div className="cat-number">{c.number}</div>
                  <div className="cat-name">{c.name}</div>
                  <p className="cat-desc">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="section-header reveal">
            <h2 className="section-title">The Fizzy<br />Fam Speaks</h2>
            <p className="section-sub">Real people, real shifts. Here's what they're saying.</p>
          </div>
          <div className="testimonials reveal-stagger">
            <div className="testimonials-grid">
              {testimonials.map((t,i)=>(
                <div key={i} className="testimonial-card">
                  <div className="test-product">{t.product}</div>
                  <div className="test-stars">{"★".repeat(t.stars)}</div>
                  <p className="test-quote">"{t.quote}"</p>
                  <div className="test-author">— {t.author}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Retailer */}
          <div className="retailer reveal">
            <div className="retailer-bg-text">RETAIL</div>
            <div className="retailer-content">
              <div className="retailer-tag">For Business Owners</div>
              <h2 className="retailer-title">Become A<br />Fizzy Retailer</h2>
              <p className="retailer-desc">Fizzy delivers mood on demand. Every product hits fast, tastes great, and gives customers a reason to come back. Eye-catching displays, compliant assets, and volume pricing.</p>
              <button className="btn-white" onClick={()=>navigate("wholesale")}>Apply Now</button>
            </div>
          </div>

          {/* Email */}
          <section className="email-section reveal">
            <div className="email-glow"/>
            <p className="email-eyebrow">Insiders Feel It First</p>
            <h2 className="email-title">Join The<br />Fizzy Fam.</h2>
            <p className="email-sub">New drops, exclusive deals, and secret events. Sign up and get 10% off your first order.</p>
            {submitted ? (
              <p style={{color:"var(--green)",fontFamily:"'Bebas Neue',sans-serif",fontSize:30,letterSpacing:"0.1em",position:"relative",zIndex:1}}>You're in! Check your inbox. 🌿</p>
            ) : (
              <form className="email-form" onSubmit={handleEmail}>
                <input className="email-input" type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
                <button className="email-btn" type="submit">Get 10% Off</button>
              </form>
            )}
            <p className="email-note">No spam. Unsubscribe anytime. 21+ only.</p>
          </section>

          {/* Footer */}
          <footer>
            <div className="footer-brand">
              <div className="footer-logo">✳ Fizzy</div>
              <p className="footer-tagline">Fizzy exists to help you shift your mood, anytime, legally and naturally.</p>
              <div className="social-links">
                <a className="social-link" href="https://www.facebook.com/FizzyProducts28" target="_blank" rel="noreferrer">f</a>
                <a className="social-link" href="https://www.instagram.com/fizzy_products" target="_blank" rel="noreferrer">ig</a>
                <a className="social-link" href="https://www.tiktok.com/@fizzy_products" target="_blank" rel="noreferrer">tt</a>
              </div>
            </div>
            <div>
              <div className="footer-heading">Shop</div>
              <ul className="footer-links">
                {["All Products","Mushroom Gummies","KAVA Shots","MIT Shots","Bestsellers"].map(t=><li key={t}><a onClick={()=>navigate("products")}>{t}</a></li>)}
              </ul>
            </div>
            <div>
              <div className="footer-heading">Company</div>
              <ul className="footer-links">
                <li><a onClick={()=>navigate("about")}>About Fizzy</a></li>
                <li><a onClick={()=>navigate("wholesale")}>Wholesale / Retailers</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Lab Reports (COA)</a></li>
              </ul>
            </div>
            <div>
              <div className="footer-heading">Payment</div>
              <div className="payment-methods">{["Visa","Mastercard","Amex","Apple Pay","Google Pay","PayPal","Shop Pay"].map(m=><span key={m} className="pay-badge">{m}</span>)}</div>
              <div style={{marginTop:24}}>
                <div className="footer-heading">Legal</div>
                <ul className="footer-links">
                  <li><a href="#">Privacy Policy</a></li>
                  <li><a href="#">Terms of Service</a></li>
                  <li><a href="#">Refund Policy</a></li>
                </ul>
              </div>
            </div>
            <div className="footer-bottom">
              <p>© 2026 Fizzy (SG Distribution LLC). All rights reserved.</p>
              <div className="footer-bottom-links">
                <a href="#">Privacy</a><a href="#">Terms</a><a href="#">Shipping</a><a href="#">Contact</a>
              </div>
            </div>
          </footer>

          <div className="disclaimer">
            <p>FDA Disclaimer — The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research. These products are not intended to diagnose, treat, cure or prevent any disease. Must be 21+ to purchase. Do not operate a vehicle or heavy machinery after use.</p>
          </div>
        </>
      )}
    </>
  );
}