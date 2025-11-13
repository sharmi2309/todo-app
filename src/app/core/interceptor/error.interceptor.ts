import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    tap(event => {
      if (event instanceof HttpResponse && event.body) {
          const body: any = event.body;  
          const successMsg = body.message;
        if (successMsg) {
          snackBar.open(successMsg, 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
            horizontalPosition: 'right',
            verticalPosition: 'top'
          });
        }
      }
    }),
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error occurred!';

      if (error.error) {
        errorMessage =
          error.error.error_message 
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
