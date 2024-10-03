import { emailRegex, phoneRegex } from "../helpers.js";
import { navigateToNextStep } from "../navigator.js";
import { store } from "../services/store.js";

export class Step1Page extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const pageTemplate = document.getElementById("step1PageTemplate");
        const pageContent = pageTemplate.content.cloneNode(true);
        this.appendChild(pageContent);

        this.displayUserInfo();

        document
            .querySelector(".next-step")
            .addEventListener("click", this.addUser);
    }

    displayUserInfo() {
        for (let [key, value] of Object.entries(store.getUserInfo())) {
            const field = document.querySelector(`input[name='${key}']`);
            field.value = value;
        }
    }

    addUser() {
        let isError = false;

        const form = new FormData(document.querySelector(".info-form"));
        for (let [key, value] of form.entries()) {
            const field = document.querySelector(`input[name='${key}']`);
            if (value.length == 0) {
                field.classList.add("error");
                field.nextElementSibling.style.display = "inline";
                isError = true;
            } else if (key == "email" && !emailRegex.test(value)) {
                field.classList.add("error");
                field.nextElementSibling.textContent = "Invalid email";
                field.nextElementSibling.style.display = "inline";
                isError = true;
            } else if (key == "phoneNumber" && !phoneRegex.test(value)) {
                field.classList.add("error");
                field.nextElementSibling.textContent = "Invalid phone number";
                field.nextElementSibling.style.display = "inline";
                isError = true;
            } else {
                store.updateUserInfo(key, value);
                field.classList.remove("error");
                field.nextElementSibling.style.display = "none";
            }
        }

        // If no errors, navigate to the next step
        if (!isError) {
            navigateToNextStep();
        }
    }
}
