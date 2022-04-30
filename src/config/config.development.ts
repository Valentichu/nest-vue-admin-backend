export default {
  rootRoleId: 1,
  // jwt sign secret
  jwt: {
    secret: process.env.JWT_SECRET || '123456',
  },
  // typeorm config
  database: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'nest-admin',
    synchronize: true,
    logging: false,
    timezone: '+08:00', // 东八区
  },
};
