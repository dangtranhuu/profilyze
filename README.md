# 🎨 Profilyze — Dynamic Profile Banner Generator

A modern tool to generate customizable **developer profile banners** using an Express.js API and a sleek Next.js frontend.

---

## 📁 Project Structure

`/server` → Express.js API for generating SVG banners

`/client` → Next.js frontend for previewing and customizing banners

---

## 🔧 Technologies Used

### Backend (`/server`)
- **Express.js** API
- **MongoDB/Mongoose** (for dynamic banner data)
- SVG generation service
- In-memory caching for performance

### Frontend (`/client`)
- **Next.js (App Router)** for SSR + React 18
- **Tailwind CSS** for styling
- Responsive UI, banner preview, copy URL, etc.

---

## 🚀 Live Deployments

| Service      | URL                                       |
|--------------|--------------------------------------------|
| 🔌 API        | [`https://profilyze-api.vercel.app`](https://profilyze-api.vercel.app) |
| 🌐 Frontend   | [`https://profilyze.vercel.app`](https://profilyze.vercel.app)         |

---

## 🖼️ Example Banner

You can access a live SVG banner with the following URL:

```yaml
https://profilyze-api.vercel.app/api/profile/banner?background=itachi1&tech=java&streaks=fire&view=sharingan&skills=angular,vuejs,reactjs,nodejs
```


👉 Try it in browser:  
[![Banner Example](https://profilyze-api.vercel.app/api/profile/banner?background=itachi1&tech=java&streaks=fire&view=sharingan&skills=angular%2Cvuejs%2Creactjs%2Cnodejs)](https://profilyze-api.vercel.app/api/profile/banner?background=itachi1&tech=java&streaks=fire&view=sharingan&skills=angular%2Cvuejs%2Creactjs%2Cnodejs)

---

## 🛠 Local Development

### Backend

```bash
cd server
npm install
npm run dev
Runs at: http://localhost:5152
```

### Frontend
```bash
cd client
npm install
npm run dev
```
Runs at: http://localhost:3000

You can update API URL via .env.local
Example: `NEXT_PUBLIC_API_BASE_URL=http://localhost:5152`

🙌 Thanks for using Profilyze
Feel free to fork, extend, or contribute!

Built with ❤️ by [Dang Tran](https://dangth.dev).