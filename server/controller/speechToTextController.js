'use strict';

import { SpeechToTextV1 } from 'watson-developer-cloud';
import speechToTextConfig from './../config/speech-to-text';

import localTunnelService from './../service/localTunelService';
import speechToTextService from './../service/speechToTextService';

class SpeechToTextController {
    constructor(socket) {
        this._socket = socket;
        this._speechToText = new SpeechToTextV1(speechToTextConfig);
    }

    getConfiguration() {
        this._socket.emit('res-stt-config', { data: speechToTextConfig });
    }

    registerCallback(data) {
        data = data || {};

        const params = { callback_url: `${localTunnelService.url}/stt-callback-results`, user_secret: '' };
        if (data.user_secret) {
            params.user_secret = data.user_secret;
            params.callback_url = `${localTunnelService.url}/stt-callback-results-secure`;

            speechToTextService.userSecret = data.user_secret;
        }

        this._speechToText.registerCallback(params, (err, res) => this._socket.emit('res-stt-registerCallback', { err, data: res }));
    }

    validateCallbackRegistering(req, res) {
        const challenge = req.query.challenge_string;
        const signature = req.headers['x-callback-signature'];

        console.log('Speech to Text async callback registration - challenge_string: %s', challenge);
        res.type('.txt') && res.send(req.query.challenge_string)
    }

    notifyJobComplete() {

    }

    createRecognitionJob() {
    }

    getRecognitionJobs() {
    }

    getRecognitionJob() {
    }

    deleteRecognitionJob() {
    }
}

export default SpeechToTextController;