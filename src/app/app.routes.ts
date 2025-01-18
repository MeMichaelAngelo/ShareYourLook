import { Routes } from '@angular/router';
import { LoginRegisterComponent } from './login-register/login-register.component';
import { RegisterUserComponent } from './register-user/register-user.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginRegisterComponent,
  },
  {
    path: 'register',
    component: RegisterUserComponent,
  },
];
