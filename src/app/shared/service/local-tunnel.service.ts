import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import {SocketManagerService} from './socket-manager.service';

@Injectable()
export class LocalTunnelService {

    constructor(private socketManagerService: SocketManagerService) { }

    start(): Observable<any> {
        return this.socketManagerService.localTunnelStart();
    }

    close(): Observable<any> {
        return this.socketManagerService.localTunnelClose();
    }
}
