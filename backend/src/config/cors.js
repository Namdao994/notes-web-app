import {StatusCodes} from 'http-status-codes';
import ApiError from '../utils/apiError.js';
import {WHITELIST_DOMAINS} from '../utils/constants.js';
import {env} from './environment.js';

export const corsOptions = {
  origin: function (origin, callback) {
    if (env.BUILD_MODE === 'dev') {
      return callback(null, true);
    }
    //chặn
    if (WHITELIST_DOMAINS.includes(origin)) {
      return callback(null, true);
    }

    return callback(new ApiError(StatusCodes.FORBIDDEN, `${origin} not allowed by our CORS Policy`));
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
