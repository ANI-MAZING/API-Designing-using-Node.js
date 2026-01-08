import app from "./server.ts";
import { Env } from "../env.ts";

app.listen(Env.PORT, () => {
  console.log(`Server running on port ${Env.PORT}`)
  console.log(`Environment: ${Env.APP_STAGE}`)
})