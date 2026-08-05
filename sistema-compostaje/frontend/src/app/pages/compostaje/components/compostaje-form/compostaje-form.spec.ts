import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompostajeForm } from './compostaje-form';

describe('CompostajeForm', () => {
  let component: CompostajeForm;
  let fixture: ComponentFixture<CompostajeForm>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CompostajeForm] }).compileComponents();
    fixture = TestBed.createComponent(CompostajeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => { expect(component).toBeTruthy(); });
});
