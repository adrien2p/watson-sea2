import { TestBed, inject } from '@angular/core/testing';

import { LocalTunnelService } from './local-tunnel.service';
import { SocketManagerService } from './socket-manager.service';

describe('LocalTunnelService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                LocalTunnelService,
                SocketManagerService
            ]
        });
    });

    it('should ...', inject([LocalTunnelService], (service: LocalTunnelService) => {
        expect(service).toBeTruthy();
    }));
});
