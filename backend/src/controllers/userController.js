import {StatusCodes} from 'http-status-codes';
import {userService} from '../services/userService.js';
import ms from 'ms';

const createNewUser = async (req, res, next) => {
  try {
    const createdUser = await userService.createNewUser(req.body);
    res.status(StatusCodes.CREATED).json(createdUser);
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const userInfo = req.body;
    const {accessToken, refreshToken, userPayload} = await userService.login(userInfo);

    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days'),
    });

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms('14 days'),
    });

    res.status(StatusCodes.OK).json({
      userPayload,
      accessToken,
      refreshToken,
    });
  } catch (err) {
    next(err);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(StatusCodes.OK).json({message: 'Logout successfully'});
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(err);
  }
};

const getUserById = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await userService.getUserById(id);
    res.status(StatusCodes.OK).json(user);
  } catch (err) {
    next(err);
  }
};

export const userController = {
  createNewUser,
  login,
  logout,
  getUserById,
};
