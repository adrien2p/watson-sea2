import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketManagerService {
    private socket: any = null;

    /**
     * Connect socket to the server side.
     */
    constructor() {
        this.socket = io();
    }

    /**
     * Update socket with another instance.
     *
     * @param {any} value
     */
    updateSocket(value) {
        this.socket.close();
        this.socket = value;
    }

    /***************************************************************************************************/
    /*                                       Speech to text                                            */
    /***************************************************************************************************/

    /**
     * Get the speech to text configuration
     *
     * @returns {Observable<any>}
     */
    speechToTextConfig(): Observable<any> {
        this.socket.emit('get-stt-config');

        return new Observable(observer => this.socket.on('res-stt-config', res => observer.next(res)));
    }

    /**
     * Registers a callback URL with the service for use with subsequent asynchronous recognition requests.
     *
     * @param {object} params parameters
     * @param {string} [user_secret] The token allows the user to maintain an internal mapping between jobs and notification events
     * @returns {Observable<any>}
     */
    speechToTextRegisterCallback(params: {[key: string]: any}): Observable<any> {
        this.socket.emit('post-stt-registerCallback', params);

        return new Observable(observer => this.socket.on('res-stt-registerCallback', res => observer.next(res)));
    }

    /**
     * Creates a job for a new asynchronous recognition request.
     *
     * @param {object} params parameters
     * @param {string} [params.event] recognitions.started|recognitions.completed|recognitions.failed|recognitions.completed_with_results
     * @param {string} [params.user_secret] The token allows the user to maintain an internal mapping between jobs and notification events
     * @param {string} [params.result_ttl] time to alive of the job result
     * @returns {Observable<any>}
     */
    speechToTextCreateRecognitionJob(params: {[key: string]: any}): Observable<any> {
        this.socket.emit('post-stt-createRecognitionJob', params);

        return new Observable(observer => this.socket.on('res-stt-createRecognitionJob', res => observer.next(res)));
    }

    /**
     * Receive notification about job.
     *
     * @returns {Observable<any>}
     */
    speechToTextNotifyJobStatus(): Observable<any> {
        return new Observable(observer => this.socket.on('res-stt-notifyJobStatus', res => observer.next(res)));
    }

    /**
     * Returns the status and ID of all outstanding jobs associated with the service credentials with which it is called.
     *
     * @returns {Observable<any>}
     */
    speechToTextGetRecognitionJobs(): Observable<any> {
        this.socket.emit('get-stt-getRecognitionJobs');

        return new Observable(observer => this.socket.on('res-stt-getRecognitionJobs', res => observer.next(res)));
    }

    /**
     * Returns the status and ID of specific outstanding jobs associated with the service credentials with which it is called.
     *
     * @param {object} params parameters
     * @param {number} params.id job id
     * @returns {Observable<any>}
     */
    speechToTextGetRecognitionJob(params: {[key: string]: any}): Observable<any> {
        this.socket.emit('get-stt-getRecognitionJob', params);

        return new Observable(observer => this.socket.on('res-stt-getRecognitionJob', res => observer.next(res)));
    }

    /**
     * Delete specific job associated with the service credentials with which it is called.
     *
     * @param {object} params parameters
     * @param {number} params.id job id
     * @returns {Observable<any>}
     */
    speechToTextDeleteRecognitionJob(params: {[key: string]: any}): Observable<any> {
        this.socket.emit('delete-stt-deleteRecognitionJob', params);

        return new Observable(observer => this.socket.on('res-stt-deleteRecognitionJob', res => observer.next(res)));
    }

    /***************************************************************************************************/
    /*                                       Local Tunnel                                              */
    /***************************************************************************************************/

    /**
     * Allow to start a new local tunnel, must only used in local mode.
     *
     * @returns {Observable<any>}
     */
    localTunnelStart(): Observable<any> {
        this.socket.emit('post-localTunnel-start');

        return new Observable(observer => this.socket.on('res-localTunnel-start', res => observer.next(res)));
    }

    /**
     * Allow to close a local tunnel.
     *
     * @returns {Observable<any>}
     */
    localTunnelClose(): Observable<any> {
        this.socket.emit('post-localTunnel-close');

        return new Observable(observer => this.socket.on('res-localTunnel-close', () => observer.next(null)));
    }
}
