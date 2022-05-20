import * as dayjs from 'dayjs'
import * as utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export const timeTransformer = {
  to(value) {
    return value
  },
  from(value) {
    return dayjs.utc(value).format('YYYY-MM-DD HH:mm:ss')
  },
}

export const dateTransformer = {
  to(value) {
    return value
  },
  from(value) {
    return dayjs.utc(value).format('YYYY-MM-DD')
  },
}

export const monthTransformer = {
  to(value) {
    return value
  },
  from(value) {
    return dayjs.utc(value).format('YYYY-MM')
  },
}

export const yearTransformer = {
  to(value) {
    return value
  },
  from(value) {
    return dayjs.utc(value).format('YYYY')
  },
}
