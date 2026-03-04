import bcrypt from "bcryptjs"
import { Router } from "express"
import {  z } from "zod"
import User from "../models/User"
import jwt from "jsonwebtoken"

const router = Router()

const signupSchema = z.object({
    name: z.string(),
    email: z.email(),
    password: z.string()
})

router.post("/signup", async(req, res) => {
    const data = signupSchema.parse(req.body)

    const existingUser = await User.findOne({
        email: data.email
    })

    if(existingUser){
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashed = await bcrypt.hash(data.password, 10)

    const user = await User.create({
        name: data.name,
        email: data.email,
        password: hashed
    })

    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET as string)

    res.json({
        message: "user created successfully",
        token
    })
})

const loginSchema = z.object({
    email:z.email(),
    password:z.string()
})

router.post("/login", async(req, res) => {
    const data = loginSchema.parse(req.body)

    const user = await User.findOne({
        email: data.email
    })

    if (!user){
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const match = await bcrypt.compare(data.password, user.password)

    if (!match){
        return res.status(400).json({
            message: "Invalid credentials"
        })
    }

    const token = jwt.sign({
        userId: user._id
    }, process.env.JWT_SECRET as string)

    res.json({
        token
    })
})

export default router