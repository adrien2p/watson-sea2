import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {SocketManagerService} from './socket-manager.service';

@Injectable()
export class LocalTunnelService {

    constructor(private socketManagerService: SocketManagerService) { }

    /**
     * Allow to start a new local tunnel, must only used in local mode.
     *
     * @returns {Observable<any>}
     */
    public start(): Observable<any> {
        return this.socketManagerService.localTunnelStart();
    }

    /**
     * Allow to close a local tunnel.
     *
     * @returns {Observable<any>}
     */
    public close(): Observable<any> {
        return this.socketManagerService.localTunnelClose();
    }
}
