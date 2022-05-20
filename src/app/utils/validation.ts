import { AbstractControl, ValidatorFn } from '@angular/forms';

export default class Validation {
  static match(controlName: string, checkControlName: string): ValidatorFn {
    return (controls: AbstractControl) => {
      const control = controls.get(controlName);
      const checkControl = controls.get(checkControlName);

      if (checkControl?.errors && !checkControl.errors['matching']) {
        return null;
      }

      if (control?.value !== checkControl?.value) {
        controls.get(checkControlName)?.setErrors({ matching: true });
        return { matching: true };
      } else {
        return null;
      }
    };
  }
  static fromToDate(
    fromDateField: string,
    toDateField: string,
    errorName: string = 'fromToDate'
  ): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
      const fromDate = formGroup.get(fromDateField)?.value;
      const toDate = formGroup.get(toDateField)?.value;
      console.log(fromDate, toDate);
      // Ausing the fromDate and toDate are numbers. In not convert them first after null check
      if (fromDate !== null && toDate !== null && fromDate > toDate) {
        formGroup.get(fromDateField)?.setErrors({ [errorName]: true });
        formGroup.get(toDateField)?.setErrors({ [errorName]: true });
        console.log(errorName)
        return { [errorName]: true };
      }
      return null;
    };
  }
}
