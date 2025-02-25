import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-error',
  imports : [CommonModule],
  templateUrl: './page-error.component.html',
  styleUrl: './page-error.component.css'
})
export class PageErrorComponent {
  constructor(private router : Router){}
  
  isWelcomePage(): boolean {

    return this.router.url === '/';
  }
  
}
