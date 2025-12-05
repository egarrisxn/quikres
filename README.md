# Quik|Res

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) ![GitHub repo size](https://img.shields.io/github/repo-size/egarrisxn/quikres) ![GitHub last commit](https://img.shields.io/github/last-commit/egarrisxn/quikres)

![quikres](https://github.com/user-attachments/assets/6275b7f3-2f20-44f9-aafc-9d1a3026295e)

## 🚀 What is QuikRes?

**Quik|Res** lets you turn your resume into a beautiful, personal website, in under a minute. No paywalls. No ads. Just fast & free!

_**Note: This project was inspired by Self.so. Thanks for giving me the vision for Quik|Res.**_

## 🛠️ Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query**
- **AWS S3**
- **Upstash Redis**
- **Clerk Authentication**
- **OpenAI**
- **Vercel AI SDK**
- **Vercel Deployment**
- More coming soon...

## ⚙️ Getting Started

1. **Clone the Repo**

```bash
git clone https://github.com/egarrisxn/quikres.git
cd quikres
```

2. **Set Up Required Accounts**

- Together.ai - for LLM
- Upstash - for Redis database
- AWS - for S3 bucket

3. **Configure Environment Variables**

- Create a `.env` or `.env.local` file
- Add your API keys, secrets, etc

4. **Install Dependencies**

```bash
pnpm install
```

5. **Run the App Locally**

```bash
pnpm dev
```

## 🚦 Usage

1. **Create an Account**

- Sign up on the site using **Clerk** authentication.

2. **Upload Your Resume (PDF)**

- Upload your resume through the dashboard.
- It’s securely uploaded to an **AWS S3 BUCKET**.

3. **AI Processing**

- Your resume is sent out for a quick processing via **Together.ai**.
- The model extracts structured data (e.g. work experience, skills, education) in JSON format.

4. **Instant Website Generation**

- A personalized, responsive website is generated from your resume content.
- View, customize, and publish your site instantly with a unique dynamic route.

## 🚀 Deploying

The easiest way to deploy Quik|Res is with **Vercel**, the creators of Next.js. Smash the button below to begin.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

Have questions, feedback, or want to collaborate?

- GitHub: [@egarrisxn](https://github.com/egarrisxn)
- Email: **egarrisxn@gmail.com**
