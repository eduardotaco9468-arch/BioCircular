import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaRol } from './prueba-rol';

describe('PruebaRol', () => {
  let component: PruebaRol;
  let fixture: ComponentFixture<PruebaRol>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PruebaRol],
    }).compileComponents();

    fixture = TestBed.createComponent(PruebaRol);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
