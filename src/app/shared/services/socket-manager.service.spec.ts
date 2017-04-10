import { TestBed, fakeAsync } from '@angular/core/testing';

import { SocketManagerService } from './socket-manager.service';
import { MockServer } from '../../shared/tests/mocks/mock-server';

describe('SocketManagerService', () => {
    let service: SocketManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SocketManagerService]
        });

        service = TestBed.get(SocketManagerService);
        new MockServer().initSpy(spyOn, service);
    });

    it('should create', () => {
        expect(service).toBeTruthy();
    });

    it('should return server data on speechToTextConfig call', fakeAsync(() => {
        service.speechToTextConfig().subscribe(res => {
            expect(res).not.toBeNull();
            expect(typeof res).toEqual('object');
        });
    }));

    it('should return server data on speechToTextRegisterCallback call', fakeAsync(() => {
        service.speechToTextRegisterCallback({ user_secret: 'ThisIsMyUserSecret' }).subscribe(res => {
            expect(res).not.toBeNull();
            expect(typeof res).toEqual('object');
        });
    }));

    it('should return server data on speechToTextCreateRecognitionJob call', fakeAsync(() => {
        const params = {
            events: ['recognitions.started', 'recognitions.completed'],
            user_token: 'anUserTokenToRecognizeJob'
        };

        service.speechToTextCreateRecognitionJob(params).subscribe(res => {
            expect(res).not.toBeNull();
            expect(typeof res).toEqual('object');
        });
    }));

    it('should return server data on speechToTextNotifyJobStatus call', fakeAsync(() => {
        service.speechToTextNotifyJobStatus().subscribe(res => {
            expect(res).not.toBeNull();
            expect(typeof res).toEqual('object');
        });
    }));

    it('should return server data on speechToTextGetRecognitionJobs call', fakeAsync(() => {
        service.speechToTextGetRecognitionJobs().subscribe(res => {
            expect(res).not.toBeNull();
            expect(typeof res).toEqual('object');
        });
    }));

    it('should return server data on speechToTextGetRecognitionJob call', fakeAsync(() => {
        service.speechToTextGetRecognitionJob({ id: '4bd734c0-e575-21f3-de03-f932aa0468a0' }).subscribe(res => {
            expect(res).not.toBeNull();
            expect(typeof res).toEqual('object');
        });
    }));

    it('should return server data on speechToTextDeleteRecognitionJob call', fakeAsync(() => {
        service.speechToTextDeleteRecognitionJob({ id: '4bd734c0-e575-21f3-de03-f932aa0468a0' }).subscribe(res => {
            expect(res).not.toBeNull();
            expect(typeof res).toEqual('object');
        });
    }));

    it('should return server data on localTunnelStart call', fakeAsync(() => {
        service.localTunnelStart().subscribe(res => {
            expect(res).not.toBeNull();
            expect(typeof res).toEqual('object');
        });
    }));

    it('should return server data on localTunnelClose call', fakeAsync(() => {
        service.localTunnelClose().subscribe(res => {
            expect(res).toBeNull();
        });
    }));
});
