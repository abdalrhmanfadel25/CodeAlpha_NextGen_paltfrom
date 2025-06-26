# NextGen Social Platform

A modern, full-stack social media platform built with React, TypeScript, Node.js, Express, and MongoDB. NextGen offers a beautiful, production-ready UI with real-time chat, Google authentication, notifications, and more.

## Features
- User authentication (email/password & Google OAuth)
- Create, like, and comment on posts (with image upload via Cloudinary)
- Real-time chat and messaging (Socket.io)
- Explore users, trending topics, hashtags, and places
- Profile management (edit profile, avatar, bio, stats)
- Notification system (likes, comments, follows, messages, profile views)
- Responsive, cinematic UI with Tailwind CSS and Framer Motion

## Tech Stack
- **Frontend:** React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Backend:** Node.js, Express, MongoDB, Mongoose, Passport.js, JWT, Socket.io, Cloudinary

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn
- MongoDB database (local or Atlas)
- Cloudinary account (for image uploads)

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
cd YOUR_REPO_NAME
```

### 2. Setup Backend
```bash
cd backend
npm install
```

#### Create a `.env` file in `backend/` with the following:
```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
SESSION_SECRET=your_session_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

#### Start the backend server
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd ../
npm install
```

#### Start the frontend (Vite)
```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Usage
- Register or sign in (email/password or Google)
- Create posts, like, comment, and explore users
- Chat in real-time with other users
- Edit your profile and view stats

## Folder Structure
```
project/
  backend/           # Express API, MongoDB models, routes
  src/               # React frontend (components, hooks, pages, services)
  public/            # Static assets
  ...
```

## License
[MIT](LICENSE)

---

> Designed and built with ❤️ using modern web technologies. 