import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecoleccionModal } from './recoleccion-modal';

describe('RecoleccionModal', () => {
  let component: RecoleccionModal;
  let fixture: ComponentFixture<RecoleccionModal>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [RecoleccionModal] }).compileComponents();
    fixture = TestBed.createComponent(RecoleccionModal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => { expect(component).toBeTruthy(); });
});
