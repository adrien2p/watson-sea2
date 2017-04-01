import {TestBed, fakeAsync, tick} from '@angular/core/testing';
import * as io from 'socket.io-client';

import { SocketManagerService } from './socket-manager.service';

describe('SocketManagerService', () => {
    let serverMock: any;
    let service: SocketManagerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SocketManagerService]
        });

        service = TestBed.get(SocketManagerService);
    });

    it('should ...', () => {
        expect(service).toBeTruthy();
    });

    /*it('should test', fakeAsync(() => {
        const socket = io();
        tick();

        socket.on('get-stt-config', () => {
            console.log('SOCKET ON .........');
            socket.emit('res-stt-config', { prop: 'toto' });
        });
        tick();

        service.speechToTextConfig().subscribe(res => {
            console.log(res);
        });
    }));*/
});
