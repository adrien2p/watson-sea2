'use strict';

import crypto from 'crypto';

class SpeechToTextService {
    constructor() {
        this._userSecret = '';
    }

    /**
     * Return the user_secret set.
     *
     * @returns {string}
     */
    get userSecret() {
        return this._userSecret;
    }

    /**
     * Allow to set a new user_secret.
     *
     * @param {string} value
     */
    set userSecret(value) {
        this._userSecret = value;
    }

    /**
     * Return the computed user_secret.
     */
    get computedUserSecret() {
        return crypto.createHmac('sha1', this._userSecret);
    }
}

const speechToTextService = new SpeechToTextService();
export default speechToTextService;
