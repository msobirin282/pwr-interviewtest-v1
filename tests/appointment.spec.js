import { test, expect } from "../fixtures/baseFixture";
import { loginData } from "../data/loginData";
import { appointmentData} from "../data/appointmentData";
import { loadEnvFile } from "node:process";
import { log } from "node:console";

test.describe("Make Appointment", () => {

    test("TC 2.1 - Without Mandatory Visit Date", async ({
        loginPage,
        appointmentPage
    }) => {

        //Login
        await loginPage.openLoginPage();

        await loginPage.login(
            loginData.valid.username,
            loginData.valid.password
        );

        // Fill form (Visit Date Kosong)
        await appointmentPage.fillAppointment(
            appointmentData.mandatoryDate
        );

        // Submit
        await appointmentPage.submitAppointment();

        // Validasi browser HTML
        await appointmentPage.verifyVisitDateRequired();
    });

    test("TC 2.2 - Make Appointment Success", async ({
        loginPage,
        appointmentPage
    }) => {

        // Login
        await loginPage.openLoginPage();

        await loginPage.login(
            loginData.valid.username,
            loginData.valid.password
        );

        // Fill form
        await appointmentPage.fillAppointment(
            appointmentData.success
        );

        // Submit
        await appointmentPage.submitAppointment();

        await appointmentPage.waitForAppointmentConfirmation();

        await appointmentPage.verifyAppointmentSuccess();
    });
})