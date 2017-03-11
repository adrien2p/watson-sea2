import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {SocketManagerService} from '../shared/service/socket-manager.service';

@Injectable()
export class SpeechToTextService {

    constructor(private socketManagerService: SocketManagerService) { }

    getConfig(): Observable<any> {
        return this.socketManagerService.speechToTextConfig();
    }

    registerCallback(data: {[key: string]: any}): Observable<any> {
        return this.socketManagerService.speechToTextRegisterCallback(data);
    }

    createRecognitionJob(): Observable<any> {
        return this.socketManagerService.speechToTextCreateRecognitionJob();
    }

    getRecognitionJobs(): Observable<any> {
        return this.socketManagerService.speechToTextGetRecognitionJobs();
    }

    getRecognitionJob(): Observable<any> {
        return this.socketManagerService.speechToTextGetRecognitionJob();
    }

    deleteRecognitionJob(): Observable<any> {
        return this.socketManagerService.speechToTextDeleteRecognitionJob();
    }
}
