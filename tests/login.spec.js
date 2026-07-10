import { test, expect } from "../fixtures/baseFixture.js";
import { LoginPage } from "../pages/LoginPage.js";
import { loginData } from "../data/loginData.js";

test.describe("Login", () => {

    loginData.invalid.forEach((data) => {
        
        test(data.scenario, async ({ loginPage }) => {

            await loginPage.openLoginPage();

            await loginPage.login(
                data.username,
                data.password
            );

            await loginPage.verifyLoginFailed();
        });
    });

    test("Login Success", async ({ loginPage }) => {

        await loginPage.openLoginPage();

        await loginPage.login(
            loginData.valid.username,
            loginData.valid.password
        );

        await loginPage.verifyLoginSuccess();
    });
});