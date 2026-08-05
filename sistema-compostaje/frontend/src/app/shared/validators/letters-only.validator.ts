import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Permite letras Unicode, incluidas tildes, y espacios entre palabras. */
export const lettersOnlyValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const valor = String(control.value ?? '').trim();
  if (!valor) return null;
  return /^\p{L}+(?:\s+\p{L}+)*$/u.test(valor) ? null : { lettersOnly: true };
};
