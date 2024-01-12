import assert from "assert";
import { Builder, By, WebDriver } from "selenium-webdriver";


describe('tab-window', () => {
    let driver : WebDriver;

    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    after(() => driver.quit());


    it('Open new tab', async () => {
        await driver.get('https://the-internet.herokuapp.com/windows')
        const win1 = await driver.getWindowHandle();
        assert((await driver.getAllWindowHandles()).length === 1, 'There is more than one window');
        await driver.findElement(By.linkText('Click Here')).click();
        await driver.wait(async () => (await driver.getAllWindowHandles()).length === 2);
        const win2 = (await driver.getAllWindowHandles()).find(win => win !== win1);
        await driver.switchTo().window(win2);
        await driver.sleep(1000);
        assert(await driver.findElement(By.xpath("//*[contains(text(),'New Window')]")).isDisplayed(), 'text is not displayed');
        await driver.switchTo().window(win1);
        await driver.sleep(1000);
        assert(await driver.findElement(By.linkText('Click Here')).isDisplayed(), 'button is not displayed');
    })

    /*it('Open new window', async () => {
        const element = await driver.findElement(By.partialLinkText('£'));
        assert(await element.isDisplayed(), 'Element is not displayed');
    })*/

})
