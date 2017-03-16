import { TestBed, inject } from '@angular/core/testing';

import { SocketManagerService } from '../../shared/services/socket-manager.service';
import { SpeechToTextService } from './speech-to-text.service';

describe('SpeechToTextService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                SpeechToTextService,
                SocketManagerService
            ]
        });
    });

    it('should ...', inject([SpeechToTextService], (service: SpeechToTextService) => {
        expect(service).toBeTruthy();
    }));
});
