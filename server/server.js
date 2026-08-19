import "dotenv/config";
import app from "./src/app.js";
import { validateEnv } from "./src/config/env.js";

validateEnv();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});