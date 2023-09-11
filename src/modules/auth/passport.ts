import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
// import tokenTypes from '../token/token.types';
import config from '../../config/config';
import User from '../user/user.model';
// import { IPayload } from '../token/token.interfaces';

const jwtStrategy = new JwtStrategy(
  {
    secretOrKey: config.jwt.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  },
  async (payload: any, done) => {
    try {
      if (payload.type !== 'access') {
        throw new Error('Invalid token type');
      }
      const user = await User.findByPk(payload.sub);
      if (!user) {
        done(null, false);
      } else done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

export default jwtStrategy;
