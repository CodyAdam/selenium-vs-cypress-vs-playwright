import assert from "assert";
import { Builder, By, WebDriver } from "selenium-webdriver";


describe('cookie', () => {
    let driver : WebDriver;

    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    after(() => driver.quit());

    beforeEach(async () => {
        await driver.get('https://electre.kereval.cloud/opencart/404');
        await driver.manage().addCookie({name: 'currency', value: 'GBP'})
        await driver.get('https://electre.kereval.cloud/opencart/index.php');
    })

    it('Check currency', async () => {
        const element = await driver.findElement(By.partialLinkText('£'));
        assert(await element.isDisplayed(), 'Element is not displayed');
    })

    it('Check currency other', async () => {
        const element = await driver.findElement(By.partialLinkText('£'));
        assert(await element.isDisplayed(), 'Element is not displayed');
    })

})

describe('cookie-direct', () => {
    let driver : WebDriver;

    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    after(() => driver.quit());
    
    it('Change currency', async () => {
        await driver.get('https://electre.kereval.cloud/opencart/index.php');
        const cookie = await driver.manage().getCookie('currency');
        assert.strictEqual(cookie?.value, 'EUR');
        const elements = await driver.findElements(By.linkText('£ Currency'));
        assert.strictEqual(elements.length, 0);
        await driver.manage().deleteAllCookies();
        await driver.manage().addCookie({name: 'currency', value: 'GBP'})
        await driver.navigate().refresh();
        const element = await driver.findElement(By.partialLinkText('£'));
        assert(await element.isDisplayed(), 'Element is not displayed');
    })

})

