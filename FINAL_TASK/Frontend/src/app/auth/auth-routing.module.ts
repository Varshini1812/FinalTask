import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
const routes: Routes = [
  { path: 'signin', component: SignInComponent },
  { path: 'logout', component: LogoutComponent },
  {path:'login',component:LoginComponent},
  {path:'forgot-password',component:ForgotpasswordComponent},
  {path:'reset-password', component:ResetPasswordComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
