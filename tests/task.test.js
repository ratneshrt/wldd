"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const task_1 = __importDefault(require("../src/routes/task"));
const auth_1 = __importDefault(require("../src/routes/auth"));
const setup_1 = require("./setup");
jest.mock("redis", () => require("redis-mock"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
app.use("/api/tasks", task_1.default);
let token;
beforeAll(async () => {
    await (0, setup_1.connectTestDB)();
    const res = await (0, supertest_1.default)(app)
        .post("/api/auth/signup")
        .send({
        name: "ratnesh",
        email: "test@test.com",
        password: "123456"
    });
    token = res.body.token;
});
afterAll(async () => {
    await (0, setup_1.closeTestDB)();
});
describe("Task Routes", () => {
    it("should create task", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/api/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send({
            title: "learn redis"
        });
        expect(res.status).toBe(200);
        expect(res.body.title).toBe("learn redis");
    });
    it("should fetch tasks", async () => {
        const res = await (0, supertest_1.default)(app)
            .get("/api/tasks")
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
    it("should delete task", async () => {
        const task = await (0, supertest_1.default)(app)
            .post("/api/tasks")
            .set("Authorization", `Bearer ${token}`)
            .send({ title: "delete me" });
        const res = await (0, supertest_1.default)(app)
            .delete(`/api/tasks/${task.body._id}`)
            .set("Authorization", `Bearer ${token}`);
        expect(res.status).toBe(200);
    });
});
//# sourceMappingURL=task.test.js.map