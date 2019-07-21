import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          // check for 401 Unauthorized
          if (error.status === 401) {
            return throwError(error.statusText);
          }

          const applicationError = error.headers.get('Application-Error');

          if (applicationError) {
            console.error(applicationError);
            return throwError(applicationError);
          }

          let serverError = error.error.errors;
          let modelStateErrors = '';

          // console.log(error);

          // if there is only one error, it will not be contained inside the errors object
          if (!serverError) {
            serverError = error.error;
          }

          // model state errors
          if (serverError && typeof serverError === 'object') {
            for (const key in serverError) {
              if (serverError[key]) {
                modelStateErrors += serverError[key] + '\n';
              }
            }
          }
          // console.log('modelStateErrors: ' + modelStateErrors);
          // console.log('serverError: ' + serverError);
          return throwError(modelStateErrors || serverError || 'Server Error');
        }
      })
    );
  }
}

export const ErrorInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorInterceptor,
  multi: true
};
