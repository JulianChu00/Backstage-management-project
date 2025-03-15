const dayjs = require('dayjs')
const filterTimes = (val, format = 'YYYY-MM-DD') => {
  if (!isNull(val)) {
    const result = dayjs.unix(val).format(format)
    return result
  } else {
    return '--'
  }
}
//只有最后的data有值的时候,三个if都跳过,返回false
export const isNull = (date) => {
  if (!date) return true
  if (JSON.stringify(date) === '{}') return true
  if (JSON.stringify(date) === '[]') return true
}

export default (app) => {
  app.config.globalProperties.$filters = {
    filterTimes
  }
}
