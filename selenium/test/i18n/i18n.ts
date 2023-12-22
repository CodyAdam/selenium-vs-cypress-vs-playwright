import {Builder, WebDriver} from "selenium-webdriver";
import {expect} from "chai";
import {Options} from "selenium-webdriver/chrome";
describe('i18n', () => {

  let driver: WebDriver;

  before(async () => {
    let options = new Options();
    options.addArguments('--lang=fr');

    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();
  });

  after(async () => driver.quit());

  it('should have correct timezone', async () => {
    await driver.get("https://webbrowsertools.com/timezone/")
    const timeZone = await driver.findElement({ id: "timeZone" }).getText();
    expect(timeZone).to.equal("Antarctica/Troll");
  });

  it('should have correct locale', async () => {
    await driver.get("https://webbrowsertools.com/timezone/")
      .then(() => driver.findElement({ id: "locale" }).getText())
      .then((locale) => expect(locale).to.equal("fr-FR"));
  });
});
