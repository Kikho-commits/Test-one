import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-container">
        <h1>Auth App</h1>
        <div class="nav-buttons">
          <button routerLink="/login">Login</button>
          <button routerLink="/signup">Signup</button>
        </div>
      </div>
    </nav>
    <h1 *ngIf="isWelcomePage()">Welcome to web</h1>
    <div class="content">
      <router-outlet></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'auth-app';

  constructor(private router: Router) {}

  isWelcomePage(): boolean {
    // Check if the current route is the default route (home or index page)
    return this.router.url === '/';
  }
}
