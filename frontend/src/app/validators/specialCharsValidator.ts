import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function specialCharsValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const exp = RegExp("^[A-Za-z0-9 ]+$");
    const forbidden = (exp.test(control.value));
    return forbidden ? null : {specialChars: {value: control.value}};
  };
}

@Directive({
  selector: '[appspecialChars]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})

export class ForbiddenValidatorDirective implements Validator {
  @Input('appspecialChars') specialChars = '';

  
  validate(control: AbstractControl): ValidationErrors | null {
    return this.specialChars ? specialCharsValidator()(control)
                              : null;
  }
}