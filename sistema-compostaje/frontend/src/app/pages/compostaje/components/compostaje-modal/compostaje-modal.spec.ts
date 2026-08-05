import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompostajeModal } from './compostaje-modal';

describe('CompostajeModal', () => {
  let component: CompostajeModal;
  let fixture: ComponentFixture<CompostajeModal>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CompostajeModal] }).compileComponents();
    fixture = TestBed.createComponent(CompostajeModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => { expect(component).toBeTruthy(); });
});
