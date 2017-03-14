'use strict';

import localTunnel from 'localtunnel';
import globalConfig from './../config/global';

class LocalTunnelService {
    constructor() {
        this._localTunnel = null;
        this._url = '';
    }

    /**
     * Return generated url for the local tunnel.
     *
     * @returns {string} url
     */
    get url() {
        return this._url;
    }

    /**
     * Start a new local tunnel to expose yourself.
     *
     * @param {SocketIOClient.Socket} socket
     */
    start(socket) {
        if (!this._url) {
            localTunnel(globalConfig.port, (err, tunnel) => {
                if (err) throw new Error(err);

                this._localTunnel = tunnel;
                this._url = tunnel.url;
                socket.emit('res-localTunnel-start', { url: tunnel.url });
            });
        }
    }

    /**
     * Close the local tunnel previously started.
     *
     * @param {SocketIOClient.Socket} socket
     */
    close(socket) {
        this._url = '';
        this._localTunnel.close && this._localTunnel.close();
        socket.emit('res-localTunnel-close');
    }
}

const localTunnelService = new LocalTunnelService();
export default localTunnelService;
