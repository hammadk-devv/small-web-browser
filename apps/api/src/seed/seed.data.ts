// apps/api/src/seed/seed.data.ts

export const SEED_SITES = [
  // ── 1. TIDEPOOL.ZZ ─────────────────────────────────────────────────────────
  // Warm Editorial: full-bleed hero, centered overlay text, cream paper, Georgia typography
  {
    address: 'tidepool.zz',
    title: 'Tidepool Field Notes',
    authorId: 'person_mira',
    html: `
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .site-wrap {
    min-height: 100vh;
    background: #FBF8F3;
    font-family: Georgia, "Palatino Linotype", Palatino, serif;
    color: #2C2420;
    animation: fadeIn 0.4s ease-out;
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .hero-container {
    position: relative;
    width: 100%;
    height: 45vh;
    min-height: 300px;
    max-height: 420px;
    overflow: hidden;
  }
  .hero-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(0.85);
  }
  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(10,61,98,0.2) 0%, rgba(10,61,98,0.8) 100%);
  }
  .hero-inner{
   position: absolute;
   bottom: 40px;
   left:40px;
   max-width: 1000px;  
  }
  .hero-label {
    display: inline-block;
    align-self: flex-start;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #FBF8F3;
    border: 1px solid rgba(251,248,243,0.4);
    padding: 4px 14px;
    border-radius: 9999px;
    margin-bottom: 14px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    backdrop-filter: blur(4px);
  }
  .hero-title {
    font-size: clamp(36px, 5vw, 56px);
    font-weight: 700;
    color: #FFFFFF;
    line-height: 1.05;
    letter-spacing: -0.02em;
    text-shadow: 0 2px 20px rgba(0,0,0,0.4);
  }
  .body-wrap {
    max-width: 760px;
    margin: 0 auto;
    padding: 48px 28px 64px;
  }
  .article-card {
    float: right;
    width: 40%;
    max-width: 280px;
    margin: 0 0 20px 24px;
    border-radius: 8px;
    object-fit: cover;
    display: block;
    box-shadow: 0 8px 24px rgba(10,61,98,0.15);
  }
  .dropcap::first-letter {
    float: left;
    font-size: 64px;
    line-height: 0.8;
    padding-right: 12px;
    padding-top: 4px;
    color: #0A3D62;
    font-family: Georgia, serif;
    font-weight: 700;
  }
  p {
    font-size: 17px;
    line-height: 1.8;
    color: #3D342E;
    margin-bottom: 22px;
  }
  blockquote {
    clear: both;
    margin: 32px 0;
    padding: 20px 28px;
    border-left: 3px solid #C9A227;
    background: #F4EEDF;
    border-radius: 0 10px 10px 0;
    font-style: italic;
    font-size: 18px;
    color: #2C2420;
    line-height: 1.6;
  }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 40px;
    padding-top: 28px;
    border-top: 1px solid #E5DDD5;
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    padding: 9px 20px;
    background: #FFFFFF;
    border: 1px solid #DACED5;
    border-radius: 9999px;
    color: #0A3D62;
    font-size: 13.5px;
    font-weight: 600;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    transition: all 0.2s ease;
  }
  .site-link:hover { background: #EEF7FC; border-color: #0A3D62; transform: translateY(-1px); }
  .danger-link { color: #C0392B; border-color: #F5C6C2; }
  .danger-link:hover { background: #FEF2F0; border-color: #C0392B; }
</style>
<div class="site-wrap">
  <div class="hero-container">
    <img src="/assets/tidepool-hero.jpg" alt="Tidepool ocean rocks" class="hero-img" />
    <div class="hero-overlay">
     <div class="hero-inner">
      <span class="hero-label">Field Journal — Issue 04</span>
      <h1 class="hero-title">Tidepool Field Notes</h1>
      </div>
    </div>
  </div>
  <div class="body-wrap">
    <img src="/assets/tidepool-card.jpg" alt="Sea anemone" class="article-card" />
    <p class="dropcap">At low tide, the granite pools hold secrets carved by centuries of cold saltwater. I have been documenting the organisms clinging to the rocky shelf at the base of the sea cliff — green anemones opening like florets, purple urchins nested into hollows, and kelp ribbons swaying with the outgoing swell.</p>
    <p>Every morning brings a new configuration of quartz sand and tide wrack. The photographic log now spans eleven consecutive tidal cycles, charting the subtle shifts of an ecosystem that disappears twice each day beneath the ocean surface.</p>
    <blockquote>"The ocean recedes twice a day not to abandon the coast, but to invite curious eyes into its quietest corners."</blockquote>
    <p>Follow the marked paths along the granite shelf to walk further toward the outer banks, or tune your receiver to the marine weather telemetry.</p>
    <div class="site-nav">
      <a class="site-link" href="shore.zz">Walk to the Shoreline</a>
      <a class="site-link" href="weather.zz">Check Marine Weather</a>
      <a class="site-link" href="garden.zz">Digital Garden</a>
      <a class="site-link danger-link" href="broken-link.zz">Explore Sunken Reef (404)</a>
    </div>
  </div>
</div>
        `.trim(),
  },

  // ── 2. SHORE.ZZ ─────────────────────────────────────────────────────────────
  {
    address: 'shore.zz',
    title: 'The Shoreline',
    authorId: 'person_mira',
    html: `
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .site-wrap {
    min-height: 100vh;
    background: #0F172A;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    color: #F8FAFC;
    display: flex;
  }
  .split-left {
    width: 40%;
    min-width: 320px;
    height: 100vh;
    position: sticky;
    top: 0;
    overflow: hidden;
  }
  .sidebar-img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    display: block;
    filter: brightness(0.9);
  }
  .sidebar-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(15,23,42,0.2) 0%, rgba(15,23,42,0.85) 100%);
    padding: 40px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .split-right {
    width: 60%;
    padding: 48px 40px 64px;
    overflow-y: auto;
  }
  .tag {
    font-family: ui-monospace, Menlo, monospace;
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #22D3EE;
    margin-bottom: 8px;
  }
  h1 {
    font-size: 40px;
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin-bottom: 16px;
    color: #FFFFFF;
  }
  p {
    font-size: 15px;
    line-height: 1.7;
    color: #94A3B8;
    margin-bottom: 24px;
  }
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    margin: 28px 0;
  }
  .metric-card {
    background: #1E293B;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 20px;
  }
  .metric-label {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #64748B;
    margin-bottom: 6px;
    font-family: ui-monospace, monospace;
  }
  .metric-value {
    font-size: 32px;
    font-weight: 800;
    color: #22D3EE;
    font-family: ui-monospace, monospace;
    line-height: 1;
    animation: numberPulse 2s ease-in-out infinite alternate;
  }
  @keyframes numberPulse {
    from { opacity: 0.85; transform: scale(1); }
    to { opacity: 1; transform: scale(1.02); }
  }
  .flora-panel {
    background: #1E293B;
    border: 1px solid #334155;
    border-radius: 12px;
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 20px;
    margin: 24px 0;
  }
  .flora-thumb {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 8px;
    display: block;
    flex-shrink: 0;
  }
  .flora-title { font-size: 15px; font-weight: 700; color: #FFFFFF; margin-bottom: 4px; }
  .flora-desc { font-size: 13px; color: #94A3B8; line-height: 1.5; }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid #334155;
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    padding: 8px 18px;
    background: #1E293B;
    border: 1px solid #334155;
    border-radius: 8px;
    color: #22D3EE;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .site-link:hover { background: #334155; transform: translateY(-1px); }
  @media (max-width: 768px) {
    .site-wrap { flex-direction: column; }
    .split-left { width: 100%; height: 320px; position: relative; }
    .sidebar-img { height: 320px; }
    .split-right { width: 100%; padding: 28px 20px; }
  }
</style>
<div class="site-wrap">
  <div class="split-left">
    <img src="/assets/shore-hero.jpg" alt="Aerial coastline ocean" class="sidebar-img" />
    <div class="sidebar-overlay">
      <div class="tag">Geographical Registry</div>
      <h1>The Shoreline</h1>
    </div>
  </div>
  <div class="split-right">
    <p>Where bedrock meets oceanic tides. Constant wave friction forms dunes, quartz sandbars, and sea-glass deposits along the western shelf.</p>
    <div class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">Wind Velocity</div>
        <div class="metric-value">14 kn</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Swell Period</div>
        <div class="metric-value">11.4 s</div>
      </div>
    </div>
    <div class="flora-panel">
      <img src="/assets/shore-card.jpg" alt="Sea lavender coastal" class="flora-thumb" />
      <div>
        <div class="flora-title">Limonium vulgare (Sea Lavender)</div>
        <div class="flora-desc">Salt-tolerant coastal flora anchoring the tidal dunes. Currently flowering in dense purple clusters across the saline marsh.</div>
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

  // ── 3. GARDEN.ZZ ─────────────────────────────────────────────────────────────
  {
    address: 'garden.zz',
    title: 'Digital Garden',
    authorId: 'person_alex',
    html: `
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .site-wrap {
    min-height: 100vh;
    background: #FDFBF7;
    font-family: Georgia, "Palatino Linotype", serif;
    color: #1A3321;
  }
  .hero-banner {
    width: 100%;
    height: 50vh;
    min-height: 320px;
    object-fit: cover;
    display: block;
    filter: brightness(0.9);
  }
  .body-wrap {
    max-width: 860px;
    margin: 0 auto;
    padding: 48px 32px 64px;
  }
  .journal-issue {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.12em;
    color: #A3B18A;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    margin-bottom: 8px;
  }
  h1 {
    font-size: 46px;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: #1A3321;
    margin-bottom: 16px;
  }
  .intro {
    font-size: 18px;
    line-height: 1.75;
    color: #344E41;
    margin-bottom: 36px;
  }
  .cards-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    margin: 36px 0;
  }
  .card {
    background: #FFFFFF;
    border: 1px solid #E3DEC3;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(26,51,33,0.04);
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .card:hover {
    transform: translateY(-6px);
    box-shadow: 0 12px 28px rgba(26,51,33,0.12);
    border-color: #A3B18A;
  }
  .card-img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    display: block;
  }
  .card-body {
    padding: 18px;
  }
  .card-tag {
    font-family: ui-monospace, monospace;
    font-size: 11px;
    color: #A3B18A;
    text-transform: uppercase;
    margin-bottom: 6px;
  }
  .card-title {
    font-size: 16px;
    font-weight: 700;
    color: #1A3321;
    margin-bottom: 6px;
  }
  .card-desc {
    font-size: 13.5px;
    line-height: 1.55;
    color: #588157;
  }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid #E3DEC3;
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    padding: 8px 18px;
    background: #FFFFFF;
    border: 1px solid #E3DEC3;
    border-radius: 9999px;
    color: #344E41;
    font-size: 13.5px;
    font-weight: 600;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    transition: all 0.2s ease;
  }
  .site-link:hover { background: #DAD7CD; border-color: #344E41; }
  @media (max-width: 768px) {
    .cards-grid { grid-template-columns: 1fr; }
  }
</style>
<div class="site-wrap">
  <img src="/assets/garden-hero.jpg" alt="Botanical leaves green" class="hero-banner" />
  <div class="body-wrap">
    <div class="journal-issue">Botanical Archive — Vol. III</div>
    <h1>Digital Garden &amp; Rhizome</h1>
    <p class="intro">A non-linear repository for nascent thoughts, code sketches, and botanical specimens. Ideas here are tended deliberately over time, mirroring the quiet persistence of perennial roots.</p>
    <div class="cards-grid">
      <div class="card">
        <img src="/assets/garden-card-1.jpg" alt="Pressed flower botanical" class="card-img" />
        <div class="card-body">
          <div class="card-tag">Specimen 01</div>
          <div class="card-title">Pressed Flora</div>
          <div class="card-desc">Decentralized protocols preserved between pages of intentional thought.</div>
        </div>
      </div>
      <div class="card">
        <img src="/assets/garden-card-2.jpg" alt="Fern leaf macro" class="card-img" />
        <div class="card-body">
          <div class="card-tag">Specimen 02</div>
          <div class="card-title">Fern Patterns</div>
          <div class="card-desc">Self-similar fractal layouts and resilient offline-first typography.</div>
        </div>
      </div>
      <div class="card">
        <img src="/assets/garden-card-3.jpg" alt="Eucalyptus plant detail" class="card-img" />
        <div class="card-body">
          <div class="card-tag">Specimen 03</div>
          <div class="card-title">Eucalyptus Oil</div>
          <div class="card-desc">Slow web architecture designed to endure across technological seasons.</div>
        </div>
      </div>
    </div>
    <div class="site-nav">
      <a class="site-link" href="library.zz">Index Library</a>
      <a class="site-link" href="music.zz">Ambient Audio</a>
      <a class="site-link" href="tidepool.zz">Tidepool Notes</a>
    </div>
  </div>
</div>
        `.trim(),
  },

  // ── 4. WEATHER.ZZ ───────────────────────────────────────────────────────────
  {
    address: 'weather.zz',
    title: 'Local Weather',
    authorId: 'person_sam',
    html: `
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .site-wrap {
    min-height: 100vh;
    background: #000000;
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    color: #00FF41;
    position: relative;
    overflow: hidden;
  }
  .bg-layer {
    position: fixed;
    inset: 0;
    background: url('/assets/bg-weather.jpg') center/cover no-repeat fixed;
    filter: blur(20px) brightness(0.15);
    z-index: 1;
  }
  .content-layer {
    position: relative;
    z-index: 2;
  }
  .hero-dark {
    width: 100%;
    height: 40vh;
    min-height: 240px;
    object-fit: cover;
    filter: brightness(0.4);
    display: block;
    border-bottom: 1px solid #004D15;
  }
  .body-wrap {
    max-width: 860px;
    margin: 0 auto;
    padding: 36px 28px 60px;
  }
  .terminal-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 16px;
    border-bottom: 1px solid #003300;
    margin-bottom: 24px;
    font-size: 12px;
    color: #008822;
  }
  .blink {
    display: inline-block;
    width: 8px;
    height: 14px;
    background: #00FF41;
    margin-left: 6px;
    animation: blink 1s step-end infinite;
  }
  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  h1 {
    font-size: 32px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #00FF41;
    margin-bottom: 12px;
  }
  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 12px;
    margin: 28px 0;
  }
  .metric-cell {
    background: rgba(0, 20, 0, 0.7);
    border: 1px solid #004D15;
    border-radius: 6px;
    padding: 16px;
    backdrop-filter: blur(4px);
  }
  .metric-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    color: #008822;
    text-transform: uppercase;
    margin-bottom: 4px;
  }
  .metric-val {
    font-size: 26px;
    font-weight: 700;
    color: #00FF41;
  }
  .data-line {
    padding: 10px 14px;
    background: rgba(0, 30, 0, 0.5);
    border-left: 3px solid #00FF41;
    margin-bottom: 8px;
    font-size: 13.5px;
    color: #7DFFA0;
  }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 36px;
    padding-top: 20px;
    border-top: 1px solid #003300;
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    padding: 8px 18px;
    background: rgba(0, 20, 0, 0.6);
    border: 1px solid #004D15;
    border-radius: 4px;
    color: #00FF41;
    font-size: 13px;
    text-decoration: none;
    transition: all 0.2s ease;
  }
  .site-link::before { content: "> "; color: #008822; }
  .site-link:hover { background: #002200; border-color: #00FF41; }
  @media (max-width: 768px) {
    .metrics-grid { grid-template-columns: repeat(2, 1fr); }
  }
</style>
<div class="site-wrap">
  <div class="bg-layer"></div>
  <div class="content-layer">
    <img src="/assets/weather-hero.jpg" alt="Stormy ocean dark clouds" class="hero-dark" />
    <div class="body-wrap">
      <div class="terminal-bar">
        <span>MET-ARRAY // STATION WEST-04</span>
        <span>STATUS: ACTIVE SCAN<span class="blink"></span></span>
      </div>
      <h1>Coastal Meteorological Array</h1>
      <div class="metrics-grid">
        <div class="metric-cell"><div class="metric-label">Temp</div><div class="metric-val">16°C</div></div>
        <div class="metric-cell"><div class="metric-label">Baro</div><div class="metric-val">1013</div></div>
        <div class="metric-cell"><div class="metric-label">Humidity</div><div class="metric-val">74%</div></div>
        <div class="metric-cell"><div class="metric-label">Tide</div><div class="metric-val">Low</div></div>
      </div>
      <div class="data-line">> RADAR SCAN: Marine squall line passing 12 nautical miles offshore.</div>
      <div class="data-line">> ANEMOMETER: Steady westerlies at 14 knots with gusts to 22.</div>
      <div class="data-line">> OCEAN BUOY #09: Water surface temp 13.2°C; swell height 1.8m.</div>
      <div class="site-nav">
        <a class="site-link" href="tidepool.zz">Visit Tidepool</a>
        <a class="site-link" href="observatory.zz">Observatory Forecast</a>
        <a class="site-link" href="shore.zz">Shoreline Sensors</a>
      </div>
    </div>
  </div>
</div>
        `.trim(),
  },

  // ── 5. LIBRARY.ZZ ───────────────────────────────────────────────────────────
  {
    address: 'library.zz',
    title: 'The Small Library',
    authorId: 'person_sam',
    html: `
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .site-wrap {
    min-height: 100vh;
    background: #F4ECD8;
    background-image: url('/assets/bg-library.jpg');
    background-repeat: repeat;
    background-attachment: fixed;
    background-size: cover;
    font-family: Georgia, "Palatino Linotype", serif;
    color: #3D2817;
    display: flex;
  }
  .split-left {
    width: 42%;
    height: 100vh;
    position: sticky;
    top: 0;
    overflow: hidden;
  }
  .split-img {
    width: 100%;
    height: 100vh;
    object-fit: cover;
    display: block;
  }
  .split-right {
    width: 58%;
    padding: 56px 44px 64px;
    background: rgba(244, 236, 216, 0.94);
    min-height: 100vh;
    overflow-y: auto;
  }
  .call-number {
    font-family: ui-monospace, monospace;
    font-size: 11px;
    letter-spacing: 0.1em;
    color: #9C7A3C;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  h1 {
    font-size: 42px;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: #3D2817;
    margin-bottom: 20px;
  }
  p {
    font-size: 16.5px;
    line-height: 1.8;
    color: #4A3525;
    margin-bottom: 24px;
  }
  blockquote {
    margin: 28px 0;
    padding: 16px 24px;
    border-left: 3px solid #9C7A3C;
    background: rgba(156, 122, 60, 0.1);
    border-radius: 0 8px 8px 0;
    font-style: italic;
    font-size: 17px;
  }
  .catalog-card {
    background: #FFFDF9;
    border: 1px solid #D5C7AA;
    border-radius: 8px;
    padding: 20px;
    display: flex;
    gap: 20px;
    align-items: center;
    margin: 28px 0;
    box-shadow: 0 4px 12px rgba(61,40,23,0.06);
    transition: transform 0.3s ease;
  }
  .catalog-card:hover {
    transform: perspective(600px) rotateY(-2deg) translateY(-2px);
  }
  .thumb {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    display: block;
    flex-shrink: 0;
  }
  .card-hed { font-size: 16px; font-weight: 700; margin-bottom: 4px; color: #3D2817; }
  .card-sub { font-size: 13.5px; color: #6E533F; line-height: 1.5; }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid #D5C7AA;
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    padding: 8px 18px;
    background: #3D2817;
    border-radius: 4px;
    color: #F4ECD8;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    transition: all 0.2s ease;
  }
  .site-link:hover { background: #5E3E24; transform: translateY(-1px); }
  @media (max-width: 768px) {
    .site-wrap { flex-direction: column; }
    .split-left { width: 100%; height: 320px; position: relative; }
    .split-img { height: 320px; }
    .split-right { width: 100%; padding: 32px 20px; }
  }
</style>
<div class="site-wrap">
  <div class="split-left">
    <img src="/assets/library-hero.jpg" alt="Vintage library archives" class="split-img" />
  </div>
  <div class="split-right">
    <div class="call-number">ESTD. 2019 — CLASS 020.4</div>
    <h1>The Small Library</h1>
    <p>A quiet repository dedicated to digital monographs, ephemera, and open-source manifestos. Open to all readers without accounts, analytics, or behavioral surveillance.</p>
    <blockquote>"To curate is to resist the flood of instantaneous noise in favor of intentional, persistent memory."</blockquote>
    <div class="catalog-card">
      <img src="/assets/library-card.jpg" alt="Open book pages" class="thumb" />
      <div>
        <div class="card-hed">Rare Folios &amp; Field Journals</div>
        <div class="card-sub">Hand-typed observations across eleven coastal cycles. Bound in archival linen with unredacted marginalia.</div>
      </div>
    </div>
    <div class="site-nav">
      <a class="site-link" href="shore.zz">The Shoreline</a>
      <a class="site-link" href="archive.zz">Historic Archives</a>
      <a class="site-link" href="garden.zz">Digital Garden</a>
    </div>
  </div>
</div>
        `.trim(),
  },

  // ── 6. MUSIC.ZZ ─────────────────────────────────────────────────────────────
  {
    address: 'music.zz',
    title: 'Ambient Sounds',
    authorId: 'person_alex',
    html: `
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .site-wrap {
    min-height: 100vh;
    background: #030509;
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    color: #A8B8D0;
    position: relative;
  }
  .bg-fixed {
    position: fixed;
    inset: 0;
    background: url('/assets/bg-music.jpg') center/cover no-repeat fixed;
    opacity: 0.12;
    filter: blur(14px);
    z-index: 1;
  }
  .content-wrap {
    position: relative;
    z-index: 2;
  }
  .hero-dark {
    width: 100%;
    height: 50vh;
    min-height: 280px;
    object-fit: cover;
    filter: brightness(0.5);
    display: block;
  }
  .body-wrap {
    max-width: 780px;
    margin: 0 auto;
    padding: 44px 28px 64px;
  }
  .stream-tag {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    color: #7DD3FC;
    text-transform: uppercase;
    margin-bottom: 8px;
  }
  h1 {
    font-size: 38px;
    font-weight: 700;
    color: #E2E8F0;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }
  p {
    font-size: 15px;
    line-height: 1.7;
    color: #7A8FA8;
    margin-bottom: 28px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  }
  .player-box {
    background: #0A0F1E;
    border: 1px solid #1E2A42;
    border-radius: 14px;
    padding: 24px;
    display: flex;
    align-items: center;
    gap: 24px;
    margin: 28px 0;
    box-shadow: 0 8px 32px rgba(0,0,0,0.4);
  }
  .album-art {
    width: 120px;
    height: 120px;
    object-fit: cover;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(125,211,252,0.3);
    display: block;
    flex-shrink: 0;
  }
  .waveform {
    display: flex;
    align-items: flex-end;
    gap: 4px;
    height: 32px;
    margin-top: 12px;
  }
  .wave-bar {
    width: 4px;
    background: #7DD3FC;
    border-radius: 2px;
    animation: waveBounce 1.2s ease-in-out infinite alternate;
  }
  @keyframes waveBounce {
    from { height: 6px; opacity: 0.4; }
    to { height: 30px; opacity: 1; }
  }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid #1E2A42;
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    padding: 8px 18px;
    background: #0A0F1E;
    border: 1px solid #1E2A42;
    border-radius: 9999px;
    color: #7DD3FC;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    transition: all 0.2s ease;
  }
  .site-link:hover { background: #111827; border-color: #7DD3FC; transform: translateY(-1px); }
</style>
<div class="site-wrap">
  <div class="bg-fixed"></div>
  <div class="content-wrap">
    <img src="/assets/music-hero.jpg" alt="Starry night sky" class="hero-dark" />
    <div class="body-wrap">
      <div class="stream-tag">Audio Stream — Lossless 48kHz</div>
      <h1>Ambient Waveform Logs</h1>
      <p>Hydrophone recordings and field acoustics collected along the coastal shallows during twilight. Continuous captures without compression.</p>
      <div class="player-box">
        <img src="/assets/music-card.jpg" alt="Audio waveform neon" class="album-art" />
        <div style="flex: 1;">
          <div style="font-size: 15px; font-weight: 700; color: #E2E8F0; margin-bottom: 4px;">Track 03: Fog Horns &amp; Ebbing Tide</div>
          <div style="font-size: 12px; color: #64748B;">Duration: 42:18 • Format: FLAC 24-bit</div>
          <div class="waveform">
            <div class="wave-bar" style="animation-delay: 0.1s;"></div>
            <div class="wave-bar" style="animation-delay: 0.3s;"></div>
            <div class="wave-bar" style="animation-delay: 0.2s;"></div>
            <div class="wave-bar" style="animation-delay: 0.5s;"></div>
            <div class="wave-bar" style="animation-delay: 0.4s;"></div>
            <div class="wave-bar" style="animation-delay: 0.6s;"></div>
            <div class="wave-bar" style="animation-delay: 0.2s;"></div>
          </div>
        </div>
      </div>
      <div class="site-nav">
        <a class="site-link" href="garden.zz">Return to Garden</a>
        <a class="site-link" href="radio.zz">Coastline Radio</a>
        <a class="site-link" href="observatory.zz">Night Observatory</a>
      </div>
    </div>
  </div>
</div>
        `.trim(),
  },

  // ── 7. ARCHIVE.ZZ ───────────────────────────────────────────────────────────
  {
    address: 'archive.zz',
    title: 'Old Archives',
    authorId: 'person_charlie',
    html: `
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .site-wrap {
    min-height: 100vh;
    background: #F5F5F0;
    font-family: Georgia, "Times New Roman", Times, serif;
    color: #000000;
  }
  .newspaper-header {
    background: #000000;
    padding: 24px 32px 18px;
    text-align: center;
    color: #FFFFFF;
  }
  .paper-vol {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    color: #888888;
    margin-bottom: 6px;
  }
  .paper-name {
    font-size: 54px;
    font-weight: 900;
    letter-spacing: -0.04em;
    line-height: 0.9;
    text-transform: uppercase;
  }
  .hero-grayscale {
    width: 100%;
    height: 50vh;
    min-height: 300px;
    object-fit: cover;
    filter: grayscale(1) contrast(1.3);
    display: block;
    border-bottom: 4px solid #000000;
  }
  .ticker-wrap {
    background: #000000;
    color: #F5F5F0;
    padding: 8px 24px;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .body-wrap {
    max-width: 900px;
    margin: 0 auto;
    padding: 40px 28px 64px;
  }
  .article-row {
    display: flex;
    gap: 32px;
    margin-bottom: 32px;
  }
  .thumb-grayscale {
    width: 100px;
    height: 100px;
    object-fit: cover;
    filter: grayscale(1);
    display: block;
    border: 1px solid #000000;
    flex-shrink: 0;
  }
  h2 {
    font-size: 32px;
    font-weight: 900;
    line-height: 1.05;
    text-transform: uppercase;
    margin-bottom: 12px;
  }
  p {
    font-size: 15.5px;
    line-height: 1.65;
    margin-bottom: 16px;
  }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 36px;
    padding-top: 24px;
    border-top: 3px solid #000000;
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    padding: 8px 18px;
    background: #000000;
    color: #F5F5F0;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    transition: all 0.15s ease;
  }
  .site-link:hover { background: #333333; }
</style>
<div class="site-wrap">
  <div class="newspaper-header">
    <div class="paper-vol">Volume XII — Public Archival Repository — Est. 1980</div>
    <div class="paper-name">The Archive</div>
  </div>
  <div class="ticker-wrap">ALL DOCUMENTS RELEASED INTO PUBLIC DOMAIN • FREE ACCESS PROTOCOL</div>
  <img src="/assets/archive-hero.jpg" alt="Vintage newspaper archive" class="hero-grayscale" />
  <div class="body-wrap">
    <div class="article-row">
      <img src="/assets/archive-card.jpg" alt="Vintage map texture" class="thumb-grayscale" />
      <div>
        <h2>Permanent Collection Opens Fully to the Public</h2>
        <p>Cataloguing primary source documents, municipal cartography, and early peer-to-peer network blueprints from the first two decades of the Small Web.</p>
        <p>Twelve thousand catalogued manuscripts are indexed across two permanent volumes. Readers are permitted to replicate and redistribute without restriction.</p>
      </div>
    </div>
    <div class="site-nav">
      <a class="site-link" href="library.zz">Visit Library</a>
      <a class="site-link" href="shore.zz">Coastline History</a>
      <a class="site-link" href="garden.zz">Digital Garden</a>
    </div>
  </div>
</div>
        `.trim(),
  },

  // ── 8. RADIO.ZZ ─────────────────────────────────────────────────────────────
  {
    address: 'radio.zz',
    title: 'Pirate Radio',
    authorId: 'person_charlie',
    html: `
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .site-wrap {
    min-height: 100vh;
    background: #1A0A0F;
    font-family: Georgia, serif;
    color: #E8D5C0;
  }
  .hero-container {
    position: relative;
    width: 100%;
    height: 50vh;
    min-height: 300px;
    overflow: hidden;
  }
  .hero {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: brightness(0.65);
  }
  .signal-rings-overlay {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }
  .ring {
    position: absolute;
    border-radius: 50%;
    border: 2px solid rgba(220, 80, 60, 0.4);
    animation: ringExpand 4s ease-out infinite;
  }
  .ring:nth-child(2) { animation-delay: 1.33s; }
  .ring:nth-child(3) { animation-delay: 2.66s; }
  @keyframes ringExpand {
    0% { width: 40px; height: 40px; opacity: 0.9; }
    100% { width: 480px; height: 480px; opacity: 0; }
  }
  .hero-text {
    position: absolute;
    bottom: 32px;
    left: 36px;
    z-index: 2;
  }
  .freq {
    display: inline-block;
    padding: 4px 12px;
    background: rgba(220,80,60,0.8);
    color: #FFFFFF;
    font-family: ui-monospace, monospace;
    font-size: 11px;
    font-weight: 700;
    border-radius: 4px;
    margin-bottom: 8px;
  }
  h1 {
    font-size: 48px;
    font-weight: 900;
    letter-spacing: -0.03em;
    color: #F5E6D0;
    line-height: 1;
  }
  .body-wrap {
    max-width: 760px;
    margin: 0 auto;
    padding: 40px 28px 64px;
  }
  p {
    font-size: 16px;
    line-height: 1.75;
    color: #CBB4A0;
    margin-bottom: 24px;
  }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid rgba(220,80,60,0.3);
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    padding: 8px 18px;
    background: rgba(220,80,60,0.15);
    border: 1px solid rgba(220,80,60,0.4);
    border-radius: 9999px;
    color: #E8A564;
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    transition: all 0.2s ease;
  }
  .site-link:hover { background: rgba(220,80,60,0.3); color: #F5E6D0; transform: translateY(-1px); }
</style>
<div class="site-wrap">
  <div class="hero-container">
    <img src="/assets/radio-hero.jpg" alt="Radio tower sunset" class="hero" />
    <div class="signal-rings-overlay">
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
    </div>
    <div class="hero-text">
      <div class="freq">104.7 FM — 25 WATTS OMNI</div>
      <h1>Pirate Radio Beacon</h1>
    </div>
  </div>
  <div class="body-wrap">
    <p>Broadcasting low-power frequency modulation across the sea cliffs. Independent voices, open poetry, and nocturnal soundscapes powered by an autonomous solar cell.</p>
    <div class="site-nav">
      <a class="site-link" href="music.zz">Studio Audio</a>
      <a class="site-link" href="shore.zz">Antenna Shoreline</a>
      <a class="site-link" href="archive.zz">Broadcast Archive</a>
    </div>
  </div>
</div>
        `.trim(),
  },

  // ── 9. KITCHEN.ZZ ───────────────────────────────────────────────────────────
  {
    address: 'kitchen.zz',
    title: 'The Kitchen',
    authorId: 'person_mira',
    html: `
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .site-wrap {
    min-height: 100vh;
    background: #FDF8F2;
    font-family: Georgia, "Palatino Linotype", serif;
    color: #2C1A0E;
  }
  .hero {
    width: 100%;
    height: 50vh;
    min-height: 300px;
    object-fit: cover;
    display: block;
    filter: brightness(0.9);
  }
  .body-wrap {
    max-width: 860px;
    margin: 0 auto;
    padding: 44px 28px 64px;
  }
  .season {
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #C8956A;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    margin-bottom: 8px;
  }
  h1 {
    font-size: 46px;
    font-weight: 700;
    letter-spacing: -0.025em;
    color: #2C1A0E;
    margin-bottom: 16px;
  }
  .intro {
    font-size: 17.5px;
    line-height: 1.75;
    color: #5C3A21;
    margin-bottom: 36px;
  }
  .recipe-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
    margin: 32px 0;
  }
  .recipe-card {
    background: #FFF9F3;
    border: 1px solid #E8C4A0;
    border-radius: 12px;
    overflow: hidden;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .recipe-card:hover {
    transform: translateY(-4px) scale(1.02);
    box-shadow: 0 12px 24px rgba(200,149,106,0.18);
  }
  .recipe-img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 12px 12px 0 0;
    display: block;
  }
  .recipe-info {
    padding: 16px;
  }
  .recipe-title {
    font-size: 16px;
    font-weight: 700;
    color: #2C1A0E;
    margin-bottom: 4px;
  }
  .recipe-desc {
    font-size: 13px;
    color: #7A5333;
    line-height: 1.5;
  }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 36px;
    padding-top: 24px;
    border-top: 2px dashed #C8956A;
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    padding: 8px 18px;
    background: #C8956A;
    border-radius: 4px;
    color: #FDF8F2;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    font-family: -apple-system, BlinkMacSystemFont, sans-serif;
    transition: all 0.2s ease;
  }
  .site-link:hover { background: #A87050; transform: translateY(-1px); }
  @media (max-width: 768px) {
    .recipe-grid { grid-template-columns: 1fr; }
  }
</style>
<div class="site-wrap">
  <img src="/assets/kitchen-hero.jpg" alt="Rustic kitchen bread" class="hero" />
  <div class="body-wrap">
    <div class="season">Seasonal Notes — Late Autumn</div>
    <h1>The Coastal Kitchen</h1>
    <p class="intro">Simple food prepared according to the tides and garden harvest. Sourdough baked with sea salt,seaweed harvested at low tide, dried kombu dashi, and wild coastal herbs.</p>
    <div class="recipe-grid">
      <div class="recipe-card">
        <img src="/assets/kitchen-card-1.jpg" alt="Sourdough bread loaf" class="recipe-img" />
        <div class="recipe-info">
          <div class="recipe-title">Coastal Sourdough</div>
          <div class="recipe-desc">Heritage wheat with hand-harvested rock salt and wild yeast culture.</div>
        </div>
      </div>
      <div class="recipe-card">
        <img src="/assets/kitchen-card-2.jpg" alt="Soup bowl rustic" class="recipe-img" />
        <div class="recipe-info">
          <div class="recipe-title">Kombu Dashi Broth</div>
          <div class="recipe-desc">Clear kelp broth drawn slowly at spring low water.</div>
        </div>
      </div>
      <div class="recipe-card">
        <img src="/assets/kitchen-card-3.jpg" alt="Fresh salad greens" class="recipe-img" />
        <div class="recipe-info">
          <div class="recipe-title">Wild Herb Salad</div>
          <div class="recipe-desc">Sea purslane and coastal greens dressed with lemon vinaigrette.</div>
        </div>
      </div>
    </div>
    <div class="site-nav">
      <a class="site-link" href="tidepool.zz">Forage Tidepool</a>
      <a class="site-link" href="garden.zz">Harvest Garden</a>
      <a class="site-link" href="library.zz">Recipe Library</a>
    </div>
  </div>
</div>
        `.trim(),
  },

  // ── 10. OBSERVATORY.ZZ ──────────────────────────────────────────────────────
  {
    address: 'observatory.zz',
    title: 'Star Observatory',
    authorId: 'person_sam',
    html: `
<style>
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  .site-wrap {
    min-height: 100vh;
    background: #000000;
    font-family: ui-monospace, "SF Mono", Menlo, monospace;
    color: #00FF41;
    position: relative;
  }
  .bg-fixed {
    position: fixed;
    inset: 0;
    background: url('/assets/bg-observatory.jpg') center/cover no-repeat fixed;
    opacity: 0.15;
    z-index: 1;
  }
  .content-layer {
    position: relative;
    z-index: 2;
  }
  .hero-container {
    position: relative;
    width: 100%;
    height: 50vh;
    min-height: 280px;
    overflow: hidden;
    border-bottom: 1px solid #003300;
  }
  .hero-dark {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.6);
    display: block;
  }
  .viewfinder {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 180px;
    height: 180px;
    transform: translate(-50%, -50%);
    border: 2px dashed rgba(0,255,65,0.6);
    border-radius: 50%;
    pointer-events: none;
    animation: crosshairPulse 3s ease-in-out infinite;
  }
  @keyframes crosshairPulse {
    0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.6; }
    50% { transform: translate(-50%, -50%) scale(1.08); opacity: 1; }
  }
  .body-wrap {
    max-width: 860px;
    margin: 0 auto;
    padding: 36px 28px 60px;
  }
  h1 {
    font-size: 34px;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: 16px;
    color: #00FF41;
  }
  .telemetry-box {
    background: rgba(0, 20, 0, 0.8);
    border: 1px solid #004D15;
    padding: 20px;
    margin: 24px 0;
    line-height: 1.8;
    font-size: 13.5px;
    color: #7DFFA0;
  }
  .site-nav {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 36px;
    padding-top: 24px;
    border-top: 1px solid #003300;
  }
  .site-link {
    display: inline-flex;
    align-items: center;
    padding: 8px 18px;
    background: transparent;
    border: 1px solid #004D15;
    color: #00FF41;
    font-size: 13px;
    text-decoration: none;
    transition: all 0.15s ease;
  }
  .site-link::before { content: "> "; color: #008822; }
  .site-link:hover { background: #001A00; border-color: #00FF41; }
</style>
<div class="site-wrap">
  <div class="bg-fixed"></div>
  <div class="content-layer">
    <div class="hero-container">
      <img src="/assets/observatory-hero.jpg" alt="Space telescope observatory" class="hero-dark" />
      <div class="viewfinder"></div>
    </div>
    <div class="body-wrap">
      <h1>Deep Space Observatory</h1>
      <div class="telemetry-box">
        TARGET: NGC 1976 / M42 Orion Nebula<br />
        SEEING CONDITIONS: 0.8 arcsec — OPTIMAL<br />
        SENSOR STATUS: Cryo-cooled CCD @ -80°C<br />
        INTEGRATION: 28.2 hours across 14 consecutive nights
      </div>
      <div class="site-nav">
        <a class="site-link" href="weather.zz">Atmospheric Seeing</a>
        <a class="site-link" href="library.zz">Star Charts</a>
        <a class="site-link" href="music.zz">Night Audio</a>
      </div>
    </div>
  </div>
</div>
        `.trim(),
  },
];

/**
 * Deterministic seed history. Addresses match SEED_SITES above.
 */
export const SEED_HISTORY: { personId: string, address: string, title: string, minutesAgo: number }[] = [
  // Alice's trail
  { personId: 'person_alice', address: 'tidepool.zz', title: 'Tidepool Field Notes', minutesAgo: 120 },
  { personId: 'person_alice', address: 'shore.zz', title: 'The Shoreline', minutesAgo: 115 },
  { personId: 'person_alice', address: 'tidepool.zz', title: 'Tidepool Field Notes', minutesAgo: 110 },
  { personId: 'person_alice', address: 'broken-link.zz', title: 'Nowhere', minutesAgo: 105 },

  // Diana's trail
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