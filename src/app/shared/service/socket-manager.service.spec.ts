import { TestBed, inject } from '@angular/core/testing';

import { SocketManagerService } from './socket-manager.service';

describe('SocketManagerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketManagerService]
    });
  });

  it('should ...', inject([SocketManagerService], (service: SocketManagerService) => {
    expect(service).toBeTruthy();
  }));
});
