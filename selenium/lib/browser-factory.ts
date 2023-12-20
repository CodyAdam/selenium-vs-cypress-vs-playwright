import {Builder, WebDriver} from "selenium-webdriver";


export type BrowserName = "chrome" | "firefox";

abstract class Browser {
  abstract createDriver(): Promise<WebDriver>
}

export class Chrome extends Browser {
  async createDriver(): Promise<WebDriver> {
    return new Builder().forBrowser("chrome").build();
  }
}


export class Firefox extends Browser {
  async createDriver(): Promise<WebDriver> {
    return new Builder().forBrowser("firefox").build();
  }
}

export class BrowserFactory {
  static async createBrowser(browserName: BrowserName): Promise<WebDriver> {
    switch (browserName) {
      case "chrome":
        return new Chrome().createDriver();
      case "firefox":
        return new Firefox().createDriver();
      default:
        throw new Error(`Browser ${browserName} is not supported`);
    }
  }
}
