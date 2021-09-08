import jwt from 'jsonwebtoken';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const config = process.env;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.jwt

  if (token == null) return res.sendStatus(401)
  try {
    const decoded = jwt.verify(token, config.TOKEN_SECRET);
    req.user = decoded;
  } catch (err) {
    return res.status(401).send("Invalid Token")

  }
  return next();
};

export default verifyToken;