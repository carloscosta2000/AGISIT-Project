import { Directive, forwardRef, Injectable } from '@angular/core';
import {
  AsyncValidator,
  AbstractControl,
  NG_ASYNC_VALIDATORS,
  ValidationErrors
} from '@angular/forms';
import { catchError, map } from 'rxjs/operators';
import { UserService } from '../services/user-service';
import { Observable, of } from 'rxjs';
//import { HeroService } from '../services/user-service';

@Injectable({ providedIn: 'root' })
export class UniqueNameValidator implements AsyncValidator {
  constructor(private userService: UserService) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {

    return this.userService.getUser(control.value).pipe(
        map(user => (user ? {uniqueName: true} : null)),
        catchError(() => of(null))
    );
  }
}

@Directive({
  selector: '[appUniqueName]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: forwardRef(() => UniqueNameValidatorDirective),
      multi: true
    }
  ]
})
export class UniqueNameValidatorDirective implements AsyncValidator {
  constructor(private validator: UniqueNameValidator) {}

  validate(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.validator.validate(control);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/