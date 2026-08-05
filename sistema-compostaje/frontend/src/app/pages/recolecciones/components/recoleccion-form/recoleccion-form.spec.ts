import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoleccionForm } from './recoleccion-form';

describe('RecoleccionForm', () => {
  let component: RecoleccionForm;
  let fixture: ComponentFixture<RecoleccionForm>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RecoleccionForm] }).compileComponents();
    fixture = TestBed.createComponent(RecoleccionForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => { expect(component).toBeTruthy(); });
});
