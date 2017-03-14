import { Component, OnInit } from '@angular/core';

import { SpeechToTextService } from './services/speech-to-text.service';

@Component({
    selector: 'app-speech-to-text',
    templateUrl: './speech-to-text.component.html',
    styleUrls: ['./speech-to-text.component.scss'],
    providers: [SpeechToTextService]
})
export class SpeechToTextComponent implements OnInit {
    public config: string;

    constructor(private speechToTextService: SpeechToTextService) {
    }

    ngOnInit() {
        this.speechToTextService.getConfig().subscribe(res => {
            if (res.err) {
                return;
            }
            this.config = JSON.stringify(res.data, null, 4);
        });
    }
}
