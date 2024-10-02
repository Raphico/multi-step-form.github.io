import { Step1Page } from "./Step1Page.js";
import { Step2Page } from "./Step2Page.js";
import { Step3Page } from "./Step3Page.js";
import { Step4Page } from "./Step4Page.js";
import { ThankYouPage } from "./ThankYouPage.js";

export function definePages() {
    customElements.define("step-1-page", Step1Page);
    customElements.define("step-2-page", Step2Page);
    customElements.define("step-3-page", Step3Page);
    customElements.define("step-4-page", Step4Page);
    customElements.define("thank-you-page", ThankYouPage);
}
