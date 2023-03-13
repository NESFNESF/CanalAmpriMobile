import { TestBed } from '@angular/core/testing';

import { StorageDBService } from './storage-db.service';

describe('StorageDBService', () => {
  let service: StorageDBService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StorageDBService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
