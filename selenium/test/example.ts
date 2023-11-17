import { Builder, By, until, Key } from "selenium-webdriver";
import "chromedriver";
import { expect } from "chai";

describe("example to-do app", function () {
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser("chrome").build();
    await driver.get("https://example.cypress.io/todo");
  });

  after(async () => driver.quit());

  it("displays two todo items by default", async () => {
    const items = await driver.findElements(By.css(".todo-list li"));
    expect(items.length).to.equal(2);

    const firstItemText = await items[0].getText();
    const lastItemText = await items[1].getText();

    expect(firstItemText).to.equal("Pay electric bill");
    expect(lastItemText).to.equal("Walk the dog");
  });

  it("can add new todo items", async () => {
    const newItem = "Feed the cat";
    const inputField = await driver.findElement(By.css("[data-test=new-todo]"));
    await inputField.sendKeys(newItem, Key.ENTER);

    const items = await driver.findElements(By.css(".todo-list li"));
    expect(items.length).to.equal(3);

    const newItemText = await items[2].getText();
    expect(newItemText).to.equal(newItem);
  });

  it("can check off an item as completed", async () => {
    const itemToCheck = await driver.findElement(
      By.xpath("//label[normalize-space()='Pay electric bill']")
    );
    const checkbox = await itemToCheck.findElement(
      By.xpath("../input[@type='checkbox']")
    );
    await checkbox.click();

    // Wait for the class attribute of the list item to change
    await driver.wait(
      until.elementLocated(
        By.xpath(
          "//label[normalize-space()='Pay electric bill']/ancestor::li[contains(@class, 'completed')]"
        )
      ),
      5000
    );

    const listItem = await driver.findElement(
      By.xpath("//label[normalize-space()='Pay electric bill']/ancestor::li")
    );
    const classAttribute = await listItem.getAttribute("class");
    expect(classAttribute).to.include("completed");
  });
});
