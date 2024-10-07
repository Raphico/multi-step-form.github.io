import { plans } from "../data.js";
import { insertHTML } from "../helpers.js";
import { store } from "../services/store.js";

export class Step2Page extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const pageTemplate = document.getElementById("step2PageTemplate");
        const pageContent = pageTemplate.content.cloneNode(true);
        this.appendChild(pageContent);

        this.setupPlans();
        this.setupRenewal();
    }

    setupPlans() {
        const plansEl = document.getElementById("plans");

        plans.forEach((plan) => plansEl.appendChild(this.createPlan(plan)));

        this.updatePlans(plansEl);

        plansEl.addEventListener("click", (event) => {
            const planId = event.target.dataset.id;
            store.updateSelectedPlan(planId);
            this.updatePlans(plansEl);
        });
    }

    createPlan(plan) {
        const div = document.createElement("div");
        div.classList.add("plan");
        div.role = "radio";
        div.ariaChecked = false;
        div.dataset.id = plan.id;
        div.tabIndex = 0;
        div.ariaLabel = `${plan.title} plan $${plan.price} per month`;

        insertHTML(
            div,
            "afterbegin",
            `
            <img
                src="${plan.image}"
                alt=""
                width="40"
                height="40"
                aria-hidden="true"
            />
            <div>
                <p class="fw-medium capitalize">${plan.title}</p>
                <p class="fs-small cool-gray">$${plan.price}/mo</p>
            </div>
        `
        );

        return div;
    }

    updatePlans(plansEl) {
        plansEl
            .querySelectorAll(".plan")
            .forEach(function updateCheckedPlan(plan) {
                plan.ariaChecked = plan.dataset.id == store.getSelectedPlanId();
            });
    }

    setupRenewal() {
        const renewal = document.getElementById("renewal");
        this.updateRenewalPlan(renewal);

        renewal.querySelector("#switch").addEventListener("click", () => {
            const isChecked = renewal.querySelector("input").checked;
            store.updateRenewalPlan(isChecked ? "yearly" : "monthly");
            this.updateRenewalPlan(renewal);
        });
    }

    updateRenewalPlan(renewal) {
        const monthly = renewal.querySelector("#monthly");
        const yearly = renewal.querySelector("#yearly");
        const isMonthly = store.getRenewalPlan() === "monthly";

        renewal.querySelector("input").setAttribute("checked", !isMonthly);
        this.toggleClass(monthly, isMonthly, "marine-blue", "cool-gray");
        this.toggleClass(yearly, !isMonthly, "marine-blue", "cool-gray");
    }

    toggleClass(element, condition, addClass, removeClass) {
        element.classList.toggle(addClass, condition);
        element.classList.toggle(removeClass, !condition);
    }
}
