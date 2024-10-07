import { getCurrentLink, updateLinksStyle } from "../navigator.js";
import { router } from "../services/router.js";
import { insertHTML } from "../helpers.js";
import { store } from "../services/store.js";

export class Step4Page extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const pageTemplate = document.getElementById("step4PageTemplate");
        const pageContent = pageTemplate.content.cloneNode(true);
        this.appendChild(pageContent);

        this.setupFinishingUpTable();

        document
            .querySelector("#navigateBack")
            .addEventListener("click", function goBackToAddOns(event) {
                event.preventDefault();
                router.pushRoute("/step-2");
                updateLinksStyle(getCurrentLink("/step-2"));
            });
    }
    setupFinishingUpTable() {
        const finishingUpTable = document.getElementById("finishingUpTable");
        finishingUpTable.setAttribute("cellspacing", "0");

        const selectedPlan = store.getSelectedPlan();
        const selectedAddOns = store.getSelectedAddOns();
        const renewalPlan = store.getRenewalPlan();
        const totalPlanPrice =
            renewalPlan === "yearly"
                ? selectedPlan.price * 10
                : selectedPlan.price;
        
        const totalAddOnsPrice = selectedAddOns.reduce(function calculateAddOnsTotal(acc, addOn) {
            return acc +
                (renewalPlan === "yearly"
                    ? addOn.price * 10
                    : addOn.price)
                
        }, 0)
        
        const addOnsHTML = selectedAddOns
            .map(function createAddOnHTML(addOn) {
                return `
                <tr>
                    <td class="fs-small cool-gray">${addOn.title}</td>
                    <td class="fs-small">+$${
                        renewalPlan === "yearly"
                            ? addOn.price * 10
                            : addOn.price
                    }/${renewalPlan === "yearly" ? "yr" : "mo"}</td>
                </tr>
            `;
            })
            .join("");

        insertHTML(
            finishingUpTable,
            "afterbegin",
            `
            <tbody>
                <tr class="selected-plan">
                    <td>
                        <p class="fw-medium fs-small capitalize">${
                            selectedPlan.title
                        } (${renewalPlan})</p>
                        <a id="navigateBack" class="cool-gray fs-small" href="#">Change</a>
                    </td>
                    <td class="fw-bold fs-small">$${totalPlanPrice}/${
                renewalPlan === "yearly" ? "yr" : "mo"
            }</td>
                </tr>
                ${addOnsHTML}
            </tbody>
            <tfoot>
                <tr>
                    <td class="cool-gray fs-small">Total (per ${renewalPlan})</td>
                    <td class="purplish-blue fw-bold">
                        $${totalPlanPrice + totalAddOnsPrice}
                        /${renewalPlan === "yearly" ? "yr" : "mo"}
                    </td>
                </tr>
            </tfoot>
        `
        );
    }
}
