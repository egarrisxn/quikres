# QuikRes

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg) ![GitHub repo size](https://img.shields.io/github/repo-size/egarrisxn/quikres) ![GitHub last commit](https://img.shields.io/github/last-commit/egarrisxn/quikres)

![quikres](https://github.com/user-attachments/assets/81746be9-cdf6-4d1b-9c70-053263e66c1d)

## 🚀 What is QuikRes?

**QuikRes** lets you turn your resume into a beautiful, personal website — in under a minute. No paywalls. No ads. Just fast, free resume-to-site magic.

## 🛠️ Tech Stack

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **TanStack Query**
- **AWS S3**
- **Upstash Redis**
- **Clerk Authentication**
- **Together.ai**
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

The easiest way to deploy QuikRes is with **Vercel**, the creators of Next.js. Smash the button below to begin.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme)

## 🔮 Roadmap

- [ ] Fix GitHub vulnerability warnings
- [ ] Fix dynamic Open Graph image generation route
- [ ] Update Clerk to production
- [ ] Support multiple resumes per user
- [ ] Option to delete previous resumes
- [ ] Option to permanently delete all data
- [ ] Add more resume sections and social/link options
- [ ] Tighten up this readme file
- [ ] Update the screenshots for the manifest

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

Have questions, feedback, or want to collaborate?

- GitHub: [@egarrisxn](https://github.com/egarrisxn)
- Email: **egarrisxn@gmail.com**