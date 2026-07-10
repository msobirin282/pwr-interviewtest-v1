import { expect } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class LoginPage extends BasePage {

    constructor(page) {

        super(page);
        this.makeAppointmentButton = this.locator("#btn-make-appointment");
        this.username = this.locator("#txt-username");
        this.password = this.locator("#txt-password");
        this.loginButton = this.locator("#btn-login");
        this.errorMessage = this.locator(".text-danger");

    }

    async openLoginPage(){
        
        await this.goto("/");
        await this.click(this.makeAppointmentButton);

    }

    async login(username, password) {

        await this.fill(this.username, username);
        await this.fill(this.password, password);
        await this.click(this.loginButton);

    }

    async verifyLoginSuccess() {
        
        await expect(this.page).toHaveURL(/appointment/);

    }

    async verifyLoginFailed() {

        await expect(this.errorMessage).toContainText("Login failed");
        
    }
}