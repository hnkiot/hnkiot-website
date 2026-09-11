import { chromium } from 'playwright';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const promoDir = path.join(__dirname, '..', 'marketing', 'promo');
const outDir = path.join(__dirname, '..', 'marketing', 'promo-out');

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1080, height: 1920 },
  recordVideo: { dir: outDir, size: { width: 1080, height: 1920 } },
});
const page = await context.newPage();

const url = pathToFileURL(path.join(promoDir, 'index.html')).href;
await page.goto(url);

await page.waitForFunction('window.__promoDone === true', { timeout: 30000 });
await page.waitForTimeout(400);

await page.close();
await context.close();
await browser.close();

console.log('done');
