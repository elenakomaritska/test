import { Directive, Input } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  ValidationErrors,
} from '@angular/forms';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { UserService } from '../services/users.service';

@Directive({
  selector: '[unique-username-validator]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: UniqueUsernameValidatorDirective,
      multi: true,
    },
  ],
})

export class UniqueUsernameValidatorDirective implements AsyncValidator {
  @Input() activeUser: boolean | undefined;
  private static readonly USERNAME_DUPLICATED = { usernameDuplicated: true };
  private static readonly USERNAME_NOT_DUPLICATED = null;

  constructor(private _userService: UserService) {}

  validate(
    control: AbstractControl,
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const username = control.dirty  && !this.activeUser ? control.value : '';

    return this._userService.userExists(username).pipe(
      map((exists) =>
        exists
          ? UniqueUsernameValidatorDirective.USERNAME_DUPLICATED
          : UniqueUsernameValidatorDirective.USERNAME_NOT_DUPLICATED,
      ),
      first(),
    );

  }
}
