import { Component, OnInit, OnDestroy } from '@angular/core';

import { LocalTunnelService } from '../shared/service/local-tunnel.service';
import { SpeechToTextService } from './speech-to-text.service';

@Component({
    selector: 'app-speech-to-text',
    templateUrl: './speech-to-text.component.html',
    styleUrls: ['./speech-to-text.component.scss'],
    providers: [LocalTunnelService, SpeechToTextService]
})
export class SpeechToTextComponent implements OnInit, OnDestroy {
    public config: string;

    public defaultResponse = 'Nothing to show for now';

    public sttNotifyJobStatusResponse = { data: null };
    public sttRegisterCallbackResponse = { data: null, isLoading: false };
    public sttCreateRecognitionJobResponse = { data: null, isLoading: false };
    public sttGetRecognitionJobsResponse = { data: null, isLoading: false };
    public sttGetRecognitionJobResponse = { data: null, isLoading: false };
    public sttDeleteRecognitionJobResponse = { data: null, isLoading: false };
    public localTunnelResponse = { ready: false, isLoading: false, url: null };

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
        this.speechToTextService.getConfig().subscribe(res => {
            if (res.err) return;
            this.config = JSON.stringify(res.data, null, 4);
        });

        this.speechToTextService.speechToTextNotifyJobStatus().subscribe((res) => {
            this.sttNotifyJobStatusResponse.data = JSON.stringify((res.err || res.data), null, 4);
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
            if (res.err) return;
            this.localTunnelResponse.isLoading = false;
            this.localTunnelResponse.ready = true;
            this.localTunnelResponse.url = res.url;
        });
    }

    /**
     * Allow to close a local tunnel.
     */
    public localTunnelClose(): void {
        this.localTunnelService.close().subscribe(() => {
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
            this.sttRegisterCallbackResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }

    /**
     * Create a new asynchronous recognition job.
     */
    public createRecognitionJob(): void {
        this.sttCreateRecognitionJobResponse.isLoading = true;

        const params = {
            event: this.jobStatusEvent,
            user_token: this.userToken,
            results_ttl: this.resultsTTL
        };

        this.speechToTextService.createRecognitionJob(params).subscribe((res) => {
            this.sttCreateRecognitionJobResponse.isLoading = false;
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
            this.sttDeleteRecognitionJobResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }
}
