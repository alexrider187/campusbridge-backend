import User from '../models/User.js';
import jwt from 'jsonwebtoken';


export const protect = async ( req, res, next ) => {

  let token;
  try {
    if(
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {

      token = req.headers.authorization.split(' ')[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET );

      req.user = await User.findById(decoded.id).select('-password');

      if(!req.user) {
        return res.status(401).json({ message: 'User not found' });
      }

      return next();
    } else {
      return res.status(401).json({ message: 'Not authorized, no token'});
    }
  } catch (err) {
    return res.status(401).json({ message: 'Not authorized, token failed'});
  }
};
