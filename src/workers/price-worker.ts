import { Builder, By, until, WebDriver } from "selenium-webdriver";
import { chromeOptions } from "@/config/selenium";
import { PriceService } from "@/services/PriceService";

import { BaseScraper } from "@/scrapers/BaseScraper";
import { ErsaSaatScraper } from "@/scrapers/ErsaSaatScraper";

export class PriceWorker {
  private static getScraper(platform: string | null): BaseScraper {
    switch (platform?.toLowerCase()) {
      case "ersasaat":
        return new ErsaSaatScraper();
      default:
        throw new Error(`No scraper implemented for platform: ${platform}`);
    }
  }

  static async check(productId: number): Promise<void> {
    const service = new PriceService();
    const product = await service.getProductById(productId);
    if (!product) {
      console.error(`Product ${productId} not found`);
      return;
    }

    let scraper: BaseScraper;
    try {
      scraper = this.getScraper(product.platform?.toString() ?? "");
    } catch (err) {
      console.error(err);
      return;
    }

    let driver: WebDriver | undefined;
    try {
      driver = await new Builder()
        .forBrowser("chrome")
        .setChromeOptions(chromeOptions())
        .build();

      const price = await scraper.scrape(driver, product.url, product.selector);
      console.log(
        `Product ${product.id} (${product.platform}) price: ${price}`,
      );

      if (product.last_price === null || price < Number(product.last_price)) {
        await service.updatePrice(product.id, price);
        console.log(`Updated product ${product.id} price to ${price}`);
      }
    } catch (err) {
      console.error(`Error checking product ${productId}:`, err);
    } finally {
      if (driver) {
        await driver.quit();
      }
    }
  }
}
