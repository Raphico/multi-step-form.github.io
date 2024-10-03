import { addOns, plans } from "../data.js";

class Store {
    static instance;

    #userInfo = {
        name: "",
        email: "",
        phoneNumber: "",
    };

    #selectedPlanId = plans[2].id;
    #renewalPlan = "yearly";
    #selectedAddOns = [];

    constructor() {
        if (Store.instance) {
            return Store.instance;
        }

        Store.instance = this;
    }

    /**
     * @typedef User
     * @property {string} name - user's name
     * @property {string} email - user's email
     * @property {string} phoneNumber - user's phone Number
     */

    /**
     * @param {User} userInfo
     */
    updateUserInfo(key, value) {
        this.#userInfo[key] = value;
    }

    /**
     *
     * @returns {User}
     */
    getUserInfo() {
        return this.#userInfo;
    }

    getSelectedPlanId() {
        return this.#selectedPlanId;
    }

    updateSelectedPlan(planId) {
        this.#selectedPlanId = planId;
    }

    getRenewalPlan() {
        return this.#renewalPlan;
    }

    getSelectedAddOnIds() {
        return this.#selectedAddOns;
    }

    getSelectedAddOns() {
        return addOns.filter((addOn) =>
            this.#selectedAddOns.includes(addOn.id.toString())
        );
    }

    addAddOn(addOnId) {
        this.#selectedAddOns = [...this.#selectedAddOns, addOnId];
    }

    getSelectedPlan() {
        return plans.find((plan) => plan.id == this.#selectedPlanId);
    }

    removeAddOn(addOnId) {
        this.#selectedAddOns = this.#selectedAddOns.filter(
            (id) => id != addOnId
        );
    }

    updateRenewalPlan(renewalPlan) {
        this.#renewalPlan = renewalPlan;
    }
}

export const store = new Store();
