import { router } from "./services/router.js";

const routes = {
    "/": navigateToStep1,
    "/step-2": navigateToStep2,
    "step-3": navigateToStep3,
    "/step-4": navigateToStep4,
    "/thank-you": navigateToThankYou,
};

export function initializeRouteNavigation() {
    router.setRoutes(routes);

    const navLinks = document.querySelectorAll(".nav-link");
    const currentPath = window.location.pathname;

    if (!Object.keys(routes).includes(currentPath)) {
        router.navigate("/");
    } else {
        router.navigate(currentPath);
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function onNavigate(event) {
            event.preventDefault();
            router.pushRoute(event.target.pathname);
        });
    });
}

function navigateToStep1() {
    console.log("step 1");
}

function navigateToStep2() {
    console.log("step 2");
}

function navigateToStep3() {
    console.log("step 3");
}

function navigateToStep4() {
    console.log("step 4");
}

function navigateToThankYou() {
    console.log("Thank you");
}
