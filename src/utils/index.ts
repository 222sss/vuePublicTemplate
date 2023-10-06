const px2rem = (val) => {
  return parseFloat(val) / 37.5 + 'rem' // 这里的37.5，和rootValue值对应
}

const Process = (num) => {
  let result = parseFloat(num)
  if (isNaN(result)) {
    if (num == '-') {
      return num
    }
    return num
  }
  result = Math.floor(num * 10) / 10
  let s_x = result.toString() //将数字转换为字符串

  let pos_decimal = s_x.indexOf('.') //小数点的索引值

  // 当整数时，pos_decimal=-1 自动补0
  if (pos_decimal < 0) {
    pos_decimal = s_x.length
    s_x += '.'
  }

  // 当数字的长度< 小数点索引+2时，补0
  while (s_x.length <= pos_decimal + 1) {
    s_x += '0'
  }
  return s_x
}

export default { px2rem, Process }
