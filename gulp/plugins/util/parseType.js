require('babel-register')
const _ = require('lodash')
const SUI = require('../../../src/lib/SUI') // eslint-disable-line no-unused-vars

const evalValue = value => _.uniq(eval(value)) // eslint-disable-line no-eval

const transformEnumValues = values => _.flatMap(values, ({ value }) => {
  if (_.startsWith(value, '...SUI')) return evalValue(value.substring(3))
  return value.replace(/'/g, '')
})

const parseEnum = type => {
  const { value } = type

  if (typeof value === 'string' && value.includes('SUI')) {
    return Object.assign(type, { value: evalValue(value) })
  }

  return Object.assign(type, { value: transformEnumValues(value) })
}

const parseUnion = union => {
  const { value } = union
  const transformed = value.map(type => type.name === 'enum' ? parseEnum(type) : type)

  return Object.assign(union, { value: transformed })
}

module.exports = ({ type }) => {
  if (!type) return null
  if (type.name === 'enum') return parseEnum(type)
  if (type.name === 'union') return parseUnion(type)

  return type
}
