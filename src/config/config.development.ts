export default {
  rootRoleName: 'superAdmin',
  // jwt sign secret
  jwt: {
    secret: '314159',
    expiresIn: '1d',
    autoRefresh: true,
  },
  // typeorm config
  database: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    username: 'root',
    password: 'qazxsw',
    database: 'nest-vue-admin',
    synchronize: true,
    logging: false,
    timezone: '+08:00',
  },
}
