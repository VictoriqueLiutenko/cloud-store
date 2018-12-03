#!/usr/bin/env node
/* eslint-disable no-process-exit */
const co = require('co')
const fs = require('mz/fs')
const {join} = require('path')
const glob = require('glob')
const R = require('ramda')
const {root, getApps} = require('../helper.js')
const browserify = require('browserify')
const {linter, CLIEngine} = require('eslint')
const pPipe = require('promised-pipe')

const build = co.wrap(function* build() {
  console.log('Building JS: start')

  yield R.pipe(
    getApps,
    R.map(pPipe(
      compileApp,
      saveJsOfApp
    ))
  )()

  console.log('Building JS: done')
})

module.exports = {build}

function* compileApp(appInfo) {
  const b = browserify()
  b.transform(require('babelify'), {presets: [require('babel-preset-es2015')]})
  const getFiles = R.pipe(
    R.curryN(3, join)(appInfo.path, 'Components'),
    glob.sync,
    R.filter((path) => {
      return path.search('/node_modules/') === -1
    })
  )

  // linting
  yield pPipe(
    getFiles,
    R.map(lintFile),
    (v) => Promise.all(v),
    R.unnest,
    lintReport
  )('/**/*.js')

  // building
  return R.pipe(
    getFiles,
    R.map(b.add.bind(b)),
    () => b.bundle(),
    R.assoc('js', R.__, appInfo)
  )('/**/Index.js')
}
compileApp = co.wrap(compileApp)

function lintFile(filename) {
  const getConfig = pPipe(
    () => join(__dirname, '../.eslintrc'),
    fs.readFile,
    JSON.parse
  )

  const getFileContent = pPipe(
    () => fs.readFile(filename),
    R.toString
  )

  return pPipe(
    () => [getConfig(), getFileContent()],
    Promise.all.bind(Promise),
    ([config, content]) => linter.verify(content, config, {filename}),
    messages => messages.length ? [{
      filePath: filename,
      messages,
      errorCount: messages.length,
      warningCount: 0
    }] : []
  )()
}

function lintReport(linterMessages) {
  if (linterMessages.length) {
    const formatter = (new CLIEngine()).getFormatter()
    console.log(formatter(linterMessages))
  }
}

function saveJsOfApp(appInfo) {
  return new Promise((resolve) => {
    let filePath = join(root, `${appInfo.name}.js`)
    return pPipe(
      () => fs.writeFile(filePath, ''),
      () => fs.createWriteStream(filePath),
      (stream) => appInfo.js.pipe(stream),
      () => R.assoc('filePath', filePath, appInfo),
      (resultingAppInfo) => appInfo.js.on('end', () => resolve(resultingAppInfo))
    )()
  })
}

build().catch((e) => {
  console.error(e.stack || e.toString())
  process.exit(1)
})

