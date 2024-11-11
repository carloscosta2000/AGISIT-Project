import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenPasswordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const exp = RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$");
    const forbidden = (exp.test(control.value));
    return forbidden ? null : {forbiddenPassword: {value: control.value}};
  };
}

@Directive({
  selector: '[appForbiddenPassword]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})

export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenPassword') forbiddenPassword = '';

  
  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenPassword ? forbiddenPasswordValidator()(control)
                              : null;
  }
}



/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/