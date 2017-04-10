import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";
import {
    async,
    fakeAsync,
    ComponentFixture,
    TestBed,
    tick
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ng2-bootstrap';

import { SocketManagerService } from '../../shared/services/socket-manager.service';
import { LocalTunnelService } from '../../shared/services/local-tunnel.service';
import { SpeechToTextService } from '../services/speech-to-text.service';
import { SpeechToTextAsyncComponent } from './speech-to-text-async.component';

import { MockSpeechToTextService } from '../../shared/tests/mocks/mock-speech-to-text.service';
import { MockLocalTunnelService } from '../../shared/tests/mocks/mock-local-tunnel.service';
import * as fakeSttData from '../../shared/tests/fakeData/fakeSpeechToTextData';

describe('SpeechToTextAsyncComponent', () => {
    let buttons: DebugElement[];
    let component: SpeechToTextAsyncComponent;
    let fixture: ComponentFixture<SpeechToTextAsyncComponent>;
    const parameters = {
        userSecret: { show: false, value: null, types: ['registerCallback', 'createRecognitionJob'] },
        userToken: { show: false, value: null, types: ['createRecognitionJob'] },
        resultsTTL: { show: false, value: null, types: ['createRecognitionJob'] },
        jobIdToGet: { show: false, value: null, types: ['getJob'] },
        jobIdToDelete: { show: false, value: null, types: ['deleteJob'] },
        jobStatusEvents: { show: false, value: null, types: ['createRecognitionJob'] }
    };

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpeechToTextAsyncComponent],
            imports: [
                FormsModule,
                ModalModule.forRoot(),
            ],
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
        buttons = fixture.debugElement.queryAll(By.css('button'));
        fixture.detectChanges()
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

    it('should update parameters object on modal opening', async(() => {
        expect(component.parameters).toEqual(parameters);
        expect(component.isModalOpen).toEqual(undefined);

        const openModalButton = fixture.nativeElement.querySelector('#registerCallbackOpenModal');
        openModalButton.click();
        fixture.detectChanges();

        expect(component.parameters.userSecret.show).toEqual(true);
        expect(component.isModalOpen).toEqual(true);
    }));

    it('should turn to false isModalOpen on modal closing', async(() => {
        expect(component.isModalOpen).toEqual(undefined);

        const openModalButton = fixture.nativeElement.querySelector('#registerCallbackOpenModal');
        openModalButton.click();
        fixture.detectChanges();

        expect(component.isModalOpen).toEqual(true);

        const closeButton = fixture.nativeElement.querySelector('#closeModal');
        closeButton.click();
        fixture.detectChanges();

        expect(component.isModalOpen).toEqual(false);
    }));

    it('should allow to register a new callback url', fakeAsync(() => {
        component.registerCallback();
        tick();

        expect(component.sttRegisterCallbackResponse.originalData).toEqual(fakeSttData.fakeRegisterCallbackResponse);
        expect(component.sttRegisterCallbackResponse.data).toEqual(JSON.stringify(fakeSttData.fakeRegisterCallbackResponse, null, 4));
        expect(component.sttRegisterCallbackResponse.isLoading).toEqual(false);
    }));

    it('should allow to create a new registration job', fakeAsync(() => {
        component.createRecognitionJob();
        tick();

        expect(component.sttCreateRecognitionJobResponse.originalData).toEqual(fakeSttData.fakeCreateRecognitionJobResponse);
        expect(component.sttCreateRecognitionJobResponse.data).toEqual(JSON.stringify(fakeSttData.fakeCreateRecognitionJobResponse, null, 4));
        expect(component.sttCreateRecognitionJobResponse.isLoading).toEqual(false);
    }));

    it('should allow to get all jobs', fakeAsync(() => {
        component.getRecognitionJobs();
        tick();

        expect(component.sttGetRecognitionJobsResponse.originalData).toEqual(fakeSttData.fakeGetRecognitionJobsResponse);
        expect(component.sttGetRecognitionJobsResponse.data).toEqual(JSON.stringify(fakeSttData.fakeGetRecognitionJobsResponse, null, 4));
        expect(component.sttGetRecognitionJobsResponse.isLoading).toEqual(false);
    }));

    it('should allow to get a job', fakeAsync(() => {
        component.getRecognitionJob();
        tick();

        expect(component.sttGetRecognitionJobResponse.originalData).toEqual(fakeSttData.fakeGetRecognitionJobResponse);
        expect(component.sttGetRecognitionJobResponse.data).toEqual(JSON.stringify(fakeSttData.fakeGetRecognitionJobResponse, null, 4));
        expect(component.sttGetRecognitionJobResponse.isLoading).toEqual(false);
    }));

    it('should allow to delete a job', fakeAsync(() => {
        component.deleteRecognitionJob();
        tick();

        expect(component.sttDeleteRecognitionJobResponse.originalData).toEqual(fakeSttData.fakeDeleteRecognitionJobResponse);
        expect(component.sttDeleteRecognitionJobResponse.data).toEqual(JSON.stringify(fakeSttData.fakeDeleteRecognitionJobResponse, null, 4));
        expect(component.sttDeleteRecognitionJobResponse.isLoading).toEqual(false);
    }));
});
