import { TestBed, inject, fakeAsync } from '@angular/core/testing';

import { LocalTunnelService } from './local-tunnel.service';
import { SocketManagerService } from './socket-manager.service';

import { MockSocketManagerService } from '../tests/mocks/mock-socket-manager.service';

describe('LocalTunnelService', () => {
    let service: LocalTunnelService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LocalTunnelService,
                { provide: SocketManagerService, useClass: MockSocketManagerService }
            ]
        });

        service = TestBed.get(LocalTunnelService);
    });

    it('should exist', inject([LocalTunnelService], (service: LocalTunnelService) => {
        expect(service).toBeTruthy();
    }));

    it('should return an observable with the url on start', fakeAsync(() => {
        service.start().subscribe(res => {
            expect(res).toEqual('https://localtunnel.me');
        });
    }));

    it('should return an observable with null on close', fakeAsync(() => {
        service.close().subscribe(res => {
            expect(res).toEqual(null);
        });
    }));
});
