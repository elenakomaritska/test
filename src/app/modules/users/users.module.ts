import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersPageComponent } from './containers/users-page/users-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniqueUsernameValidatorDirective } from '../../directives/unique-username-validator.directive';

@NgModule({
  declarations: [
    UsersPageComponent,
    UniqueUsernameValidatorDirective
  ],
  exports: [
    UsersPageComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class UsersModule { }
