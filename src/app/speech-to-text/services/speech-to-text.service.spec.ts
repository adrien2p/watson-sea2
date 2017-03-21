import { TestBed, inject } from '@angular/core/testing';

import { SocketManagerService } from '../../shared/services/socket-manager.service';
import { SpeechToTextService } from './speech-to-text.service';

import { MockSocketManagerService } from '../../shared/tests/mocks/mock-socket-manager.service';
import {Observable} from "rxjs";

describe('SpeechToTextService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SpeechToTextService,
                SocketManagerService
            ]
        }).overrideComponent(SpeechToTextService, {
            set: {
                providers: [
                    { provide: SocketManagerService, useClass: MockSocketManagerService }
                ]
            }
        });
    });

    it('should create', inject([SpeechToTextService], (service: SpeechToTextService) => {
        expect(service).toBeTruthy();
    }));

    it('should return an observable with the config result', inject([SpeechToTextService], (service: SpeechToTextService) => {
        const res = service.getConfig();

        expect(typeof res.subscribe).toBe('function');
        res.subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeConfigResponse);
        });
    }));

    it('should return an observable with the register callback result', inject([SpeechToTextService], (service: SpeechToTextService) => {
        const res = service.registerCallback();

        expect(typeof res.subscribe).toBe('function');
        res.subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeRegisterCallbackResponse);
        });
    }));

    it('should return an observable create recognition result', inject([SpeechToTextService], (service: SpeechToTextService) => {
        const res = service.createRecognitionJob();

        expect(typeof res.subscribe).toBe('function');
        res.subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeCreateRecognitionJobResponse);
        });
    }));

    it('should return an observable with recognition jobs result', inject([SpeechToTextService], (service: SpeechToTextService) => {
        const res = service.getRecognitionJobs();

        expect(typeof res.subscribe).toBe('function');
        res.subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeGetRecognitionJobsResponse);
        });
    }));

    it('should return an observable with the recognition job result', inject([SpeechToTextService], (service: SpeechToTextService) => {
        const res = service.getRecognitionJob({ id: '4bd734c0-e575-21f3-de03-f932aa0468a0' });

        expect(typeof res.subscribe).toBe('function');
        res.subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeGetRecognitionJobResponse);
        });
    }));

    it('should return an observable with the delete recognition job result', inject([SpeechToTextService], (service: SpeechToTextService) => {
        const res = service.deleteRecognitionJob({ id: '4bd734c0-e575-21f3-de03-f932aa0468a0' });

        expect(typeof res.subscribe).toBe('function');
        res.subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeDeleteRecognitionJobResponse);
        });
    }));
});
