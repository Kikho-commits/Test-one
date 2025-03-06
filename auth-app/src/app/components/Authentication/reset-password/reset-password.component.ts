import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/AuthService/auth.service';
import { SnackbarService } from '../../../services/SnackbarServices/snackbar.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { FormGroup ,FormControl,Validators } from '@angular/forms';
import { PasswordRequest } from '../../../models/auth.models';

@Component({
  selector: 'app-reset-password',
  standalone:true,
  imports: [CommonModule,FormsModule,MatCardModule,MatFormFieldModule,
    MatInputModule,ReactiveFormsModule
  ],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    currentPassword : new FormControl('',Validators.required),
    newPassword: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
    ]),
    confirmPassword: new FormControl('', Validators.required)
  });
  

  constructor(private authService:AuthService,private snackBar:SnackbarService,private router:Router){};
 
  resetPassword(){
      if(this.resetForm.valid){
        
        this.authService.resetPassword(this.resetForm.value as PasswordRequest).subscribe(
          (response)=>{
            this.snackBar.showSnackBar("Password Changed Successfully!");
            this.router.navigate(['./']);
          },
          (error)=>{
            if(error.status === 400){
              this.snackBar.showSnackBar("Invalid Email or Current Password!");
            }else{
              this.snackBar.showSnackBar("An error occurred. Please try again.", 'Ok');
            }
          }
        );

      }
  };

  isPasswordMatch():boolean{
    return this.resetForm.value.newPassword===this.resetForm.value.confirmPassword;
  }
}
