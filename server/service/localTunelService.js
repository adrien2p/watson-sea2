'use strict';

import localTunnel from 'localtunnel';
import globalConfig from './../config/global';

class LocalTunnelService {
    constructor() {
        this._localTunnel = localTunnel;
        this._url = '';
    }

    get url() {
        return this._url;
    }

    start(socket) {
        if (!this._url) {
            this._localTunnel(globalConfig.port, (err, tunnel) => {
                if (err) {
                    console.log(err);
                    socket.emit('res-localTunnel-start', { err });
                }

                this._url = tunnel.url;
                socket.emit('res-localTunnel-start', { url: this._url });
            });
        }
    }

    close(socket) {
        this._localTunnel.close && this._localTunnel.close();
        this._url = '';
        socket.emit('res-localTunnel-close');
    }
}

const localTunnelService = new LocalTunnelService();
export default localTunnelService;
