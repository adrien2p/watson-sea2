import {TestBed, fakeAsync} from '@angular/core/testing';

import { SocketManagerService } from './socket-manager.service';

describe('SocketManagerService', () => {
    let SocketIoMock: any;
    let mockSocketIo: any;
    let service: SocketManagerService;

    beforeEach(() => {
        SocketIoMock = require('socket-io-mock');
        mockSocketIo = new SocketIoMock();

        TestBed.configureTestingModule({
            providers: [SocketManagerService]
        });

        service = TestBed.get(SocketManagerService);
        service.updateSocket(mockSocketIo);
    });

    it('should ...', () => {
        expect(service).toBeTruthy();
    });

    /*it('should test', fakeAsync(() => {
        mockSocketIo.on('get-stt-config', () => {
            console.log('SOCKET ON .........');
            mockSocketIo.emit('res-stt-config', { prop: 'toto' });
        });
        service.speechToTextConfig().subscribe(res => {
            console.log(res);
        });
    }));*/
});
