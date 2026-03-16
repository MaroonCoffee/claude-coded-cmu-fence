// CMU Fence Platform — Shared App Logic
// ==========================================

const KEYS = {
  events:   'fence_events',
  queue:    'fence_queue',
  rsvps:    'fence_rsvps',
  userName: 'fence_username',
  weather:  'fence_weather_cache',
};

// ---- Default seed data ----

const DEFAULT_EVENTS = [
  { id: 1,  date: '2026-03-17', org: 'CMU Dance Marathon',       design: 'Colorful fundraising design for UPMC Children\'s Hospital — bright reds and yellows',            designImage: null, confirmed: true,  contact: 'dancemarathon@andrew.cmu.edu' },
  { id: 2,  date: '2026-03-19', org: 'Kappa Kappa Gamma',        design: 'Floral spring formal announcement with pastel flowers and Greek letters',                           designImage: null, confirmed: true,  contact: 'kkg@andrew.cmu.edu' },
  { id: 3,  date: '2026-03-21', org: 'CMU Robotics Club',        design: 'FIRST Robotics Qualifier hype — mechanical gears, circuit boards, and robot art',                  designImage: null, confirmed: true,  contact: 'robotics@andrew.cmu.edu' },
  { id: 4,  date: '2026-03-24', org: 'ScottyLabs',               design: 'HackCMU 2026 announcement — futuristic tech motif with neon accents on dark background',           designImage: null, confirmed: true,  contact: 'hello@scottylabs.org' },
  { id: 5,  date: '2026-03-26', org: 'CMU Women\'s Soccer',      design: 'UAA Regional Championship celebration — cleats, ball, and "Tartans" in black and gold',            designImage: null, confirmed: true,  contact: 'womens-soccer@andrew.cmu.edu' },
  { id: 6,  date: '2026-03-28', org: 'CMU Bhangra',              design: 'Spring Bhangra 2026 performance announcement — vibrant orange and blue with dhol drum motif',      designImage: null, confirmed: true,  contact: 'cmubhangra@andrew.cmu.edu' },
  { id: 7,  date: '2026-04-02', org: 'Alpha Phi Alpha',          design: 'Annual scholarship fundraiser announcement — black and gold with fraternity crest',                designImage: null, confirmed: true,  contact: 'apa@andrew.cmu.edu' },
  { id: 8,  date: '2026-04-04', org: 'CMU Drama',                design: 'Spring production of "Into the Woods" — fairy-tale forest with storybook lettering',              designImage: null, confirmed: true,  contact: 'drama@andrew.cmu.edu' },
  { id: 9,  date: '2026-04-07', org: 'Pre-Med Society',          design: 'Med school acceptance celebration — stethoscope and mortar board art',                            designImage: null, confirmed: true,  contact: 'premed@andrew.cmu.edu' },
  { id: 10, date: '2026-04-10', org: 'CMU Photography Club',     design: 'Spring Photo Exhibition announcement — camera lens macro art with golden hour palette',           designImage: null, confirmed: false, contact: 'photo@andrew.cmu.edu' },
];

const DEFAULT_QUEUE = [
  { id: 101, org: 'CS Honor Society',          contact: 'cshs@andrew.cmu.edu',       requestedDate: null,         joinedAt: '2026-03-10', description: 'Spring induction ceremony announcement' },
  { id: 102, org: 'Sigma Nu Fraternity',        contact: 'sigmanu@andrew.cmu.edu',    requestedDate: null,         joinedAt: '2026-03-14', description: 'Brotherhood event and philanthropy drive' },
  { id: 103, org: 'CMU International Students', contact: 'isa@andrew.cmu.edu',        requestedDate: '2026-04-15', joinedAt: '2026-03-15', description: 'Cultural Celebration Week kickoff' },
  { id: 104, org: 'Kiltie Band',               contact: 'kiltieband@andrew.cmu.edu', requestedDate: '2026-04-18', joinedAt: '2026-03-16', description: 'Spring Concert announcement' },
];

const DEFAULT_GALLERY = [
  { id: 201, org: 'Pan-Hellenic Council',       date: '2026-02-14', description: 'Valentine\'s Day collaboration by all sororities',      emoji: '💝', colors: ['#ff6b9d','#ff8fb1','#ffc4d6'] },
  { id: 202, org: 'CMU Men\'s Basketball',      date: '2026-02-08', description: 'UAA Championship celebration — Tartans win!',           emoji: '🏀', colors: ['#C41230','#9e0f27','#6d0b1b'] },
  { id: 203, org: 'Chinese Student Assoc.',     date: '2026-01-28', description: 'Lunar New Year — Year of the Horse',                    emoji: '🐉', colors: ['#FFD700','#FF6B00','#e60000'] },
  { id: 204, org: 'Delta Tau Delta',            date: '2026-01-20', description: 'New member class announcement',                         emoji: '🎓', colors: ['#1a3a8f','#3a5fc8','#6b8dd6'] },
  { id: 205, org: 'CMU Cycling Club',           date: '2026-01-10', description: 'Spring Cycling Classic promotional design',             emoji: '🚴', colors: ['#00695c','#009688','#4db6ac'] },
  { id: 206, org: 'CMU Improv Comedy',          date: '2025-12-15', description: 'End of semester showcase — "Laugh Your Finals Off"',    emoji: '🎭', colors: ['#6a1b9a','#8e24aa','#ba68c8'] },
  { id: 207, org: 'WRCT Student Radio',         date: '2025-12-02', description: 'Winter concert and stream announcement',                emoji: '🎵', colors: ['#0d47a1','#1565c0','#42a5f5'] },
  { id: 208, org: 'CMU Investment Club',        date: '2025-11-20', description: 'Stock pitch competition finals announcement',           emoji: '📈', colors: ['#1b5e20','#2e7d32','#66bb6a'] },
  { id: 209, org: 'CMU SWE Chapter',            date: '2025-11-08', description: 'Society of Women Engineers fall banquet',               emoji: '⚙️', colors: ['#b71c1c','#c62828','#ef9a9a'] },
  { id: 210, org: 'Sigma Kappa Sorority',       date: '2025-10-31', description: 'Halloween themed — spooky but spirited!',               emoji: '🎃', colors: ['#e65100','#f57c00','#ffa726'] },
  { id: 211, org: 'CMU Debate Team',            date: '2025-10-18', description: 'National debate qualifier announcement',                emoji: '🏆', colors: ['#37474f','#546e7a','#b0bec5'] },
  { id: 212, org: 'The Tartan Newspaper',       date: '2025-10-02', description: '100th volume anniversary celebration',                  emoji: '📰', colors: ['#212121','#424242','#9e9e9e'] },
];

// ---- Storage helpers ----

function store(key, val) {
  try { localStorage.setItem(key, JSON.stringify(val)); } catch(e) {}
}

function retrieve(key, fallback) {
  try {
    const d = localStorage.getItem(key);
    return d !== null ? JSON.parse(d) : fallback;
  } catch(e) { return fallback; }
}

function initData() {
  if (!localStorage.getItem(KEYS.events)) store(KEYS.events, DEFAULT_EVENTS);
  if (!localStorage.getItem(KEYS.queue))  store(KEYS.queue,  DEFAULT_QUEUE);
  if (!localStorage.getItem(KEYS.rsvps))  store(KEYS.rsvps,  {});
}

// ---- Getters/setters ----

function getEvents()   { return retrieve(KEYS.events, DEFAULT_EVENTS); }
function getQueue()    { return retrieve(KEYS.queue,  DEFAULT_QUEUE); }
function getRsvps()    { return retrieve(KEYS.rsvps,  {}); }
function getUserName() { return retrieve(KEYS.userName, null); }
function getGallery()  { return DEFAULT_GALLERY; }

function setUserName(name) { store(KEYS.userName, name); }

function rsvp(eventId, status) {
  const rsvps = getRsvps();
  const user = getUserName() || 'Anonymous';
  if (!rsvps[eventId]) rsvps[eventId] = { going: [], maybe: [], notGoing: [] };
  // Remove from all lists
  ['going','maybe','notGoing'].forEach(s => {
    rsvps[eventId][s] = rsvps[eventId][s].filter(u => u !== user);
  });
  if (status) rsvps[eventId][status].push(user);
  store(KEYS.rsvps, rsvps);
  return rsvps[eventId];
}

function getUserRsvp(eventId) {
  const rsvps = getRsvps();
  const user = getUserName() || 'Anonymous';
  if (!rsvps[eventId]) return null;
  if (rsvps[eventId].going.includes(user))    return 'going';
  if (rsvps[eventId].maybe.includes(user))    return 'maybe';
  if (rsvps[eventId].notGoing.includes(user)) return 'notGoing';
  return null;
}

function getRsvpCounts(eventId) {
  const rsvps = getRsvps();
  if (!rsvps[eventId]) return { going: 0, maybe: 0, notGoing: 0 };
  return {
    going:    rsvps[eventId].going.length,
    maybe:    rsvps[eventId].maybe.length,
    notGoing: rsvps[eventId].notGoing.length,
  };
}

function addToQueue(data) {
  const queue = getQueue();
  const item = {
    id:            Date.now(),
    org:           data.org,
    contact:       data.contact,
    requestedDate: data.requestedDate || null,
    joinedAt:      new Date().toISOString().split('T')[0],
    description:   data.description || '',
  };
  queue.push(item);
  store(KEYS.queue, queue);
  return item;
}

function removeFromQueue(id) {
  const queue = getQueue().filter(q => q.id !== id);
  store(KEYS.queue, queue);
}

function claimDate(queueId, dateStr) {
  const queue  = getQueue();
  const events = getEvents();
  const item   = queue.find(q => q.id === queueId);
  if (!item) return null;
  const newEvent = {
    id:          Date.now(),
    date:        dateStr,
    org:         item.org,
    design:      item.description,
    designImage: null,
    confirmed:   true,
    contact:     item.contact,
  };
  events.push(newEvent);
  store(KEYS.events, events);
  removeFromQueue(queueId);
  return newEvent;
}

function uploadDesign(eventId, base64) {
  const events = getEvents();
  const ev = events.find(e => e.id === eventId);
  if (ev) { ev.designImage = base64; store(KEYS.events, events); }
}

// ---- Date helpers ----

function fmt(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
}

function fmtShort(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function fmtMonthDay(dateStr) {
  const d = new Date(dateStr + 'T12:00:00');
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
}

function daysUntil(dateStr) {
  const today  = new Date(); today.setHours(0,0,0,0);
  const target = new Date(dateStr + 'T12:00:00');
  const diff   = Math.round((target - today) / 86400000);
  if (diff < 0)  return `${Math.abs(diff)} day${Math.abs(diff)!==1?'s':''} ago`;
  if (diff === 0) return 'Tonight!';
  if (diff === 1) return 'Tomorrow';
  return `In ${diff} days`;
}

function todayStr() {
  return new Date().toISOString().split('T')[0];
}

function isFuture(dateStr) {
  return dateStr >= todayStr();
}

// ---- Weather ----

const WMO = {
  0:  { icon: '☀️',  desc: 'Clear sky',       warn: false },
  1:  { icon: '🌤️',  desc: 'Mainly clear',    warn: false },
  2:  { icon: '⛅',  desc: 'Partly cloudy',   warn: false },
  3:  { icon: '☁️',  desc: 'Overcast',        warn: false },
  45: { icon: '🌫️',  desc: 'Foggy',           warn: false },
  48: { icon: '🌫️',  desc: 'Icy fog',         warn: false },
  51: { icon: '🌦️',  desc: 'Light drizzle',   warn: true  },
  61: { icon: '🌧️',  desc: 'Light rain',      warn: true  },
  63: { icon: '🌧️',  desc: 'Moderate rain',   warn: true  },
  65: { icon: '🌧️',  desc: 'Heavy rain',      warn: true  },
  71: { icon: '🌨️',  desc: 'Light snow',      warn: true  },
  73: { icon: '🌨️',  desc: 'Moderate snow',   warn: true  },
  75: { icon: '❄️',  desc: 'Heavy snow',      warn: true  },
  80: { icon: '🌦️',  desc: 'Rain showers',    warn: true  },
  82: { icon: '⛈️',  desc: 'Heavy showers',   warn: true  },
  85: { icon: '🌨️',  desc: 'Snow showers',    warn: true  },
  95: { icon: '⛈️',  desc: 'Thunderstorm',    warn: true  },
  99: { icon: '⛈️',  desc: 'T-storm w/ hail', warn: true  },
};

function wmo(code) {
  // Find closest lower match
  const keys = Object.keys(WMO).map(Number).sort((a,b)=>a-b);
  let match = keys[0];
  for (const k of keys) { if (code >= k) match = k; }
  return WMO[match] || { icon: '🌡️', desc: 'Unknown', warn: false };
}

let weatherCache = null;
let weatherCacheDate = null;

async function fetchWeather() {
  // Use sessionStorage cache
  const cached = sessionStorage.getItem('fence_wx');
  if (cached) {
    try { return JSON.parse(cached); } catch(e) {}
  }
  try {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=40.4433&longitude=-79.9436' +
      '&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,weathercode' +
      '&temperature_unit=fahrenheit&timezone=America%2FNew_York&forecast_days=16';
    const res  = await fetch(url);
    const data = await res.json();
    // Build map: dateStr -> { high, low, precip, code, icon, desc, warn }
    const map = {};
    const days = data.daily;
    for (let i = 0; i < days.time.length; i++) {
      const w = wmo(days.weathercode[i]);
      map[days.time[i]] = {
        high:   Math.round(days.temperature_2m_max[i]),
        low:    Math.round(days.temperature_2m_min[i]),
        precip: days.precipitation_probability_max[i],
        code:   days.weathercode[i],
        icon:   w.icon,
        desc:   w.desc,
        warn:   w.warn,
      };
    }
    sessionStorage.setItem('fence_wx', JSON.stringify(map));
    return map;
  } catch(e) {
    return {};
  }
}

// ---- Nav highlighting ----

function highlightNav() {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href') || '';
    const hPage = href.split('/').pop().split('#')[0] || 'index.html';
    if (hPage === path) a.classList.add('active');
  });
}

// ---- Username prompt ----

function ensureUserName(cb) {
  const name = getUserName();
  if (name) { cb(name); return; }
  const overlay = document.getElementById('username-modal');
  if (overlay) {
    overlay.classList.add('open');
    const form = document.getElementById('username-form');
    form.onsubmit = e => {
      e.preventDefault();
      const val = document.getElementById('username-input').value.trim();
      if (val) {
        setUserName(val);
        overlay.classList.remove('open');
        cb(val);
      }
    };
  } else {
    const n = prompt('Enter your name or Andrew ID to RSVP:');
    if (n) { setUserName(n); cb(n); }
  }
}

// ---- RSVP button renderer ----

function renderRsvpBtns(eventId, container) {
  const cur    = getUserRsvp(eventId);
  const counts = getRsvpCounts(eventId);

  container.innerHTML = `
    <div class="rsvp-btns">
      <button class="btn btn-sm btn-going ${cur==='going'?'active':''}"
              onclick="handleRsvp(${eventId},'going',this.closest('.rsvp-section'))">
        ✅ Going ${counts.going > 0 ? `(${counts.going})` : ''}
      </button>
      <button class="btn btn-sm btn-maybe ${cur==='maybe'?'active':''}"
              onclick="handleRsvp(${eventId},'maybe',this.closest('.rsvp-section'))">
        🤔 Maybe ${counts.maybe > 0 ? `(${counts.maybe})` : ''}
      </button>
      <button class="btn btn-sm btn-notgoing ${cur==='notGoing'?'active':''}"
              onclick="handleRsvp(${eventId},'notGoing',this.closest('.rsvp-section'))">
        ❌ Can't go ${counts.notGoing > 0 ? `(${counts.notGoing})` : ''}
      </button>
    </div>
  `;
}

function handleRsvp(eventId, status, container) {
  ensureUserName(() => {
    const cur = getUserRsvp(eventId);
    rsvp(eventId, cur === status ? null : status); // toggle
    renderRsvpBtns(eventId, container);
  });
}

// ---- Show toast ----

function toast(msg, type = 'success') {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.style.cssText = `
      position:fixed; bottom:24px; right:24px; z-index:9999;
      background:${type==='success'?'#28a745':'#C41230'}; color:white;
      padding:12px 20px; border-radius:8px; font-size:0.9rem;
      box-shadow:0 4px 16px rgba(0,0,0,0.2); font-weight:500;
      transform:translateY(80px); transition:transform 0.25s;
    `;
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.background = type === 'success' ? '#28a745' : '#C41230';
  setTimeout(() => { t.style.transform = 'translateY(0)'; }, 10);
  setTimeout(() => { t.style.transform = 'translateY(80px)'; }, 3000);
}

// ---- Nav HTML (shared) ----

function navHTML(activePage) {
  const pages = {
    index:    'index.html',
    schedule: 'schedule.html',
    queue:    'queue.html',
    gallery:  'gallery.html',
    about:    'about.html',
  };

  const user = getUserName();
  const initials = user ? user.slice(0,2).toUpperCase() : '?';

  return `
  <nav>
    <a href="${pages.index}" class="nav-brand">
      <span class="fence-icon">🎨</span> CMU Fence
    </a>
    <ul class="nav-links">
      <li><a href="${pages.index}" ${activePage==='index'?'class="active"':''}>Home</a></li>
      <li class="nav-dropdown">
        <a href="${pages.schedule}" ${activePage==='schedule'?'class="active"':''}>Schedule</a>
        <div class="dropdown-menu">
          <a href="${pages.schedule}">📅 Full Calendar</a>
          <a href="${pages.schedule}#upcoming">📋 Upcoming Events</a>
        </div>
      </li>
      <li class="nav-dropdown">
        <a href="${pages.queue}" ${activePage==='queue'?'class="active"':''}>Queue</a>
        <div class="dropdown-menu">
          <a href="${pages.queue}">🗂️ View Current Queue</a>
          <a href="${pages.queue}#register">✏️ Register Your Org</a>
        </div>
      </li>
      <li class="nav-dropdown">
        <a href="${pages.gallery}" ${activePage==='gallery'?'class="active"':''}>Gallery</a>
        <div class="dropdown-menu">
          <a href="${pages.gallery}">🖼️ Recent Fences</a>
          <a href="${pages.gallery}#history">📜 Historic Moments</a>
        </div>
      </li>
      <li class="nav-dropdown">
        <a href="${pages.about}" ${activePage==='about'?'class="active"':''}>About</a>
        <div class="dropdown-menu">
          <a href="${pages.about}#rules">📋 Rules & Guidelines</a>
          <a href="${pages.about}#history">📖 History of The Fence</a>
        </div>
      </li>
    </ul>
    <div class="nav-spacer"></div>
    <div class="nav-user">
      <div class="nav-avatar" onclick="promptUserName()" title="${user ? 'Signed in as '+user : 'Set your name'}">${initials}</div>
      ${user ? `<span style="font-size:0.8rem;opacity:0.75">${user}</span>` : ''}
    </div>
  </nav>`;
}

function promptUserName() {
  const name = prompt('Enter your name or Andrew ID:', getUserName() || '');
  if (name && name.trim()) {
    setUserName(name.trim());
    toast(`Welcome, ${name.trim()}! 👋`);
    location.reload();
  }
}

// ---- Footer HTML ----

function footerHTML() {
  return `
  <footer>
    <div class="footer-links">
      <a href="index.html">Home</a>
      <a href="schedule.html">Schedule</a>
      <a href="queue.html">Queue</a>
      <a href="gallery.html">Gallery</a>
      <a href="about.html">About</a>
      <a href="mailto:sg-fence@andrew.cmu.edu">Contact SG</a>
    </div>
    <div>CMU Fence Platform &mdash; Built for the Carnegie Mellon community 🎓</div>
    <div style="margin-top:4px;opacity:0.5">The Fence has been a CMU tradition since 1923 &bull; Paint midnight to sunrise only</div>
  </footer>`;
}

// ---- Username modal HTML ----

function userNameModalHTML() {
  return `
  <div class="modal-overlay" id="username-modal">
    <div class="modal" style="max-width:380px;text-align:center">
      <div style="font-size:2.5rem;margin-bottom:12px">🎨</div>
      <h3 style="font-size:1.2rem;margin-bottom:8px">Welcome to CMU Fence!</h3>
      <p style="color:var(--gray-600);font-size:0.9rem;margin-bottom:20px">
        Enter your name or Andrew ID to RSVP for painting events.
      </p>
      <form id="username-form">
        <div class="form-group" style="text-align:left">
          <label>Your Name / Andrew ID <span class="required">*</span></label>
          <input id="username-input" type="text" placeholder="e.g. jsmith or John Smith" required>
        </div>
        <button type="submit" class="btn btn-primary w-100" style="justify-content:center">
          Let's Go! →
        </button>
      </form>
    </div>
  </div>`;
}

// Init on every page
initData();
