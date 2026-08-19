# Codeveda Tourism

A full-stack tourism and destination booking platform built as a university project. Codeveda Tourism lets visitors discover real destinations, create an account, save favourites, and book trips — with a complete admin workflow for managing destinations and confirming bookings.

## About the Project

Codeveda Tourism was built to demonstrate a complete, production-style full-stack application: secure authentication, a relational data model with real business rules, and a polished, responsive user interface — all built from scratch over the course of an intensive development sprint.

The goal was not just to make CRUD screens work, but to model an honest, realistic booking lifecycle (pending → confirmed/cancelled), enforce real constraints (guest limits, ownership checks, role-based access), and present it through a premium, brand-consistent interface rather than a generic admin template.

## Features

**For visitors**
- Browse and search destinations by name, location, and category
- Sort destinations by price
- View detailed destination pages

**For registered users**
- Sign up and log in with secure, hashed-password authentication
- Book a destination with a travel date and guest count (max 10 guests per booking)
- View and cancel personal bookings
- Save and remove favourite destinations
- View a read-only profile

**For administrators**
- Full destination management: create, edit, and delete listings
- Confirm pending bookings
- All admin actions are protected by role-based access control, both in the UI and on the server

## Tech Stack

### Backend
- **Node.js** with **Express 5** — REST API server
- **PostgreSQL** — relational database
- **Prisma ORM 7** — schema, migrations, and type-safe queries
- **JWT (jsonwebtoken)** — stateless authentication
- **Bcrypt** — password hashing
- **Zod** — request validation
- **Helmet** — secure HTTP headers
- **express-rate-limit** — brute-force protection on authentication routes

### Frontend
- **React 19** with **Vite** — UI and build tooling
- **JavaScript (JSX)** — no TypeScript
- **React Router** — client-side routing and route protection
- **Tailwind CSS v4** — utility-first styling with a custom design token system
- **Axios** — HTTP client with centralized interceptors
- **Lucide React** — icon library

### Tooling
- **Prisma Studio** — visual database inspection
- **Git** — version control

## Architecture

The project follows a clean separation of concerns on both ends of the stack.

**Backend** (`server/`) — organized by domain, with one responsibility per file:
```
server/
├── prisma/              # Schema, migrations, seed data
├── generated/           # Generated Prisma client (not hand-edited)
├── src/
│   ├── config/           # Database connection, environment validation
│   ├── middleware/        # Auth, validation, rate limiting, error handling
│   ├── controllers/       # Business logic per domain
│   ├── routes/            # URL-to-controller wiring only
│   ├── validators/        # Zod schemas per domain
│   └── utils/             # Small reusable helpers (JWT signing)
└── server.js             # Entry point
```

**Frontend** (`client/`) — organized by concern, matching the backend's domain boundaries:
```
client/
├── src/
│   ├── components/
│   │   ├── ui/             # Reusable primitives (Button, Input, ConfirmDialog)
│   │   ├── layout/         # Navbar, Footer
│   │   ├── destinations/   # Destination-specific components
│   │   ├── bookings/       # Booking-specific components
│   │   └── shared/         # Cross-domain reusable pieces
│   ├── pages/              # One folder per route
│   ├── services/           # Centralized API client layer
│   ├── context/            # Auth and toast state
│   └── App.jsx
```

## Data Model

Four core entities:

- **User** — id, name, email, password hash, role (`USER` / `ADMIN`)
- **Destination** — id, name, description, location, price, image URL, category
- **Booking** — links a user to a destination with a travel date, guest count, and status (`PENDING` → `CONFIRMED` or `CANCELLED`)
- **Favourite** — links a user to a destination they've saved

## Key Design Decisions

- **JWT is the sole source of identity** — a user's ID is always read from their verified token, never trusted from a request body, preventing one user from acting on another's behalf.
- **Booking lifecycle models reality** — bookings start `PENDING`, can be confirmed by an admin or cancelled by their owner, and `CANCELLED` is a final state.
- **Client-side filtering** — the destinations listing fetches once and filters/sorts in memory, since the API intentionally has no server-side filtering at this scale.
- **Centralized error handling** — every backend error funnels through one handler that logs full detail server-side but returns safe, human-readable messages to the client.
- **Design tokens, not ad-hoc colors** — the entire frontend draws from one set of CSS custom properties (forest green, warm gold, and supporting neutrals), so the interface stays visually consistent across every page.

## Known Limitations

These are intentional scope boundaries, not oversights:

- No password reset, email verification, or profile editing
- No payment processing
- No image upload — destinations reference external image URLs
- No server-side pagination or filtering
- No endpoint for an admin to list bookings across all users — an admin can only confirm a booking they already have visibility into (their own bookings list)

## Getting Started

### Prerequisites
- Node.js (v20 or later)
- PostgreSQL running locally
- npm

### Backend setup
```bash
cd server
npm install
cp .env.example .env   # then fill in your DATABASE_URL and JWT_SECRET
npx prisma migrate dev
npx prisma generate
node prisma/seed.js
npm run dev
```

### Frontend setup
```bash
cd client
npm install
cp .env.example .env   # set VITE_API_BASE_URL if different from default
npm run dev
```

The backend runs on `http://localhost:5000`, the frontend on `http://localhost:5173`.

## Author

Built by Yeabsira Tesfaye as a self-directed university project.
