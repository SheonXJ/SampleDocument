const ifCond = (a, b, options) => {
  return a === b ? options.fn(this) : options.inverse(this)
}
const incremented = (value, options) => {
  return parseInt(value) + 1
}

module.exports = {
  ifCond,
  incremented
}
