import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/** Rechaza fechas posteriores a la fecha local actual. */
export const futureDateValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const valor = control.value;
  if (!valor) return null;

  const fecha = valor instanceof Date ? new Date(valor) : crearFechaLocal(String(valor));
  if (Number.isNaN(fecha.getTime())) return { futureDate: true };

  fecha.setHours(0, 0, 0, 0);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);

  return fecha > hoy ? { futureDate: true } : null;
};

function crearFechaLocal(valor: string): Date {
  const coincidencia = /^(\d{4})-(\d{2})-(\d{2})$/.exec(valor);
  if (!coincidencia) return new Date('invalid');
  return new Date(Number(coincidencia[1]), Number(coincidencia[2]) - 1, Number(coincidencia[3]));
}
