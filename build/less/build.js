#!/usr/bin/env node
/* eslint-disable no-process-exit */
const co = require('co')
const less = require('less')
const fs = require('mz/fs')
const {join} = require('path')
const glob = require('glob')
const R = require('ramda')
const {root, getApps} = require('../helper.js')
const pPipe = require('promised-pipe')
const postcss = require('postcss')

const build = co.wrap(function* build() {
  console.log('Building LESS: start')

  const lessConfig = {}

  yield pPipe(
    getApps,
    R.map(pPipe(
      compileApp(lessConfig),
      saveCssOfApp
    )),
    (v) => Promise.all(v)
  )()
  console.log('Building LESS: done')
})


module.exports = {build}

function* compileApp(lessOptions, appInfo) {
  return Object.assign({}, appInfo, {
    css: yield pPipe(
      getFilesOfApp,
      R.map(pPipe(
        compileFile(lessOptions, appInfo.addCss),
        R.prop('css')
      )),
      (v) => Promise.all(v),
      R.join('\n'),
      applyPostCss,
      R.prop('css')
    )(appInfo.path)
  })
}
compileApp = R.curryN(2, co.wrap(compileApp))

function getFilesOfApp(dirPath) {
  return R.pipe(
    (p) => join(p, 'Components/**/Index.less'),
    glob.sync,
    R.sortBy(R.complement(R.test(/\/Layout\//)))
  )(dirPath)
}

function compileFile(lessOptions, addCss, filePath) {
  return pPipe(
    fs.readFile,
    R.toString,
    (content) => R.concat(content, addCss),
    (content) => less.render(content, R.assoc('filename', filePath, lessOptions))
  )(filePath)
}
compileFile = R.curry(compileFile)

function applyPostCss(css) {
  return postcss([
    'autoprefixer',
    'postcss-flexbugs-fixes',
    'cssnano'
  ].map(require)).process(css)
}

function saveCssOfApp(appInfo) {
  return pPipe(
    (appName) => join(root, `${appName}.css`),
    R.tap((saveFilePath) => fs.writeFile(saveFilePath, appInfo.css).then(() => {}, (e) => {
      console.log(e.toString())
      throw e
    })),
    R.merge(R.assoc('saveFilePath', R.__, appInfo))
  )(appInfo.name)
}

function* getWebDesigns(clientPostgres, ids) {
  let queryResult
  const sql = `
     SELECT  DISTINCT ON(md5_css) website_design.id, website_design.css, obj.table,
             md5(CONCAT(website_design.css, obj.table)) as md5_css
     FROM website_design
     JOIN obj ON obj.id = website_design.host_obj_id
     WHERE website_design.is_active=true AND
           website_design.css IS NOT NULL AND
           website_design.css != ''`

  if (!ids) {
    queryResult = yield clientPostgres.queryPromise(sql)
  } else {
    queryResult = yield clientPostgres.queryPromise(
      sql + ' AND website_design.id = ANY($1::BIGINT[])',
      [ids]
    )
  }

  return queryResult.rows.map((row) => {
    return {
      path: join(root, 'app/', firstToUpperCase(row.table)),
      name: row.md5_css,
      addCss: row.css
    }
  })
}
getWebDesigns = co.wrap(getWebDesigns)

function* validateCss(ids, appInfo) {
  try {
    yield less.render(appInfo.addCss)
  } catch (e) {
    if (ids) {
      console.log(e.toString())
      throw e
    } else {
      appInfo.addCss = ''
    }
  }
  return appInfo
}
validateCss = R.curryN(2, co.wrap(validateCss))

function firstToUpperCase(str) {
  return str.substr(0, 1).toUpperCase() + str.substr(1)
}

build().catch((e) => {
  console.error(e.toString())
  if (e.filename) {
    console.error(`Happened in ${e.filename}`)
  }
  process.exit(1)
})
