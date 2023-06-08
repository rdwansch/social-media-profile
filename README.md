# Virtual Card

## Description
Learn how to use Next-Auth with Google OAuth2.0 and credentials provider, Prisma.io as ORM.

## Tech Stack
* Next JS
* Next-Auth
* Tailwindcss
* Prisma

## Development
Clone this project
```bash
$ git clone https://github.com/rdwansch/virtual-card.git
```

Install Dependencies
```bash
cd virtual-card && npm i
```

Add Environment Variables.
Get your Google Credentials at [Google Cloud Console](https://console.cloud.google.com/apis)
```.env
DATABASE_URL=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

NEXTAUTH_URL= 
NEXTAUTH_SECRET=
```

Migrate Database
```bash
npx prisma migrate dev
```
Run Locally
```bash
$ npm run dev
```

## Production
Hosting your Next JS at [vercel](https://vercel.com/home) and mysql to [PlanetScale](https://planetscale.com/).
Visit live demo [Virtual Card](https://virtual-card-lemon.vercel.app/)
