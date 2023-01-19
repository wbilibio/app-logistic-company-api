/* eslint-disable @typescript-eslint/no-floating-promises */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';
import { FastifyReply } from 'fastify';
import { InvalidFieldsException, EntityAlreadyExistsException, EntityNotFoundException, StorageLocationLimitException, InvalidField } from '../core/exceptions';

interface IResponseErrorBusiness {
  message: string;
  statusCode: number;
  name: string;
  fields?: Array<{
    name: string;
    message: string;
  }>;
}

@Catch(
  InvalidFieldsException,
  EntityNotFoundException,
  EntityAlreadyExistsException,
  BadRequestException,
  UnauthorizedException,
  StorageLocationLimitException, 
  Error,
)
export class BusinessExceptionFilter implements ExceptionFilter {
  // private readonly sentry;

  constructor() {
    // this.sentry = sentry({
    //   dsn: process.env.SENTRY_DSN as string,
    //   environment: process.env.SENTRY_ENV as string,
    // });
  }

  // Exception can be a BadRequestException or GenericException type
  catch(exception: any, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const reply = ctx.getResponse<FastifyReply>();

    const response: IResponseErrorBusiness = {
      message: exception.response?.message ?? exception.message,
      statusCode: 500,
      name: exception.constructor.name,
    };

    switch (exception.constructor.name) {
      case 'InvalidFieldsException':
        response.statusCode = 400;
        response.fields = exception.fields;
        break;
      case 'EntityAlreadyExistsException':
        response.statusCode = 409;
        break;
      case 'BadRequestException':
      case 'StorageLocationLimitException':
        response.statusCode = 400;
        break;
      case 'EntityNotFoundException':
        response.statusCode = 404;
        break;
      case 'UnauthorizedException':
        response.statusCode = 401;
        break;
      default:
        response.statusCode = 500;
    }

    if (response.statusCode === 500) {
      console.log(exception)
      // this.sentry.captureException(exception);
    }

    reply.status(response.statusCode).send(response);
  }
}
