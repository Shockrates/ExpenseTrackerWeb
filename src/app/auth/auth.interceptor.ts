import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtToken = getJwtToken();
  if (jwtToken) {
    var clonedReq =req.clone({
      setHeaders:{
        Authorization: `Bearer ${jwtToken}`,
      }
    })
    return next(clonedReq);
  }
  return next(req);
};

function getJwtToken(): string | null {
  return localStorage.getItem('JWT_TOKEN');
}
