import {
    async,
    fakeAsync,
    ComponentFixture,
    TestBed
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
            fixture.detectChanges();

            expect(component.localTunnelResponse.url).toBe('https://localtunnel.me');
            expect(component.localTunnelResponse.ready).toBe(true);
            expect(component.localTunnelResponse.isLoading).toBe(false);
        }));
    });

    describe('should close local tunnel', () => {
        it('and reset the localTunnelResponse member', fakeAsync(() => {
            component.localTunnelStart();
            fixture.detectChanges();
            component.localTunnelClose();
            fixture.detectChanges();

            expect(component.localTunnelResponse.url).toBe(null);
            expect(component.localTunnelResponse.ready).toBe(false);
            expect(component.localTunnelResponse.isLoading).toBe(false);
        }));
    });

    it('should allow to register a new callback url', fakeAsync(() => {
        component.registerCallback();
        fixture.detectChanges();

        expect(component.sttRegisterCallbackResponse.originalData).toBe(MockSpeechToTextService.fakeRegisterCallbackResponse);
        expect(component.sttRegisterCallbackResponse.data).toBe(JSON.stringify(MockSpeechToTextService.fakeRegisterCallbackResponse, null, 4));
        expect(component.sttRegisterCallbackResponse.isLoading).toBe(false);
    }));

    it('should allow to create a new registration job', fakeAsync(() => {
        component.createRecognitionJob();
        fixture.detectChanges();

        expect(component.sttCreateRecognitionJobResponse.originalData).toBe(MockSpeechToTextService.fakeCreateRecognitionJobResponse);
        expect(component.sttCreateRecognitionJobResponse.data).toBe(JSON.stringify(MockSpeechToTextService.fakeCreateRecognitionJobResponse, null, 4));
        expect(component.sttCreateRecognitionJobResponse.isLoading).toBe(false);
    }));

    it('should allow to get all jobs', fakeAsync(() => {
        component.getRecognitionJobs();
        fixture.detectChanges();

        expect(component.sttGetRecognitionJobsResponse.originalData).toBe(MockSpeechToTextService.fakeGetRecognitionJobsResponse);
        expect(component.sttGetRecognitionJobsResponse.data).toBe(JSON.stringify(MockSpeechToTextService.fakeGetRecognitionJobsResponse, null, 4));
        expect(component.sttGetRecognitionJobsResponse.isLoading).toBe(false);
    }));

    it('should allow to get a job', fakeAsync(() => {
        component.getRecognitionJob();
        fixture.detectChanges();

        expect(component.sttGetRecognitionJobResponse.originalData).toBe(MockSpeechToTextService.fakeGetRecognitionJobResponse);
        expect(component.sttGetRecognitionJobResponse.data).toBe(JSON.stringify(MockSpeechToTextService.fakeGetRecognitionJobResponse, null, 4));
        expect(component.sttGetRecognitionJobResponse.isLoading).toBe(false);
    }));

    it('should allow to delete a job', fakeAsync(() => {
        component.deleteRecognitionJob();
        fixture.detectChanges();

        expect(component.sttDeleteRecognitionJobResponse.originalData).toBe(MockSpeechToTextService.fakeDeleteRecognitionJobResponse);
        expect(component.sttDeleteRecognitionJobResponse.data).toBe(JSON.stringify(MockSpeechToTextService.fakeDeleteRecognitionJobResponse, null, 4));
        expect(component.sttDeleteRecognitionJobResponse.isLoading).toBe(false);
    }));
});
