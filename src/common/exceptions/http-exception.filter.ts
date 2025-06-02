import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';
    let errorName = 'InternalServerError';

    // Handle HttpException
    if (this.isHttpException(exception)) {
      status = exception.getStatus();
      const responseContent = exception.getResponse();
      message = typeof responseContent === 'object' 
        ? (responseContent as any).message || exception.message
        : exception.message;
      errorName = exception.name;
    } 
    // Handle other Error instances
    else if (exception instanceof Error) {
      if (exception.message === 'Old password is incorrect') {
        status = HttpStatus.FORBIDDEN;
        message = exception.message;
        errorName = 'ForbiddenError';
      } else if (exception.message.includes('not found')) {
        status = HttpStatus.NOT_FOUND;
        message = exception.message;
        errorName = 'NotFoundError';
      } else if (exception.message.includes('Invalid UUID')) {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
        errorName = 'BadRequestError';
      } else {
        this.logger.error(exception.message, exception.stack);
      }
    }

    response.status(status).json({
      statusCode: status,
      error: errorName,
      message,
      timestamp: new Date().toISOString(),
    });
  }

  private isHttpException(error: unknown): error is HttpException {
    return error instanceof HttpException;
  }
}