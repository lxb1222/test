export function handleDate (value) {
  let temp = new Date(value)
  let year = temp.getFullYear()
  let mon = temp.getMonth() + 1
  let day = temp.getDate()
  let h = temp.getHours()
  let min = temp.getMinutes()
  let s = temp.getSeconds()
  mon = mon < 10 ? '0' + mon : mon
  day = day < 10 ? '0' + day : day
  h = h < 10 ? '0' + h : h
  min = min < 10 ? '0' + min : min
  s = s < 10 ? '0' + s : s
  return year + '-' + mon + '-' + day + ' ' + h + ':' + min + ':' + s
}
