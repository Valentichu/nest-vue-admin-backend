import { merge } from 'lodash'
import DefaultConfig from './config.default'

/**
 * 根据环境变量判断使用配置
 */
export default () => {
  let envConfig = {}
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    envConfig = require(`./config.${process.env.NODE_ENV}`).default
  } catch (e) {
    // 无效配置则自动忽略
  }
  // 合并配置
  return merge(DefaultConfig, envConfig)
}
