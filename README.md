# German Learner

German Learner is a modern web application for mastering German vocabulary and phrases using flashcards and spaced repetition. Built with [Next.js](https://nextjs.org), Prisma, MongoDB, and NextAuth, it provides a secure, customizable, and interactive learning experience.

## Features

- 🔒 **Authentication**: Secure login with Google or email/password (NextAuth)
- 📦 **Word, Phrase, and Sentence Storage**: Organize your vocabulary, phrases, and example sentences
- 🃏 **Flashcards**: Practice with daily, random, or custom flashcard sets
<!-- - 🏆 **Progress Tracking**: Track your daily learning score -->
<!-- - 🎨 **Responsive UI**: Beautiful, mobile-friendly design with custom color themes -->
<!-- - 🛠️ **Admin & Profile Pages**: Manage your account and settings -->

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/german-learner.git
cd german-learner
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up your environment

Create a `.env` file in the root directory and add the following:

```
DATABASE_URL="your-mongodb-connection-string"
NEXTAUTH_SECRET="your-random-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 4. Generate Prisma client

```bash
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

