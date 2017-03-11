'use strict';

import localTunnelService from './../service/localTunelService';

class LocalTunnelController {
    constructor(socket) {
        this._socket = socket;
    }

    start() {
        localTunnelService.start(this._socket);
    }

    close() {
        localTunnelService.close(this._socket);
    }
}

export default LocalTunnelController;