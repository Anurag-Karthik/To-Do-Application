import { TestBed } from '@angular/core/testing';

import { DelTaskService } from './del-task.service';

describe('DelTaskService', () => {
  let service: DelTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DelTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
