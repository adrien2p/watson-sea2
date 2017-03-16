import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { SpeechToTextModule } from './speech-to-text/speech-to-text.module';

import { SocketManagerService } from './shared/services/socket-manager.service';

import { AppComponent } from './app.component';

const routes: Routes = [];

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(routes),
        SpeechToTextModule
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        SocketManagerService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
