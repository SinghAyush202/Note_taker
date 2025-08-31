import { env } from "./env";
import { connectDB } from "./db";
import { buildApp } from "./app";

async function main() {
  await connectDB();
  const app = buildApp();
  app.listen(env.PORT, () => console.log(`API http://localhost:${env.PORT}`));
}
main().catch((e) => {
  console.error(e);
  process.exit(1);
});
