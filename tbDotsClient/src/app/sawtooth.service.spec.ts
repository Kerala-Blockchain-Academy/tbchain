import { TestBed, inject } from '@angular/core/testing';

import { SawtoothService } from './sawtooth.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SawtoothService]
    });
  });

  it('should be created', inject([SawtoothService], (service: SawtoothService) => {
    expect(service).toBeTruthy();
  }));
});
