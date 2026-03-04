import request from "supertest"
import express from "express"
import mongoose from "mongoose"
import authRoutes from "../src/routes/auth"
import { connectTestDB, closeTestDB } from "./setup"

jest.mock("redis", () => require("redis-mock"))

const app = express()
app.use(express.json())
app.use("/api/auth", authRoutes)

beforeAll(async () => {
  await connectTestDB()
})

afterAll(async () => {
  await closeTestDB()
})

describe("Auth Routes", () => {

  it("should signup a user", async () => {

    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "ratnesh",
        email: "ratnesh@test.com",
        password: "123456"
      })

    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
  })

  it("should not allow duplicate user", async () => {

    await request(app)
      .post("/api/auth/signup")
      .send({
        name: "ratnesh",
        email: "ratnesh@test.com",
        password: "123456"
      })

    const res = await request(app)
      .post("/api/auth/signup")
      .send({
        name: "ratnesh",
        email: "ratnesh@test.com",
        password: "123456"
      })

    expect(res.status).toBe(400)
  })

  it("should login user", async () => {

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "ratnesh@test.com",
        password: "123456"
      })

    expect(res.status).toBe(200)
    expect(res.body.token).toBeDefined()
  })

})