  import { Component } from '@angular/core';
  import { CommonModule } from '@angular/common';
  import { RouterModule, Router } from '@angular/router';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './app.component.html' ,
    styleUrls: ['./app.component.css']
  })
  export class AppComponent {
    title = 'auth-app';
    

    constructor(private router: Router) {}

  
    isAuth() : boolean{
      return this.router.url==='/login'||this.router.url==='/'||this.router.url==='/signup'||this.router.url==='/resetPassword';
    }
    
  }
