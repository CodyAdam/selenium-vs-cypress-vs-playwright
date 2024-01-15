import { expect, test } from '@playwright/test';

test.describe('tab-window', () => {
    
    test('Open new tab', async ({context, page}) => {
        await page.goto('https://the-internet.herokuapp.com/windows')
        const pagePromise = context.waitForEvent('page');
        await page.getByText('Click Here').click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        expect(newPage.getByText('New Window')).toBeVisible();
        expect(page.getByText('Click Here')).toBeVisible();
    })

    test('Open new window', async ({page}) => {
        await page.goto('https://alapanme.github.io/testing-cypress.html')
        const popupPromise = page.waitForEvent('popup');
        await page.getByText('Try it').click();
        const popup = await popupPromise;
        await popup.waitForLoadState();
        expect(popup.getByText('Welcome to the-internet')).toBeVisible();
        expect(page.getByText('Try it')).toBeVisible();        
    })

})
