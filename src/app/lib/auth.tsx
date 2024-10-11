import { NextApiRequest, NextApiResponse } from 'next';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends NextApiRequest {
  user?: string | JwtPayload;
}

export default function authenticate(req: AuthenticatedRequest, res: NextApiResponse, next: Function) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
