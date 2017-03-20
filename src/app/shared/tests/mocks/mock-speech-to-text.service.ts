import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MockSpeechToTextService {
    /**
     * Represent a mock of the config response.
     *
     * @type {{url: string; username: string; password: string; version: string; silent: boolean}}
     */
    public static fakeConfigResponse: Object = {
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
    public static fakeRegisterCallbackResponse: Object = {
        status: 'created',
        callback_url: 'https://localTunnel.me/results'
    };

    /**
     * Represent the creation job method response.
     *
     * @type {{created: string; id: string; url: string; status: string}}
     */
    public static fakeCreateRecognitionJobResponse: Object = {
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
    public static fakeGetRecognitionJobsResponse: Object = {
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
    public static fakeGetRecognitionJobResponse: Object = {
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
    public static fakeDeleteRecognitionJobResponse = {
        id: '4bd734c0-e575-21f3-de03-f932aa0468a0'
    };


    constructor() {
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    getConfig(): Observable<any> {
        return new Observable(observer => observer.next({
            data: MockSpeechToTextService.fakeConfigResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    registerCallback(params: {[key: string]: any}): Observable<any> {
        return new Observable(observer => observer.next({
            data: MockSpeechToTextService.fakeRegisterCallbackResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    createRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return new Observable(observer => observer.next({
            data: MockSpeechToTextService.fakeCreateRecognitionJobResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    notifyJobStatus(): Observable<any> {
        return new Observable(observer => observer.next({
            data: {
                id: '4bd734c0-e575-21f3-de03-f932aa0468a0',
                event: 'completed'
            }
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    getRecognitionJobs(): Observable<any> {
        return new Observable(observer => observer.next({
            data: MockSpeechToTextService.fakeGetRecognitionJobsResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    getRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return new Observable(observer => observer.next({
            data: MockSpeechToTextService.fakeGetRecognitionJobResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    deleteRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return new Observable(observer => observer.next({
            data: MockSpeechToTextService.fakeDeleteRecognitionJobResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    recognize(params: {[key: string]: any}): Observable<any> {
        return new Observable(observer => observer.next({}));
    }
}
