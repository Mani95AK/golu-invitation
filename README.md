## Navaratri Golu Invitation

A premium digital invitation for a South Indian Navaratri Golu. Node.js and Express serve a responsive HTML, CSS, and JavaScript page with English and Tamil wording.

Event details are placeholders. Replace them before you share the link.

## What you can do

- Read a warm bilingual invitation
- Open Google Maps directions from the address
- Share the invite on WhatsApp
- Copy the public link or the invitation text
- See an optional countdown to the function

No database, login, paid API, or API key is required.

## Project structure

```text
.
├── config/invitation.js   Invitation copy and env-based details
├── public/                Frontend, CSS, JS, original SVG artwork
├── server.js              Express server
├── .env.example           Safe template for local/production values
├── render.yaml            Optional Render Blueprint
└── README.md
```

## Prerequisites (Windows)

- [Node.js 18+](https://nodejs.org/) (includes npm)
- Git (for GitHub)
- A GitHub account (to publish the code)
- A Render account (optional, for a public URL)

## Run locally on Windows

In Command Prompt or PowerShell, from this folder:

```powershell
copy .env.example .env
npm install
npm start
```

Open [http://localhost:3000](http://localhost:3000).

To restart the server when files change (Node 18+):

```powershell
npm run dev
```

Health check:

```powershell
curl http://localhost:3000/health
```

## Customize the invitation

1. Copy `.env.example` to `.env`.
2. Replace only the placeholder values:

| Variable | Example |
| --- | --- |
| `FAMILY_NAME` | `The [Your Family Name] Family` |
| `EVENT_DATE` | `2026-10-18` (YYYY-MM-DD) |
| `EVENT_TIME` | `18:00` (24-hour clock) |
| `EVENT_TIMEZONE` | `Asia/Kolkata` |
| `EVENT_TIME_DISPLAY` | `6:00 PM IST` |
| `ADDRESS` | Full home address guests should see |
| `COUNTDOWN_ENABLED` | `true` or `false` |
| `PUBLIC_URL` | Your live site URL after deploy, for WhatsApp/copy |
| `PORT` | `3000` locally. Render sets this for you. |

Do **not** commit `.env`. English and Tamil invitation wording lives in `config/invitation.js` if you want to edit the prose.

The Google Maps button searches the address. After you deploy, set `PUBLIC_URL` to the live `https://...` address so copied and WhatsApp messages include that URL instead of `localhost`.

## Create a GitHub repository and push

GitHub needs a commit before you can push. From this folder:

```powershell
git init -b main
git add .
git status
git commit -m "Add Navaratri Golu invitation website."
```

Confirm GitHub CLI is signed in (`gh auth status`). Then:

```powershell
gh repo create golu-invitation --private --source=. --remote=origin --push
```

Use `--public` instead of `--private` only if you are comfortable publishing the placeholder (or real) address.

Without `gh`:

1. Create an empty repository on github.com (do not add a README there).
2. Run:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/golu-invitation.git
git push -u origin main
```

Never push `.env` or real personal details you do not want public.

## Deploy on Render (free web service)

Free Render instances spin down after idle time. The first visit after sleep can take a minute.

1. Push the project to GitHub.
2. Sign in at [https://dashboard.render.com](https://dashboard.render.com) with GitHub.
3. **New + → Web Service →** select this repository.
4. Settings:
   - **Runtime:** Node
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Instance type:** Free
5. Add environment variables from `.env.example`. After the first deploy, set `PUBLIC_URL` to the Render URL (for example `https://golu-invitation.onrender.com`) and redeploy.
6. Click **Create Web Service** and wait until the status is **Live**.

You can also use `render.yaml` via **New + → Blueprint**.

## Get the public URL and share on WhatsApp

1. On the Render service page, copy the URL at the top (it looks like `https://something.onrender.com`).
2. Put that value in `PUBLIC_URL` and redeploy so share/copy uses it.
3. Open the live site, confirm the name, date, time, address, maps link, and countdown.
4. Tap **Share on WhatsApp**, or copy the link and paste it into a chat.

## Artwork

All decorations are original SVG files in `public/assets`. Nothing is hotlinked from other websites.

## License

MIT
