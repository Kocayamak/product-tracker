import {Options} from 'selenium-webdriver/chrome';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { Config } from '@/config';

function makeProfileDir(): string {
    return fs.mkdtempSync(path.join(os.tmpdir(), 'selenium-'));
}

export function chromeOptions(): Options {
    const opts = new Options()
        .addArguments(
            '--no-sandbox',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            `--user-data-dir=${makeProfileDir()}`
        );

    if (Config.selenium.headless) {
        opts.addArguments('--headless=new');
    }

    // point to custom binary if needed
    opts.setBinaryPath(Config.selenium.chromeBinary);

    return <Options>opts;
}