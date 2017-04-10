import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class SocketManagerService {
    private _socket: any = null;

    /**
     * Connect socket to the server side.
     */
    constructor() {
        this._socket = io();
    }

    get socket(): any {
        return this._socket;
    }

    /***************************************************************************************************/
    /*                                       Speech to text                                            */
    /***************************************************************************************************/

    /**
     * Get the speech to text configuration
     *
     * @returns {Observable<any>}
     */
    public speechToTextConfig(): Observable<any> {
        this._socket.emit('get-stt-config');

        return new Observable(observer => this._socket.on('res-stt-config', res => observer.next(res)));
    }

    /**
     * Registers a callback URL with the service for use with subsequent asynchronous recognition requests.
     *
     * @param {object} params parameters
     * @param {string} [user_secret] The token allows the user to maintain an internal mapping between jobs and notification events
     * @returns {Observable<any>}
     */
    public speechToTextRegisterCallback(params: {[key: string]: any}): Observable<any> {
        this._socket.emit('post-stt-registerCallback', params);

        return new Observable(observer => this._socket.on('res-stt-registerCallback', res => observer.next(res)));
    }

    /**
     * Creates a job for a new asynchronous recognition request.
     *
     * @param {object} params parameters
     * @param {string|Array<string>} [params.event] recognitions.started|recognitions.completed|recognitions.failed|recognitions.completed_with_results
     * @param {string} [params.user_secret] The token allows the user to maintain an internal mapping between jobs and notification events
     * @param {string} [params.result_ttl] time to alive of the job result
     * @returns {Observable<any>}
     */
    public speechToTextCreateRecognitionJob(params: {[key: string]: any}): Observable<any> {
        this._socket.emit('post-stt-createRecognitionJob', params);

        return new Observable(observer => this._socket.on('res-stt-createRecognitionJob', res => observer.next(res)));
    }

    /**
     * Receive notification about job.
     *
     * @returns {Observable<any>}
     */
    public speechToTextNotifyJobStatus(): Observable<any> {
        return new Observable(observer => this._socket.on('res-stt-notifyJobStatus', res => observer.next(res)));
    }

    /**
     * Returns the status and ID of all outstanding jobs associated with the service credentials with which it is called.
     *
     * @returns {Observable<any>}
     */
    public speechToTextGetRecognitionJobs(): Observable<any> {
        this._socket.emit('get-stt-getRecognitionJobs');

        return new Observable(observer => this._socket.on('res-stt-getRecognitionJobs', res => observer.next(res)));
    }

    /**
     * Returns the status and ID of specific outstanding jobs associated with the service credentials with which it is called.
     *
     * @param {object} params parameters
     * @param {number} params.id job id
     * @returns {Observable<any>}
     */
    public speechToTextGetRecognitionJob(params: {[key: string]: any}): Observable<any> {
        this._socket.emit('get-stt-getRecognitionJob', params);

        return new Observable(observer => this._socket.on('res-stt-getRecognitionJob', res => observer.next(res)));
    }

    /**
     * Delete specific job associated with the service credentials with which it is called.
     *
     * @param {object} params parameters
     * @param {number} params.id job id
     * @returns {Observable<any>}
     */
    public speechToTextDeleteRecognitionJob(params: {[key: string]: any}): Observable<any> {
        this._socket.emit('delete-stt-deleteRecognitionJob', params);

        return new Observable(observer => this._socket.on('res-stt-deleteRecognitionJob', res => observer.next(res)));
    }

    /***************************************************************************************************/
    /*                                       Local Tunnel                                              */
    /***************************************************************************************************/

    /**
     * Allow to start a new local tunnel, must only used in local mode.
     *
     * @returns {Observable<any>}
     */
    public localTunnelStart(): Observable<any> {
        this._socket.emit('post-localTunnel-start');

        return new Observable(observer => this._socket.on('res-localTunnel-start', res => observer.next(res)));
    }

    /**
     * Allow to close a local tunnel.
     *
     * @returns {Observable<any>}
     */
    public localTunnelClose(): Observable<any> {
        this._socket.emit('post-localTunnel-close');

        return new Observable(observer => this._socket.on('res-localTunnel-close', () => observer.next(null)));
    }
}
