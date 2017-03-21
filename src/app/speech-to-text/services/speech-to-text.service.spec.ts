import { TestBed, inject } from '@angular/core/testing';

import { SocketManagerService } from '../../shared/services/socket-manager.service';
import { SpeechToTextService } from './speech-to-text.service';

import { MockSocketManagerService } from '../../shared/tests/mocks/mock-socket-manager.service';

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
        service.getConfig().subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeConfigResponse);
        });
    }));

    it('should return an observable with the register callback result', inject([SpeechToTextService], (service: SpeechToTextService) => {
        service.registerCallback().subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeRegisterCallbackResponse);
        });
    }));

    it('should return an observable create recognition result', inject([SpeechToTextService], (service: SpeechToTextService) => {
        service.createRecognitionJob().subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeCreateRecognitionJobResponse);
        });
    }));

    it('should return an observable with recognition jobs result', inject([SpeechToTextService], (service: SpeechToTextService) => {
        service.getRecognitionJobs().subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeGetRecognitionJobsResponse);
        });
    }));

    it('should return an observable with the recognition job result', inject([SpeechToTextService], (service: SpeechToTextService) => {
        service.getRecognitionJob({ id: '4bd734c0-e575-21f3-de03-f932aa0468a0' }).subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeGetRecognitionJobResponse);
        });
    }));

    it('should return an observable with the delete recognition job result', inject([SpeechToTextService], (service: SpeechToTextService) => {
        service.deleteRecognitionJob({ id: '4bd734c0-e575-21f3-de03-f932aa0468a0' }).subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeDeleteRecognitionJobResponse);
        });
    }));

    it('should return an observable with the config result', inject([SpeechToTextService], (service: SpeechToTextService) => {
        service.getConfig().subscribe(res => {
            expect(res.data).toBe(MockSocketManagerService.fakeConfigResponse);
        });
    }));
});
