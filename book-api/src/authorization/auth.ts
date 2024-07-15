import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../setting';

declare global {
  namespace Express {
    interface Request {
      user?: DecodedToken;
    }
  }
}

export interface DecodedToken {
  id: string;
  roles: number;
}

const auth = (roles: string[] = []) => (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) {
    return response.status(401).json({ error: 'Отсутствует токен' });
  }

  const token = authHeader;

  try {
    const decoded = jwt.verify(token, config.jwtSecret) as DecodedToken;

    if (roles.length && !roles.includes(decoded.roles.toString())) {
      return response.status(403).json({ error:'У вас нет доступа к этому действию' });
    }

    next();
  } catch (error) {
    response.status(401).json({ error });
  }
};

export default auth;
