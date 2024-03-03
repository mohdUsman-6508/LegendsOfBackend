import { connectDB } from "./data/database.js";
import { app } from "./app.js";

connectDB();

app.listen(2000, () => {
  console.log("Server is Working");
});
