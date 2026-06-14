# Agrim Sangotra — Portfolio

A full-stack developer portfolio built with **Next.js (App Router)**, **TypeScript**,
**Tailwind CSS**, **Prisma**, and **PostgreSQL**. Projects live in the database and
are managed through a protected admin dashboard — no code edits needed to add or
update them. Recruiters can download a PDF résumé, and the contact form stores
messages in the DB and emails a notification.

## Features

- **Single-page public site** — Hero, About, Experience, Skills, Projects, Contact.
- **DB-driven projects** — served from PostgreSQL via Prisma; filterable by category.
- **Protected admin dashboard** (`/admin`) — CRUD for projects, view/manage contact messages.
- **Contact form** — validated (Zod), stored in DB, emails you via Resend.
- **Résumé download** — `GET /api/resume` streams `public/resume/AgrimSangotra_Resume.pdf`.
- **Lightweight auth** — bcrypt-hashed password + signed JWT cookie, enforced by middleware.

## Tech Stack

| Layer    | Choice                                  |
| -------- | --------------------------------------- |
| Frontend | Next.js 15, React 19, Tailwind CSS v4   |
| Backend  | Next.js Route Handlers, Zod validation  |
| Database | PostgreSQL + Prisma ORM                 |
| Auth     | bcryptjs + jose (JWT in httpOnly cookie)|
| Email    | Resend                                  |

## Getting Started

### 1. Install

```bash
npm install
```

### 2. Configure environment

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

- `DATABASE_URL` — a PostgreSQL connection string (e.g. a free [Neon](https://neon.tech) or [Supabase](https://supabase.com) database).
- `ADMIN_PASSWORD_HASH` — bcrypt hash of your admin password:
  ```bash
  node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
  ```
  > The hash contains `$` characters. In `.env`, escape each as `\$`
  > (e.g. `\$2a\$10\$...`) so the env loader doesn't treat them as variables.
- `JWT_SECRET` — any long random string:
  ```bash
  node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
  ```
- `RESEND_API_KEY` — optional; if empty, contact messages are stored but no email is sent.
- `CONTACT_FROM` / `CONTACT_TO_EMAIL` — email notification addresses.

> The committed `.env` ships with a dev admin password of **`admin123`** and a
> placeholder `DATABASE_URL`. Replace both before deploying.

### 3. Set up the database

```bash
npm run db:push    # create tables from prisma/schema.prisma
npm run db:seed    # load the existing projects (idempotent)
```

### 4. Run

```bash
npm run dev
```

- Public site: http://localhost:3000
- Admin: http://localhost:3000/admin (login at `/admin/login`)

## Updating Content

- **Projects** → manage them in the **admin dashboard** (`/admin`). Nothing in code.
- **Bio / experience / education / skills** → edit [`content/profile.ts`](content/profile.ts).
  Fields marked `[UPDATE: ...]` need your latest résumé details.
- **Résumé PDF** → drop your file at `public/resume/agrim-sangotra-resume.pdf`.

## Useful Scripts

| Command            | Description                          |
| ------------------ | ------------------------------------ |
| `npm run dev`      | Start the dev server                 |
| `npm run build`    | Generate Prisma client + build       |
| `npm run db:push`  | Push schema to the database          |
| `npm run db:seed`  | Seed projects                        |
| `npm run db:studio`| Open Prisma Studio (DB GUI)          |

## Deploying (Vercel + Neon)

1. Create a PostgreSQL database (Neon/Supabase) and copy its connection string.
2. Push this repo to GitHub and import it into [Vercel](https://vercel.com).
3. Add all `.env` variables in the Vercel project settings.
4. After the first deploy, run `db:push` and `db:seed` against the production DB
   (locally with the prod `DATABASE_URL`, or via a one-off job).
