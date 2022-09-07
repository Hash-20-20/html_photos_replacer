const {contextBridge} = require('electron')
const {dialog} = require('electron').remote
const path = require('path')
const fs = require('fs')
const sizeOf = require('image-size')

const UNIT_MB = 1024 ** 2

contextBridge.exposeInMainWorld('electron', {
  getHTML,
  showOpenDialogByPhoto,
  getPhotoFileSize,
  showMessage,
  saveHtml
})

function showOpenDialogByHTML() {
  return new Promise(resolve => {
    dialog.showOpenDialog({
      title: '请选择HTML文档',
      properties: ['openFile'],
      filters: [{name: '默认', extensions: ['html']}]
    }).then(res => {
      const filePath = res.filePaths[0]
      const fileName = path.basename(filePath)
      resolve({filePath, fileName: fileName.substring(0, fileName.length - 5)})
    })
  })
}

function getHTML() {
  return new Promise((resolve, reject) => {
    showOpenDialogByHTML().then(res => {
      fs.readFile(res.filePath, 'utf8', function (err, data) {
        if (err)
          reject(err.message)

        resolve({html: data, fileName: res.fileName})
      })
    })
  })
}

function showOpenDialogByPhoto() {
  return new Promise(resolve => {
    dialog.showOpenDialog({
      title: '请选择要替换的图片',
      properties: ['openFile'],
      filters: [
        {name: '图片类型', extensions: ['jpeg', 'jpg', 'png', 'gif']},
        {name: '所有类型', extensions: ['*']}
      ]
    }).then(res => {
      resolve(res.filePaths[0])
    })
  })
}

function getPhotoFileSize(url) {
  return new Promise((resolve, reject) => {
    let storageByMB = 0
    const dimensions = sizeOf(url)

    fs.stat(url, (err, stats) => {
      if (err) {
        console.log(err.message)
        reject()
      }

      storageByMB = stats.size / UNIT_MB
      resolve({width: dimensions.width, height: dimensions.height, storageByMB})
    })
  })
}

function showMessage(text) {
  dialog.showMessageBox({
    message: text,
    type: 'info'
  }).then(() => {
    // todo
  })
}

function saveHtml(html, fileName='.html') {
  return new Promise(resolve => {
    dialog.showSaveDialog({
      title: '请选择保存路径',
      defaultPath: fileName
    }).then(res => {
      if (res.canceled)
        return false

      saveFile(res.filePath, html).then(res => {
        resolve(res)
      }).catch(err => {
        showMessage(err)
      })
    })
  })
}

function saveFile(savePath, saveContent) {
  return new Promise((resolve, reject) => {
    fs.writeFile(savePath, saveContent, 'utf8', function (err, data) {
      if (err)
        reject(err.message)

      resolve(data)
    })
  })
}
