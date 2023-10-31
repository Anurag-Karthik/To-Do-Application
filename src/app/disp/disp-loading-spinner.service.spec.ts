import { TestBed } from '@angular/core/testing';

import { DispLoadingSpinnerService } from './disp-loading-spinner.service';

describe('DispLoadingSpinnerService', () => {
  let service: DispLoadingSpinnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DispLoadingSpinnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
