import sequelize from '../../db/connection';

const setupTestDB = () => {
  beforeAll(async () => {
    await sequelize?.authenticate();
  });

  beforeEach(async () => {
    // await Promise.all(Object.values(mongoose.connection.collections).map(async (collection) => collection.deleteMany({})));
    if (sequelize) {
      // const dict =  sequelize.models;
      // console.log('models::', dict);
      // !! TODO clear all tables
    }
  });

  // eslint-disable-next-line jest/no-commented-out-tests
  // test('connection', async () => {
  //   await sequelize?.authenticate();
  // });

  afterAll(async () => {
    await sequelize?.close();
  });
};

// eslint-disable-next-line jest/no-export
export default setupTestDB;
