import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenNumberValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = control.value <= 100 && control.value >= 0;
    return forbidden ? null : {forbiddenNumber: {value: control.value}};
  };
}

@Directive({
  selector: '[appForbiddenNumber]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})

export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenNumber') forbiddenNumber = '';

  
  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenNumber ? forbiddenNumberValidator()(control)
                              : null;
  }
}