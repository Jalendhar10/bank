// import { Model } from 'sequelize';

export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  isEmailVerified: boolean;
}

export type UserCreation = Omit<IUser, 'id' | 'isEmailVerified' | 'role'>;

export type NewCreatedUser = Omit<IUser, 'id' | 'isEmailVerified'>;

export type NewRegisteredUser = UserCreation;

export type UpdateUserBody = Omit<Partial<IUser>, 'id'>;
