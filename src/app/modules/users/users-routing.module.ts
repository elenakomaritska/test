import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersPageComponent } from './containers/users-page/users-page.component';

const routes: Routes = [
  {
    path: '',
    component: UsersPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class UsersRoutingModule {
}