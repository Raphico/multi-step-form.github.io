class Router {
    constructor() {
        this.routes = [];
        this.currentRoute = undefined;
    }

    /**
     * Represents a route object.
     * @typedef {Object} Route
     * @property {string} path - The path associated with the route.
     * @property {function} handler - The function that handles this route.
     * @property {boolean} canVisit - Whether the route can be visited.
     */

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
    navigate(path) {
        const route = this.findRoute(path);
        if (route == null) {
            return;
        }

        this.setRouteToCanVisit(path);
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
    pushRoute(path) {
        window.history.pushState({ path }, null, path);
        this.navigate(path);
    }
}

export const router = new Router();
