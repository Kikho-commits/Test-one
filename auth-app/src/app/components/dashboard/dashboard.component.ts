import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../sevices/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  constructor(private router: Router,private authService:AuthService) {}

  logout() { 
    this.authService.removeToken();
    this.router.navigate(['/']); 
  }
}
