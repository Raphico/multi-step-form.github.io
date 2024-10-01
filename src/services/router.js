class Router {
    constructor() {
        this.routes = {};
        this.currentRoute = undefined;

        window.addEventListener("popstate", () => {
            this.navigate(window.location.pathname);
        });
    }

    /**
     * Register app routes
     * @typedef {Object<string, function(): void>} Route
     * @param {Route} routes - The app routes
     * */
    setRoutes(routes) {
        this.routes = routes;
    }

    /**
     * Navigate to specified route
     * @param {string} path - The path to navigate to
     */
    navigate(path) {
        if (this.routes[path] == null) {
            return;
        }

        this.routes[path]();
        this.currentRoute = path;
    }

    /**
     * Add a path to history
     * @param {string} path - The path to add to history
     */
    pushRoute(path) {
        window.history.pushState({ path }, null, path);
        this.navigate(path);
    }
}

export const router = new Router();
