import { TestBed } from '@angular/core/testing';

import { DispModalService } from './disp-modal.service';

describe('DispModalService', () => {
  let service: DispModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
