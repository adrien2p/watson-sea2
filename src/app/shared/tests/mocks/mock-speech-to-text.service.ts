import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as fakeSttData from '../fakeData/fakeSpeechToTextData';

@Injectable()
export class MockSpeechToTextService {
    constructor() {
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public getConfig(): Observable<any> {
        return new Observable(observer => observer.next({
            data: fakeSttData.fakeConfigResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public registerCallback(params: {[key: string]: any}): Observable<any> {
        return new Observable(observer => observer.next({
            data: fakeSttData.fakeRegisterCallbackResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public createRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return new Observable(observer => observer.next({
            data: fakeSttData.fakeCreateRecognitionJobResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public notifyJobStatus(): Observable<any> {
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
    public getRecognitionJobs(): Observable<any> {
        return new Observable(observer => observer.next({
            data: fakeSttData.fakeGetRecognitionJobsResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public getRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return new Observable(observer => observer.next({
            data: fakeSttData.fakeGetRecognitionJobResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public deleteRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return new Observable(observer => observer.next({
            data: fakeSttData.fakeDeleteRecognitionJobResponse
        }));
    }
}
