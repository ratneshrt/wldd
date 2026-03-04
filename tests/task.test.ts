import request from "supertest"
import express from "express"
import taskRoutes from "../src/routes/task"
import authRoutes from "../src/routes/auth"
import { connectTestDB, closeTestDB } from "./setup"

jest.mock("redis", () => require("redis-mock"))

const app = express()
app.use(express.json())
app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

let token: string

beforeAll(async () => {

  await connectTestDB()

  const res = await request(app)
    .post("/api/auth/signup")
    .send({
      name: "ratnesh",
      email: "test@test.com",
      password: "123456"
    })

  token = res.body.token
})

afterAll(async () => {
  await closeTestDB()
})

describe("Task Routes", () => {

  it("should create task", async () => {

    const res = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: "learn redis"
      })

    expect(res.status).toBe(200)
    expect(res.body.title).toBe("learn redis")
  })

  it("should fetch tasks", async () => {

    const res = await request(app)
      .get("/api/tasks")
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200)
    expect(Array.isArray(res.body)).toBe(true)
  })

  it("should delete task", async () => {

    const task = await request(app)
      .post("/api/tasks")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "delete me" })

    const res = await request(app)
      .delete(`/api/tasks/${task.body._id}`)
      .set("Authorization", `Bearer ${token}`)

    expect(res.status).toBe(200)
  })

})