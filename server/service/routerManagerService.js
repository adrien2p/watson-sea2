'use strict';

import SpeechToTextController from './../controller/speechToTextController';

class RouteManagerService {
    constructor() {}

    /**
     * Initialize router registering.
     *
     * @param app
     */
    init(app) {
        this._setupRouterSTT(app);
    }

    /***************************************************************************************************/
    /*                                       Speech to text                                            */
    /***************************************************************************************************/

    /**
     * Register new speech to text routes in the app to use with async callback methods.
     *
     * @param app
     * @private
     */
    _setupRouterSTT(app) {
        const speechToTextController = new SpeechToTextController();
        app.get('/stt-callback-results', speechToTextController.validateCallbackRegistering);
        app.get('/stt-callback-results-secure', speechToTextController.validateSecureCallbackRegistering);
        app.post('/stt-callback-results', speechToTextController.notifyJobComplete);
    }
}

const routeManagerService = new RouteManagerService();
export default routeManagerService;
