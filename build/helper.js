const path = require('path')
const fs = require('fs')

const root = path.join(__dirname, '..')

function getApps() {
  return [{
    path: root,
    addCss: '',
    name: 'index'
  }]
}

module.exports = {root, getApps}

