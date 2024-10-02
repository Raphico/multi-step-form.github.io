class Router {
    /**
     * Represents a route object.
     * @typedef {Object} Route
     * @property {string} path - The path associated with the route.
     * @property {function} handler - The function that handles this route.
     * @property {boolean} canVisit - Whether the route can be visited.
     */
    constructor() {
        /** @type {Array<Route>} */
        this.routes = [];
        this.currentRoute = undefined;
    }

    /**
     * Initialize app routes
     * @param {Array<Route>} routes - An array of routes
     */
    setRoutes(routes) {
        this.routes = routes;
    }

    /**
     * Navigate to specified route
     * @param {string} path - The path to navigate to
     */
    navigate(path, unProtect) {
        if (unProtect) {
            this.setRouteToCanVisit(path);
        }

        const route = this.findRoute(path);

        if (!route.canVisit) {
            return;
        }

        this.currentRoute = path;
        route.handler();
    }

    setRouteToCanVisit(path) {
        this.routes = this.routes.map(function updateRoutes(route) {
            return route.path == path ? { ...route, canVisit: true } : route;
        });
    }

    findRoute(path) {
        return this.routes.find((route) => route.path == path);
    }

    /**
     * Add a path to history
     * @param {string} path - The path to add to history
     */
    pushRoute(path, unProtect) {
        window.history.pushState({ path }, null, path);
        this.navigate(path, unProtect);
    }
}

export const router = new Router();
