import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../services/AuthService/auth.service';
import { SnackbarService } from '../../services/SnackbarServices/snackbar.service';
import { Router } from '@angular/router';
import { routes } from '../../routes/app.routes';

@Component({
  selector: 'app-reset-password',
  standalone:true,
  imports: [CommonModule,FormsModule,MatCardModule,MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  


  userPasswordForm = {
    email :'' ,
    currentPassword : '',
    newPassword :'' ,
    confirmPassword : ''
  }
  constructor(private authService:AuthService,private snackBar:SnackbarService,private router:Router){};


  errorMessage : string = '';

  
  resetPassword(){
      if(this.userPasswordForm.email &&this.userPasswordForm.newPassword && this.userPasswordForm.confirmPassword){
        const obj = {email : this.userPasswordForm.email, currentPassword : this.userPasswordForm.currentPassword, newPassword : this.userPasswordForm.newPassword};
        this.authService.resetPassword(obj).subscribe(
          (response)=>{
            this.snackBar.showSnackBar("Password Changed Successfully!");
            this.router.navigate(['./']);
          },
          (error)=>{
            this.errorMessage="Error";
          }
        );

      }
  };

  isPasswordMatch():boolean{
    return this.userPasswordForm.newPassword === this.userPasswordForm.confirmPassword;
  }
}
