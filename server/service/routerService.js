'use strict';

import routes from '../config/routes';

class RouterService {
    constructor() {
        this._routes = {
            speechToTextRouter
        };
    }

    init(app) {
        for (const route of Object.keys(this._routes)) {
            for (const config of Object.keys(route)) {
                app[config.verb](config.route, config.fn);
            }
        }
    }
}

export default RouterService;