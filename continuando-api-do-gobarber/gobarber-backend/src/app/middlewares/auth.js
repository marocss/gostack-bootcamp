import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided.' });
  }

  const [, token] = authHeader.split(' ');

  try {
    // without primisify
    // jwt.verify(token, secret, (Err, result) => {

    // })
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    // decoded contem informações do payload do token
    // incluir id do user no req
    req.userId = decoded.id;

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
