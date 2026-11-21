import { spawn } from 'child_process';
import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

async function run() {
  const screenshotsDir = path.resolve('screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('Starting preview server...');
  const server = spawn('npx.cmd', ['vite', 'preview', '--port', '4173'], {
    shell: true,
    stdio: 'pipe',
  });

  server.stdout.on('data', (d) => console.log('server:', d.toString().trim()));
  server.stderr.on('data', (d) => console.error('server err:', d.toString().trim()));

  // Wait 3 seconds for server to start
  await new Promise((r) => setTimeout(r, 3000));

  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  // Desktop screenshot (1440x1000)
  console.log('Capturing Desktop (1440x1000)...');
  await page.setViewport({ width: 1440, height: 1000, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(screenshotsDir, 'desktop.png'), fullPage: false });

  // Mobile screenshot (390x1128)
  console.log('Capturing Mobile (390x1128)...');
  await page.setViewport({ width: 390, height: 1128, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle0' });
  await page.screenshot({ path: path.join(screenshotsDir, 'mobile.png'), fullPage: false });

  await browser.close();
  server.kill('SIGTERM');
  console.log('Screenshots saved successfully in screenshots/');
  process.exit(0);
}

run().catch((err) => {
  console.error('Error taking screenshots:', err);
  process.exit(1);
});
