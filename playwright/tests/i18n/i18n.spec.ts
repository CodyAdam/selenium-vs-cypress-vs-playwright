
import { test, expect } from '@playwright/test';

test('should have the correct timezone', async ({ browser }) => {
    const context = await browser.newContext({
        timezoneId: 'Antarctica/Troll',
    });
    const page = await context.newPage();
    await page.goto("https://webbrowsertools.com/timezone/");
    const timeZone = await page.innerText('#timeZone');
    expect(timeZone).toBe('Antarctica/Troll');
});

test('should have the correct locale', async ({ browser }) => {
    const context = await browser.newContext({
        locale: 'fr-FR',
    });
    const page = await context.newPage();
    await page.goto('https://webbrowsertools.com/timezone/');
    const locale = await page.innerText('#locale');
    expect(locale).toBe('fr-FR');
});
