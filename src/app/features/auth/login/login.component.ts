import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';
  constructor(private authService: AuthService, private router: Router,private snackBar: MatSnackBar) {}
  onSubmit(form: NgForm) {
     if (form.invalid) {
      this.snackBar.open('Please enter both email and password !!', 'Close', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
      return;
    }
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        this.authService.setToken(res.token);
        this.router.navigate(['/todos']);
      },
      error: (err) => {
        this.errorMessage = err.error || 'Registration failed';
      },
    });
  }
  register(){
    this.router.navigate(['/register']);
  }
}
