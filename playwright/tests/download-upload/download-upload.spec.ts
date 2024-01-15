import { expect, test } from '@playwright/test';
import { readFileSync } from 'fs';

test.describe('download', () => {

    test('Download file', async ({ page }) => {
        const downloadPromise = page.waitForEvent('download');
        await page.goto('https://the-internet.herokuapp.com/download')
        await page.getByText('testFile.txt').click();
        const download = await downloadPromise;
        await download.createReadStream()
    })

})

test.describe('upload', () => {

    test('Upload file', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload')
        await page.setInputFiles('#file-upload', `${__dirname}/testFile.txt`)
        await page.click('#file-submit')
        await expect(page.getByText('testFile.txt')).toBeVisible()
    })

    test('Upload file with drag and drop', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload')

        const buffer = readFileSync(`${__dirname}/testFile.txt`)

        const dataTransfer = await page.evaluateHandle((data) => {
            const dt = new DataTransfer();
            dt.items.add(new File([data], 'testFile.txt'));
            return dt;
        }, buffer);

        await page.dispatchEvent('#drag-drop-upload', 'drop', { dataTransfer });
        await page.click('#file-submit')
        await expect(page.getByText('testFile.txt')).toBeVisible()
    })

})