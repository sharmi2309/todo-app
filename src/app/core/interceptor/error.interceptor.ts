import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
   const snackBar = inject(MatSnackBar);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';
      if (error.error && error.error.error_message) {
        errorMessage = error.error.error_message;
      
      } else if (error.status === 404) {
        errorMessage = 'Not Found';
      } else if (error.status === 500) {
        errorMessage = 'Cannot connect to server. Please try again later.';
      }
      snackBar.open(errorMessage, 'Close', {
        duration: 4000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });

      return throwError(() => error);
    })
  );
};
