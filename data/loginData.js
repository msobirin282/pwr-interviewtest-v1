import { env } from "../config/env.js";

export const loginData = {

    valid: {

        username: env.username,
        password: env.password

    },

    invalid: [
        {
            scenario: "Invalid Username",
            username: "Wrong Username",
            password: env.password
        },
        {
            scenario: "Invalid Password",
            username: env.username,
            password: "Wrong Password"
        },
        {
            scenario: "Invalid Username and Password",
            username: "Wrong Username",
            password: "Wrong Password"
        }
    ]
}