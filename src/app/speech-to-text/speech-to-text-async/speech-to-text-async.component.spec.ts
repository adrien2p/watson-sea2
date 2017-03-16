import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsModule } from '@angular/forms';
import { SocketManagerService } from '../../shared/services/socket-manager.service';
import { LocalTunnelService } from '../../shared/services/local-tunnel.service';
import { SpeechToTextService } from '../services/speech-to-text.service';
import { SpeechToTextAsyncComponent } from './speech-to-text-async.component';

describe('SpeechToTextAsyncComponent', () => {
    let component: SpeechToTextAsyncComponent;
    let fixture: ComponentFixture<SpeechToTextAsyncComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpeechToTextAsyncComponent],
            imports: [FormsModule],
            providers: [
                LocalTunnelService,
                SocketManagerService,
                SpeechToTextService
            ]
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
});
