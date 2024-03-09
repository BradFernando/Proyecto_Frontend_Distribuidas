import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LotesProductosComponent } from './lotes-productos.component';

describe('LotesProductosComponent', () => {
  let component: LotesProductosComponent;
  let fixture: ComponentFixture<LotesProductosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LotesProductosComponent]
    });
    fixture = TestBed.createComponent(LotesProductosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
