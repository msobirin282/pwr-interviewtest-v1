export class BasePage {
    
    constructor(page) {
        this.page = page;
    }

    locator(selector) {
        return this.page.locator(selector);
    }

    async goto(url = "/") {

        if (!process.env.BASE_URL) {
            throw new Error("BASE_URL is not defined");
        }

        await this.page.goto(url);
    }

    async click(locator){
        await locator.click();
    }

    async fill (locator, value) {
        await locator.fill(value);
    }

    async check(locator) {
        await locator.check();
    }

    async selectByLabel(locator, value) {
        await locator.selectOption({
            label: value
        });
    }
}