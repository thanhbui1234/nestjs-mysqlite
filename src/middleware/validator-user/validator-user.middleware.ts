// src/user/middleware/validate-user-name.middleware.ts

import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

interface UserRequest extends Request {
  body: {
    name: string;
  };
}

@Injectable()
export class ValidateUserNameMiddleware implements NestMiddleware {
  use(req: UserRequest, res: Response, next: NextFunction) {
    const { name } = req.body;

    if (typeof name !== 'string' || name.trim().length <= 5) {
      return res.status(400).json({
        statusCode: 400,
        message: 'User name must be longer than 5 characters !!',
      });
    }

    next();
  }
}
