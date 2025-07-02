import cron from "node-cron";
import { PriceWorker } from "@/workers/price-worker";
import { PriceService } from "@/services/PriceService";
import { type Product } from "@/models";

export async function scheduleJobs(): Promise<void> {
  const priceService = new PriceService();
  const products: Product[] = await priceService.getProducts();

  for (const product of products) {
    const minute: number = 240;

    const cronExp = `*/${minute} * * * *`;

    cron.schedule(cronExp, async () => {
      console.log(
        `🔄 Checking price for product #${product.id} at ${new Date().toISOString()}`,
      );
      try {
        await PriceWorker.check(product.id);
      } catch (err) {
        console.error(`Error checking product ${product.id}:`, err);
      }
    });

    console.log(`Scheduled product ${product.id} with cron '${cronExp}'`);
  }
}
