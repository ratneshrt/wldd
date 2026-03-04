import { Router } from "express";
import { createClient } from "redis";
import { authMiddleware } from "../middleware/authmiddleware.js";
import Task from "../models/Task.js";
import { z } from "zod";
import mongoose from "mongoose";
const router = Router();
const redis = createClient({
    url: process.env.REDIS_URI
});
redis.connect();
const createTaskSchema = z.object({
    title: z.string(),
    description: z.string().optional(),
    duedate: z.string().optional()
});
router.get("/", authMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }
    const cacheKey = `task:${req.userId}`;
    const cached = await redis.get(cacheKey);
    if (cached) {
        return res.json(JSON.parse(cached));
    }
    const tasks = await Task.find({
        owner: req.userId
    });
    await redis.set(cacheKey, JSON.stringify(tasks), {
        EX: 60
    });
    res.json(tasks);
});
router.post("/", authMiddleware, async (req, res) => {
    if (!req.userId) {
        return res.status(401).json({
            messsage: "Unauthorized"
        });
    }
    const result = createTaskSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "please input fields correctly",
        });
    }
    const data = result.data;
    const task = await Task.create({
        title: data.title,
        owner: new mongoose.Types.ObjectId(req.userId),
        ...(data.description && { description: data.description }),
        ...(data.duedate && { duedate: new Date(data.duedate) })
    });
    await redis.del(`tasks:${req.userId}`);
    res.json(task);
});
const updateTaskSchema = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    dueDate: z.string().optional()
});
router.put("/:id", authMiddleware, async (req, res) => {
    const result = updateTaskSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({
            message: "please input fields correctly"
        });
    }
    const data = result.data;
    const task = await Task.findByIdAndUpdate(req.params.id, data, {
        new: true
    });
    await redis.del(`tasks:${req.userId}`);
    res.json(task);
});
router.delete("/:id", authMiddleware, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    await redis.del(`tasks:${req.userId}`);
    res.json({
        message: "Task deleted"
    });
});
export default router;
//# sourceMappingURL=task.js.map