# 🏗️ Abhiyantri Setu
> Abhiyantri Setu is a Greater Noida-based ConstructionTech startup that operates a verified digital marketplace. It connects homeowners with reliable local professionals, skilled laborers, and material suppliers for residential construction and renovation projects.

![GitHub stars](https://img.shields.io/github/stars/yourusername/Abhiyantri-Setu?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/Abhiyantri-Setu?style=social)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

---

## 📖 About

Abhiyantri Setu is a modern web platform designed to bridge the gap between homeowners, businesses, and verified construction professionals.

Users can post construction or renovation requirements, receive quotations, compare professionals, manage projects, and communicate securely throughout the project lifecycle.

---

## 🚀 Features

### 👤 Client

- Register/Login
- Post construction projects
- Browse service providers
- Hire verified professionals
- Chat with providers
- Manage project progress
- View quotations
- Track project status

### 👷 Service Provider

- Create professional profile
- Receive project leads
- Submit quotations
- Manage ongoing projects
- Accept/Reject requests
- Chat with clients
- Dashboard with analytics

### 🛡️ Admin

- Verify providers
- Manage users
- Manage services
- Approve professionals
- Platform analytics

---

# 📸 Screenshots

## Home Page

![Home](public/screenshots/Landing.png)

## Client Dashboard

![Dashboard](public/screenshots/Services.png)

## Provider Dashboard

![Provider](public/screenshots/Client.png)

## Service Page

![Service](public/screenshots/LaunchingSoon.png)

![Service](public/screenshots/PostJob.png)

![Service](public/screenshots/JobPage.png)

---

## 🏛️ Project Architecture

```text
Client
   │
   ▼
Next.js Frontend
   │
   ▼
Authentication
(Better Auth)
   │
   ▼
Server Actions / API Routes
   │
   ▼
Prisma ORM
   │
   ▼
PostgreSQL Database
```

---

## 🛠 Tech Stack

| Technology | Usage |
|------------|-------|
| Next.js | Frontend |
| TypeScript | Programming Language |
| Tailwind CSS | Styling |
| Shadcn UI | Components |
| Prisma ORM | Database ORM |
| PostgreSQL | Database |
| Better Auth | Authentication |
| React Hook Form | Forms |
| Zod | Validation |
| Lucide React | Icons |

---

## 📂 Folder Structure

```text
app/
components/
lib/
prisma/
public/
middleware.ts
```

---

## ⚙️ Installation

Clone the repository

```bash
git clone https://github.com/yourusername/Abhiyantri-Setu.git
```

Move inside project

```bash
cd Abhiyantri-Setu
```

Install dependencies

```bash
npm install
```

Create Environment Variables

```
DATABASE_URL=

NEXT_PUBLIC_APP_URL=

BETTER_AUTH_SECRET=

BETTER_AUTH_URL=
```

Run Project

```bash
npm run dev
```

---

## 🌟 Future Features

- AI Project Recommendation
- Online Payments
- Video Consultation
- Live Project Tracking
- Cost Estimation
- Review System
- Mobile Application

---

## 👨‍💻 Author

**Pappu Kumar Yadav**

- Full Stack Developer
- MERN Stack
- Next.js
- Prisma
- PostgreSQL

---

## ⭐ Support

If you like this project,

Give it a ⭐ on GitHub.