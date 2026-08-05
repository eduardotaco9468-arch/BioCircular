import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RutaModal } from './ruta-modal';

describe('RutaModal', () => {
  let component: RutaModal;
  let fixture: ComponentFixture<RutaModal>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RutaModal] }).compileComponents();
    fixture = TestBed.createComponent(RutaModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => { expect(component).toBeTruthy(); });
});
