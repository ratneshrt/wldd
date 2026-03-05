# WLDD-mini-tracker

> *NOTE: Agar sab Rupa ka underwear pahnenge to Rupa kya pahnegi*

A **blazing-fast Task Management REST API** forged with **Node.js, TypeScript, Express, MongoDB, and Redis** — with just the right amount of magic under the hood. ✨

🌐 **Live & breathing at → [wldd.zenops.in](https://wldd.zenops.in)**

---

## ⚡ What's the magic?

- 🔐 **JWT-powered auth** — secure signup & login, no dark arts required
- 🧂 **bcrypt password hashing** — your secrets stay secret
- 📋 **Full task lifecycle** — create, update, delete, filter, done
- 🚀 **Redis caching** — task reads so fast it feels like cheating
- 🗂️ **MongoDB indexed queries** — filters by status & due date that don't crawl
- 🐳 **One-command Docker setup** — spin up everything in seconds
- 🧪 **Jest test suite** — because untested code is just a prayer

---

## 🌐 Try it Live

No setup. No Docker. No drama.

The API is deployed and ready at:

```
https://wldd.zenops.in
```

Hit it directly with curl, Postman, or Insomnia:

```bash
# Sign up and get your token
curl -X POST https://wldd.zenops.in/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name": "Your Name", "email": "you@example.com", "password": "password123"}'
```

---

## 🧰 Tech Stack

| Layer | Magic Ingredient |
|---|---|
| Runtime | Node.js + TypeScript |
| Framework | Express |
| Database | MongoDB + Mongoose |
| Caching | Redis ⚡ |
| Auth | JWT + bcrypt 🔐 |
| Testing | Jest + mongodb-memory-server |
| Infra | Docker + Docker Compose 🐳 |

---

## 🚀 Run It Yourself

### Prerequisites

- Node.js ≥ 18
- Docker (recommended) or local MongoDB + Redis

### 1. Clone the magic

```bash
git clone <repository-url>
cd wldd-mini-tracker
npm install
```

### 2. Summon your `.env`

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/wldd-mini-tracker
REDIS_URI=redis://localhost:6379
JWT_SECRET=your_secret_spell_here
```

### 3. Ignite 🔥

```bash
npm run dev
```

Now live at `http://localhost:3000`

---

## 🐳 Docker (Recommended)

Spin up the API, MongoDB, and Redis in one shot:

```bash
docker-compose up --build
```

| Service | Port |
|---|---|
| 🚀 API | 3000 |
| 🍃 MongoDB | 27017 |
| ⚡ Redis | 6379 |

---

## 🔐 Authentication

Sign up or log in → get a JWT token → attach it to every protected request. Simple spell.

```
Authorization: Bearer <your_token>
```

---

## 🛣️ API Routes

### Auth

#### `POST /api/auth/signup`
```json
// Request
{ "name": "Jane Doe", "email": "jane@example.com", "password": "secret123" }

// Response 201
{ "message": "user created successfully", "token": "<JWT>" }
```

#### `POST /api/auth/login`
```json
// Request
{ "email": "jane@example.com", "password": "secret123" }

// Response 200
{ "token": "<JWT>" }
```

---

### Tasks 📋

> All task routes require `Authorization: Bearer <token>`

#### `GET /api/tasks` — fetch your tasks

Optional filters:

```bash
GET /api/tasks                          # all tasks
GET /api/tasks?status=pending           # only pending
GET /api/tasks?status=completed         # only completed
GET /api/tasks?dueDate=2026-03-15       # by due date
```

#### `POST /api/tasks` — create a task
```json
{
  "title": "Build something cool",
  "description": "Make it fast and clean",
  "dueDate": "2026-03-15"
}
```

#### `PUT /api/tasks/:id` — update a task
```json
{
  "title": "Build something even cooler",
  "status": "completed"
}
```

#### `DELETE /api/tasks/:id` — vanish a task
```bash
DELETE /api/tasks/65fae1c2d4eab0c32
```

---

## ⚡ The Redis Caching Trick

Every time you fetch tasks, the result gets cached in Redis — **per user** — so repeat reads skip the database entirely.

| Detail | Value |
|---|---|
| Cache key | `task:<userId>` |
| TTL | 60 seconds |
| Busted on | Create / Update / Delete |

First fetch after a write → MongoDB. Every fetch after that (within 60s) → Redis. Sub-millisecond fast. ✨

---

## 🗂️ Data Models

### User
| Field | Type |
|---|---|
| `name` | String |
| `email` | String (unique) |
| `password` | String (hashed 🔐) |
| `createdAt` | Date |

### Task
| Field | Type |
|---|---|
| `title` | String |
| `description` | String |
| `status` | `pending` \| `completed` |
| `dueDate` | Date |
| `owner` | User reference |
| `createdAt` | Date |

> 🔍 Indexed on `(owner, status)` — filters stay fast no matter how many tasks pile up.

---

## 🧪 Testing

No real databases needed. Tests run entirely in-memory.

```bash
npm test                 # run all tests
npm run test:coverage    # with coverage report
```

- **mongodb-memory-server** — in-memory MongoDB, zero setup
- **redis-mock** — fake Redis, real behavior
- Target coverage: **70%+**

---

## 🧭 Manual Testing

Curl, Postman, Insomnia — your call.

```bash
# Get tasks (replace token with yours)
curl https://wldd.zenops.in/api/tasks \
  -H "Authorization: Bearer <your_token>"
```

---

## 📁 Project Structure

```
wldd-mini-tracker/
├── src/
│   ├── config/          # DB, Redis & environment config
│   ├── middleware/       # Auth & request validation
│   ├── models/           # Mongoose schemas (User, Task)
│   ├── routes/           # Express route definitions
│   └── index.ts          # App entry point
├── tests/                # Jest test suite 🧪
├── dist/                 # Compiled JS output
├── .env.example          # Starter env template
├── docker-compose.yml    # Multi-service Docker setup
├── Dockerfile            # API container definition
├── jest.config.js        # Jest configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

---

## 📜 License

MIT — take it, remix it, ship it. 🚀