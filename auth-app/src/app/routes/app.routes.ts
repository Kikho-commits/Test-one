import { Routes } from '@angular/router';
import { LoginComponent } from '../components/Authentication/login/login.component';
import { SignupComponent } from '../components/Authentication/signup/signup.component';
import { AuthGuard } from '../guard/auth.guard';
import { PageErrorComponent } from '../page-error/page-error.component';
import { ProductComponent } from '../components/product/product.component';
import { ResetPasswordComponent } from '../components/Authentication/reset-password/reset-password.component';

export const routes: Routes = [
  { path : '', component : LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'resetPassword', component:ResetPasswordComponent, canActivate:[AuthGuard]},
  { path : 'inventory', component:ProductComponent, canActivate:[AuthGuard]},
  { path: '**', component:PageErrorComponent}
  
];
