import { TestBed } from '@angular/core/testing';

import { TanslationService } from './tanslation.service';

describe('TanslationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TanslationService = TestBed.get(TanslationService);
    expect(service).toBeTruthy();
  });
});
