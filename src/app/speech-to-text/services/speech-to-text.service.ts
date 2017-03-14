import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {SocketManagerService} from '../../shared/services/socket-manager.service';

@Injectable()
export class SpeechToTextService {

    constructor(private socketManagerService: SocketManagerService) { }

    /**
     * Get the speech to text configuration
     *
     * @returns {Observable<any>}
     */
    getConfig(): Observable<any> {
        return this.socketManagerService.speechToTextConfig();
    }

    /**
     * Registers a callback URL with the service for use with subsequent asynchronous recognition requests.
     *
     * @param {object} params parameters
     * @param {string} [user_secret] The token allows the user to maintain an internal mapping between jobs and notification events
     * @returns {Observable<any>}
     */
    registerCallback(params: {[key: string]: any}): Observable<any> {
        return this.socketManagerService.speechToTextRegisterCallback(params);
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
    createRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return this.socketManagerService.speechToTextCreateRecognitionJob(params);
    }

    /**
     * Receive notification about job.
     *
     * @returns {Observable<any>}
     */
    speechToTextNotifyJobStatus(): Observable<any> {
        return this.socketManagerService.speechToTextNotifyJobStatus();
    }

    /**
     * Returns the status and ID of all outstanding jobs associated with the service credentials with which it is called.
     *
     * @returns {Observable<any>}
     */
    getRecognitionJobs(): Observable<any> {
        return this.socketManagerService.speechToTextGetRecognitionJobs();
    }

    /**
     * Returns the status and ID of specific outstanding jobs associated with the service credentials with which it is called.
     *
     * @param {object} params parameters
     * @param {number} params.id job id
     * @returns {Observable<any>}
     */
    getRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return this.socketManagerService.speechToTextGetRecognitionJob(params);
    }

    /**
     * Delete specific job associated with the service credentials with which it is called.
     *
     * @param {object} params parameters
     * @param {number} params.id job id
     * @returns {Observable<any>}
     */
    deleteRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return this.socketManagerService.speechToTextDeleteRecognitionJob(params);
    }
}
