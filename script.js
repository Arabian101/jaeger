document.addEventListener('DOMContentLoaded', () => {

  // 1. PRODUCTEN DATA
  const products = [
    { id: 1, name: 'JAEGER Classic 5.5"', category: 'scharen', price: 189, tag: 'Bestseller' },
    { id: 2, name: 'JAEGER Precision 6.0"', category: 'scharen', price: 219, tag: 'Populair' },
    { id: 3, name: 'JAEGER Coupeerschaar 30T', category: 'coupeer', price: 199, tag: 'Nieuw' },
    { id: 4, name: 'JAEGER Master Black Edition', category: 'scharen', price: 249, tag: 'Premium' },
    { id: 5, name: 'JAEGER Effileerschaar Dual', category: 'coupeer', price: 209, tag: 'Actie' },
    { id: 6, name: 'JAEGER Barber Set Deluxe', category: 'sets', price: 379, tag: 'Voordeel' }
  ];

  let cart = [];

  // 2. SCROLL REVEAL ANIMATIES (Zorgt dat de pagina zichtbaar wordt)
  const revealElements = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    revealElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.85) {
        el.classList.add('in');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Direct uitvoeren voor elementen bovenaan

  // 3. NAVBAR HEADER SCROLL EFFECT
  const header = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('solid');
    } else {
      header.classList.remove('solid');
    }
  });

  // 4. MOBIEL MENU (BURGER)
  const burger = document.getElementById('burger');
  const menu = document.getElementById('menu');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }

  // 5. COLLECTIE EN FILTERS RENDEREN
  const grid = document.getElementById('grid');
  const filtersContainer = document.getElementById('filters');

  if (grid && filtersContainer) {
    const categories = ['alles', 'scharen', 'coupeer', 'sets'];
    
    // Filters aanmaken
    filtersContainer.innerHTML = categories.map((cat, idx) => `
      <button class="${idx === 0 ? 'on' : ''}" data-cat="${cat}">
        ${cat.charAt(0).toUpperCase() + cat.slice(1)}
      </button>
    `).join('');

    // Producten tonen
    const renderProducts = (catFilter = 'alles') => {
      const filtered = catFilter === 'alles' 
        ? products 
        : products.filter(p => p.category === catFilter);

      grid.innerHTML = filtered.map(p => `
        <article class="card">
          <div class="img">
            <span class="tag">${p.tag}</span>
            <svg><use href="#scissors"/></svg>
          </div>
          <div
