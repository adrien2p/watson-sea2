/**
 * Represent config method response.
 *
 * @type {{url: string; username: string; password: string; version: string; silent: boolean}}
 */
export const fakeConfigResponse: Object = {
    url: 'https://stream.watsonplatform.net/speech-to-text/api',
    username: 'MyUserName',
    password: 'MyPassword',
    version: 'v1',
    silent: false
};

/**
 * Represent the registerCallback method response.
 *
 * @type {{status: string; callback_url: string}}
 */
export const fakeRegisterCallbackResponse: Object = {
    status: 'created',
    callback_url: 'https://localTunnel.me/results'
};

/**
 * Represent the creation job method response.
 *
 * @type {{created: string; id: string; url: string; status: string}}
 */
export const fakeCreateRecognitionJobResponse: Object = {
    created: '2016-08-17T19:15:17.926Z',
    id: '4bd734c0-e575-21f3-de03-f932aa0468a0',
    url: 'https://stream.watsonplatform.net/speech-to-text/api/v1/recognitions/4bd734c0-e575-21f3-de03-f932aa0468a0',
    status: 'waiting'
};

/**
 * Represent the recognition jobs list response.
 *
 * @type {{recognitions: [{id: string; created: string; updated: string; status: string; user_token: string}]}}
 */
export const fakeGetRecognitionJobsResponse: Object = {
    recognitions: [{
        id: '4bd734c0-e575-21f3-de03-f932aa0468a0',
        created: '2016-08-17T19:15:17.926Z',
        updated: '2016-08-17T19:15:17.926Z',
        status: 'waiting',
        user_token: 'job25'
    }, {
        id: '4bb1dca0-f6b1-11e5-80bc-71fb7b058b20',
        created: '2016-08-17T19:13:23.622Z',
        updated: '2016-08-17T19:13:24.434Z',
        status: 'processing'
    }, {
        id: '398fcd80-330a-22ba-93ce-1a73f454dd98',
        created: '2016-08-17T19:11:04.298Z',
        updated: '2016-08-17T19:11:16.003Z',
        status: 'completed'
    }]
};

/**
 * Represent the recognition job response.
 *
 * @type {{id: string; created: string; updated: string; status: string; user_token: string}}
 */
export const fakeGetRecognitionJobResponse: Object = {
    id: '4bd734c0-e575-21f3-de03-f932aa0468a0',
    created: '2016-08-17T19:15:17.926Z',
    updated: '2016-08-17T19:15:17.926Z',
    status: 'waiting',
    user_token: 'job25'
};

/**
 * Represent the deletion of a recognition job response.
 *
 * @type {{id: string}}
 */
export const fakeDeleteRecognitionJobResponse = {
    id: '4bd734c0-e575-21f3-de03-f932aa0468a0'
};