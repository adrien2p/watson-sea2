'use strict';

import fs from 'fs';
import path from 'path';
import mime from 'mime';

import { SpeechToTextV1 } from 'watson-developer-cloud';
import speechToTextConfig from './../config/speech-to-text';

import localTunnelService from './../service/localTunelService';
import speechToTextService from './../service/speechToTextService';

class SpeechToTextController {
    constructor(socket) {
        this._socket = socket;

        this._resourcesDir = __dirname + '/../../resources';
        this._speechToText = new SpeechToTextV1(speechToTextConfig);
        this._callbackUrl = '/stt-callback-results';
    }

    /**
     * Send back the speech to text configuration
     */
    getConfiguration() {
        this._socket.emit('res-stt-config', { data: speechToTextConfig });
    }

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
     * @param {string} [data.result_ttl] time to alive of the job result
     */
    createRecognitionJob(data) {
        const params = data || {};

        fs.readdir(this._resourcesDir, (err, files) => {
            let audioFilePath = '';
            let audioFile = '';
            files.forEach(file => {
                if (path.extname(file) === '.ogg' && !audioFilePath) {
                    audioFile = file;
                    audioFilePath = `${this._resourcesDir}/${file}`;
                }
            });

            Object.assign(params, {
                audio: fs.createReadStream(audioFilePath),
                content_type: mime.lookup(audioFile),
                callback_url: `${localTunnelService.url}${this._callbackUrl}`
            });

            this._speechToText.createRecognitionJob(params, (err, res) => {
                this._socket.emit('res-stt-createRecognitionJob', { err, data: res })
            });
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
     * delete specific job associated with the service credentials with which it is called.
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

    notifyJobStatus(req, res) {
        req.io.emit('res-stt-notifyJobStatus', { data: req.body });
    }
}

export default SpeechToTextController;