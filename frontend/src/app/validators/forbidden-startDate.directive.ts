import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenStartDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const inputDate: Date = new Date(control.value);
    const today: Date = new Date();
    today.setHours(0,0,0);

    let forbidden = true;

    if(inputDate <= today)
      forbidden = false;

    return forbidden ? null : {forbiddenStartDate: {date: control.value}};
  };
}

@Directive({
  selector: '[appForbiddenStartDate]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})

export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenStartDate') forbiddenStartDate = '';

  
  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenStartDate ? forbiddenStartDateValidator()(control)
                              : null;
  }
}