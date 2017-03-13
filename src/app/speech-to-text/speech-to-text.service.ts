import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {SocketManagerService} from '../shared/service/socket-manager.service';

@Injectable()
export class SpeechToTextService {

    constructor(private socketManagerService: SocketManagerService) { }

    getConfig(): Observable<any> {
        return this.socketManagerService.speechToTextConfig();
    }

    registerCallback(params: {[key: string]: any}): Observable<any> {
        return this.socketManagerService.speechToTextRegisterCallback(params);
    }

    createRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return this.socketManagerService.speechToTextCreateRecognitionJob(params);
    }

    speechToTextNotifyJobStatus(): Observable<any> {
        return this.socketManagerService.speechToTextNotifyJobStatus();
    }

    getRecognitionJobs(): Observable<any> {
        return this.socketManagerService.speechToTextGetRecognitionJobs();
    }

    getRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return this.socketManagerService.speechToTextGetRecognitionJob(params);
    }

    deleteRecognitionJob(params: {[key: string]: any}): Observable<any> {
        return this.socketManagerService.speechToTextDeleteRecognitionJob(params);
    }
}
