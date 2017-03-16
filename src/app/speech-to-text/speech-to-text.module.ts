import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { LocalTunnelService } from '../shared/services/local-tunnel.service';

import { SpeechToTextComponent } from './speech-to-text.component';
import { SpeechToTextAsyncComponent } from './speech-to-text-async/speech-to-text-async.component';
import { SpeechToTextSyncComponent } from './speech-to-text-sync/speech-to-text-sync.component';
import { SpeechToTextWsComponent } from './speech-to-text-ws/speech-to-text-ws.component';

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

@NgModule({
    declarations: [
        SpeechToTextComponent,
        SpeechToTextAsyncComponent,
        SpeechToTextSyncComponent,
        SpeechToTextWsComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes)
    ],
    exports: [
        SpeechToTextComponent,
        SpeechToTextAsyncComponent,
        SpeechToTextSyncComponent,
        SpeechToTextWsComponent
    ],
    providers: [LocalTunnelService],
})
export class SpeechToTextModule {
}
