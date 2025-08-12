A full-stack AI Software as a Service (SaaS) application built with the PERN stack. It provides users with a suite of powerful generative AI tools, accessible through a secure subscription-based model.

---

## ✨ Key Features

It offers a range of features designed to boost creativity and productivity:

* *User Authentication*: Secure sign-up, sign-in, and profile management powered by **Clerk*.
* *Subscription Billing*: Premium subscriptions managed through **Clerks billing features* to unlock access to advanced AI capabilities.
* *Article Generator*: Generate high-quality articles by simply providing a title and desired length.
* *Blog Title Generator*: Get catchy and SEO-friendly blog titles from a keyword and category.
* *Image Generator*: Create stunning visuals from a text prompt using generative AI.
* *Background Remover*: Upload an image to get a transparent background automatically.
* *Image Object Remover*: Remove unwanted objects from any image by describing them.
* *Resume Analyzer*: Upload a resume to receive a comprehensive analysis and improvement suggestions.

---

## 🛠 Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: Serverless PostgreSQL by Neon
- **Authentication & Subscriptions**: Clerk
- **API Communication**: Axios
- **AI Integrations**: Third-party Generative AI APIs
- **Deployment**: Vercel

---

## 🚀 Getting Started

### Prerequisites

* Node.js (v18 or later)
* npm or yarn
* A Neon account for the PostgreSQL database
* A Clerk account for authentication and billing

### Installation

1.  *Clone the repository:*
    ```
    git clone https://github.com/mehul-m-prajapati/zestAI
    ```

2.  *Install backend dependencies:*
    ```
    cd server
    npm install
    npm run dev
    ```

3.  *Install frontend dependencies:*
    ```
    cd ../client
    npm install
    npm run dev
    ```

### Environment Variables

To run this project, you will need to add the following environment variables to a .env file in both the server and client directories.

**Server (/server/.env):**

DATABASE_URL="your_neon_database_url"
CLERK_SECRET_KEY="your_clerk_secret_key"
AI_API_KEY="your_generative_ai_api_key"

**Client (/client/.env):**

VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"

---

## 📂 Project Structure

The project is organized into a monorepo structure with two main directories:

```
├── client/         # React Frontend
│   ├── src/
│   └── ...
├── server/         # Node.js & Express Backend
│   ├── controllers/
│   ├── routes/
│   └── index.js
└── README.md

```
