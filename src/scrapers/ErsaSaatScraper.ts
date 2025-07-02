import { WebDriver, By, until } from "selenium-webdriver";
import { BaseScraper } from "./BaseScraper";

export class ErsaSaatScraper extends BaseScraper {
  async scrape(
    driver: WebDriver,
    url: string,
    selector: string,
  ): Promise<number> {
    await driver.get(url);
    await driver.wait(until.elementLocated(By.css(selector)), 10_000);
    const text = await driver.findElement(By.css(selector)).getText();
    return parseFloat(text.replace(/[^\d.]/g, ""));
  }
}
