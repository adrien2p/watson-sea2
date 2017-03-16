import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MockSpeechToTextService {

    constructor() {
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    getConfig(): Observable<any> {
        return new Observable(observer => observer.next({
            data: {
                url: 'https://stream.watsonplatform.net/speech-to-text/api',
                username: '<usename>',
                password: '<password>',
                version: 'v1',
                silent: false
            }
        }));
    }
}
