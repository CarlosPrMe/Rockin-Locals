import { AbstractControl } from '@angular/forms';

export function customValidatorEmail(control: AbstractControl): { [key: string]: any } {
  let regEmail: any = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
  if (regEmail.test(control.value)) {
    return null;
  } else {
    return {
      emailCustom: true,
    }
  }
}
