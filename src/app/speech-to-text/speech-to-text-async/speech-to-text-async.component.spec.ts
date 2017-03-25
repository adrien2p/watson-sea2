import {
    async,
    fakeAsync,
    ComponentFixture,
    TestBed, tick
} from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { SocketManagerService } from '../../shared/services/socket-manager.service';
import { LocalTunnelService } from '../../shared/services/local-tunnel.service';
import { SpeechToTextService } from '../services/speech-to-text.service';
import { SpeechToTextAsyncComponent } from './speech-to-text-async.component';

import { MockSpeechToTextService } from '../../shared/tests/mocks/mock-speech-to-text.service';
import { MockLocalTunnelService } from '../../shared/tests/mocks/mock-local-tunnel.service';

describe('SpeechToTextAsyncComponent', () => {
    let component: SpeechToTextAsyncComponent;
    let fixture: ComponentFixture<SpeechToTextAsyncComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpeechToTextAsyncComponent],
            imports: [FormsModule],
            providers: [
                SpeechToTextService,
                SocketManagerService,
                LocalTunnelService
            ]
        }).overrideComponent(SpeechToTextAsyncComponent, {
            set: {
                providers: [
                    { provide: SpeechToTextService, useClass: MockSpeechToTextService },
                    { provide: LocalTunnelService, useClass: MockLocalTunnelService }
                ]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpeechToTextAsyncComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('should start local tunnel', () => {
        it('and fill the localTunnelResponse member', fakeAsync(() => {
            component.localTunnelStart();
            tick();

            expect(component.localTunnelResponse.url).toEqual('https://localtunnel.me');
            expect(component.localTunnelResponse.ready).toEqual(true);
            expect(component.localTunnelResponse.isLoading).toEqual(false);
        }));
    });

    describe('should close local tunnel', () => {
        it('and reset the localTunnelResponse member', fakeAsync(() => {
            component.localTunnelStart();
            tick();
            component.localTunnelClose();
            tick();

            expect(component.localTunnelResponse.url).toEqual(null);
            expect(component.localTunnelResponse.ready).toEqual(false);
            expect(component.localTunnelResponse.isLoading).toEqual(false);
        }));
    });

    it('should allow to register a new callback url', fakeAsync(() => {
        component.registerCallback();
        fixture.detectChanges();

        expect(component.sttRegisterCallbackResponse.originalData).toEqual(MockSpeechToTextService.fakeRegisterCallbackResponse);
        expect(component.sttRegisterCallbackResponse.data).toEqual(JSON.stringify(MockSpeechToTextService.fakeRegisterCallbackResponse, null, 4));
        expect(component.sttRegisterCallbackResponse.isLoading).toEqual(false);
    }));

    it('should allow to create a new registration job', fakeAsync(() => {
        component.createRecognitionJob();
        fixture.detectChanges();

        expect(component.sttCreateRecognitionJobResponse.originalData).toEqual(MockSpeechToTextService.fakeCreateRecognitionJobResponse);
        expect(component.sttCreateRecognitionJobResponse.data).toEqual(JSON.stringify(MockSpeechToTextService.fakeCreateRecognitionJobResponse, null, 4));
        expect(component.sttCreateRecognitionJobResponse.isLoading).toEqual(false);
    }));

    it('should allow to get all jobs', fakeAsync(() => {
        component.getRecognitionJobs();
        fixture.detectChanges();

        expect(component.sttGetRecognitionJobsResponse.originalData).toEqual(MockSpeechToTextService.fakeGetRecognitionJobsResponse);
        expect(component.sttGetRecognitionJobsResponse.data).toEqual(JSON.stringify(MockSpeechToTextService.fakeGetRecognitionJobsResponse, null, 4));
        expect(component.sttGetRecognitionJobsResponse.isLoading).toEqual(false);
    }));

    it('should allow to get a job', fakeAsync(() => {
        component.getRecognitionJob();
        fixture.detectChanges();

        expect(component.sttGetRecognitionJobResponse.originalData).toEqual(MockSpeechToTextService.fakeGetRecognitionJobResponse);
        expect(component.sttGetRecognitionJobResponse.data).toEqual(JSON.stringify(MockSpeechToTextService.fakeGetRecognitionJobResponse, null, 4));
        expect(component.sttGetRecognitionJobResponse.isLoading).toEqual(false);
    }));

    it('should allow to delete a job', fakeAsync(() => {
        component.deleteRecognitionJob();
        fixture.detectChanges();

        expect(component.sttDeleteRecognitionJobResponse.originalData).toEqual(MockSpeechToTextService.fakeDeleteRecognitionJobResponse);
        expect(component.sttDeleteRecognitionJobResponse.data).toEqual(JSON.stringify(MockSpeechToTextService.fakeDeleteRecognitionJobResponse, null, 4));
        expect(component.sttDeleteRecognitionJobResponse.isLoading).toEqual(false);
    }));
});
