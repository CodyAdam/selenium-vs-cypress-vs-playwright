import { expect, test } from '@playwright/test';
import { readFileSync, rmSync } from 'fs';

test.describe('download', () => {

    test.beforeEach(async () => {
        rmSync(`${__dirname}/testFile.txt`)
    })

    test('Download file', async ({ page }) => {
        const downloadPromise = page.waitForEvent('download');
        await page.goto('https://the-internet.herokuapp.com/download')
        await page.getByText('testFile.txt').click();
        const download = await downloadPromise;

        await download.saveAs(`${__dirname}/${download.suggestedFilename()}`);
        await download.createReadStream()
    })

})

test.describe('upload', () => {

    test('Upload file', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload')
        await page.setInputFiles('#file-upload', `${__dirname}/testFileU.txt`)
        await page.click('#file-submit')
        await expect(page.getByText('testFileU.txt')).toBeVisible()
    })

    test('Upload file with drag and drop', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload')

        const buffer = readFileSync(`${__dirname}/testFileU.txt`)

        const dataTransfer = await page.evaluateHandle((data) => {
            const dt = new DataTransfer();
            dt.items.add(new File([data], 'testFileU.txt'));
            return dt;
        }, buffer);

        await page.dispatchEvent('#drag-drop-upload', 'drop', { dataTransfer });
        await page.click('#file-submit')
        await expect(page.getByText('testFileU.txt')).toBeVisible()
    })

})