/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { SocketManagerService } from '../../shared/services/socket-manager.service';
import { SpeechToTextService } from '../services/speech-to-text.service';
import { SpeechToTextSyncComponent } from './speech-to-text-sync.component';

describe('SpeechToTextSyncComponent', () => {
    let component: SpeechToTextSyncComponent;
    let fixture: ComponentFixture<SpeechToTextSyncComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SpeechToTextSyncComponent],
            imports: [FormsModule],
            providers: [
                SpeechToTextService,
                SocketManagerService
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpeechToTextSyncComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
