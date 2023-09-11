import { Sequelize } from 'sequelize';
import config from '../../config/config';
import { logger } from '../utils/logger';

// eslint-disable-next-line import/no-mutable-exports
let sequelize: Sequelize | null = null;

const makeDbConnection = async () => {
  try {
    if (!sequelize) {
      sequelize = new Sequelize(config.postgres.url);
    }
    if (sequelize) {
      await sequelize.authenticate();
      logger.info('Connected to DB!');
    }
  } catch (err) {
    logger.error(`Error in DB connection: ${err}`);
    throw err;
  }
};

makeDbConnection();

export default sequelize;
