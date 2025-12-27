import app from "./server.ts";
import { Env } from "../env.ts";

app.listen(Env.PORT, () => {
    console.log(`server is running on port ${Env.PORT}`)
})