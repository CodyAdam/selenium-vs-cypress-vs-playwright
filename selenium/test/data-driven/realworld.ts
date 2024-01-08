import { expect } from 'chai';
import { Builder, By, until } from 'selenium-webdriver';
import users from './users.json';

const LOGIN_URL = "https://conduit-realworld-example-app.fly.dev/#/login";

type User = {
  email: string;
  password: string;
  username: string;
};

describe("Realworld Conduit Data Driven", function() {
  this.timeout(30000);
  let driver;

  before(async function() {
    driver = await new Builder().forBrowser('firefox').build();
  });

  after(async function() {
    await driver.quit();
  });

  for (const user of users as User[]) {
    it(`should be able to login with user: ${user.username}`, async function() {
      // Navigate to the login page
      await driver.get(LOGIN_URL);

      // Fill in login form and submit
      await driver.findElement(By.css("input[type='email']")).sendKeys(user.email);
      await driver.findElement(By.css("input[type='password']")).sendKeys(user.password);
      await driver.findElement(By.css("button")).click();

      // wait for the nav to have the correct username
      await driver.wait(until.elementTextContains(await driver.findElement(By.css("nav")), user.username));

      // Clear local storage and reload for next test
      await driver.executeScript('localStorage.clear();');
      await driver.navigate().refresh();
    });
  }
});