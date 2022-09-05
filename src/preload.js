const {contextBridge} = require('electron')
const {dialog} = require('electron').remote
const fs = require('fs')

contextBridge.exposeInMainWorld('electron', {
  getHTML
})

function showOpenDialogByHTML() {
  return new Promise(resolve => {
    dialog.showOpenDialog({
      title: '请选择HTML文档',
      properties: ['openFile'],
      filters: [{name: '默认', extensions: ['html']}]
    }).then(res => {
      resolve(res.filePaths[0])
    })
  })
}

function getHTML() {
  return new Promise((resolve, reject) => {
    showOpenDialogByHTML().then(res => {
      fs.readFile(res, 'utf8', function (err, data) {
        if (err)
          reject(err.message)

        resolve(data)
      })
    })
  })
}
