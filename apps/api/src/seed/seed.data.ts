// apps/api/src/seed/seed.data.ts

export const SEED_PEOPLE = [
    { id: 'person_alice', name: 'Alice' },
    { id: 'person_bob', name: 'Bob' },
    { id: 'person_charlie', name: 'Charlie' },
    { id: 'person_diana', name: 'Diana' },
];

/**
 * Common stylesheet presets for distinct website aesthetics:
 * - Style 1: Warm Editorial (Literary, warm paper, serif headings, elegant margins)
 * - Style 2: Clean SaaS (Modern, crisp light mode, card-based layout, subtle badges)
 * - Style 3: Modern Dark Mode (Obsidian background, glowing accents, neo-brutalist tech cards)
 */

const STYLE_WARM_EDITORIAL = `
<style>
  .site-wrap {
    min-height: 100vh;
    background: #FBF8F3;
    color: #292524;
    padding: 48px 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Georgia, serif;
    box-sizing: border-box;
  }
  .site-container {
    max-width: 680px;
    margin: 0 auto;
  }
  .site-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #9C4221;
    background: #F2E8DC;
    padding: 3px 10px;
    border-radius: 9999px;
    margin-bottom: 16px;
  }
  h1, h2, h3 {
    font-family: Georgia, "Newsreader", serif;
    font-weight: 700;
    color: #1C1917;
    line-height: 1.25;
    margin-top: 0;
    margin-bottom: 16px;
  }
  h1 { font-size: 34px; letter-spacing: -0.02em; }
  h2 { font-size: 24px; margin-top: 28px; }
  p {
    font-size: 16px;
    line-height: 1.7;
    color: #44403C;
    margin: 0 0 16px;
  }
  blockquote {
    margin: 24px 0;
    padding: 12px 20px;
    border-left: 3px solid #9C4221;
    background: #F5EFE6;
    border-radius: 0 8px 8px 0;
    font-style: italic;
    color: #57534E;
  }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #E7DFD5;
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: #FFFFFF;
    border: 1px solid #E7DFD5;
    border-radius: 9999px;
    color: #9C4221;
    font-size: 13px;
    font-weight: 500;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .site-link:hover {
    background: #F2E8DC;
    border-color: #9C4221;
    color: #7A3218;
  }
  .danger-link {
    color: #DC2626;
    border-color: #FCA5A5;
  }
  .danger-link:hover {
    background: #FEF2F2;
    border-color: #DC2626;
  }
</style>
`;

const STYLE_CLEAN_SAAS = `
<style>
  .site-wrap {
    min-height: 100vh;
    background: #FAFAFA;
    color: #1E293B;
    padding: 48px 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Inter", sans-serif;
    box-sizing: border-box;
  }
  .site-container {
    max-width: 720px;
    margin: 0 auto;
  }
  .site-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6F4C7A;
    background: rgba(232, 191, 209, 0.25);
    border: 1px solid #E8BFD1;
    padding: 4px 10px;
    border-radius: 9999px;
    margin-bottom: 16px;
  }
  h1, h2, h3 {
    font-weight: 800;
    color: #0F172A;
    line-height: 1.2;
    letter-spacing: -0.03em;
    margin-top: 0;
    margin-bottom: 14px;
  }
  h1 { font-size: 32px; }
  h2 { font-size: 22px; margin-top: 28px; }
  p {
    font-size: 15px;
    line-height: 1.65;
    color: #475569;
    margin: 0 0 16px;
  }
  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
    margin: 24px 0;
  }
  .feature-card {
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 12px;
    padding: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.03);
    transition: all 0.2s ease;
  }
  .feature-card:hover {
    border-color: #6F4C7A;
    box-shadow: 0 6px 16px rgba(0,0,0,0.06);
    transform: translateY(-2px);
  }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #E2E8F0;
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    padding: 7px 16px;
    background: #FFFFFF;
    border: 1px solid #E2E8F0;
    border-radius: 8px;
    color: #6F4C7A;
    font-size: 13.5px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .site-link:hover {
    background: rgba(232, 191, 209, 0.15);
    border-color: #A76D99;
  }
</style>
`;

const STYLE_MODERN_DARK = `
<style>
  .site-wrap {
    min-height: 100vh;
    background: #0B0E14;
    color: #E2E8F0;
    padding: 48px 24px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, ui-monospace, sans-serif;
    box-sizing: border-box;
  }
  .site-container {
    max-width: 700px;
    margin: 0 auto;
  }
  .site-tag {
    display: inline-block;
    font-size: 11px;
    font-weight: 700;
    font-family: ui-monospace, Menlo, monospace;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #34D399;
    background: rgba(52, 211, 153, 0.12);
    border: 1px solid rgba(52, 211, 153, 0.3);
    padding: 3px 10px;
    border-radius: 9999px;
    margin-bottom: 16px;
  }
  h1, h2, h3 {
    font-weight: 700;
    color: #F8FAFC;
    line-height: 1.25;
    letter-spacing: -0.025em;
    margin-top: 0;
    margin-bottom: 14px;
  }
  h1 { font-size: 32px; }
  h2 { font-size: 20px; margin-top: 28px; }
  p {
    font-size: 15px;
    line-height: 1.65;
    color: #94A3B8;
    margin: 0 0 16px;
  }
  .terminal-box {
    background: #151922;
    border: 1px solid #232936;
    border-radius: 10px;
    padding: 18px;
    font-family: ui-monospace, Menlo, monospace;
    font-size: 13px;
    color: #A7F3D0;
    margin: 20px 0;
  }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 32px;
    padding-top: 24px;
    border-top: 1px solid #1E2533;
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    padding: 6px 14px;
    background: #151922;
    border: 1px solid #232936;
    border-radius: 9999px;
    color: #34D399;
    font-size: 13px;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .site-link:hover {
    background: rgba(52, 211, 153, 0.15);
    border-color: #34D399;
    transform: translateY(-1px);
  }
</style>
`;

export const SEED_SITES = [
    // 1. Warm Editorial Style (Tidepool Field Notes)
    {
        address: 'tidepool.zz',
        title: 'Tidepool Field Notes',
        authorId: 'person_mira',
        html: `
${STYLE_WARM_EDITORIAL}
<div class="site-wrap">
  <div class="site-container">
    <span class="site-tag">Field Journal • Issue 04</span>
    <h1>Tidepool Field Notes</h1>
    <p>At low tide, the pools hold secrets carved by centuries of cold saltwater. I have been documenting the organisms, barnacles, and translucent sea anemones clinging to the granite shelf.</p>
    <blockquote>"The ocean recedes twice a day not to abandon the coast, but to invite curious eyes into its quietest corners."</blockquote>
    <p>Every morning brings a new configuration of kelp and quartz sand. Follow the trails along the rocky edge to continue your walk.</p>
    <div class="site-nav">
      <a class="site-link" href="shore.zz">Walk to the Shoreline</a>
      <a class="site-link" href="weather.zz">Check Marine Weather</a>
      <a class="site-link danger-link" href="broken-link.zz">Explore Sunken Reef (404)</a>
    </div>
  </div>
</div>
        `.trim(),
    },

    // 2. Clean SaaS Style (The Shoreline)
    {
        address: 'shore.zz',
        title: 'The Shoreline',
        authorId: 'person_mira',
        html: `
${STYLE_CLEAN_SAAS}
<div class="site-wrap">
  <div class="site-container">
    <div class="site-tag">Geographical Registry</div>
    <h1>The Edge of the Continent</h1>
    <p>The shoreline is where tectonic bedrock meets oceanic tides. Constant wave friction forms dunes, sea glass deposits, and shifting sandbars.</p>
    <div class="card-grid">
      <div class="feature-card">
        <h3>Wind & Tides</h3>
        <p>Prevailing westerly winds average 14 knots with steady swells throughout the afternoon.</p>
      </div>
      <div class="feature-card">
        <h3>Coastal Flora</h3>
        <p>Hardy saltwort, dune grass, and sea lavender anchoring the tidal dunes.</p>
      </div>
    </div>
    <div class="site-nav">
      <a class="site-link" href="tidepool.zz">Return to Tidepool</a>
      <a class="site-link" href="weather.zz">Meteorological Data</a>
      <a class="site-link" href="radio.zz">Listen to Coast Radio</a>
    </div>
  </div>
</div>
        `.trim(),
    },

    // 3. Modern Dark Mode Style (Digital Garden)
    {
        address: 'garden.zz',
        title: 'Digital Garden',
        authorId: 'person_alex',
        html: `
${STYLE_MODERN_DARK}
<div class="site-wrap">
  <div class="site-container">
    <span class="site-tag">Status: Cultivating (v2.4)</span>
    <h1>Digital Garden & Rhizome</h1>
    <p>A non-linear space for nascent thoughts, code sketches, and interconnected essays. Ideas here are tended slowly over time like perennials.</p>
    <div class="terminal-box">
      $ cat seeds.log<br />
      [01] decentralized protocols<br />
      [02] offline-first typography<br />
      [03] slow web architecture
    </div>
    <p>Unlike transient feeds, gardens prioritize longevity, bidirectional links, and dense cross-pollination between topics.</p>
    <div class="site-nav">
      <a class="site-link" href="library.zz">Index Library</a>
      <a class="site-link" href="music.zz">Ambient Audio</a>
      <a class="site-link" href="tidepool.zz">Tidepool Notes</a>
    </div>
  </div>
</div>
        `.trim(),
    },

    // 4. Clean SaaS Style (Local Weather)
    {
        address: 'weather.zz',
        title: 'Local Weather',
        authorId: 'person_sam',
        html: `
${STYLE_CLEAN_SAAS}
<div class="site-wrap">
  <div class="site-container">
    <div class="site-tag">Live Sensor Station</div>
    <h1>Coastal Meteorological Station</h1>
    <p>Real-time atmospheric telemetry and oceanic barometer readings along the Small Web coastline.</p>
    <div class="card-grid">
      <div class="feature-card">
        <h3>Current Temperature</h3>
        <p style="font-size: 26px; font-weight: 700; color: #6F4C7A; margin: 4px 0;">16°C</p>
        <p>Dew point 11°C • Humidity 74%</p>
      </div>
      <div class="feature-card">
        <h3>Tidal Cycle</h3>
        <p style="font-size: 26px; font-weight: 700; color: #6F4C7A; margin: 4px 0;">Low: 14:15</p>
        <p>Next high water mark at 20:45</p>
      </div>
    </div>
    <div class="site-nav">
      <a class="site-link" href="tidepool.zz">Visit Tidepool</a>
      <a class="site-link" href="observatory.zz">Observatory Forecast</a>
    </div>
  </div>
</div>
        `.trim(),
    },

    // 5. Warm Editorial Style (The Small Library)
    {
        address: 'library.zz',
        title: 'The Small Library',
        authorId: 'person_sam',
        html: `
${STYLE_WARM_EDITORIAL}
<div class="site-wrap">
  <div class="site-container">
    <span class="site-tag">Reading Room & Catalog</span>
    <h1>The Small Library</h1>
    <p>A quiet repository dedicated to digital monographs, ephemera, and open-source manifestos. Open to all readers without accounts or analytics.</p>
    <blockquote>"To curate is to resist the flood of instantaneous noise in favor of intentional memory."</blockquote>
    <p>Recent acquisitions include hand-typed field notes from the western cove and astronomical logs from autumn.</p>
    <div class="site-nav">
      <a class="site-link" href="shore.zz">The Shoreline</a>
      <a class="site-link" href="archive.zz">Historic Archives</a>
      <a class="site-link" href="garden.zz">Digital Garden</a>
    </div>
  </div>
</div>
        `.trim(),
    },

    // 6. Modern Dark Mode Style (Ambient Sounds)
    {
        address: 'music.zz',
        title: 'Ambient Sounds',
        authorId: 'person_alex',
        html: `
${STYLE_MODERN_DARK}
<div class="site-wrap">
  <div class="site-container">
    <span class="site-tag">Audio Stream • 48kHz</span>
    <h1>Ambient Waveform Logs</h1>
    <p>Hydrophone recordings and field acoustics collected along the coastal shallows during twilight.</p>
    <div class="terminal-box">
      [NOW PLAYING] 03_fog_horns_and_ebbing_tide.flac<br />
      Duration: 42:18 • Bitrate: Lossless
    </div>
    <div class="site-nav">
      <a class="site-link" href="garden.zz">Return to Garden</a>
      <a class="site-link" href="radio.zz">Coastline Radio</a>
    </div>
  </div>
</div>
        `.trim(),
    },

    // 7. Clean SaaS Style (Old Archives)
    {
        address: 'archive.zz',
        title: 'Old Archives',
        authorId: 'person_charlie',
        html: `
${STYLE_CLEAN_SAAS}
<div class="site-wrap">
  <div class="site-container">
    <div class="site-tag">Permanent Records</div>
    <h1>Public Archival Repository</h1>
    <p>Cataloging primary source documents, early network blueprints, and municipal cartography from the early days of the Small Web.</p>
    <div class="card-grid">
      <div class="feature-card">
        <h3>Index Volume I</h3>
        <p>1980–1999: Packet radio networks and decentralized bulletin protocols.</p>
      </div>
      <div class="feature-card">
        <h3>Index Volume II</h3>
        <p>2000–Present: Mesh networks and personal web manifestos.</p>
      </div>
    </div>
    <div class="site-nav">
      <a class="site-link" href="library.zz">Visit Library</a>
      <a class="site-link" href="shore.zz">Coastline History</a>
    </div>
  </div>
</div>
        `.trim(),
    },

    // 8. Modern Dark Mode Style (Pirate Radio)
    {
        address: 'radio.zz',
        title: 'Pirate Radio',
        authorId: 'person_charlie',
        html: `
${STYLE_MODERN_DARK}
<div class="site-wrap">
  <div class="site-container">
    <span class="site-tag">Frequency: 104.7 FM</span>
    <h1>Pirate Radio Beacon</h1>
    <p>Broadcasting low-power frequency modulation across the sea rocks. Independent voices, open poetry, and nocturnal soundscapes.</p>
    <div class="terminal-box">
      STATUS: TRANSMITTING<br />
      SIGNAL: 25 Watts Omni-directional<br />
      RELAY: Autonomous solar cell active
    </div>
    <div class="site-nav">
      <a class="site-link" href="music.zz">Studio Audio</a>
      <a class="site-link" href="shore.zz">Antenna Shoreline</a>
    </div>
  </div>
</div>
        `.trim(),
    },

    // 9. Warm Editorial Style (The Kitchen)
    {
        address: 'kitchen.zz',
        title: 'The Kitchen',
        authorId: 'person_mira',
        html: `
${STYLE_WARM_EDITORIAL}
<div class="site-wrap">
  <div class="site-container">
    <span class="site-tag">Seasonal Culinary Notes</span>
    <h1>The Coastal Kitchen</h1>
    <p>Simple food prepared according to the tides and garden harvest. Sourdough baked with sea salt, dried kombu broth, and wild herbs.</p>
    <blockquote>"The best meals are slow rituals that mirror the rhythm of the soil and sea."</blockquote>
    <div class="site-nav">
      <a class="site-link" href="tidepool.zz">Forage Tidepool</a>
      <a class="site-link" href="garden.zz">Harvest Garden</a>
    </div>
  </div>
</div>
        `.trim(),
    },

    // 10. Modern Dark Mode Style (Star Observatory)
    {
        address: 'observatory.zz',
        title: 'Star Observatory',
        authorId: 'person_sam',
        html: `
${STYLE_MODERN_DARK}
<div class="site-wrap">
  <div class="site-container">
    <span class="site-tag">Aperture: 400mm Schmidt-Cassegrain</span>
    <h1>Deep Space Observatory</h1>
    <p>Positioned on the sea cliff above coastal light pollution. Monitoring constellations, planetary transits, and stellar nebulas.</p>
    <div class="terminal-box">
      COORDINATES: 48°24'N, 124°10'W<br />
      SEEING CONDITIONS: 0.8 arcseconds<br />
      TARGET: Orion Molecular Cloud Complex
    </div>
    <div class="site-nav">
      <a class="site-link" href="weather.zz">Atmospheric Seeing</a>
      <a class="site-link" href="library.zz">Star Charts</a>
    </div>
  </div>
</div>
        `.trim(),
    },
];

/**
 * Deterministic seed history.
 */
export const SEED_HISTORY: { personId: string, address: string, title: string, minutesAgo: number }[] = [
    // Alice's trail
    { personId: 'person_alice', address: 'tidepool.zz', title: 'Tidepool Field Notes', minutesAgo: 120 },
    { personId: 'person_alice', address: 'shore.zz', title: 'The Shoreline', minutesAgo: 115 },
    { personId: 'person_alice', address: 'tidepool.zz', title: 'Tidepool Field Notes', minutesAgo: 110 },
    { personId: 'person_alice', address: 'broken-link.zz', title: 'Nowhere', minutesAgo: 105 },

    // Diana's Trail
    { personId: 'person_diana', address: 'garden.zz', title: 'Digital Garden', minutesAgo: 300 },
    { personId: 'person_diana', address: 'library.zz', title: 'The Small Library', minutesAgo: 290 },
    { personId: 'person_diana', address: 'archive.zz', title: 'Old Archives', minutesAgo: 280 },
    { personId: 'person_diana', address: 'radio.zz', title: 'Pirate Radio', minutesAgo: 270 },
    { personId: 'person_diana', address: 'shore.zz', title: 'The Shoreline', minutesAgo: 260 },
    { personId: 'person_diana', address: 'tidepool.zz', title: 'Tidepool Field Notes', minutesAgo: 250 },
    { personId: 'person_diana', address: 'kitchen.zz', title: 'The Kitchen', minutesAgo: 240 },
    { personId: 'person_diana', address: 'weather.zz', title: 'Local Weather', minutesAgo: 230 },
    { personId: 'person_diana', address: 'observatory.zz', title: 'Star Observatory', minutesAgo: 220 },
    { personId: 'person_diana', address: 'music.zz', title: 'Ambient Sounds', minutesAgo: 210 },
    { personId: 'person_diana', address: 'garden.zz', title: 'Digital Garden', minutesAgo: 200 },
];
