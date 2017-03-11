'use strict';

const routes = {
    validateCallbackRegistering: {
        verb: 'get',
        route: '/stt-callback-results',
        fn: 'speechToTextController.validateCallbackRegistering'
    },
    validateSecureCallbackRegistering: {
        verb: 'get',
        route: '/stt-callback-results-secure',
        fn: ''
    },
    notifyJobComplete: {
        verb: 'post',
        route: '/stt-callback-results-notify',
        fn: ''
    }
};

export default routes;