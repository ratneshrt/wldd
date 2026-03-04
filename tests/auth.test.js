"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = __importDefault(require("../src/routes/auth"));
const setup_1 = require("./setup");
jest.mock("redis", () => require("redis-mock"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_1.default);
beforeAll(async () => {
    await (0, setup_1.connectTestDB)();
});
afterAll(async () => {
    await (0, setup_1.closeTestDB)();
});
describe("Auth Routes", () => {
    it("should signup a user", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/api/auth/signup")
            .send({
            name: "ratnesh",
            email: "ratnesh@test.com",
            password: "123456"
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });
    it("should not allow duplicate user", async () => {
        await (0, supertest_1.default)(app)
            .post("/api/auth/signup")
            .send({
            name: "ratnesh",
            email: "ratnesh@test.com",
            password: "123456"
        });
        const res = await (0, supertest_1.default)(app)
            .post("/api/auth/signup")
            .send({
            name: "ratnesh",
            email: "ratnesh@test.com",
            password: "123456"
        });
        expect(res.status).toBe(400);
    });
    it("should login user", async () => {
        const res = await (0, supertest_1.default)(app)
            .post("/api/auth/login")
            .send({
            email: "ratnesh@test.com",
            password: "123456"
        });
        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
    });
});
//# sourceMappingURL=auth.test.js.map