// apps/api/src/seed/seed.data.ts

export const SEED_PEOPLE = [
    { id: 'person_alice', name: 'Alice' },
    { id: 'person_bob', name: 'Bob' },
    { id: 'person_charlie', name: 'Charlie' },
    { id: 'person_diana', name: 'Diana' }, // Our power user
];

export const SEED_SITES = [
    {
        address: 'tidepool.zz',
        title: 'Tidepool Field Notes',
        authorId: 'person_mira',
        html: `<h1>Welcome to the Tidepool</h1>
           <p>At low tide, the pools hold secrets. I've been documenting them for years.</p>
           <p>Read about the <a href="shore.zz">shoreline</a> or check the <a href="weather.zz">weather</a>.</p>
           <a href="broken-link.zz">This link goes nowhere</a>`,
    },
    {
        address: 'shore.zz',
        title: 'The Shoreline',
        authorId: 'person_mira',
        html: `<h2>The Edge of the World</h2>
           <p>The shore is where the land meets the sea. It is constantly changing.</p>
           <p>Return to <a href="tidepool.zz">the tidepools</a>.</p>`,
    },
    {
        address: 'weather.zz',
        title: 'Local Weather',
        authorId: 'person_sam',
        html: `<h2>Today's Forecast</h2>
           <p>Foggy in the morning, clearing by noon. High tide at 2 PM.</p>
           <a href="tidepool.zz">Back to the tidepool</a>`,
    },
    {
        address: 'library.zz',
        title: 'The Small Library',
        authorId: 'person_sam',
        html: `<h2>Books & Archives</h2>
           <p>A quiet place. We recommend reading about <a href="shore.zz">the shore</a>.</p>`,
    },
    {
        address: 'garden.zz',
        title: 'Digital Garden',
        authorId: 'person_alex',
        html: `<h2>Thoughts and Weeds</h2>
           <p>Growing ideas slowly. Like a garden.</p>
           <p>See my <a href="library.zz">library</a>.</p>`,
    },
    {
        address: 'music.zz',
        title: 'Ambient Sounds',
        authorId: 'person_alex',
        html: `<h2>Listen</h2>
           <p>Recordings of the wind and the waves. Sometimes I visit the <a href="garden.zz">garden</a>.</p>`,
    },
    {
        address: 'archive.zz',
        title: 'Old Archives',
        authorId: 'person_charlie',
        html: `<h2>Dusty Documents</h2>
           <p>Looking for the <a href="library.zz">library</a>? It's next door.</p>`,
    },
    {
        address: 'radio.zz',
        title: 'Pirate Radio',
        authorId: 'person_charlie',
        html: `<h2>Static</h2>
           <p>Broadcasting from the <a href="shore.zz">coast</a>.</p>`,
    },
    {
        address: 'kitchen.zz',
        title: 'The Kitchen',
        authorId: 'person_mira',
        html: `<h2>Recipes</h2>
           <p>Today we are making seaweed soup. Found the seaweed at the <a href="tidepool.zz">tidepool</a>.</p>`,
    },
    {
        address: 'observatory.zz',
        title: 'Star Observatory',
        authorId: 'person_sam',
        html: `<h2>The Night Sky</h2>
           <p>Clear skies tonight. The <a href="weather.zz">weather</a> is perfect.</p>`,
    },
];

/**
 * A pre-computed history sequence.
 * Hardcoded to guarantee deterministic time-travel for the demo.
 */
export const SEED_HISTORY: { personId: string, address: string, title: string, minutesAgo: number }[] = [
    // Alice's short trail (repeat visits)
    { personId: 'person_alice', address: 'tidepool.zz', title: 'Tidepool Field Notes', minutesAgo: 120 },
    { personId: 'person_alice', address: 'shore.zz', title: 'The Shoreline', minutesAgo: 115 },
    { personId: 'person_alice', address: 'tidepool.zz', title: 'Tidepool Field Notes', minutesAgo: 110 },
    { personId: 'person_alice', address: 'broken-link.zz', title: 'Nowhere', minutesAgo: 105 },

    // Diana's Long Trail (nearly everywhere)
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