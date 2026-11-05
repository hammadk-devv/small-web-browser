# Small Web Browser

A calm, independent web client simulation designed to explore and publish decentralized personal websites. It provides an authentic browser-within-a-browser experience with multi-persona history tracking, deterministic navigation stacks, and secure sandboxed rendering.

## Tech Stack

- **Frontend:** Next.js (App Router, React 19)
- **Backend:** NestJS 12
- **Database:** MongoDB (via Mongoose)
- **Language:** TypeScript
- **Monorepo:** pnpm workspaces

## Prerequisites

- **Node.js:** v20+
- **pnpm:** v9+
- **MongoDB:** Running locally at `mongodb://localhost:27017/small-web`

## How to Run

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Seed the database:**
   ```bash
   pnpm --filter api seed
   ```

3. **Start the Backend API (port 3001):**
   ```bash
   pnpm --filter api start:dev
   ```

4. **Start the Frontend Web Client (port 3000):**
   ```bash
   pnpm --filter web dev
   ```

## Testing

Run unit tests for the shared navigation stack:
```bash
pnpm --filter @small-web/shared test
```

## Screenshots

### The Browser Shell & Home Page
![Home Page](./docs/home.png)

### Search & Highlighting
![Search Results](./docs/search.png)

### Per-Persona History
![History Panel](./docs/history.png)

### Publish Form
![Publish Form](./docs/publish.png)

### Seeded 1-Page Websites
![Tidepool Editorial](./docs/tidepool.png)
![Library Archive](./docs/library.png)
![Kitchen Recipe Cards](./docs/kitchen.png)
![The Archive Cards](./docs/archives.png)

## Architecture & Design Decisions

- **Custom `NavigationStack`**: Implements a formal history invariant where branching from an earlier state truncates forward history, decoupled from host browser routing.
- **Two-Layer XSS Defense**: Strict server-side HTML sanitization (stripping executable tags, inline styles, and invalid image sources) paired with an unprivileged, sandboxed `<iframe>` boundary without `allow-same-origin`.
- **Dual-Query Search Pipeline**: Combines MongoDB `$text` inverted index scoring with case-insensitive regex fallback across addresses, titles, and body content, deduplicated via an $O(1)$ hash map.
- **Deterministic & Idempotent Seeding**: The seed pipeline drops and rebuilds database collections and indexes cleanly on every run, guaranteeing identical initial state across runs.

