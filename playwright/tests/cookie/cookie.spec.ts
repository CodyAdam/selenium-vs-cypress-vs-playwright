import { expect, test } from '@playwright/test';


test.describe('cookie-distributed', () => {

    test.beforeEach(async ({ context, page }) => {
        await context.addCookies([
            { name: 'currency', value: 'GBP', domain: 'electre.kereval.cloud', path: '/'},
        ])
        await page.goto('https://electre.kereval.cloud/opencart/index.php')
    })

    test('Check currency', async ({ page }) => {
        await expect(page.getByText('£ Currency')).toBeVisible()
    })

    test('Check currency other', async ({ page }) => {
        await expect(page.getByText('£ Currency')).toBeVisible()
    })

})

test.describe('cookie-direct', () => {

    test('Change currency', async ({ context, page }) => {
        await page.goto('https://electre.kereval.cloud/opencart/index.php')
        const cookies = await context.cookies()
        expect(cookies.find(c => c.name === 'currency')?.value).toBe('EUR')
        await expect(page.getByText('£ Currency')).not.toBeVisible()
        await context.clearCookies()
        await context.addCookies([
            { name: 'currency', value: 'GBP', domain: 'electre.kereval.cloud', path: '/'},
        ])
        await page.reload()
        await expect(page.getByText('£ Currency')).toBeVisible()
    })

})
