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

    /***************************************************************************************************/
    /*                                       Speech to text                                            */
    /***************************************************************************************************/

    speechToTextConfig(): Observable<any> {
        this.socket.emit('get-stt-config');

        return new Observable(observer => this.socket.on('res-stt-config', res => observer.next(res)));
    }

    speechToTextRegisterCallback(data: {[key: string]: any}): Observable<any> {
        this.socket.emit('post-stt-registerCallback', data);

        return new Observable(observer => this.socket.on('res-stt-registerCallback', res => observer.next(res)));
    }

    speechToTextCreateRecognitionJob(): Observable<any> {
        this.socket.emit('post-stt-createRecognitionJob');

        return new Observable(observer => this.socket.on('res-stt-createRecognitionJob', res => observer.next(res)));
    }

    speechToTextGetRecognitionJobs(): Observable<any> {
        this.socket.emit('post-stt-getRecognitionJobs');

        return new Observable(observer => this.socket.on('res-stt-getRecognitionJobs', res => observer.next(res)));
    }

    speechToTextGetRecognitionJob(): Observable<any> {
        this.socket.emit('post-stt-getRecognitionJob');

        return new Observable(observer => this.socket.on('res-stt-getRecognitionJob', res => observer.next(res)));
    }

    speechToTextDeleteRecognitionJob(): Observable<any> {
        this.socket.emit('post-stt-deleteRecognitionJob');

        return new Observable(observer => this.socket.on('res-stt-deleteRecognitionJob', res => observer.next(res)));
    }

    /***************************************************************************************************/
    /*                                       Local Tunnel                                              */
    /***************************************************************************************************/

    localTunnelStart(): Observable<any> {
        this.socket.emit('post-localTunnel-start');

        return new Observable(observer => this.socket.on('res-localTunnel-start', res => observer.next(res)));
    }

    localTunnelClose(): Observable<any> {
        this.socket.emit('post-localTunnel-close');

        return new Observable(observer => this.socket.on('res-localTunnel-close', () => observer.next(null)));
    }
}
