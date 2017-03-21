import { Component, OnInit } from '@angular/core';

import { STTResponse } from '../interfaces/responses';

import { SpeechToTextService } from '../services/speech-to-text.service';

@Component({
    selector: 'app-speech-to-text-sync',
    templateUrl: 'speech-to-text-sync.component.html',
    styleUrls: ['speech-to-text-sync.component.scss']
})
export class SpeechToTextSyncComponent implements OnInit {
    public defaultResponse = 'Nothing to show for now';

    public sttRecognizeResponse: STTResponse = {};

    constructor(private speechToTextService: SpeechToTextService) {
    }

    ngOnInit() {
    }

    public recognize(): void {
        this.sttRecognizeResponse.isLoading = true;
        this.speechToTextService.recognize().subscribe((res) => {
            this.sttRecognizeResponse.isLoading = false;
            this.sttRecognizeResponse.originalData = res.err || res.data;
            this.sttRecognizeResponse.data = JSON.stringify((res.err || res.data), null, 4);
        });
    }
}
