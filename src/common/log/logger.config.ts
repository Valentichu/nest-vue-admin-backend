// 项目根目录新建config文件用于保存配置文件, 新建log4jsConfig.ts配置文件

import * as path from 'path';
const baseLogPath = path.resolve(__dirname, '../../../logs');

const log4jsConfig = {
  appenders: {
    console: { type: 'console' }, // 控制打印至控制台
    // 统计日志
    access: {
      type: 'dateFile', // 写入文件格式，并按照日期分类
      filename: `${baseLogPath}/access/access.log`, // 日志文件名，会命名为：access.2021-04-01.log
      alwaysIncludePattern: true, // 为true, 则每个文件都会按pattern命名，否则最新的文件不会按照pattern命名
      pattern: 'yyyy-MM-dd', // 日期格式
      // maxLogSize: 10485760,  // 日志大小
      daysToKeep: 30, // 文件保存日期30天
      numBackups: 3, //  配置日志文件最多存在个数
      compress: true, // 配置日志文件是否压缩
      keepFileExt: true, // 是否保留文件后缀
    },
    // 异常日志
    errorFile: {
      type: 'dateFile',
      filename: `${baseLogPath}/error/error.log`,
      alwaysIncludePattern: true,
      pattern: 'yyyy-MM-dd',
      daysToKeep: 30,
      numBackups: 3,
      keepFileExt: true,
    },
    errors: {
      type: 'logLevelFilter',
      level: 'ERROR',
      appender: 'errorFile',
    },
  },

  categories: {
    default: { appenders: ['console', 'access', 'errors'], level: 'DEBUG' },
    mysql: { appenders: ['console', 'access', 'errors'], level: 'DEBUG' },
  },
};

export default log4jsConfig;
