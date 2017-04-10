import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import * as fakeSttData from '../fakeData/fakeSpeechToTextData';

@Injectable()
export class MockSocketManagerService {
    constructor() {
    }

    /***************************************************************************************************/
    /*                                       Speech to text                                            */
    /***************************************************************************************************/

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public speechToTextConfig(): Observable<any> {
        return new Observable(observer => observer.next({
            data: fakeSttData.fakeConfigResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public speechToTextRegisterCallback(params: {[key: string]: any}): Observable<any> {
        return new Observable(observer => observer.next({
            data: fakeSttData.fakeRegisterCallbackResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public speechToTextCreateRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return new Observable(observer => observer.next({
            data: fakeSttData.fakeCreateRecognitionJobResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public speechToTextNotifyJobStatus(): Observable<any> {
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
    public speechToTextGetRecognitionJob(): Observable<any> {
        return new Observable(observer => observer.next({
            data: fakeSttData.fakeGetRecognitionJobResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public speechToTextGetRecognitionJobs(): Observable<any> {
        return new Observable(observer => observer.next({
            data: fakeSttData.fakeGetRecognitionJobsResponse
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public speechToTextDeleteRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return new Observable(observer => observer.next({
            data: fakeSttData.fakeDeleteRecognitionJobResponse
        }));
    }

    /***************************************************************************************************/
    /*                                       Local Tunnel                                              */
    /***************************************************************************************************/

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public localTunnelStart(): Observable<any> {
        return new Observable(observer => observer.next('https://localtunnel.me'));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    public localTunnelClose(): Observable<any> {
        return new Observable(observer => observer.next(null));
    }
}
