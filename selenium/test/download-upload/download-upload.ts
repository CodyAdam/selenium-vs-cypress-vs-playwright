import assert from "assert";
import { Builder, By, WebDriver } from "selenium-webdriver";

describe('upload', () => {
    let driver : WebDriver;

    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    after(() => driver.quit());
    
    it('File upload', async () => {
        await driver.get('https://the-internet.herokuapp.com/upload');
        await driver.findElement(By.id('file-upload')).sendKeys(__dirname + '/testFile.txt');
        await driver.findElement(By.id('file-submit')).click();
        const element = await driver.findElement(By.id('uploaded-files'));
        assert.strictEqual(await element.getText(), 'testFile.txt');
    })

})

