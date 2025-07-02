import { WebDriver } from "selenium-webdriver";

export abstract class BaseScraper {
  /**
   * @param driver
   * @param url
   * @param selector
   * @returns
   */
  abstract scrape(
    driver: WebDriver,
    url: string,
    selector: string,
  ): Promise<number>;
}
