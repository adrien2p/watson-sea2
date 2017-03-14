import { Component, OnInit, OnDestroy } from '@angular/core';

import { STTResponse, LocalTunnelResponse, NotifyResponse } from '../interfaces/responses';

import { LocalTunnelService } from '../../shared/services/local-tunnel.service';
import { SpeechToTextService } from '../services/speech-to-text.service';

@Component({
    selector: 'app-speech-to-text-async',
    templateUrl: './speech-to-text-async.component.html',
    styleUrls: ['./speech-to-text-async.component.scss'],
    providers: [LocalTunnelService, SpeechToTextService]
})
export class SpeechToTextAsyncComponent implements OnInit, OnDestroy {
    public defaultResponse = 'Nothing to show for now';

    public sttNotifyJobStatusResponse: NotifyResponse;
    public sttRegisterCallbackResponse: STTResponse;
    public sttCreateRecognitionJobResponse: STTResponse;
    public sttGetRecognitionJobsResponse: STTResponse;
    public sttGetRecognitionJobResponse: STTResponse;
    public sttDeleteRecognitionJobResponse: STTResponse;
    public localTunnelResponse : LocalTunnelResponse;

    public userSecret: string;
    public userToken: string;
    public resultsTTL: number;
    public jobIdToGet: number;
    public jobIdToDelete: number;
    public jobStatusEvent: string;

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
        this.speechToTextService.speechToTextNotifyJobStatus().subscribe((res) => {
            this.sttNotifyJobStatusResponse.originalData = res.err || res.data;
            this.sttNotifyJobStatusResponse.data = JSON.stringify((res.err || res.data), null, 4);
            this.sttCreateRecognitionJobResponse.data += '\n\nJob status notification :\n\n';
            this.sttCreateRecognitionJobResponse.data += this.sttNotifyJobStatusResponse.data
        });
    }

    ngOnDestroy() {
        this.localTunnelClose();
    }

    /**
     * Allow to start a new local tunnel, must only used in local mode.
     */
    public localTunnelStart(): void {
        this.localTunnelResponse.isLoading = true;
        this.localTunnelService.start().subscribe(res => {
            if (res.err) {
                return;
            }
            this.localTunnelResponse.isLoading = false;
            this.localTunnelResponse.ready = true;
            this.localTunnelResponse.url = res.url;
        });
    }

    /**
     * Allow to close a local tunnel.
     */
    public localTunnelClose(): void {
        this.localTunnelResponse.ready && this.localTunnelService.close().subscribe(() => {
            this.localTunnelResponse.ready = false;
            this.localTunnelResponse.url = null;
        });
    }

    /**
     * Register new callback url to receive notifications on job.
     */
    public registerCallback(): void {
        this.sttRegisterCallbackResponse.isLoading = true;
        this.speechToTextService.registerCallback({ user_secret: this.userSecret }).subscribe((res) => {
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
            event: this.jobStatusEvent || this.STATUS_EVENTS.join(','),
            user_token: this.userToken,
            results_ttl: this.resultsTTL
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
        this.speechToTextService.getRecognitionJob({ id: this.jobIdToGet }).subscribe((res) => {
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
        this.speechToTextService.deleteRecognitionJob({ id: this.jobIdToDelete }).subscribe((res) => {
            this.sttDeleteRecognitionJobResponse.isLoading = false;
            this.sttDeleteRecognitionJobResponse.originalData = res.err || res.data;
            this.sttDeleteRecognitionJobResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }
}
