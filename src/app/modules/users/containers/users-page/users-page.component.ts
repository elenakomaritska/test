import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { User, UserService } from '../../../../services/users.service';

export interface FormAbstractControl {
  [key: string]: AbstractControl;
}

export const EMAIL_REGEX = /^(?:[a-z0-9]+)(?:(?:[a-z0-9]?[\.\-_]{1}[a-z0-9]+)+)?@(?:(?:[a-z0-9]+)(?:[-]{1})?(?:[a-z0-9]+)\.)(?:[a-z]{2,})(?:\.[a-z]{2})?$/i;

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  providers: [],
})

export class UsersPageComponent implements OnInit {
  public isShowError = false;
  public isShowSuccess = false;
  public users: User[] = [];
  public isCreateFormActive = false;
  public isChangeFormActive = false;
  public activeUser: any;
  public form: UntypedFormGroup | any;

  constructor(
    private _fb: UntypedFormBuilder,
    private userService: UserService,
  ) {
  }

  public get f(): FormAbstractControl {
    return this.form.controls;
  }

  public ngOnInit(): void {
    this._initializeForm();
    this.userService.fetchUsers()
      .subscribe((response: User[]) => {
        this.users = response;
        console.log(this.users)
      });

    console.log(this.users)
  }

  public addUser() {
    this.userService.addUser({
      username: this.f['userName'].value,
      lastName: this.f['lastName'].value,
      email: this.f['userEmail'].value,
      type: this.f['userType'].value,
      firstName: this.f['firstName'].value,
      password: this.f['password'].value,
      repeatPassword: this.f['repeatPassword'].value,
    }).subscribe((user: User) => {
      this.users.push(user);
    });
  }

  public removeUser(): void {
    this.userService.removeUser(this.activeUser.id)
      .subscribe(() => {
        this.users = this.users.filter(user => user.id !== this.activeUser.id);
      });
    this.closeModal();
    this.isShowSuccess = true;
  }

  public saveUser(): void {
    this.removeUser();
    this.addUser();
    this.closeModal();
    this.isShowSuccess = true;
  }

  public onSelectUser(user: User, event: Event): void {
    this.activeUser = user;
    this.isCreateFormActive = false;
    this.isChangeFormActive = true;
    this.isShowSuccess = false;
    this.isShowError = false;

    this.form = this._fb.group({
      userName: [this.activeUser.username, [Validators.required]],
      firstName: [this.activeUser.firstName, Validators.required],
      lastName: [this.activeUser.lastName, Validators.required],
      userEmail: [this.activeUser.email, Validators.required],
      userType: [this.activeUser.type, Validators.required],
      password: [
        this.activeUser.password,
        [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,60}$/)],
      ],
      repeatPassword: [this.activeUser.repeatPassword, Validators.required],
    });
  }

  private _initializeForm(): void {
    this.form = this._fb.group({
      userName: ['', Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      userEmail: [
        null, [
          Validators.required,
          Validators.pattern(EMAIL_REGEX),
        ],
      ],
      userType: [null, Validators.required],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,60}$/)]],
      repeatPassword: [null, [Validators.required]],
    });
  }

  public onSubmit(): void {
    if (this.form.valid) {
      this.isShowSuccess = true;
      this.isShowError = false;
      this.closeModal();
    } else {
      this.isShowError = true;
    }
  }

  public showCreateForm(): void {
    this.isShowSuccess = false;
    this.isShowError = false;
    this.isCreateFormActive = true;
    this.isChangeFormActive = false;
    this._initializeForm();
  }

  public closeModal(): void {
    this.isCreateFormActive = false;
    this.isChangeFormActive = false;
  }
}
