import { TestBed } from '@angular/core/testing';

import { TStoreService } from './t-store.service';

describe('TStoreService', () => {
  let service: TStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
