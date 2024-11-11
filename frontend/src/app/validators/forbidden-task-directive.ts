import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenTaskValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const exp = RegExp("^[a-zA-Z0-9]{4,}$");
    //console.log(exp.test(control.value))

    //console.log(control.value)
    const forbidden = (exp.test(control.value));

    return forbidden ? null : {forbiddenTask: {value: control.value}};
  };
}

@Directive({
  selector: '[appForbiddenName]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})

export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenName') forbiddenTask = '';

  
  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenTask ? forbiddenTaskValidator()(control)
                              : null;
  }
}