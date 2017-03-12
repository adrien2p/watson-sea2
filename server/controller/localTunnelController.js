'use strict';

import localTunnelService from './../service/localTunelService';

class LocalTunnelController {
    constructor(socket) {
        this._socket = socket;
    }

    /**
     * Start a new local tunnel.
     */
    start() {
        localTunnelService.start(this._socket);
    }

    /**
     * Close local tunnel previously started.
     */
    close() {
        localTunnelService.close(this._socket);
    }
}

export default LocalTunnelController;