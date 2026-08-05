import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Valida números telefónicos ecuatorianos nacionales de 10 dígitos. */
export const ecuadorPhoneValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const telefono = String(control.value ?? '').trim();
  if (!telefono) return null;
  return /^0\d{9}$/.test(telefono) ? null : { ecuadorPhone: true };
};
