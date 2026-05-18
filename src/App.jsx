import { useState, useEffect, useRef } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --red: #E8391D;
    --dark: #0e0e0e;
    --cream: #F5F0E8;
    --warm: #F2EAD8;
    --accent: #FF6B35;
    --muted: #6B6560;
    --card-bg: #1a1a1a;
  }

  body { font-family: 'DM Sans', sans-serif; background: var(--dark); color: var(--cream); overflow-x: hidden; }

  .bebas { font-family: 'Bebas Neue', sans-serif; }

  /* ---- ANNOUNCE BAR ---- */
  .announce {
    background: var(--red);
    text-align: center;
    padding: 10px;
    font-size: 13px;
    letter-spacing: 0.08em;
    font-weight: 500;
    color: white;
  }
  .announce a { color: white; text-decoration: underline; }

  /* ---- NAV ---- */
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 48px;
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(14,14,14,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .nav-logo { font-family: 'Bebas Neue', sans-serif; font-size: 32px; color: var(--red); letter-spacing: 0.05em; }
  .nav-links { display: flex; gap: 36px; list-style: none; }
  .nav-links a { color: var(--cream); text-decoration: none; font-size: 14px; font-weight: 400; letter-spacing: 0.04em; opacity: 0.8; transition: opacity 0.2s; }
  .nav-links a:hover { opacity: 1; }
  .nav-right { display: flex; align-items: center; gap: 20px; }
  .btn-cart {
    background: var(--red);
    color: white;
    border: none;
    padding: 10px 22px;
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 500;
    cursor: pointer;
    letter-spacing: 0.06em;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-cart:hover { background: var(--accent); transform: translateY(-1px); }

  /* ---- HERO ---- */
  .hero {
    position: relative;
    min-height: 92vh;
    display: flex;
    align-items: center;
    overflow: hidden;
    background: #0e0e0e;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background-image: url('https://fizzyproducts.com/cdn/shop/files/Fizzy-Mushroom-Man3.jpg?v=1755127709&width=1920');
    background-size: cover;
    background-position: center 30%;
    opacity: 0.35;
  }
  .hero-grain {
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    opacity: 0.4;
    pointer-events: none;
  }
  .hero-glow {
    position: absolute;
    width: 700px;
    height: 700px;
    background: radial-gradient(circle, rgba(232,57,29,0.18) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .hero-content {
    position: relative;
    z-index: 2;
    padding: 0 80px;
    max-width: 900px;
  }
  .hero-eyebrow {
    font-size: 12px;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--red);
    margin-bottom: 20px;
    font-weight: 500;
  }
  .hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(88px, 14vw, 160px);
    line-height: 0.9;
    color: var(--cream);
    margin-bottom: 30px;
  }
  .hero-title span { color: var(--red); }
  .hero-sub {
    font-size: 18px;
    line-height: 1.6;
    color: rgba(245,240,232,0.7);
    max-width: 480px;
    margin-bottom: 48px;
    font-weight: 300;
  }
  .hero-ctas { display: flex; gap: 16px; align-items: center; }
  .btn-primary {
    background: var(--red);
    color: white;
    border: none;
    padding: 16px 40px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
  }
  .btn-primary:hover { background: var(--accent); transform: translateY(-2px); }
  .btn-ghost {
    background: transparent;
    color: var(--cream);
    border: 1px solid rgba(245,240,232,0.3);
    padding: 16px 36px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 20px;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: border-color 0.2s, transform 0.15s;
  }
  .btn-ghost:hover { border-color: var(--cream); transform: translateY(-2px); }
  .hero-scroll {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    color: rgba(245,240,232,0.4);
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    animation: bounce 2s infinite;
  }
  @keyframes bounce { 0%,100%{transform:translateX(-50%) translateY(0)} 50%{transform:translateX(-50%) translateY(6px)} }
  .scroll-line { width: 1px; height: 40px; background: linear-gradient(to bottom, var(--red), transparent); }

  /* ---- VIBE PILLS ---- */
  .vibes {
    padding: 60px 80px;
    display: flex;
    gap: 16px;
    align-items: center;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    overflow-x: auto;
  }
  .vibe-label { font-size: 12px; letter-spacing: 0.2em; color: var(--muted); text-transform: uppercase; margin-right: 8px; white-space: nowrap; }
  .vibe-pill {
    padding: 10px 28px;
    border: 1px solid rgba(255,255,255,0.15);
    color: var(--cream);
    font-size: 13px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    cursor: pointer;
    background: transparent;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .vibe-pill:hover, .vibe-pill.active { background: var(--red); border-color: var(--red); color: white; }

  /* ---- SECTION HEADERS ---- */
  .section-header {
    padding: 80px 80px 48px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  .section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(48px, 6vw, 80px);
    line-height: 1;
    color: var(--cream);
  }
  .section-sub { font-size: 14px; color: var(--muted); max-width: 380px; line-height: 1.7; text-align: right; }

  /* ---- PRODUCTS GRID ---- */
  .products { padding: 0 80px 100px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
  .product-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    group: true;
  }
  .product-img-wrap {
    height: 420px;
    overflow: hidden;
    position: relative;
    background: var(--card-bg);
  }
  .product-img-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s ease;
    display: block;
  }
  .product-card:hover .product-img-wrap img { transform: scale(1.06); }
  .product-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(14,14,14,0.85) 0%, transparent 50%);
  }
  .product-info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 28px;
  }
  .product-tag {
    display: inline-block;
    background: var(--red);
    color: white;
    font-size: 10px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 4px 12px;
    margin-bottom: 10px;
    font-weight: 500;
  }
  .product-name {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    color: var(--cream);
    margin-bottom: 6px;
    letter-spacing: 0.03em;
  }
  .product-price {
    font-size: 18px;
    color: rgba(245,240,232,0.8);
    font-weight: 300;
  }
  .product-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    background: rgba(14,14,14,0.7);
    border: 1px solid rgba(255,255,255,0.15);
    color: white;
    padding: 8px 18px;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    cursor: pointer;
    font-family: 'DM Sans', sans-serif;
    backdrop-filter: blur(8px);
    transition: background 0.2s;
    opacity: 0;
    transform: translateY(-4px);
    transition: all 0.3s ease;
  }
  .product-card:hover .product-btn { opacity: 1; transform: translateY(0); }

  /* ---- CATEGORY STRIP ---- */
  .categories { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin: 0 80px 100px; border: 1px solid rgba(255,255,255,0.08); }
  .cat-item {
    position: relative;
    height: 480px;
    overflow: hidden;
    cursor: pointer;
    border-right: 1px solid rgba(255,255,255,0.08);
  }
  .cat-item:last-child { border-right: none; }
  .cat-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s ease; display: block; }
  .cat-item:hover .cat-img { transform: scale(1.08); }
  .cat-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(14,14,14,0.92) 0%, rgba(14,14,14,0.2) 60%); }
  .cat-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 36px 28px; }
  .cat-number { font-family: 'Bebas Neue', sans-serif; font-size: 72px; color: rgba(232,57,29,0.15); line-height: 1; margin-bottom: -12px; }
  .cat-name { font-family: 'Bebas Neue', sans-serif; font-size: 42px; color: var(--cream); letter-spacing: 0.03em; margin-bottom: 10px; }
  .cat-desc { font-size: 13px; color: rgba(245,240,232,0.6); line-height: 1.6; font-weight: 300; }
  .cat-arrow { position: absolute; top: 24px; right: 24px; width: 40px; height: 40px; border: 1px solid rgba(255,255,255,0.2); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; transition: all 0.3s; }
  .cat-item:hover .cat-arrow { background: var(--red); border-color: var(--red); }

  /* ---- MARQUEE ---- */
  .marquee-wrap { overflow: hidden; border-top: 1px solid rgba(255,255,255,0.08); border-bottom: 1px solid rgba(255,255,255,0.08); padding: 20px 0; margin-bottom: 100px; }
  .marquee-track { display: flex; gap: 0; animation: marquee 18s linear infinite; white-space: nowrap; }
  @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
  .marquee-item { font-family: 'Bebas Neue', sans-serif; font-size: 22px; letter-spacing: 0.08em; color: rgba(245,240,232,0.25); padding: 0 40px; flex-shrink: 0; }
  .marquee-item span { color: var(--red); }

  /* ---- TESTIMONIALS ---- */
  .testimonials { padding: 0 80px 100px; }
  .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(255,255,255,0.06); }
  .testimonial-card {
    background: var(--card-bg);
    padding: 40px 32px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    transition: background 0.2s;
  }
  .testimonial-card:hover { background: #222; }
  .test-product {
    font-size: 10px;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--red);
    font-weight: 500;
  }
  .test-stars { color: #FFB800; font-size: 16px; letter-spacing: 2px; }
  .test-quote {
    font-size: 15px;
    line-height: 1.75;
    color: rgba(245,240,232,0.75);
    font-weight: 300;
    font-style: italic;
    flex: 1;
  }
  .test-author {
    font-size: 13px;
    font-weight: 500;
    color: var(--cream);
    letter-spacing: 0.04em;
  }

  /* ---- RETAILER BANNER ---- */
  .retailer {
    margin: 0 80px 100px;
    padding: 80px;
    background: var(--red);
    position: relative;
    overflow: hidden;
  }
  .retailer-bg-text {
    position: absolute;
    right: -20px;
    top: 50%;
    transform: translateY(-50%);
    font-family: 'Bebas Neue', sans-serif;
    font-size: 200px;
    color: rgba(255,255,255,0.08);
    line-height: 1;
    pointer-events: none;
    white-space: nowrap;
  }
  .retailer-content { position: relative; z-index: 1; max-width: 600px; }
  .retailer-tag { font-size: 11px; letter-spacing: 0.25em; text-transform: uppercase; color: rgba(255,255,255,0.7); margin-bottom: 16px; }
  .retailer-title { font-family: 'Bebas Neue', sans-serif; font-size: 64px; line-height: 0.95; color: white; margin-bottom: 20px; }
  .retailer-desc { font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.8); margin-bottom: 36px; font-weight: 300; }
  .btn-white { background: white; color: var(--red); border: none; padding: 16px 40px; font-family: 'Bebas Neue', sans-serif; font-size: 20px; letter-spacing: 0.1em; cursor: pointer; transition: all 0.2s; }
  .btn-white:hover { background: var(--dark); color: white; }

  /* ---- EMAIL ---- */
  .email-section {
    padding: 100px 80px;
    text-align: center;
    background: linear-gradient(to bottom, var(--dark), #131313);
    position: relative;
  }
  .email-glow {
    position: absolute;
    width: 600px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(232,57,29,0.1) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }
  .email-eyebrow { font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: var(--red); margin-bottom: 20px; }
  .email-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(52px, 7vw, 96px); color: var(--cream); line-height: 0.95; margin-bottom: 20px; }
  .email-sub { font-size: 16px; color: rgba(245,240,232,0.55); max-width: 440px; margin: 0 auto 48px; line-height: 1.7; font-weight: 300; }
  .email-form { display: flex; gap: 0; max-width: 480px; margin: 0 auto; }
  .email-input {
    flex: 1;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    border-right: none;
    color: var(--cream);
    padding: 16px 20px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    outline: none;
    transition: border-color 0.2s;
  }
  .email-input::placeholder { color: rgba(245,240,232,0.3); }
  .email-input:focus { border-color: rgba(255,255,255,0.3); }
  .email-btn { background: var(--red); color: white; border: none; padding: 16px 28px; font-family: 'Bebas Neue', sans-serif; font-size: 18px; letter-spacing: 0.1em; cursor: pointer; transition: background 0.2s; white-space: nowrap; }
  .email-btn:hover { background: var(--accent); }
  .email-note { margin-top: 16px; font-size: 12px; color: rgba(245,240,232,0.3); }

  /* ---- FOOTER ---- */
  footer {
    border-top: 1px solid rgba(255,255,255,0.08);
    padding: 60px 80px 40px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 40px;
  }
  .footer-brand .footer-logo { font-family: 'Bebas Neue', sans-serif; font-size: 42px; color: var(--red); margin-bottom: 14px; }
  .footer-tagline { font-size: 13px; color: var(--muted); line-height: 1.7; max-width: 200px; }
  .footer-heading { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: var(--cream); margin-bottom: 20px; font-weight: 500; }
  .footer-links { list-style: none; display: flex; flex-direction: column; gap: 12px; }
  .footer-links a { font-size: 14px; color: var(--muted); text-decoration: none; transition: color 0.2s; }
  .footer-links a:hover { color: var(--cream); }
  .social-links { display: flex; gap: 16px; margin-top: 24px; }
  .social-link {
    width: 38px;
    height: 38px;
    border: 1px solid rgba(255,255,255,0.12);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--muted);
    font-size: 14px;
    text-decoration: none;
    transition: all 0.2s;
  }
  .social-link:hover { border-color: var(--red); color: var(--red); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,0.06);
    margin-top: 40px;
    padding-top: 28px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    grid-column: 1 / -1;
  }
  .footer-bottom p { font-size: 12px; color: var(--muted); }
  .footer-bottom-links { display: flex; gap: 24px; }
  .footer-bottom-links a { font-size: 12px; color: var(--muted); text-decoration: none; }
  .footer-bottom-links a:hover { color: var(--cream); }
  .payment-methods { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 20px; }
  .pay-badge { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); padding: 4px 10px; font-size: 11px; color: var(--muted); border-radius: 2px; }

  /* ---- DISCLAIMER ---- */
  .disclaimer { padding: 24px 80px; border-top: 1px solid rgba(255,255,255,0.06); }
  .disclaimer p { font-size: 11px; color: rgba(245,240,232,0.2); line-height: 1.7; max-width: 900px; }

  @media (max-width: 900px) {
    nav { padding: 16px 24px; }
    .hero-content { padding: 0 24px; }
    .hero-title { font-size: 72px; }
    .vibes { padding: 40px 24px; }
    .section-header { padding: 60px 24px 32px; flex-direction: column; gap: 12px; align-items: flex-start; }
    .section-sub { text-align: left; }
    .products { padding: 0 24px 60px; grid-template-columns: 1fr; }
    .categories { grid-template-columns: 1fr; margin: 0 24px 60px; }
    .cat-item { height: 320px; }
    .retailer { margin: 0 24px 60px; padding: 48px 32px; }
    .retailer-title { font-size: 48px; }
    .testimonials { padding: 0 24px 60px; }
    .testimonials-grid { grid-template-columns: 1fr; }
    .email-section { padding: 80px 24px; }
    footer { padding: 48px 24px 32px; grid-template-columns: 1fr 1fr; }
    .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
    .disclaimer { padding: 24px; }
  }
`;

const products = [
  {
    name: "Mushroom Gummies — Blue Razz Fizz",
    price: "$19.99",
    tag: "Bestseller",
    img: "https://fizzyproducts.com/cdn/shop/files/Blue-Razz-Fizz_4d8b06b3-22da-45ac-8fe0-7987707f9342.png?v=1755127132&width=533",
    bg: "https://fizzyproducts.com/cdn/shop/files/Blue-Razz-Fizz-B.jpg?v=1755127131&width=533",
    vibe: "Elevate",
  },
  {
    name: "KAVA + Alkaloids Shot — POM Berry",
    price: "$9.99",
    tag: "Fan Favorite",
    img: "https://fizzyproducts.com/cdn/shop/files/KAVA-POM-Berry-Trans.png?v=1756415877&width=533",
    bg: "https://fizzyproducts.com/cdn/shop/files/KAVA-POM-Berry-Bakc.jpg?v=1756415877&width=533",
    vibe: "Calm",
  },
];

const categories = [
  {
    name: "MIT",
    number: "01",
    desc: "The next evolution of Fizzy. Energy and focus — no crash, no jitters.",
    img: "https://fizzyproducts.com/cdn/shop/collections/Fizzy-352-Rooftop-Sunset.jpg?v=1756417147&width=800",
  },
  {
    name: "KAVA",
    number: "02",
    desc: "Your easy switch to calm. Each 2 oz shot delivers instant vacation mode.",
    img: "https://fizzyproducts.com/cdn/shop/collections/Fizzy-Beach-Sunset-KAVA-POM.jpg?v=1756419127&width=800",
  },
  {
    name: "Mushroom",
    number: "03",
    desc: "Functional mushrooms + nootropics. Vegan-friendly, lab-tested, bold flavors.",
    img: "https://fizzyproducts.com/cdn/shop/collections/Fizzy-Mushroom-Picknick-Green-Apple.jpg?v=1755129737&width=800",
  },
];

const testimonials = [
  {
    product: "Mushroom Gummies",
    quote: "Fizzy's Mushroom Gummies are my go-to when I need a clear, creative headspace. They taste amazing and shift me into an inspired, focused mood in about 15 minutes.",
    author: "Jamie R., Portland OR",
    stars: 5,
  },
  {
    product: "KAVA Shots",
    quote: "Like instant vacation mode. I take one before social events and I'm relaxed but still totally clear. The flavors are so good I actually look forward to them.",
    author: "Dana S., Seattle WA",
    stars: 5,
  },
  {
    product: "MIT Shots",
    quote: "My secret weapon for early mornings. They hit fast, keep me focused, and there's zero crash. They've completely changed how I start my day.",
    author: "Alex M., Los Angeles CA",
    stars: 5,
  },
];

const marqueeItems = [
  "Fast-Acting", "★", "Lab Tested", "★", "Legal Everywhere", "★",
  "No THC", "★", "No Psilocybin", "★", "Vegan Friendly", "★",
  "15 Min Onset", "★", "Bold Flavors", "★", "Shift Happens", "★",
  "Fast-Acting", "★", "Lab Tested", "★", "Legal Everywhere", "★",
  "No THC", "★", "No Psilocybin", "★", "Vegan Friendly", "★",
  "15 Min Onset", "★", "Bold Flavors", "★", "Shift Happens", "★",
];

export default function FizzyLanding() {
  const [activeVibe, setActiveVibe] = useState("All");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hovered, setHovered] = useState(null);

  const vibes = ["All", "Calm", "Elevate", "Focus"];

  const handleEmail = (e) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <>
      <style>{style}</style>

      {/* Announce Bar */}
      <div className="announce">
        🎉 Become a retailer — <a href="#">bulk pricing available</a> &nbsp;|&nbsp; Free shipping on orders over $50
      </div>

      {/* Nav */}
      <nav>
        <div className="nav-logo">Fizzy</div>
        <ul className="nav-links">
          <li><a href="#">Products</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Wholesale</a></li>
        </ul>
        <div className="nav-right">
          <a href="#" style={{ color: "rgba(245,240,232,0.6)", fontSize: 14, textDecoration: "none" }}>Log in</a>
          <button className="btn-cart">Cart (0)</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grain" />
        <div className="hero-glow" />
        <div className="hero-content">
          <p className="hero-eyebrow">Fast-Acting · Legal · Natural</p>
          <h1 className="hero-title">
            Shift<br /><span>Happens.</span>
          </h1>
          <p className="hero-sub">
            Mood-modulating supplements that work in 15 minutes. No fluff. No waiting. Just legal, naturally-sourced ingredients that shift your state on your terms.
          </p>
          <div className="hero-ctas">
            <button className="btn-primary">Shop By Vibe</button>
            <button className="btn-ghost">Learn More</button>
          </div>
        </div>
        <div className="hero-scroll">
          <div className="scroll-line" />
          <span>Scroll</span>
        </div>
      </section>

      {/* Vibe Pills */}
      <div className="vibes">
        <span className="vibe-label">Filter by vibe:</span>
        {vibes.map((v) => (
          <button
            key={v}
            className={`vibe-pill${activeVibe === v ? " active" : ""}`}
            onClick={() => setActiveVibe(v)}
          >{v}</button>
        ))}
      </div>

      {/* Best Sellers */}
      <div className="section-header">
        <h2 className="section-title">Best<br />Sellers</h2>
        <p className="section-sub">Pick your vibe, make the shift. Whether you're ramping up or dialing back, Fizzy delivers.</p>
      </div>
      <div className="products">
        {products.map((p, i) => (
          <div
            key={i}
            className="product-card"
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
          >
            <div className="product-img-wrap">
              <img
                src={hovered === i ? p.bg : p.img}
                alt={p.name}
                style={{ transition: "opacity 0.4s ease" }}
              />
              <div className="product-overlay" />
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

      {/* Marquee */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i} className="marquee-item">
              {item === "★" ? <span>★</span> : item}
            </span>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="section-header">
        <h2 className="section-title">How Do You<br />Want To Shift?</h2>
        <p className="section-sub">Three product lines, one mission — give you control over your mood.</p>
      </div>
      <div className="categories">
        {categories.map((c, i) => (
          <div key={i} className="cat-item">
            <img className="cat-img" src={c.img} alt={c.name} />
            <div className="cat-overlay" />
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
      <div className="section-header">
        <h2 className="section-title">The Fizzy<br />Fam Speaks</h2>
        <p className="section-sub">Real people, real shifts. Here's what they're saying.</p>
      </div>
      <div className="testimonials">
        <div className="testimonials-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="testimonial-card">
              <div className="test-product">{t.product}</div>
              <div className="test-stars">{"★".repeat(t.stars)}</div>
              <p className="test-quote">"{t.quote}"</p>
              <div className="test-author">— {t.author}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Retailer Banner */}
      <div className="retailer">
        <div className="retailer-bg-text">RETAIL</div>
        <div className="retailer-content">
          <div className="retailer-tag">For Business Owners</div>
          <h2 className="retailer-title">Become A<br />Fizzy Retailer</h2>
          <p className="retailer-desc">
            Fizzy delivers mood on demand. Every product hits fast, tastes great, and gives customers a reason to come back. Retailers get eye-catching displays, compliant assets, and pricing built for volume.
          </p>
          <button className="btn-white">Apply Now</button>
        </div>
      </div>

      {/* Email */}
      <section className="email-section">
        <div className="email-glow" />
        <p className="email-eyebrow">Insiders Feel It First</p>
        <h2 className="email-title">Join The<br />Fizzy Fam.</h2>
        <p className="email-sub">
          New drops, exclusive deals, and secret events we don't post anywhere else. Sign up and get 10% off your first order.
        </p>
        {submitted ? (
          <p style={{ color: "var(--red)", fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: "0.1em" }}>
            You're in! Check your inbox. 🎉
          </p>
        ) : (
          <form className="email-form" onSubmit={handleEmail}>
            <input
              className="email-input"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="email-btn" type="submit">Get 10% Off</button>
          </form>
        )}
        <p className="email-note">No spam. Unsubscribe anytime. 21+ only.</p>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-brand">
          <div className="footer-logo">Fizzy</div>
          <p className="footer-tagline">Fizzy exists to help you shift your mood, anytime.</p>
          <div className="social-links">
            <a className="social-link" href="https://www.facebook.com/FizzyProducts28" target="_blank">f</a>
            <a className="social-link" href="https://www.instagram.com/fizzy_products" target="_blank">ig</a>
            <a className="social-link" href="https://www.tiktok.com/@fizzy_products" target="_blank">tt</a>
          </div>
        </div>
        <div>
          <div className="footer-heading">Shop</div>
          <ul className="footer-links">
            <li><a href="#">All Products</a></li>
            <li><a href="#">Mushroom Gummies</a></li>
            <li><a href="#">KAVA Shots</a></li>
            <li><a href="#">MIT Shots</a></li>
            <li><a href="#">Bestsellers</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-heading">Company</div>
          <ul className="footer-links">
            <li><a href="#">About Fizzy</a></li>
            <li><a href="#">Wholesale / Retailers</a></li>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">Lab Reports (COA)</a></li>
          </ul>
        </div>
        <div>
          <div className="footer-heading">Payment</div>
          <div className="payment-methods">
            {["Visa","Mastercard","Amex","Apple Pay","Google Pay","PayPal","Shop Pay"].map(m => (
              <span key={m} className="pay-badge">{m}</span>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
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
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Shipping</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </footer>

      {/* Disclaimer */}
      <div className="disclaimer">
        <p>
          FDA Disclaimer — The statements made regarding these products have not been evaluated by the Food and Drug Administration. The efficacy of these products has not been confirmed by FDA-approved research. These products are not intended to diagnose, treat, cure or prevent any disease. Must be 21+ to purchase. Do not operate a vehicle or heavy machinery after use.
        </p>
      </div>
    </>
  );
}
