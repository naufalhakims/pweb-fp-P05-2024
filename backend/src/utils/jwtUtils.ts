import jwt from 'jsonwebtoken';

export const generateToken = (payload: object): string => {
  const secret = process.env.JWT_SECRET || 'default_secret';
  const options: jwt.SignOptions = { expiresIn: '1h' }; // Token berlaku selama 1 jam
  return jwt.sign(payload, secret, options);
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
  const secret = process.env.JWT_SECRET || 'default_secret';
  return jwt.verify(token, secret);
};
