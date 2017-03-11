import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { SocketManagerService } from './shared/service/socket-manager.service';
import { LocalTunnelService } from './shared/service/local-tunnel.service';

import { AppComponent } from './app.component';
import { SpeechToTextComponent } from './speech-to-text/speech-to-text.component';

const appRoutes: Routes = [
    { path: 'speech-to-text', component: SpeechToTextComponent },
];

@NgModule({
    declarations: [
        AppComponent,
        SpeechToTextComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        SocketManagerService,
        LocalTunnelService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
