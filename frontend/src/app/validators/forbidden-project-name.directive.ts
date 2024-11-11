import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenProjectNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const exp = RegExp("^[a-zA-Z0-9]{4,}$");
    const forbidden = (exp.test(control.value));
    return forbidden ? null : {forbiddenProjectName: {value: control.value}};
  };
}

@Directive({
  selector: '[appForbiddenProjectName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})

export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenProjectName') forbiddenProjectName = '';

  
  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenProjectName ? forbiddenProjectNameValidator()(control)
                              : null;
  }
}