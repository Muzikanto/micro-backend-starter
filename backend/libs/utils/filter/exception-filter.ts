import { Catch, RpcExceptionFilter as BaseRpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch()
export class ExceptionFilter implements BaseRpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    return throwError(() => {
      const err = exception.getError();
      console.log(err);
      return err;
    });
  }
}
