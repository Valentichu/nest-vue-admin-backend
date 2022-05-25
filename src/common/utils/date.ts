import * as dayjs from 'dayjs'

export const timeTransformer = {
  to(value) {
    return value
  },
  from(value) {
    return value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : null
  },
}

export const dateTransformer = {
  to(value) {
    return value
  },
  from(value) {
    return value ? dayjs(value).format('YYYY-MM-DD') : null
  },
}

export const monthTransformer = {
  to(value) {
    return value ? `${value}-01` : null
  },
  from(value) {
    return value ? dayjs(value).format('YYYY-MM') : null
  },
}

export const yearTransformer = {
  to(value) {
    return value ? `${value}-01-01` : null
  },
  from(value) {
    return value ? dayjs(value).format('YYYY') : null
  },
}
