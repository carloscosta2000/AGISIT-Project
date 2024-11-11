import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenAcronymValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const exp = RegExp("^[a-zA-Z0-9]{3}$");
    const forbidden = (exp.test(control.value));
    return forbidden ? null : {forbiddenAcronym: {value: control.value}};
  };
}

@Directive({
  selector: '[appForbiddenAcronym]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})

export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenAcronym') forbiddenAcronym = '';

  
  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenAcronym ? forbiddenAcronymValidator()(control)
                              : null;
  }
}