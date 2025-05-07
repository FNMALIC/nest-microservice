import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly loggerService: LoggerService) {
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const startTime = Date.now();
    return next.handle().pipe(
      catchError((error) => {
        this.loggerService.log({
          method,
          endpoint: url,
          data: error.response,
          status: error?.status,
          duration: Date.now() - startTime,
        });
        return throwError(() => error);
      }));
  }
}
