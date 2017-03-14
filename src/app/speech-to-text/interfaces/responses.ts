export interface NotifyResponse {
    originalData?: {[key: string]: any};
    data?: string;
}

export interface STTResponse {
    originalData?: {[key: string]: any};
    isLoading?: boolean;
    data?: string;
}

export interface LocalTunnelResponse {
    isLoading?: boolean;
    ready?: boolean;
    url?: string;
}
