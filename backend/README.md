# SkillLoop API

Express + MongoDB backend for SkillLoop with JWT auth and role-based access control.

## Setup

```bash
cd backend
cp .env.example .env   # set MONGO_URI and JWT_SECRET
npm install
npm run seed           # optional demo data
npm run dev
```

## Roles

| Role | Can do |
| --- | --- |
| `user` | browse/enroll in skills, take quizzes, rate skills, manage own profile |
| `mentor` | everything a user can, plus create/update/delete own skills and quizzes |
| `admin` | everything, plus the admin panel (users, roles, coin adjustments, skill moderation) |

Self-signup can only create `user` or `mentor`; admins are promoted by another admin or the seed script.

## Endpoints

Base URL: `/api`

### Auth
- `POST /auth/register` — `{ name, email, password, role?, bio? }`
- `POST /auth/login` — `{ email, password }`
- `GET /auth/me` — current user (auth)

### Users
- `GET /users/leaderboard?limit=20`
- `GET /users/:id`
- `PATCH /users/me` (auth)
- `GET /users/me/dashboard` (auth)
- `GET /users/me/transactions` (auth)

### Skills
- `GET /skills?category=&level=&search=&page=&limit=`
- `GET /skills/categories`
- `GET /skills/mine` (auth)
- `GET /skills/:id`
- `POST /skills` (mentor+)
- `PATCH /skills/:id` / `DELETE /skills/:id` (owner mentor or admin)
- `POST /skills/:id/enroll` (auth, spends coins)
- `POST /skills/:id/rate` (enrolled learner)

### Quizzes
- `GET /quizzes?skill=`
- `GET /quizzes/:id` (answers stripped)
- `POST /quizzes` (mentor+), `PATCH`/`DELETE /quizzes/:id` (owner or admin)
- `POST /quizzes/:id/submit` — `{ answers: [optionIndex, ...] }`
- `GET /quizzes/me/attempts` (auth)

### Admin (admin only)
- `GET /admin/stats`
- `GET /admin/users`
- `PATCH /admin/users/:id/role|active|coins`
- `PATCH /admin/skills/:id/status`

## Coin economy

Every balance change is recorded in `transactions` with the resulting balance:
signup bonus (100), skill enrollment (learner debited, mentor credited),
quiz rewards (granted once per quiz on first pass), admin adjustments.
