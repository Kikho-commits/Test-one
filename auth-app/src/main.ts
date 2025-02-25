import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; 
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router'; 
import { routes } from './app/routes/app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), 
    provideRouter(routes),provideAnimations()
  ]
});
