# Aulia Zahratul Jannah — Personal Portfolio

Full-stack portfolio CMS:
- Frontend: React, Vite, Tailwind CSS, React Router
- Backend: Node.js, Express, MySQL
- Admin auth: bcrypt + JWT in HttpOnly cookie
- Media: local uploads (development)

## Requirements
- Node.js 20+
- MySQL 8+
- npm

## 1. Database
Create a MySQL database and import `database/schema.sql`:
```bash
mysql -u root -p < database/schema.sql
```

## 2. Backend setup
```bash
cd backend
cp .env.example .env
npm install
```
Edit `.env` with your MySQL credentials and a long random `JWT_SECRET`.
Create the first admin:
```bash
npm run seed:admin
```
The seed script reads `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` from `.env`. Use a strong password. Do not commit `.env`.

Start backend:
```bash
npm run dev
```
API runs at `http://localhost:5000`.

## 3. Frontend setup
In a second terminal:
```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```
Open `http://localhost:5173`.

## Admin
Open `/admin/login`, then sign in with the account created by `npm run seed:admin`.
The dashboard supports create, edit, publish/unpublish, and delete for achievements, experiences, projects, journeys, and education. Profile details can also be edited.

## Important security / deployment notes
- This is a development-ready starter, not a security-audited production system.
- Use HTTPS in production, set `NODE_ENV=production`, configure trusted origins, and use a strong unique JWT secret.
- Local upload storage is suitable for development. For production, use private object storage/CDN and backup policies.
- Restrict admin account creation to trusted server-side operations.
- Review retention, privacy, and data deletion requirements before publishing personal contact details.
