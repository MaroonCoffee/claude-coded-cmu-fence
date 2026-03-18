// ===== CMU FENCE APP - shared JS =====

// ---- Data Store (localStorage) ----
const DB = {
  get(key, def = []) {
    try { return JSON.parse(localStorage.getItem('cmufence_' + key)) ?? def; }
    catch { return def; }
  },
  set(key, val) { localStorage.setItem('cmufence_' + key, JSON.stringify(val)); },
};

// Seed data if empty
function seedData() {
  if (DB.get('seeded', false)) return;

  const events = [
    { id: 1, org: 'Scottie Dog Fan Club', date: '2026-03-19', design: 'Scottie dogs wearing kilts celebrating spring!', attendees: { going: ['alice','bob','carol'], maybe: ['dave'], notgoing: [] }, imageEmoji: '🐾', color: '#e74c3c' },
    { id: 2, org: 'CMU Drama Club', date: '2026-03-22', design: 'Shakespeare's "To paint or not to paint" — a dramatic tribute', attendees: { going: ['eve','frank'], maybe: ['grace','hank'], notgoing: ['ivan'] }, imageEmoji: '🎭', color: '#8e44ad' },
    { id: 3, org: 'Robotics Club', date: '2026-03-25', design: 'Our FIRST Robotics championship qualifier robot!', attendees: { going: ['judy','ken','linda','mike'], maybe: [], notgoing: [] }, imageEmoji: '🤖', color: '#2980b9' },
    { id: 4, org: 'CS Club @ CMU', date: '2026-03-28', design: '"Hello World" — celebrating 50 years of CS at CMU', attendees: { going: ['nina'], maybe: ['omar','pam'], notgoing: [] }, imageEmoji: '💻', color: '#27ae60' },
    { id: 5, org: 'Bhangra Club', date: '2026-04-02', design: 'Vibrant Bhangra dancers with spring colors!', attendees: { going: [], maybe: ['quinn'], notgoing: [] }, imageEmoji: '💃', color: '#f39c12' },
  ];

  const gallery = [
    { id: 1, org: 'Black Student Union', date: '2026-02-01', design: 'Black History Month tribute', desc: 'A powerful tribute to Black History Month featuring portraits of civil rights leaders.', imageEmoji: '✊', color: '#1a1a2e' },
    { id: 2, org: 'Chinese Students Association', date: '2026-01-29', design: 'Lunar New Year - Year of the Snake', desc: 'Vibrant red and gold Lunar New Year celebration for the Year of the Snake.', imageEmoji: '🐍', color: '#c0392b' },
    { id: 3, org: 'Kiltie Band', date: '2026-01-15', design: 'Kiltie Band 100th Anniversary', desc: 'Celebrating 100 years of the Kiltie Band with bagpipes and CMU pride.', imageEmoji: '🎺', color: '#8B6914' },
    { id: 4, org: 'Women\'s Soccer Team', date: '2025-12-10', design: 'UAA Championship Banner', desc: 'Commemorating the Women\'s Soccer UAA Championship win!', imageEmoji: '⚽', color: '#1a6b34' },
    { id: 5, org: 'SCS Dean\'s Students', date: '2025-11-28', design: 'Thanksgiving from SCS', desc: 'Giving thanks for another semester of great research and collaboration.', imageEmoji: '🦃', color: '#c47020' },
    { id: 6, org: 'Habitat for Humanity', date: '2025-11-01', design: 'Build-a-Thon Fundraiser', desc: 'Promoting the annual Build-a-Thon to raise money for local housing projects.', imageEmoji: '🏠', color: '#2475b0' },
  ];

  DB.set('events', events);
  DB.set('gallery', gallery);
  DB.set('seeded', true);
}

seedData();

// ---- RSVP ----
function getRsvp(eventId) {
  return DB.get('rsvp_' + eventId, null);
}

function setRsvp(eventId, status) {
  const events = DB.get('events', []);
  const ev = events.find(e => e.id === eventId);
  if (!ev) return;
  const user = 'you';
  ['going','maybe','notgoing'].forEach(s => {
    ev.attendees[s] = ev.attendees[s].filter(u => u !== user);
  });
  if (status) ev.attendees[status].push(user);
  DB.set('events', events);
  DB.set('rsvp_' + eventId, status);
}

function countAttendees(ev) {
  return ev.attendees.going.length;
}

// ---- Toast ----
function showToast(msg) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2800);
}

// ---- Nav active link ----
document.addEventListener('DOMContentLoaded', () => {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
});

// ---- Weather (Open-Meteo, Pittsburgh coords) ----
async function loadWeather(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;

  // Pittsburgh lat/lon
  const lat = 40.4406, lon = -79.9959;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode,windspeed_10m,precipitation_probability&temperature_unit=fahrenheit&windspeed_unit=mph&timezone=America%2FNew_York`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const c = data.current;
    const icons = {
      0:'☀️',1:'🌤️',2:'⛅',3:'☁️',
      45:'🌫️',48:'🌫️',
      51:'🌦️',53:'🌦️',55:'🌧️',
      61:'🌧️',63:'🌧️',65:'🌧️',
      71:'🌨️',73:'🌨️',75:'❄️',
      80:'🌦️',81:'🌧️',82:'⛈️',
      95:'⛈️',96:'⛈️',99:'⛈️'
    };
    const descs = {
      0:'Clear sky',1:'Mostly clear',2:'Partly cloudy',3:'Overcast',
      45:'Foggy',48:'Icy fog',
      51:'Light drizzle',53:'Moderate drizzle',55:'Dense drizzle',
      61:'Slight rain',63:'Moderate rain',65:'Heavy rain',
      71:'Light snow',73:'Moderate snow',75:'Heavy snow',
      80:'Slight showers',81:'Moderate showers',82:'Violent showers',
      95:'Thunderstorm',96:'Thunderstorm+hail',99:'Thunderstorm+hail'
    };
    const code = c.weathercode;
    const icon = icons[code] || '🌡️';
    const desc = descs[code] || 'Unknown';
    const temp = Math.round(c.temperature_2m);
    const wind = Math.round(c.windspeed_10m);
    const precip = c.precipitation_probability;

    el.innerHTML = `
      <div class="weather-title">Pittsburgh Weather — Right Now</div>
      <div class="weather-main">
        <div style="font-size:2.6rem">${icon}</div>
        <div>
          <div class="weather-temp">${temp}°F</div>
          <div class="weather-desc">${desc}</div>
        </div>
      </div>
      <div class="weather-details">
        <span>💨 ${wind} mph</span>
        <span>🌧️ ${precip}% precip</span>
        <span style="color:${temp < 32 ? '#88ccff' : temp > 75 ? '#ffaa44' : '#88ffaa'}">
          ${temp < 32 ? '❄️ Bring layers!' : temp > 75 ? '☀️ Great painting weather!' : '✅ Decent night for the fence'}
        </span>
      </div>
    `;
  } catch(e) {
    el.innerHTML = `<div class="weather-title">Pittsburgh Weather</div><div style="margin-top:8px;opacity:0.7">Unable to load weather data.</div>`;
  }
}

// ---- Forecast for calendar days ----
async function loadForecast() {
  const lat = 40.4406, lon = -79.9959;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=14`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.daily;
  } catch { return null; }
}
