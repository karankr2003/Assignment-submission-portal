import jwt from 'jsonwebtoken';

const generateToken = (user: any): string => {
  const payload = { userId: user._id, role: user.role };
  return jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: '1h' });
};

export default generateToken;
