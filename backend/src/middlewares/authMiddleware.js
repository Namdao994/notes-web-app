import {StatusCodes} from 'http-status-codes';
import {jwtProvider} from '../providers/jwtProvider.js';
import {env} from '../config/environment.js';

const isAuthorized = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  if (!accessToken) {
    res.status(StatusCodes.UNAUTHORIZED).json({message: 'Unauthorized (token not found)'});
    return;
  }

  try {
    const accessTokenDecoded = jwtProvider.verifyToken(accessToken, env.ACCESS_TOKEN_SECRET_SIGNATURE);

    req.jwtDecoded = accessTokenDecoded;
    next();
  } catch (error) {
    if (error.message?.includes('jwt expired')) {
      res.status(StatusCodes.GONE).json({message: 'Need to be refresh token'});
      return;
    }

    res.status(StatusCodes.UNAUTHORIZED).json({message: 'Unauthorized! (Please login)'});
  }
};

export const authMiddleware = {
  isAuthorized,
};
