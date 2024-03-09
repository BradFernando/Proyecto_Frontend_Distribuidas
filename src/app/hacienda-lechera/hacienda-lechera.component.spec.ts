import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HaciendaLecheraComponent } from './hacienda-lechera.component';

describe('HaciendaLecheraComponent', () => {
  let component: HaciendaLecheraComponent;
  let fixture: ComponentFixture<HaciendaLecheraComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HaciendaLecheraComponent]
    });
    fixture = TestBed.createComponent(HaciendaLecheraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
