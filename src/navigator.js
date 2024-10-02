import { router } from "./services/router.js";

const navLinks = document.querySelectorAll(".nav-link");
const main = document.getElementById("main");

const routes = {
    "/": navigateToStep1,
    "/step-2": navigateToStep2,
    "/step-3": navigateToStep3,
    "/step-4": navigateToStep4,
    "/thank-you": navigateToThankYou,
};

export function initializeRouteNavigation() {
    router.setRoutes(routes);

    const currentPath = window.location.pathname;
    if (!Object.keys(routes).includes(currentPath)) {
        console.log("foo");
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
    main.replaceChildren(step1Page);
}

function navigateToStep2() {
    const step2Page = document.createElement("step-2-page");
    main.replaceChildren(step2Page);
}

function navigateToStep3() {
    const step3Page = document.createElement("step-3-page");
    main.replaceChildren(step3Page);
}

function navigateToStep4() {
    const step4Page = document.createElement("step-4-page");
    main.replaceChildren(step4Page);
}

function navigateToThankYou() {
    const thankYouPage = document.createElement("thank-you-page");
    main.replaceChildren(thankYouPage);
}

function updateLinksStyle(currentLink) {
    navLinks.forEach(function updateLinksClass(link) {
        link.classList.remove("current");
    });
    currentLink.classList.add("current");
}
