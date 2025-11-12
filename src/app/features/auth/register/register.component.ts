import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  constructor(private router: Router, private authService: AuthService) {}
  email = '';
  password = '';
  errorMessage = '';
  onSubmit(): void {
    this.authService.register(this.email, this.password).subscribe({
      next: (res) => {
        const token = res.token;
        this.authService.setToken(token);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Login failed';
      },
    });
  }
}
