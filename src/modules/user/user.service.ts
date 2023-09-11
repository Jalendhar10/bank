import httpStatus from 'http-status';
import User from './user.model';
import { NewCreatedUser, NewRegisteredUser, UpdateUserBody } from './user.interfaces';
import { ApiError } from '../utils/errors';

/**
 * Create a user
 * @param {NewCreatedUser} userBody
 * @returns {Promise<User>}
 */

export const createUser = async (userBody: NewCreatedUser): Promise<User> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Register a user
 * @param {NewRegisteredUser} userBody
 * @returns {Promise<IUserDoc>}
 */
export const registerUser = async (userBody: NewRegisteredUser): Promise<User> => {
  if (await User.isEmailTaken(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return User.create(userBody);
};

/**
 * Query for users
 * @returns {Promise<QueryResult>}
 */
export const queryUsers = async (): Promise<User[]> => {
  const users = await User.findAll();
  return users;
};

/**
 * Get user by id
 * @param {number} id
 * @returns {Promise<User | null>}
 */
export const getUserById = async (id: number): Promise<User | null> => User.findByPk(id);

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User | null>}
 */
export const getUserByEmail = async (email: string): Promise<User | null> => User.findOne({ where: { email } });

/**
 * Update user by id
 * @param {mongoose.Types.ObjectId} userId
 * @param {UpdateUserBody} updateBody
 * @returns {Promise<IUserDoc | null>}
 */
export const updateUserById = async (userId: number, updateBody: UpdateUserBody): Promise<User | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {mongoose.Types.ObjectId} userId
 * @returns {Promise<IUserDoc | null>}
 */
export const deleteUserById = async (userId: number): Promise<User | null> => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  await user.destroy();
  return user;
};
