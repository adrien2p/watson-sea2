export class MockServer<T> {
    private _calledRegistry = [];

    constructor() {
    }

    /**
     * Init spy to mock each called and received by the socket.
     *
     * @param {any} spyOn
     * @param {T} service
     */
    public initSpy(spyOn: any, service: T): void {
        spyOn(service['socket'], 'emit').and.callFake(name => {
            if (!this._calledRegistry.includes(name)) {
                const callbackEventName = name.split('-').map((word, i) => (i === 0 && 'res') || word).join('-');
                this._calledRegistry.push(name, callbackEventName);
                service['socket'].emit(callbackEventName);
            }
        });
        spyOn(service['socket'], 'on').and.callFake((name, fn) => fn({ data: { result: 'success' }}));
    }
}