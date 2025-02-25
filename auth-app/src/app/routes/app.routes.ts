import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { SignupComponent } from '../components/signup/signup.component';
import { AuthGuard } from '../guard/auth.guard';
import { PageErrorComponent } from '../page-error/page-error.component';
import { ProductComponent } from '../components/product/product.component';
import { ResetPasswordComponent } from '../components/reset-password/reset-password.component';


export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'resetPassword', component:ResetPasswordComponent},
  { path : 'inventory', component:ProductComponent, canActivate:[AuthGuard]},
  { path: '**', component:PageErrorComponent}
  
];
