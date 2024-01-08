import { expect, test } from "@playwright/test";
import users from "./users.json";

const LOGIN_URL = "https://conduit-realworld-example-app.fly.dev/#/login";

type User = {
  email: string;
  password: string;
  username: string;
};

test.describe("Realworld Conduit Data Driven", () => {
  test("should be able to login with all users", async ({ page }) => {

    for (const user of users as User[]) {
      // Navigate to the login page
      await page.goto(LOGIN_URL);

      // Fill in login form and submit
      await page.fill("input[type='email']", user.email);
      await page.fill("input[type='password']", user.password);
      await page.click("button");

      // Assert that the correct user is logged in
      await expect(page.locator("nav")).toContainText(user.username);

      // Clear local storage and reload for next test
      await page.evaluate(() => localStorage.clear());
      await page.reload();
    }
  });
});
