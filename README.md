
# DlxTech Landing Page

This repository contains the source code for the DlxTech landing page, a modern and sleek single-page application built with React, TypeScript, and Tailwind CSS.

## Features

- Fully responsive design
- Interactive components with animations
- Smooth scrolling for internal navigation
- Integrated Chatbot for user assistance
- Detailed contact form for lead generation

## Running Locally

**Prerequisites:** [Node.js](https://nodejs.org/) installed on your machine.

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**

    Create a file named `.env.local` in the root of the project and add the following variables. These are required for the chatbot and contact form to function correctly.

    ```
    # Webhook URL for the n8n-powered Chatbot
    VITE_N8N_WEBHOOK_URL="https://your-n8n-instance/webhook/chatbot"

    # Webhook URL for the n8n-powered Contact Form
    VITE_N8N_CONTACT_FORM_WEBHOOK_URL="https://your-n8n-instance/webhook/contact-form"
    ```
    
    **Note:** The `VITE_` prefix is required by Vite to expose these variables to the client-side code.

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

To create a production build of the app, run:

```bash
npm run build
```
This will generate a `dist` folder with the optimized static assets, ready for deployment.

## Deployment

This application is ready to be deployed on any static hosting service like Vercel, Netlify, or GitHub Pages.

When deploying, remember to set the environment variables (`VITE_N8N_WEBHOOK_URL` and `VITE_N8N_CONTACT_FORM_WEBHOOK_URL`) in your deployment platform's settings.
