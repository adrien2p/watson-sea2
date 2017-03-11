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
    public localTunnelUrl: string;
    public localTunnelIsStart: Boolean;

    public defaultResponse = 'Nothing to show for now';

    public sttRegisterCallbackResponse = { data: null, called: false };
    public sttCreateRecognitionJobResponse = { data: null, called: false };
    public sttGetRecognitionJobsResponse = { data: null, called: false };
    public sttGetRecognitionJobResponse = { data: null, called: false };
    public sttDeleteRecognitionJobResponse = { data: null, called: false };

    public userSecret: string;

    constructor(private speechToTextService: SpeechToTextService,
                private localTunnelService: LocalTunnelService) {
    }

    ngOnInit() {
        this.speechToTextService.getConfig().subscribe(res => {
            if (!res.err) {
                this.config = JSON.stringify(res.data, null, 4);
            }
        });
    }

    ngOnDestroy() {
        this.localTunnelClose();
    }

    /**
     * Allow to start a new local tunnel, must only used in local mode.
     */
    public localTunnelStart(): void {
        this.localTunnelService.start().subscribe(res => {
            if (!res.err) {
                this.localTunnelIsStart = true;
                this.localTunnelUrl = res.url;
            }
        });
    }

    /**
     * Allow to close an opened local tunnel.
     */
    public localTunnelClose(): void {
        this.localTunnelService.close().subscribe(() => {
            this.localTunnelIsStart = false;
            this.localTunnelUrl = '';
        });
    }

    /**
     * Allow to register a new callback url.
     * Can provide a user_secret parameter to pass through secure callback_url.
     */
    public registerCallback(): void {
        this.speechToTextService.registerCallback({ user_secret: this.userSecret }).subscribe((res) => {
            this.sttRegisterCallbackResponse.called = true;
            this.sttRegisterCallbackResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }

    /**
     * Allow to create a new revognition job.
     */
    public createRecognitionJob(): void {
        this.speechToTextService.createRecognitionJob().subscribe((res) => {
            this.sttCreateRecognitionJobResponse.called = true;
            this.sttCreateRecognitionJobResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }

    /**
     * Allow to get all revognition jobs previously created.
     */
    public getRecognitionJobs(): void {
        this.speechToTextService.getRecognitionJobs().subscribe((res) => {
            this.sttGetRecognitionJobsResponse.called = true;
            this.sttGetRecognitionJobsResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }

    /**
     *
     */
    public getRecognitionJob(): void {
        this.speechToTextService.getRecognitionJob().subscribe((res) => {
            this.sttGetRecognitionJobResponse.called = true;
            this.sttGetRecognitionJobResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }

    public deleteRecognitionJob(): void {
        this.speechToTextService.deleteRecognitionJob().subscribe((res) => {
            this.sttDeleteRecognitionJobResponse.called = true;
            this.sttDeleteRecognitionJobResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }
}
