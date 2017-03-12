'use strict';


import { SpeechToTextV1 } from 'watson-developer-cloud';

import speechToTextConfig from './../config/speech-to-text';

import localTunnelService from './../service/localTunelService';
import speechToTextService from './../service/speechToTextService';

class SpeechToTextController {
    constructor(socket) {
        this._socket = socket || {};
        this._speechToText = new SpeechToTextV1(speechToTextConfig);
    }

    /**
     * Send back the speech to text configuration
     */
    getConfiguration() {
        this._socket.emit('res-stt-config', { data: speechToTextConfig });
    }

    /**
     * Allow to register new callback url.
     *
     * @param {object} data parameters
     * @param {string} [data.user_secret] user secret to secure callback url with it hash mac sha1
     */
    registerCallback(data) {
        data = data || {};

        const params = { callback_url: `${localTunnelService.url}/stt-callback-results`};
        if (data.user_secret) {
            params.user_secret = data.user_secret;
            params.callback_url = `${localTunnelService.url}/stt-callback-results-secure`;

            speechToTextService.userSecret = data.user_secret;
        }

        this._speechToText.registerCallback(params, (err, res) => this._socket.emit('res-stt-registerCallback', { err, data: res }));
    }

    createRecognitionJob() {
    }

    getRecognitionJobs() {
    }

    getRecognitionJob() {
    }

    deleteRecognitionJob() {
    }

    /**
     * Callback called (get) to validate a new callback url without user_secret parameter.
     */
    validateCallbackRegistering(req, res) {
        const challenge = req.query.challenge_string;
        const signature = req.headers['x-callback-signature'];

        console.log('Speech to Text async callback registration - challenge_string: %s', challenge);
        res.send(req.query.challenge_string)
    }

    /**
     * Callback called (get) to validate a new callback url with user_secret parameter.
     */
    validateSecureCallbackRegistering(req, res) {
        const challenge = req.query.challenge_string;

        const signature = req.headers['x-callback-signature'];
        if (!signature) throw new Error('Signature is missing');

        const content = req.method === 'POST' ? JSON.stringify(req.body) : req.query.challenge_string;
        if (!content) throw new Error('No content to validate signature on');

        console.log('Speech to Text secure async callback registration - challenge_string: %s', challenge);
        console.log('validating X-Callback-Signature: %s', signature);

        const hmac = speechToTextService.computedUserSecret;
        hmac.update(content);
        const expectedSignature = hmac.digest('base64');

        if (signature === expectedSignature) {
            res.send(challenge);
        }
    }

    notifyJobComplete(req, res) {

    }
}

export default SpeechToTextController;