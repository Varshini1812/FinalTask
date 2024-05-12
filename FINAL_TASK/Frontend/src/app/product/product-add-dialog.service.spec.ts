import { TestBed } from '@angular/core/testing';

import { ProductAddDialogService } from './product-add-dialog.service';

describe('ProductAddDialogService', () => {
  let service: ProductAddDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAddDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
