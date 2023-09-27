import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAdvertComponent } from './containers/user-advert/user-advert.component';
import { UsersClientModule } from './containers/user-client/user-client.module';
import { UsersRoutingModule } from './users-routing.module';
import { UserModule } from './components/user/user.module';

@NgModule({
  declarations: [
    UserAdvertComponent,
  ],
  exports: [
    UserAdvertComponent
  ],
  imports: [
    CommonModule,
    UsersClientModule,
    UsersRoutingModule,
    UserModule,
  ],
})
export class UsersModule { }
