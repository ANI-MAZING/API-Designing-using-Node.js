import { Router } from "express";
import { validateBody, validateParams } from "../middleware/validation.ts";
import {z} from 'zod' 

const router = Router()

// Creating Habit Schema
const createHabitSchema = z.object({
    name: z.string()
})

const completedParamsSchema = z.object({
    id: z.string().min(12)
})

router.get("/", (req, res) => {
    res.json({message: "Habits"})
})

router.get("/:id", (req, res) => {
    res.json({message: "got one habit"})
})

// adding middleware
router.post("/", validateBody(createHabitSchema), (req, res) => {
    res.json({message: "Habit posted (created)"})

})

router.delete("/:id", (req, res) => {
    res.json({message: "specificHabit deleted"})
})


router.post("/:id/complete", validateParams(completedParamsSchema), validateBody(createHabitSchema), (req, res) => {
    res.json({message: "completed habit"}).status(201)
})


export default router



// router.delete('/:id', (req, res) => {
    
//     res.status(200).json({
//         message: "User deleted"
//     })
// })