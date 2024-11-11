import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

/** A hero's name can't match the given regular expression */
export function forbiddenEndDateValidator(startDate :string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    console.log("startDate"+ startDate)
    console.log("startDate"+ startDate)

    const endDateObj: Date = new Date(control.value);
    const startDateObj: Date = new Date(startDate);

    console.log("startDate"+ startDateObj)
    console.log("endDate"+ endDateObj)

    let forbidden = false;

    if(endDateObj <= startDateObj)
      forbidden = true;

    return forbidden ? null : {forbiddenDate: {date: control.value}};
  };
}

@Directive({
  selector: '[appForbiddenEndDate]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})

export class ForbiddenValidatorDirective implements Validator {
  @Input('appForbiddenEndDate') forbiddenEndDate = '';

  
  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenEndDate ? forbiddenEndDateValidator("")(control)
                              : null;
  }
}