import { router } from "./services/router.js";

const navLinks = document.querySelectorAll(".nav-link");
const main = document.getElementById("main");
const footer = document.getElementById("footer");

const routes = [
    {
        path: "/",
        handler: navigateToStep1,
        canVisit: true,
    },
    {
        path: "/step-2",
        handler: navigateToStep2,
        canVisit: false,
    },
    {
        path: "/step-3",
        handler: navigateToStep3,
        canVisit: false,
    },
    {
        path: "/step-4",
        handler: navigateToStep4,
        canVisit: false,
    },
    {
        path: "/thank-you",
        handler: navigateToThankYou,
        canVisit: false,
    },
];

window.addEventListener("popstate", () => {
    router.navigate(window.location.pathname);
    updateLinksStyle(getCurrentLink(router.currentRoute));
});

export function initializeRouteNavigation() {
    router.setRoutes(routes);

    router.pushRoute("/");

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
    footer.replaceChildren(nextStepButton(false));
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

function nextStepButton(handleNavigation = true) {
    const buttonTemplate = document.getElementById("nextStepTemplate");
    const button = buttonTemplate.content.cloneNode(true);

    if (handleNavigation) {
        button
            .querySelector(".next-step")
            .addEventListener("click", navigateToNextStep);
    }
    return button;
}

function confirmButton() {
    const buttonTemplate = document.getElementById("confirmTemplate");
    const button = buttonTemplate.content.cloneNode(true);
    button.querySelector(".confirm").addEventListener("click", function () {
        router.pushRoute("/thank-you", true);
    });
    return button;
}

export function navigateToNextStep() {
    for (let i = 0; i < routes.length; i++) {
        if (routes[i].path == router.currentRoute) {
            const nextStep = routes[i + 1].path;
            router.pushRoute(nextStep, true);

            const nextStepLink = getCurrentLink(nextStep);
            nextStepLink.classList.remove("disable");
            updateLinksStyle(nextStepLink);
            return;
        }
    }
}

export function updateLinksStyle(currentLink) {
    navLinks.forEach(function updateLinksClass(link) {
        link.classList.remove("current");
        link.blur();
    });
    currentLink.classList.add("current");
}

export function getCurrentLink(currentRoute) {
    return Array.from(navLinks).find((link) => link.pathname == currentRoute);
}
