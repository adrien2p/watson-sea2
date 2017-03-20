import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MockLocalTunnelService {

    constructor() {
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    start(): Observable<any> {
        return new Observable(observer => observer.next({
            url: 'https://localtunnel.me'
        }));
    }

    /**
     * Mock method
     *
     * @returns {Observable<any>}
     */
    close(): Observable<any> {
        return new Observable(observer => observer.next({}));
    }
}
