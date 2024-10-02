import { initializeRouteNavigation } from "./navigator.js";
import { definePages } from "./pages/index.js";

window.addEventListener("DOMContentLoaded", function app() {
    initializeRouteNavigation();
    definePages();
});
