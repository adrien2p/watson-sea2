/* tslint:disable:no-unused-variable */

import { before } from "selenium-webdriver/testing";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LocalTunnelService } from '../shared/services/local-tunnel.service';
import { SocketManagerService } from '../shared/services/socket-manager.service';
import { SpeechToTextService } from './services/speech-to-text.service';
import { SpeechToTextComponent } from './speech-to-text.component';
import { SpeechToTextAsyncComponent } from './speech-to-text-async/speech-to-text-async.component';
import { SpeechToTextSyncComponent } from './speech-to-text-sync/speech-to-text-sync.component';
import { SpeechToTextWsComponent } from './speech-to-text-ws/speech-to-text-ws.component';

import { MockSpeechToTextService } from '../shared/tests/mocks/mock-speech-to-text.service';

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
    const sttConfig = {
        url: 'https://stream.watsonplatform.net/speech-to-text/api',
        username: '<usename>',
        password: '<password>',
        version: 'v1',
        silent: false
    };

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

        expect(component.config).toBe(JSON.stringify(sttConfig, null, 4));
    });
});
