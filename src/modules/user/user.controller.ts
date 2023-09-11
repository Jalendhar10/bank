import httpStatus from 'http-status';
import { Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import { ApiError } from '../utils/errors';
// import pick from '../utils/pick';
// import { IOptions } from '../utils/paginate/paginate';
import * as userService from './user.service';

export const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(httpStatus.CREATED).send(user);
});

export const getUsers = catchAsync(async (_: Request, res: Response) => {
  // const filter = pick(req.query, ['name', 'role']);
  // const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
  const result = await userService.queryUsers();
  res.send(result);
});

export const getUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'number') {
    const user = await userService.getUserById(req.params['userId']);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    }
    res.send(user);
  }
});

export const updateUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'number') {
    const user = await userService.updateUserById(req.params['userId'], req.body);
    res.send(user);
  }
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
  if (typeof req.params['userId'] === 'number') {
    await userService.deleteUserById(req.params['userId']);
    res.status(httpStatus.NO_CONTENT).send();
  }
});
