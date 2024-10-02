import { router } from "./services/router.js";

const navLinks = document.querySelectorAll(".nav-link");
const main = document.getElementById("main");
const footer = document.getElementById("footer");

const routes = {
    "/": navigateToStep1,
    "/step-2": navigateToStep2,
    "/step-3": navigateToStep3,
    "/step-4": navigateToStep4,
    "/thank-you": navigateToThankYou,
};

window.addEventListener("popstate", () => {
    router.navigate(window.location.pathname);
    updateLinksStyle(getCurrentLink(router.currentRoute));
});

export function initializeRouteNavigation() {
    router.setRoutes(routes);

    const currentPath = window.location.pathname;
    if (!Object.keys(routes).includes(currentPath)) {
        router.pushRoute("/");
    } else {
        router.pushRoute(currentPath);
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function onNavigate(event) {
            event.preventDefault();
            updateLinksStyle(event.target);
            router.pushRoute(event.target.pathname);
        });
    });
}

function navigateToStep1() {
    const step1Page = document.createElement("step-1-page");
    footer.replaceChildren(nextStepButton());
    main.replaceChildren(step1Page);
}

function navigateToStep2() {
    const step2Page = document.createElement("step-2-page");
    footer.replaceChildren(goBackButton(), nextStepButton());
    main.replaceChildren(step2Page);
}

function navigateToStep3() {
    const step3Page = document.createElement("step-3-page");
    footer.replaceChildren(goBackButton(), nextStepButton());
    main.replaceChildren(step3Page);
}

function navigateToStep4() {
    const step4Page = document.createElement("step-4-page");
    footer.replaceChildren(goBackButton(), confirmButton());
    main.replaceChildren(step4Page);
}

function navigateToThankYou() {
    const thankYouPage = document.createElement("thank-you-page");
    footer.replaceChildren();
    main.replaceChildren(thankYouPage);
}

function goBackButton() {
    const buttonTemplate = document.getElementById("goBackTemplate");
    const button = buttonTemplate.content.cloneNode(true);
    button
        .querySelector(".go-back")
        .addEventListener("click", function navigateBack() {
            history.back();
        });
    return button;
}

function nextStepButton() {
    const buttonTemplate = document.getElementById("nextStepTemplate");
    const button = buttonTemplate.content.cloneNode(true);
    button
        .querySelector(".next-step")
        .addEventListener("click", function navigateToNextStep() {
            const routesArray = Object.keys(routes);
            for (let i = 0; i < routesArray.length; i++) {
                if (routesArray[i] == router.currentRoute) {
                    const nextStep = routesArray[i + 1];
                    router.pushRoute(nextStep);
                    updateLinksStyle(getCurrentLink(nextStep));
                    return;
                }
            }
        });
    return button;
}

function confirmButton() {
    const buttonTemplate = document.getElementById("confirmTemplate");
    const button = buttonTemplate.content.cloneNode(true);
    button.querySelector(".confirm").addEventListener("click", function () {
        router.pushRoute("/thank-you");
    });
    return button;
}

function updateLinksStyle(currentLink) {
    navLinks.forEach(function updateLinksClass(link) {
        link.classList.remove("current");
        link.blur();
    });
    currentLink.classList.add("current");
}

function getCurrentLink(currentRoute) {
    return Array.from(navLinks).find((link) => link.pathname == currentRoute);
}
