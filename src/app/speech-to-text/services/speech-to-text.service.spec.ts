import {TestBed, fakeAsync} from '@angular/core/testing';

import { SocketManagerService } from '../../shared/services/socket-manager.service';
import { SpeechToTextService } from './speech-to-text.service';

import { MockSocketManagerService } from '../../shared/tests/mocks/mock-socket-manager.service';
import * as fakeSttData from '../../shared/tests/fakeData/fakeSpeechToTextData';

describe('SpeechToTextService', () => {
    let service: SpeechToTextService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SpeechToTextService,
                { provide: SocketManagerService, useClass: MockSocketManagerService }
            ]
        });

        service = TestBed.get(SpeechToTextService);
    });

    it('should create', () => {
        expect(service).toBeDefined();
    });

    it('should return an observable with the config result', fakeAsync(() => {
        service.getConfig().subscribe(res => {
            expect(res.data).toEqual(fakeSttData.fakeConfigResponse);
        });
    }));

    it('should return an observable with the register callback result', fakeAsync(() => {
        service.registerCallback().subscribe(res => {
            expect(res.data).toEqual(fakeSttData.fakeRegisterCallbackResponse);
        });
    }));

    it('should return an observable with the notify status result', fakeAsync(() => {
        service.notifyJobStatus().subscribe(res => {
            expect(res.data).toEqual({ id: '4bd734c0-e575-21f3-de03-f932aa0468a0', event: 'completed'});
        });
    }));

    it('should return an observable with the creation job result', fakeAsync(() => {
        service.createRecognitionJob().subscribe(res => {
            expect(res.data).toEqual(fakeSttData.fakeCreateRecognitionJobResponse);
        });
    }));

    it('should return an observable with the recognition jobs result', fakeAsync(() => {
        service.getRecognitionJobs().subscribe(res => {
            expect(res.data).toEqual(fakeSttData.fakeGetRecognitionJobsResponse);
        });
    }));

    it('should return an observable with the recognition job result', fakeAsync(() => {
        service.getRecognitionJob({ id: '4bd734c0-e575-21f3-de03-f932aa0468a0' }).subscribe(res => {
            expect(res.data).toEqual(fakeSttData.fakeGetRecognitionJobResponse);
        });
    }));

    it('should return an observable with the delete recognition job result', fakeAsync(() => {
        service.deleteRecognitionJob({ id: '4bd734c0-e575-21f3-de03-f932aa0468a0' }).subscribe(res => {
            expect(res.data).toEqual(fakeSttData.fakeDeleteRecognitionJobResponse);
        });
    }));
});
