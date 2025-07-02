import cron from 'node-cron';
//import { PriceWorker } from '../workers/price-worker';
//import { getProducts } from '../services/PriceService';
import { Config } from '@/config';

/**
 * Schedule jobs for each product based on its interval_minutes.
 */
export async function scheduleJobs() {
    // const products = await getProducts();
    //
    // products.forEach((product) => {
    //     const mins = product.interval_minutes || Config.scheduler.defaultInterval;
    //     const cronExp = `*/${mins} * * * *`;
    //
    //     cron.schedule(cronExp, async () => {
    //         await PriceWorker.check(product.id);
    //     });
    // });
}