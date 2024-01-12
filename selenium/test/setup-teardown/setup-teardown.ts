import assert from "assert";
import { Builder, By, WebDriver, WebElement } from "selenium-webdriver";

const login = async (driver: WebDriver) => {
    await driver.get('https://electre.kereval.cloud/opencart/index.php');
    await driver.findElement(By.xpath("//*[contains(text(),'My Account')]")).click();
    await driver.sleep(100);
    await driver.findElement(By.linkText('Login')).click();
    await driver.sleep(100);
    await driver.findElement(By.id('input-email')).sendKeys('t@e.st');
    await driver.findElement(By.id('input-password')).sendKeys('test');
    await driver.findElement(By.css('#form-login > div.text-end > button')).click();
    await driver.sleep(500);
}

const logout = async (driver: WebDriver) => {
    const element = await driver.findElement(By.xpath("//*[contains(text(),'My Account')]"))
    const js_code = "arguments[0].scrollIntoView();";
    await driver.executeScript(js_code, element);
    await driver.sleep(500);
    await element.click();
    await driver.sleep(100);
    await driver.findElement(By.linkText('Logout')).click();
    await driver.sleep(500);
}

const scrollIntoView = async(driver: WebDriver, element: WebElement) => {
    const js_code = "arguments[0].scrollIntoView();";
    await driver.executeScript(js_code, element);
    await driver.sleep(500);
}

describe('setup-teardown', () => {
    let driver : WebDriver;

    before(async () => {
        driver = await new Builder().forBrowser("chrome").build();
        await driver.manage().window().maximize()

        await login(driver)
        // retour à la page d'accueil
        await driver.findElement(By.css('#logo > a > img')).click();
        await driver.sleep(500);
        const element = await driver.findElement(By.linkText('iPhone'));
        await scrollIntoView(driver, element);
        await element.click();
        await driver.sleep(500);
        await driver.findElement(By.xpath(
            "//*[contains(text(),'Add to Cart')]"
        )).click();
        await logout(driver)
    });

    beforeEach(async () => {
        await login(driver)
    })

    it('Check Cart', async () => {
        await driver.findElement(By.xpath(
            "//*[contains(text(),'Shopping Cart')]"
        )).click();
        await driver.sleep(500);
        const element = await driver.findElement(By.xpath(
            "//*[contains(text(),'Estimate Shipping & Taxes')]"
        ))
        await scrollIntoView(driver, element);
        assert(await element.isDisplayed(), 'Element is not displayed');
    })

    it('Check Checkout', async () => {
        await driver.findElement(By.xpath(
            "//*[contains(text(),'Checkout')]"
        )).click();
        await driver.sleep(500);
        const element = await driver.findElement(By.id('input-shipping-method'))
        await scrollIntoView(driver, element);
        assert(await element.isDisplayed(), 'Element is not displayed');
    })

    afterEach(async () => {
        await logout(driver)
    })

    after(async () => {
        await login(driver)
        await driver.findElement(By.xpath(
            "//*[contains(text(),'Shopping Cart')]"
        )).click();
        await driver.sleep(100);
        // suppression de l'iPhone du panier
        await driver.findElement(By.css('.input-group > .btn-danger')).click();
        await logout(driver)
        
        driver.quit()
    });

})
