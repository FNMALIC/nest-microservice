import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import {Users} from "../models/users";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  async use(req: any, res: Response, next: NextFunction) {
    try {
      const authHeader = req.headers['authorization'];
      if (!authHeader) {
        AuthMiddleware.checkApiKey(req);
        return next();
      }

      const token = authHeader.replace('Bearer ', '');
      req.body.token = token;

      // Check the token against multiple roles
      await this.verifyToken(token, req);

      next(); // Pass control to the next middleware/handler
    } catch (error) {
      console.error(error.message);
      res.status(401).json({ error: 'Please authenticate' });
    }
  }

  async verifyToken(token: string, req: any) {
    const roles = [
      { key: process.env.admKey, model: 'users.model' },
      { key: process.env.empKey, model: 'employees.model' },
      { key: process.env.revKey, model: 'students.model' },
    ];

    for (const role of roles) {
      try {
        const decoded: any = jwt.verify(token, role.key);
        const user = await Users.findOne({
          where: { id: decoded.id, TOKEN: token },
        });

        if (user) {
          req.user = user;
          return;
        }
      } catch {

      }
    }
  }

  static checkApiKey(req: any) {
    const apiGKey = req?.params?.apiGKey || req?.query?.apiGKey;
    if (apiGKey && apiGKey === process.env.apiGKey) {
      req.user = {};
    } else {
      throw new Error('Invalid token');
    }
  }
}
