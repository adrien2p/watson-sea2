'use strict';

import fs from 'fs';
import mime from 'mime';
import path from 'path';

import { SpeechToTextV1 } from 'watson-developer-cloud';
import speechToTextConfig from './../config/speech-to-text';

import localTunnelService from './../service/localTunelService';
import speechToTextService from './../service/speechToTextService';

class SpeechToTextController {
    constructor(socket) {
        this._resourcesPath = '../../resources';

        this._socket = socket;
        this._speechToText = new SpeechToTextV1(speechToTextConfig);
        this._callbackUrl = '/stt-callback-results';
    }

    /**
     * Send back the speech to text configuration
     */
    getConfiguration() {
        this._socket.emit('res-stt-config', { data: speechToTextConfig });
    }

    /*************************************************************************************************************/
    /*                                        Asynchronous HTTP Interface                                        */
    /*************************************************************************************************************/

    /**
     * Registers a callback URL with the service for use with subsequent asynchronous recognition requests.
     *
     * @param {object} data parameters
     * @param {string} [data.user_secret] The token allows the user to maintain an internal mapping between jobs and notification events
     */
    registerCallback(data) {
        const params  = data || {};
        params.callback_url =  `${localTunnelService.url}${this._callbackUrl}`;

        if (data.user_secret) {
            speechToTextService.userSecret = data.user_secret;
            params.user_secret = speechToTextService.userSecret;
        }

        this._speechToText.registerCallback(params, (err, res) => {
            this._socket.emit('res-stt-registerCallback', { err, data: res });
        });
    }

    /**
     * Creates a job for a new asynchronous recognition request.
     *
     * @param {object} data parameters
     * @param {string} [data.event] recognitions.started|recognitions.completed|recognitions.failed|recognitions.completed_with_results
     * @param {string} [data.user_secret] The token allows the user to maintain an internal mapping between jobs and notification events
     * @param {string} [data.results_ttl] time to alive of the job result
     */
    createRecognitionJob(data) {
        const params = data || {};

        Object.assign(params, {
            audio: fs.createReadStream(path.resolve(__dirname, `${this._resourcesPath}/weather.ogg`)),
            content_type: mime.lookup('weather.ogg'),
            callback_url: `${localTunnelService.url}${this._callbackUrl}`
        });

        this._speechToText.createRecognitionJob(params, (err, res) => {
            this._socket.emit('res-stt-createRecognitionJob', { err, data: res })
        });
    }

    /**
     * Returns the status and ID of all outstanding jobs associated with the service credentials with which it is called.
     */
    getRecognitionJobs() {
        this._speechToText.getRecognitionJobs({}, (err, res) => {
            this._socket.emit('res-stt-getRecognitionJobs', { err, data: res });
        });
    }

    /**
     * Returns the status and ID of specific outstanding jobs associated with the service credentials with which it is called.
     *
     * @param {object} data parameters
     * @param {number} data.id job id
     */
    getRecognitionJob(data) {
        const params = data || {};

        this._speechToText.getRecognitionJob(params, (err, res) => {
            this._socket.emit('res-stt-getRecognitionJob', { err, data: res });
        });
    }

    /**
     * Delete specific job associated with the service credentials with which it is called.
     *
     * @param {object} data parameters
     * @param {number} data.id job id
     */
    deleteRecognitionJob(data) {
        const params = data || {};

        this._speechToText.deleteRecognitionJob(params, (err, res) => {
            this._socket.emit('res-stt-deleteRecognitionJob', { err, data: {
                id: params.id
            }});
        });
    }

    /**
     * Callback called to validate a new callback url.
     */
    validateCallbackRegistering(req, res) {
        const challenge = req.query.challenge_string;
        const signature = req.headers['x-callback-signature'];

        if (speechToTextService.userSecret) {
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

        } else {
            console.log('Speech to Text async callback registration - challenge_string: %s', challenge);
            res.send(req.query.challenge_string)
        }
    }

    /**
     * Receive notification about job status and redirect to the client.
     */
    notifyJobStatus(req, res) {
        req.io.emit('res-stt-notifyJobStatus', { data: req.body });
    }

    /*************************************************************************************************************/
    /*                                          REST HTTP Interface                                              */
    /*************************************************************************************************************/

    /**
     * Speech recognition for given audio using default model.
     *
     * @param {Object} data parameters
     * @param {Boolean} [data.continuous],
     * @param {Number} [data.max_alternatives],
     * @param {Boolean} [data.timestamps],
     * @param {Boolean} [data.word_confidence],
     * @param {Number} [data.inactivity_timeout],
     * @param {String} [data.model],
     * @param {Boolean} [data.interim_results],
     * @param {Boolean} [data.keywords],
     * @param {Number} [data.keywords_threshold],
     * @param {Number} [data.word_alternatives_threshold],
     * @param {Boolean} [data.profanity_filter],
     * @param {Boolean} [data.smart_formatting],
     * @param {String} [data.customization_id],
     * @param {Boolean} [data.speaker_labels]
     */
    recognize(data) {
        const params = data || {};

        Object.assign(params, {
            audio: fs.createReadStream(path.resolve(__dirname, `${this._resourcesPath}/weather.ogg`)),
            content_type: mime.lookup('weather.ogg')
        });

        this._speechToText.recognize(params, (err, res) => {
            this._socket.emit('res-stt-recognize', { err, data: res });
        });
    }
}

export default SpeechToTextController;