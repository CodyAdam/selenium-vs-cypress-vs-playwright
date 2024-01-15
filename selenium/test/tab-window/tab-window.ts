import assert from "assert";
import { Builder, By, WebDriver, until } from "selenium-webdriver";


describe('tab-window', () => {
    let driver : WebDriver;

    /*before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    beforeEach(async () => {
        const win = await driver.getWindowHandle();
        const windows = await driver.getAllWindowHandles();
        for (const handle of windows) {
            if (handle !== win) {
                await driver.switchTo().window(handle);
                await driver.close();
            }
        }
        await driver.switchTo().window(win);
    });

    after(() => driver.quit());*/

    beforeEach(async () => {
        driver = await new Builder().forBrowser("chrome").build();
    });

    afterEach(() => driver.quit());

    it('Open new tab', async () => {
        await driver.get('https://the-internet.herokuapp.com/windows')
        const win1 = await driver.getWindowHandle();
        assert((await driver.getAllWindowHandles()).length === 1, 'There is more than one window');
        await driver.findElement(By.linkText('Click Here')).click();
        await driver.wait(
            async () => (await driver.getAllWindowHandles()).length === 2,
            10000,
        );

        const windows = await driver.getAllWindowHandles();
        let win2: string;
        for (const handle of windows) {
            if (handle !== win1) {
                win2 = handle;
                await driver.switchTo().window(win2);
            }
        }
        await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(),'New Window')]")),
            10000,
        );
        await driver.findElement(By.xpath("//*[contains(text(),'New Window')]")).isDisplayed(),

        await driver.switchTo().window(win1);
        await driver.wait(
            until.elementLocated(By.linkText('Click Here')),
            10000,
        );
        await driver.findElement(By.linkText('Click Here')).isDisplayed()
    })

    it('Open new window', async () => {
        await driver.get('https://alapanme.github.io/testing-cypress.html')
        const win1 = await driver.getWindowHandle();
        assert((await driver.getAllWindowHandles()).length === 1, 'There is more than one window');
        await driver.findElement(By.xpath("//*[contains(text(),'Try it')]")).click();
        await driver.wait(
            async () => (await driver.getAllWindowHandles()).length === 2,
            10000,
        );

        const windows = await driver.getAllWindowHandles();
        let win2: string;
        for (const handle of windows) {
            if (handle !== win1) {
                win2 = handle;
                await driver.switchTo().window(win2);
            }
        }
        await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(),'Welcome to the-internet')]")),
            10000,
        );
        await driver.findElement(By.xpath("//*[contains(text(),'Welcome to the-internet')]")).isDisplayed(),

        await driver.switchTo().window(win1);
        await driver.wait(
            until.elementLocated(By.xpath("//*[contains(text(),'Try it')]")),
            10000,
        );
        await driver.findElement(By.xpath("//*[contains(text(),'Try it')]")).isDisplayed()
    })

})
