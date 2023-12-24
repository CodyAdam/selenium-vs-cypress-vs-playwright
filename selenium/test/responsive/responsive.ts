import {Builder, WebDriver} from "selenium-webdriver";
import {expect} from "chai";
import {Options} from "selenium-webdriver/chrome";
describe('responsive', () => {

  let driver: WebDriver;

  before(async () => {
    driver = await new Builder()
      .forBrowser('chrome')
      .build();

    // Set the viewport size
    await setViewportSize(driver, 1200, 700);
  });

  after(async () => driver.quit());

  it('should have viewport size', async () => {
    await driver.get("https://whatismyviewport.com");
    const width = await driver.findElement({id: 'w'}).getText();
    const height = await driver.findElement({id: 'h'}).getText();
    expect(width).to.equal('1200');
    expect(height).to.equal('700');
  });
});


async function setViewportSize(driver: WebDriver, desiredWidth: number, desiredHeight: number) {
  // Set an initial window size
  await driver.manage().window().setRect({ width: desiredWidth, height: desiredHeight });

  // Fetch the actual viewport size
  const actualViewportSize = await driver.executeScript<{ width: number, height: number }>(() => {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  });

  // Calculate the difference
  const widthDifference = desiredWidth - actualViewportSize.width;
  const heightDifference = desiredHeight - actualViewportSize.height;

  // Set the corrected window size
  await driver.manage().window().setRect({
    width: desiredWidth + widthDifference,
    height: desiredHeight + heightDifference
  });
}
