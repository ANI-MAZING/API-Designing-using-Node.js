import express from "express";


const app = express();

app.get("/health", (req, res) => {
    res.status(200).json({
        message: "API created",
        status: "OK",
        timestamp: new Date().toISOString(),
        service: "Habit tracker api"
    })
})


export { app }
export default app;