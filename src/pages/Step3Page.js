import { addOns } from "../data.js";
import { insertHTML } from "../helpers.js";
import { store } from "../services/store.js";

export class Step3Page extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const pageTemplate = document.getElementById("step3PageTemplate");
        const pageContent = pageTemplate.content.cloneNode(true);
        this.appendChild(pageContent);

        this.setupAddOns();
    }

    setupAddOns() {
        const addOnsContainer = document.getElementById("addOns");
        addOns.forEach((addOn) =>
            addOnsContainer.appendChild(this.createAddOn(addOn))
        );
        this.updateAddOns(addOnsContainer);

        addOnsContainer.addEventListener("click", (event) => {
            const clickedEl = event.target;

            if (clickedEl.tagName == "INPUT") {
                if (clickedEl.checked) {
                    store.addAddOn(clickedEl.dataset.id);
                    return;
                }

                store.removeAddOn(clickedEl.dataset.id);
            }
        });
    }

    updateAddOns(addOnsContainer) {
        addOnsContainer
            .querySelectorAll("input")
            .forEach(function updateAddOnsStyle(addOn) {
                addOn.toggleAttribute(
                    "checked",
                    store.getSelectedAddOnIds().includes(addOn.dataset.id)
                );
            });
    }

    createAddOn(addOn) {
        const label = document.createElement("label");
        insertHTML(
            label,
            "afterbegin",
            `
            <div>
                <p class="fw-medium fs-small">
                    ${addOn.title}
                </p>
                <p class="cool-gray fs-xs">
                    ${addOn.description}
                </p>
            </div>
            <p class="purplish-blue fs-xs">+$${addOn.price}/mo</p>
            <input data-id=${addOn.id} type="checkbox" />
            <span class="checkmark"></span>
        `
        );
        return label;
    }
}
