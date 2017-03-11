import { TestBed, inject } from '@angular/core/testing';

import { LocalTunnelService } from './local-tunnel.service';

describe('LocalTunnelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalTunnelService]
    });
  });

  it('should ...', inject([LocalTunnelService], (service: LocalTunnelService) => {
    expect(service).toBeTruthy();
  }));
});
