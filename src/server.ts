import express from "express";
import authRoutes from "./routes/authRoutes.ts"
import habitRoutes from "./routes/habitRoutes.ts"
import userRoutes from "./routes/userRoutes.ts"
import cors from 'cors'
import helmet from "helmet";
import morgan from 'morgan'
import { isTest } from "../env.ts";


// Runs for every single request
const app = express();
app.use(helmet()) //Security header for all routes
app.use(cors())
app.use(express.json()) //Parse JSON for all routes
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev', {
    skip: () => isTest(),
}))   //Logs all requests


app.get("/health", (req, res) => {
    res.status(200).json({
        message: "API created",
        status: "OK",
        timestamp: new Date().toISOString(),
        service: "Habit tracker api"
    })
})


app.use("/api/auth", authRoutes)

app.use("/api/users", userRoutes)

app.use('/api/habits', habitRoutes)

// Whenever two request conflict whichever was registered first always wins
// app.post("/cake", (req, res) => {
//     res.send("OK")
// })

// app.post("/cake", (req, res) => {
//     res.send("Next")
// })
 
app.post("/cake/:name/:id", (req, res) => {
    res.json(req.params)
})



export { app }
export default app;