import {Component, OnInit, OnDestroy} from '@angular/core';

import { STTResponse, LocalTunnelResponse, NotifyResponse } from '../interfaces/responses';

import { LocalTunnelService } from '../../shared/services/local-tunnel.service';
import { SpeechToTextService } from '../services/speech-to-text.service';

@Component({
    selector: 'app-speech-to-text-async',
    templateUrl: 'speech-to-text-async.component.html',
    styleUrls: ['speech-to-text-async.component.scss'],
    providers: [LocalTunnelService, SpeechToTextService]
})
export class SpeechToTextAsyncComponent implements OnInit, OnDestroy {
    public isModalOpen: boolean;
    public defaultResponse = 'Nothing to show for now';

    public sttNotifyJobStatusResponse: NotifyResponse = {};
    public sttRegisterCallbackResponse: STTResponse = {};
    public sttCreateRecognitionJobResponse: STTResponse = {};
    public sttGetRecognitionJobsResponse: STTResponse = {};
    public sttGetRecognitionJobResponse: STTResponse = {};
    public sttDeleteRecognitionJobResponse: STTResponse = {};
    public localTunnelResponse: LocalTunnelResponse = {};

    public parameters = {
        userSecret: { show: false, value: null, types: ['registerCallback', 'createRecognitionJob'] },
        userToken: { show: false, value: null, types: ['createRecognitionJob'] },
        resultsTTL: { show: false, value: null, types: ['createRecognitionJob'] },
        jobIdToGet: { show: false, value: null, types: ['getJob'] },
        jobIdToDelete: { show: false, value: null, types: ['deleteJob'] },
        jobStatusEvents: { show: false, value: null, types: ['createRecognitionJob'] }
    };

    public STATUS_EVENTS = [
        'recognitions.started',
        'recognitions.completed',
        'recognitions.failed',
        'recognitions.completed_with_results'
    ];

    constructor(private speechToTextService: SpeechToTextService,
                private localTunnelService: LocalTunnelService) {
    }

    ngOnInit() {
        this.speechToTextService.notifyJobStatus().subscribe((res) => {
            this.sttNotifyJobStatusResponse.originalData = res.err || res.data;
            this.sttNotifyJobStatusResponse.data = JSON.stringify((res.err || res.data), null, 4);
            this.sttCreateRecognitionJobResponse.data += '\n\nJob status notification :\n\n';
            this.sttCreateRecognitionJobResponse.data += this.sttNotifyJobStatusResponse.data;
        });
    }

    ngOnDestroy() {
        this.localTunnelClose();
    }

    /**
     * Open modal and manager to show the right parameters according to the target.
     *
     * @param {any} modal The modal to show
     * @param {string} target Show the right parameters in the modal
     */
    public openModal(modal, target) {
        this.isModalOpen = true;

        for (const key of Object.keys(this.parameters)) {
            if (this.parameters[key].types.includes(target)) {
                this.parameters[key].show = true;
            } else {
                this.parameters[key].show = false;
            }
        }

        modal.show();
    }

    /**
     * Close the modal.
     *
     * @param modal The modal to close
     */
    closeModal(modal) {
        this.isModalOpen = false;
        modal.hide();
    }

    /**
     * Allow to start a new local tunnel, must only used in local mode.
     */
    public localTunnelStart(): void {
        this.localTunnelResponse.isLoading = true;
        this.localTunnelService.start().subscribe(res => {
            if (!res.err) {
                this.localTunnelResponse.isLoading = false;
                this.localTunnelResponse.ready = true;
                this.localTunnelResponse.url = res.url;
            }
        });
    }

    /**
     * Allow to close a local tunnel.
     */
    public localTunnelClose(): void {
        if (this.localTunnelResponse.ready) {
            this.localTunnelService.close().subscribe(() => {
                this.localTunnelResponse.isLoading = false;
                this.localTunnelResponse.ready = false;
                this.localTunnelResponse.url = null;
            });
        }
    }

    /**
     * Register new callback url to receive notifications on job.
     */
    public registerCallback(): void {
        this.sttRegisterCallbackResponse.isLoading = true;
        this.speechToTextService.registerCallback({ user_secret: this.parameters.userSecret.value }).subscribe((res) => {
            this.sttRegisterCallbackResponse.isLoading = false;
            this.sttRegisterCallbackResponse.originalData = res.err || res.data;
            this.sttRegisterCallbackResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }

    /**
     * Create a new asynchronous recognition job.
     */
    public createRecognitionJob(): void {
        this.sttCreateRecognitionJobResponse.isLoading = true;

        const params = {
            events: this.parameters.jobStatusEvents.value || this.STATUS_EVENTS.join(','),
            user_token: this.parameters.userToken,
            results_ttl: this.parameters.resultsTTL
        };

        this.speechToTextService.createRecognitionJob(params).subscribe((res) => {
            this.sttCreateRecognitionJobResponse.isLoading = false;
            this.sttCreateRecognitionJobResponse.originalData = res.err || res.data;
            this.sttCreateRecognitionJobResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }

    /**
     * Get all asynchronous recognition jobs.
     */
    public getRecognitionJobs(): void {
        this.sttGetRecognitionJobsResponse.isLoading = true;
        this.speechToTextService.getRecognitionJobs().subscribe((res) => {
            this.sttGetRecognitionJobsResponse.isLoading = false;
            this.sttGetRecognitionJobsResponse.originalData = res.err || res.data;
            this.sttGetRecognitionJobsResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }

    /**
     * Get specific asynchronous recognition job.
     */
    public getRecognitionJob(): void {
        this.sttGetRecognitionJobResponse.isLoading = true;
        this.speechToTextService.getRecognitionJob({ id: this.parameters.jobIdToGet.value }).subscribe((res) => {
            this.sttGetRecognitionJobResponse.isLoading = false;
            this.sttGetRecognitionJobResponse.originalData = res.err || res.data;
            this.sttGetRecognitionJobResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }

    /**
     * Delete a specific asynchronous recognition job.
     */
    public deleteRecognitionJob(): void {
        this.sttDeleteRecognitionJobResponse.isLoading = true;
        this.speechToTextService.deleteRecognitionJob({ id: this.parameters.jobIdToDelete.value }).subscribe((res) => {
            this.sttDeleteRecognitionJobResponse.isLoading = false;
            this.sttDeleteRecognitionJobResponse.originalData = res.err || res.data;
            this.sttDeleteRecognitionJobResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }
}
