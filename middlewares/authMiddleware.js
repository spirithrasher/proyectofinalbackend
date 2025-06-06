import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, JWT_SECRET, (err, userData) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    req.user = userData; // { id, email }
    next();
  });
};

