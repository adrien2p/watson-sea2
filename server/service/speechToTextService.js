'use strict';

import sha1 from 'js-sha1';

class SpeechToTextService {
    constructor() {
        this._userSecret = '';
    }

    get userSecret() {
        return this._userSecret;
    }

    set userSecret(value) {
        this._userSecret = value;
    }

    get userSecretSha1() {
        return sha1(this._userSecret);
    }
}

const speechToTextService = new SpeechToTextService();
export default speechToTextService;
