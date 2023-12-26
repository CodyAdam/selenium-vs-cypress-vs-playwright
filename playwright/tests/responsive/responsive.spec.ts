import { test, expect, devices } from '@playwright/test';

const iPhone = devices['iPhone 11'];
test('should have the correct viewport size', async ({ browser }) => {
    const context = await browser.newContext({
        ...iPhone
    });
    const page = await context.newPage();
    await page.goto("https://whatismyviewport.com");
    const width = await page.$eval('#w', el => el.textContent);
    const height = await page.$eval('#h', el => el.textContent);
    expect(width).toBe('414');
    expect(height).toBe('715');
});
