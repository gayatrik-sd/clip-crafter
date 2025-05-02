// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';  // Import your standalone component
import { provideHttpClient } from '@angular/common/http';

// Bootstrap the standalone AppComponent
bootstrapApplication(AppComponent, {
  providers: [provideHttpClient()]
})
  .catch(err => console.error(err));  // Catch and log any errors
