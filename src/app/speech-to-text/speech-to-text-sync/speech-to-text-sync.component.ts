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
}
