import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompostajeComponent } from './compostaje';

describe('CompostajeComponent', () => {
  let component: CompostajeComponent;
  let fixture: ComponentFixture<CompostajeComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [CompostajeComponent] }).compileComponents();
    fixture = TestBed.createComponent(CompostajeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });
  it('should create', () => { expect(component).toBeTruthy(); });
});
