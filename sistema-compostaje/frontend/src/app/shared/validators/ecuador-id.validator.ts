import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Valida una cédula ecuatoriana de persona natural de 10 dígitos. */
export const ecuadorIdValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const cedula = String(control.value ?? '').trim();

  if (!cedula) return null;
  if (!/^\d{10}$/.test(cedula)) return { ecuadorId: true };

  const provincia = Number(cedula.substring(0, 2));
  const tercerDigito = Number(cedula[2]);

  if (provincia < 1 || provincia > 24 || tercerDigito > 5) return { ecuadorId: true };

  const digitos = cedula.split('').map(Number);
  let suma = 0;

  for (let indice = 0; indice < 9; indice++) {
    let valor = digitos[indice];
    if (indice % 2 === 0) {
      valor *= 2;
      if (valor > 9) valor -= 9;
    }
    suma += valor;
  }

  return (10 - (suma % 10)) % 10 === digitos[9] ? null : { ecuadorId: true };
};
