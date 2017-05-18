const { log, colors, PluginError } = require('gulp-util')
const _ = require('lodash')
const path = require('path')
const docgen = require('react-docgen')
const through = require('through2')

const { parseDocBlock, parseType } = require('./util')

module.exports = (filename) => {
  const defaultFilename = 'docgenInfo.json'
  const result = {}
  const pluginName = 'gulp-react-docgen'
  let finalFile
  let latestFile
  const failures = []

  function transform(file, enc, cb) {
    const relFilePath = path.relative(process.cwd(), file.path)
    latestFile = file

    if (file.isNull()) {
      cb(null, file)
      return
    }

    if (file.isStream()) {
      cb(new PluginError(pluginName, 'Streaming is not supported'))
      return
    }

    try {
      const relativePath = file.path.replace(`${process.cwd()}/`, '')
      const parsed = docgen.parse(file.contents)

      // replace the component`description` string with a parsed doc block object
      parsed.docBlock = parseDocBlock(parsed.description)
      delete parsed.description

      // replace prop `description` strings with a parsed doc block object and updated `type`
      _.each(parsed.props, (propDef, propName) => {
        parsed.props[propName].docBlock = parseDocBlock(propDef.description)
        parsed.props[propName].type = parseType(propDef)

        delete parsed.props[propName].description
      })

      result[relativePath] = parsed
    } catch (err) {
      failures.push(relFilePath)
      log(`${colors.red('Failed')} to generate doc info for ${colors.cyan(relFilePath)}`)
      log(colors.gray(err.stack))
    }

    cb()
  }

  function flush(cb) {
    finalFile = latestFile.clone({ contents: false })
    finalFile.path = path.join(latestFile.base, (filename || defaultFilename))
    finalFile.contents = new Buffer(JSON.stringify(result, null, 2))
    this.push(finalFile)

    if (failures.length) {
      cb(new PluginError(pluginName, 'Could not generate doc info for:' + failures.map(f => `\n  ${f}`).join('')))
      return
    }
    cb()
  }

  return through.obj(transform, flush)
}
