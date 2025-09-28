import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// middleware function necessita di aggiungere una funzione next quando hanno finito di eseguire

const protect = asyncHandler(async (req, res, next) => { // function that protects routes
  let token;

  token = req.cookies.jwt; // jwt è il nome del token --> il token viene presso dai cookie

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET); // verify the token for the protected routes

      req.user = await User.findById(decoded.userId).select('-password'); // .select e -password fanno si che la password non venga ritornata

      next();


    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

export { protect };