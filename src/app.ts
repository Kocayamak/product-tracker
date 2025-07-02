import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import { Options } from 'selenium-webdriver/chrome';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';

async function startDriver(): Promise<WebDriver> {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'selenium-profile-'));

    const options = new Options().addArguments(
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        `--user-data-dir=${tmpDir}`
    );

    return new Builder()
        .forBrowser('chrome')
        .setChromeOptions(<Options>options)
        .build();
}

interface Config {
    productUrl: string;
    priceSelector: string;
    intervalMinutes: number;
}

const cfg: Config = {
    productUrl: 'https://www.ersasaat.com.tr/casio-mtp-1302ds-7avdf-kol-saati-d36',
    priceSelector: '.new-price',
    intervalMinutes: parseInt(process.env.CHECK_INTERVAL_MINUTES ?? '60', 10),

};

let lastPrice: number | null = null;
let driver: WebDriver;

async function checkPrice(): Promise<void> {
    if (!driver) {
        driver = await startDriver();
    }

    try {
        await driver.get(cfg.productUrl);
        await driver.wait(until.elementLocated(By.css(cfg.priceSelector)), 10_000);

        const priceText = await driver.findElement(By.css(cfg.priceSelector)).getText();
        const price = parseFloat(priceText.replace(/[^\d.]/g, ''));

        console.log(`[${new Date().toLocaleTimeString()}] Fiyat: ${price}`);

        if (lastPrice !== null && price < lastPrice) {
            const message = [
                'Fiyat düştü:',
                `Önce: ${lastPrice}`,
                `Şimdi: ${price}`,
                cfg.productUrl
            ].join('\n');

        }

        lastPrice = price;
    } catch (err) {
        console.error('Fiyat kontrol hatası:', err);
    }
}

async function main(): Promise<void> {
    driver = await startDriver();
    await checkPrice();

    setInterval(checkPrice, cfg.intervalMinutes * 60 * 1000);
}

main().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});