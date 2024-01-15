import { Page, expect, test } from '@playwright/test';

const login = async (page: Page) => {
    await page.goto('https://electre.kereval.cloud/opencart/index.php');
    await page.click('text=My Account');
    await page.click('text=Login');
    await page.fill('input[name="email"]', 't@e.st');
    await page.fill('input[name="password"]', 'test');
    await page.click('button[type="submit"]');
    await page.waitForTimeout(500);
}

const logout = async (page: Page) => {
    await page.click('text=My Account');
    await page.click('text=Logout');
}

test.describe('setup-teardown', () => {

    test.beforeAll(async ({browser}) => {
        const page = await browser.newPage();
        await login(page);
        // retour à la page d'accueil
        await page.click('.img-fluid');
        await page.getByRole('heading', { name: 'iPhone'})
            .getByRole('link', { name: 'iPhone'}).click();
        await page.click('text=Add to Cart');
        await logout(page);
    })

    test.beforeEach(async ({ page }) => {
        await login(page);
    })

    test('Check Cart', async ({ page }) => {
        await page.click('text=Shopping Cart');
        await expect(page.getByText('Estimate Shipping & Taxes')).toBeVisible();
    })

    test('Check Checkout', async ({ page }) => {
        await page.click('text=Checkout');
        await expect(page.getByText('Shipping Method')).toBeVisible();
    })

    test.afterEach(async ({ page }) => {
        await logout(page);
    })

    test.afterAll(async ({browser}) => {
        const page = await browser.newPage();
        await login(page);
        await page.click('text=Shopping Cart');
        // suppression de l'iPhone du panier
        //await page.getByRole('button', { name: 'Remove'}).click();
        await page.getByRole('button', { name: '' }).click();
        await logout(page);
    })

})
