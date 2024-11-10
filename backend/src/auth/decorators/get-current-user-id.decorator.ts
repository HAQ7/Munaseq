// src/auth/get-current-user-id.decorator.ts

import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUserId = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user?.sub; // assuming `sub` contains the user's id in the JWT payload
  },
);
