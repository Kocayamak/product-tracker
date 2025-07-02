import { AppDataSource } from "@/config/database";

async function main(): Promise<void> {
  await AppDataSource.initialize();
  console.log("✅ Database connected");

  // Schedule and start scraping jobs
  console.log("🚀 Scheduler started");
}

main()
  .then(() => {
    console.log("✅ Application started successfully");
  })
  .catch((error) => {
    console.error("❌ Application failed to start:", error);
    process.exit(1);
  });
