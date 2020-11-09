/**
 * 数据源的获取和更新
 */
const axios = require('axios')
const compareVersions = require('compare-versions')

module.exports = async (v) => {
  // 拿到所有的 Node 版本
  const {
    data
  } = await axios
    .get('https://nodejs.org/dist/index.json')

  // 把目标版本的 LTS 都挑选出来
  return data.filter(node => {
    const cp = v ?
      (compareVersions(node.version, 'v' + v + '.0.0') >= 0) :
      true
    return node.lts && cp
  }).map(item => {
    // 剔除 files 字段，其它全部返回
    const {
      files,
      ...rest
    } = item
    return {
      ...rest
    }
  })
}
