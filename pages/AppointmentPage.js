import { expect  } from "@playwright/test";
import { BasePage } from "./BasePage";

export class AppointmentPage extends BasePage {

    constructor(page) {

        super(page);
        this.facility = this.locator("#combo_facility");
        this.readmission = this.locator("#chk_hospotal_readmission");
        this.medicare = this.locator("#radio_program_medicare");
        this.medicaid = this.locator("#radio_program_medicaid");
        this.none = this.locator("#radio_program_none");
        this.visitDate = this.locator("#txt_visit_date");
        this.comment = this.locator("#txt_comment");
        this.bookAppointment = this.locator("#btn-book-appointment");

    }
    
    async fillAppointment(data) {

        await this.selectByLabel(this.facility, data.facility);

        if (data.readmission) {
            await this.check(this.readmission);
        }

        switch (data.program) {

            case "Medicare":
                await this.click(this.medicare);
                break;

            case "Medicaid":
                await this.click(this.medicaid);
                break;

            default:
                await this.click(this.none);

        }

        // if (data.visitDate) {
        //     await this.fill(this.visitDate, data.visitDate);
        // }

        if (data.visitDate) {

            await this.visitDate.evaluate((element, value) => {
                element.value = value;
                element.dispatchEvent(new Event('input', { bubbles: true }));
                element.dispatchEvent(new Event('change', { bubbles: true }));
            }, data.visitDate);

        }
        await this.fill(this.comment, data.comment);

    }

    async submitAppointment() {
        await this.bookAppointment.click();
    }

    async waitForAppointmentConfirmation() {
        await this.page.waitForURL(/appointment\.php#summary/);
    }

    async verifyVisitDateRequired() {

        const validationMessage = await this.visitDate.evaluate(
            element => element.validationMessage
        );

        expect(validationMessage)
            .toContain("Please fill out this field.");

    }

    async verifyAppointmentSuccess() {
        await expect(this.page)
            .toHaveURL(/appointment\.php#summary/);

    }
    
}