import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/AuthService/auth.service';
import { SnackbarService } from './services/SnackbarServices/snackbar.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './app.component.html' ,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth-app';

  constructor(private router: Router,private authService: AuthService,private snackBar : SnackbarService) {}

  isWelcomePage(): boolean {

    return this.router.url === '/';
  }

  isInventory():boolean{
    return this.router.url==='/inventory';
  }

  logout(){
    this.authService.removeToken('token');
    this.snackBar.showSnackBar("User Logged out Successfully",'Ok');
    this.router.navigate(['/']);
  }
}
