import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ModalModule } from 'ng2-bootstrap';

import { LocalTunnelService } from '../shared/services/local-tunnel.service';
import { SocketManagerService } from '../shared/services/socket-manager.service';
import { SpeechToTextService } from './services/speech-to-text.service';
import { SpeechToTextComponent } from './speech-to-text.component';
import { SpeechToTextAsyncComponent } from './speech-to-text-async/speech-to-text-async.component';
import { SpeechToTextSyncComponent } from './speech-to-text-sync/speech-to-text-sync.component';
import { SpeechToTextWsComponent } from './speech-to-text-ws/speech-to-text-ws.component';

import { MockSpeechToTextService } from '../shared/tests/mocks/mock-speech-to-text.service';
import * as fakeSttData from '../shared/tests/fakeData/fakeSpeechToTextData';

const routes: Routes = [
    { path: 'speech-to-text', component: SpeechToTextComponent,
        children: [
            { path: '', redirectTo: 'async', pathMatch: 'full' },
            { path: 'async', component: SpeechToTextAsyncComponent },
            { path: 'sync', component: SpeechToTextSyncComponent },
            { path: 'ws', component: SpeechToTextWsComponent }
        ]
    },
];

describe('SpeechToTextComponent', () => {
    let component: SpeechToTextComponent;
    let fixture: ComponentFixture<SpeechToTextComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                SpeechToTextComponent,
                SpeechToTextAsyncComponent,
                SpeechToTextSyncComponent,
                SpeechToTextWsComponent
            ],
            imports: [
                FormsModule,
                ModalModule.forRoot(),
                RouterModule.forRoot(routes)
            ],
            providers: [
                { provide: APP_BASE_HREF, useValue: '/' },
                SpeechToTextService,
                SocketManagerService,
                LocalTunnelService
            ]
        }).overrideComponent(SpeechToTextComponent, {
            set: {
                providers: [
                    { provide: SpeechToTextService, useClass: MockSpeechToTextService }
                ]
            }
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SpeechToTextComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load config on init', () => {
        component.ngOnInit();
        fixture.detectChanges();

        expect(component.config).toBe(JSON.stringify(fakeSttData.fakeConfigResponse, null, 4));
    });
});
