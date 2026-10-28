# 🛒 BazarDor

### Daily prices for essential goods, all in one place

BazarDor is a responsive web application for exploring daily prices, price changes, product categories, and market information for essential goods in Bangladesh. It offers a Bengali-language experience and supports account access with email, Google, and GitHub.

---

## ✨ Features

| Feature | Description |
| --- | --- |
| 🧺 Product prices | Check current prices for essential goods |
| 📂 Categories | Browse products by category and sort prices |
| 📈 Price changes | See products whose prices have increased or decreased |
| 🔎 Product details | View previous prices and market information |
| 🔐 Authentication | Sign in with email/password, Google, or GitHub |
| 👤 Profile | View your account and profile information |
| 📱 Responsive UI | Works on mobile, tablet, and desktop |
| 🇧🇩 Bengali experience | Bengali interface and localized price formatting |

## 🧰 Technology stack

- **Framework:** Next.js 16 (App Router)
- **UI:** React 19, Tailwind CSS 4
- **Authentication:** Better Auth
- **Database:** MongoDB
- **Icons and notifications:** Lucide React, React Hot Toast
- **Language:** JavaScript

## 🚀 Run locally

### Prerequisites

- Node.js 20.9 or later
- npm
- A MongoDB connection string

### 1. Clone the project and install dependencies

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_REPOSITORY_NAME
npm install
```

Replace `YOUR_GITHUB_REPOSITORY_URL` and `YOUR_REPOSITORY_NAME` with your GitHub repository URL and local folder name.

### 2. Configure environment variables

Create a `.env.local` file in the project root and add:

```env
BETTER_AUTH_MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_long_random_secret
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

The MongoDB URI and Better Auth secret are required. Add the corresponding OAuth client IDs and secrets to enable Google or GitHub sign-in. Never commit credentials to GitHub; `.env*` files are excluded in `.gitignore`.

### 3. Start the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## 📜 Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Check code with ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Start the production server |

Run `npm run build` before starting the production server.

## 🔌 API

Product and category data comes from an external API. The application provides these API routes:

| Route | Description |
| --- | --- |
| `GET /api/products` | Get all products |
| `GET /api/products?category=chal` | Get products in a specific category |
| `GET /api/categories` | Get all categories |
| `/api/auth/[...all]` | Better Auth authentication |
| `/api/profile/github-avatar` | Get linked GitHub profile information |

Loading product and category data depends on the external API being available.

## 🗂️ Project structure

```text
.
├── public/                     # Static assets
├── src/
│   ├── app/
│   │   ├── api/                # Auth, products, categories, and profile APIs
│   │   ├── category/[slug]/    # Category page
│   │   ├── components/         # Shared UI components
│   │   ├── product/[slug]/     # Product details page
│   │   ├── profile/            # User profile
│   │   ├── signin/             # Sign-in page
│   │   ├── signup/             # Sign-up page
│   │   ├── globals.css         # Global styles
│   │   ├── layout.js           # Root layout
│   │   └── page.js             # Home page
│   └── lib/                    # API and authentication helpers
├── .gitignore
├── package.json
└── README.md
```

## ☁️ Deployment

To deploy on Vercel:

1. Push the repository to GitHub and import it into Vercel.
2. Add the required environment variables in your Vercel project settings.
3. Configure your production domain and callback URLs in the Google and GitHub OAuth dashboards:
   - `https://YOUR_DOMAIN/api/auth/callback/google`
   - `https://YOUR_DOMAIN/api/auth/callback/github`
4. After deployment, test sign-in, product, and category pages.

Replace `YOUR_DOMAIN` with your production domain. The URLs in the OAuth provider dashboards must match your deployment configuration.

## 🔒 Security

- Do not add `.env`, `.env.local`, or other secret files to the repository.
- Use a strong, unique `BETTER_AUTH_SECRET` in production.
- Keep OAuth credentials and MongoDB access details secure.

---

**BazarDor** — an easier way to check everyday market prices in Bangladesh. 🇧🇩
