// Helper to fetch JSON
async function fetchJSON(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error('Network error');
  return res.json();
}

// Render properties list (for properties.html)
async function renderPropertiesList() {
  const container = document.getElementById('properties-list');
  if (!container) return;
  const properties = await fetchJSON('/api/properties');
  container.innerHTML = properties.map(p => `
    <div class="property-card" onclick="window.location='property.html?id=${p.id}'">
      <img src="${p.image}" alt="${p.title}" class="property-img">
      <div class="property-info">
        <h3>${p.title}</h3>
        <p>${p.location}</p>
        <p><strong>${p.price}</strong></p>
        <button>View Details</button>
      </div>
    </div>
  `).join('');
}

// Render single property (for property.html)
async function renderPropertyDetail() {
  const container = document.getElementById('property-detail');
  if (!container) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (!id) { container.innerHTML = '<p>Property not found.</p>'; return; }
  try {
    const p = await fetchJSON(`/api/properties/${id}`);
    container.innerHTML = `
      <div class="property-detail-card">
        <img src="${p.image}" alt="${p.title}" class="property-img-large">
        <div class="property-detail-info">
          <h2>${p.title}</h2>
          <p><strong>Location:</strong> ${p.location}</p>
          <p><strong>Price:</strong> ${p.price}</p>
          <p>${p.description}</p>
          <ul>
            <li><strong>Area:</strong> ${p.details.area}</li>
            <li><strong>Bedrooms:</strong> ${p.details.bedrooms}</li>
            <li><strong>Bathrooms:</strong> ${p.details.bathrooms}</li>
            <li><strong>Parking:</strong> ${p.details.parking}</li>
            <li><strong>Status:</strong> ${p.details.status}</li>
            <li><strong>Year:</strong> ${p.details.year}</li>
          </ul>
        </div>
      </div>
    `;
  } catch {
    container.innerHTML = '<p>Property not found.</p>';
  }
}

// Render homepage blocks (for index.html)
async function renderHomeBlocks() {
  const blocks = await fetchJSON('/api/homeblocks');
  // Sales
  const sales = document.getElementById('sales-properties');
  if (sales) sales.innerHTML = blocks.sales.map(p => `
    <div class="property-card" onclick="window.location='property.html?id=${p.id}'">
      <img src="${p.image}" alt="${p.title}" class="property-img">
      <div class="property-info">
        <h3>${p.title}</h3>
        <p>${p.location}</p>
        <p><strong>${p.price}</strong></p>
      </div>
    </div>
  `).join('');
  // Rent
  const rent = document.getElementById('rent-properties');
  if (rent) rent.innerHTML = blocks.rent.map(p => `
    <div class="property-card" onclick="window.location='property.html?id=${p.id}'">
      <img src="${p.image}" alt="${p.title}" class="property-img">
      <div class="property-info">
        <h3>${p.title}</h3>
        <p>${p.location}</p>
        <p><strong>${p.price}</strong></p>
      </div>
    </div>
  `).join('');
  // One Day
  const oneDay = document.getElementById('one-day-properties');
  if (oneDay) oneDay.innerHTML = blocks.oneDay.map(p => `
    <div class="property-card" onclick="window.location='property.html?id=${p.id}'">
      <img src="${p.image}" alt="${p.title}" class="property-img">
      <div class="property-info">
        <h3>${p.title}</h3>
        <p>${p.location}</p>
        <p><strong>${p.price}</strong></p>
      </div>
    </div>
  `).join('');
  // Services
  const services = document.getElementById('services-list');
  if (services) services.innerHTML = blocks.services.map(s => `<li>${s}</li>`).join('');
  // Testimonials
  const testimonials = document.getElementById('testimonials-list');
  if (testimonials) testimonials.innerHTML = blocks.testimonials.map(t => `<blockquote>"${t.text}"<br><span>- ${t.name}</span></blockquote>`).join('');
  // Market Insights
  const market = document.getElementById('market-insights');
  if (market) market.textContent = blocks.marketInsights;
  // Asking Price
  const asking = document.getElementById('asking-price');
  if (asking) asking.textContent = blocks.askingPrice;
  // Govt Registration
  const govt = document.getElementById('govt-registration');
  if (govt) govt.textContent = blocks.govtRegistration;
  // Micro Market Analysis
  const micro = document.getElementById('micro-market-analysis');
  if (micro) micro.textContent = blocks.microMarketAnalysis;
  // Investment Potential
  const invest = document.getElementById('investment-potential');
  if (invest) invest.textContent = blocks.investmentPotential;
}

// On page load, detect which page and render accordingly
window.addEventListener('DOMContentLoaded', () => {
  renderPropertiesList();
  renderPropertyDetail();
  renderHomeBlocks();
});