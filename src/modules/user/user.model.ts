import { DataTypes, Model, Op } from 'sequelize';
import bcrypt from 'bcryptjs';
import { IUser, UserCreation } from './user.interfaces';
import sequelize from '../db/connection';

class User extends Model<IUser, UserCreation> {
  declare id: number;

  declare name: string;

  declare email: string;

  declare password: string;

  declare role: string;

  declare isEmailVerified: boolean;

  // declare createdAt: Date;

  // declare updatedAt: Date;

  // instance methods
  declare isPasswordMatch: (password: string) => Promise<boolean>;

  // class mathods
  static isEmailTaken: (email: string, excludeUserId?: number) => Promise<boolean>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user',
    },
    isEmailVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: sequelize!,
    tableName: 'users',
    timestamps: false,
    freezeTableName: true,
    hooks: {
      beforeSave: async (user) => {
        if (user.changed('password')) {
          const hash = await bcrypt.hash(user.password, 8);
          Object.assign(user, { password: hash });
        }
      },
    },
  }
);

// instance methods

User.prototype.isPasswordMatch = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// class mathods

User.isEmailTaken = async function (email: string, excludeUserId?: number) {
  const user = await this.findOne({
    where: {
      email,
      ...(!!excludeUserId && {
        id: {
          [Op.ne]: excludeUserId,
        },
      }),
    },
  });
  return !!user;
};

export default User;
