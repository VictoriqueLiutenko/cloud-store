#!/usr/bin/env node
/* eslint-disable no-process-exit */
const chokidar = require('chokidar')
const {root} = require('./helper.js')
const {join} = require('path')

const apps = {
  js: 'Components/**/*.js',
  less: 'Components/**/*.less'
}

for (let type of Object.keys(apps)) {
  const {build} = require(join(__dirname, type, 'build.js'))
  const watcher = chokidar.watch(join(root, apps[type]), {ignored: /\/Static\//})
  watcher.on('ready', () => {
    watcher.on('error', catchError)
    watcher.on('all', console.log.bind(console))
    watcher.on('all', (event, filePath) => build(filePath, event).catch(catchError))
    console.log(`Watching: ${type}`)
  })
}

function catchError(e) {
  console.error('BUILD ERROR', e.stack || e.toString())
}

