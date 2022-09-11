import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    fileName: '',
    version: 1,
    html: '',
    htmlObj: null,
    photos: []
  },
  getters: {
    hasFileName(state) {
      return !!state.fileName
    },
    getPhotosNoRepeat(state) {
      const urls = state.photos.map(item => item.url)
      const newUrls = Array.from(new Set(urls))
      return newUrls.map(item => {
        return {url: item, size: state.photos.find(photo => photo.url === item).size}
      })
    },
    getLocalPhotosNoRepeat(state) {
      const urls = state.photos.map(item => item.url).filter(item => item.indexOf('file://') !== -1)
      const newUrls = Array.from(new Set(urls))
      return newUrls.map(item => {
        return {url: item, size: state.photos.find(photo => photo.url === item).size}
      })
    },
    getHtmlObjInnerHtml(state) {
      return state.htmlObj.innerHTML
    }
  },
  mutations: {
    setName(state, name) {
      state.fileName = name
    },
    versionIncrement(state) {
      state.version++
    },
    setHTML(state, html) {
      state.html = html
    },
    setHtmlObj(state, obj) {
      state.htmlObj = obj
    },
    setPhotos(state, photos) {
      state.photos = photos
    }
  },
  actions: {
    initPhotoSize(context) {
      context.state.photos.forEach(item => {
        if (item.size.width === -1)
          return

        const img = new Image()
        img.src = item.url
        img.onload = () => item.size = {width: img.width, height: img.height}
      })
    },
    replacePhoto(context, payload) {
      return new Promise(((resolve, reject) => {
        if (payload.newSize.storageByMB >= 10) {
          reject()  // 超过10MB
        } else {
          const fileUrl = `file://${payload.newUrl}`
          const photos = context.state.photos.filter(item => item.url === payload.oldUrl)
          const {width, height} = photos[0].size
          const isSameSize = width === payload.newSize.width && height === payload.newSize.height

          photos.forEach(item => {
            item.url = fileUrl
            item.size = payload.newSize

            switch (item.tag) {
              case 'img':
                item.obj.src = fileUrl
                break
              case 'svg':
                item.obj.style.backgroundImage = `url("${fileUrl}")`
                break
            }
          })

          resolve(isSameSize)
        }
      }))
    },
    replaceUrl(context, payload) {
      return new Promise(resolve => {
        const photos = context.state.photos.filter(item => item.url === payload.oldUrl)

        for (let i=0; i<photos.length; i++) {
          photos[i].url = payload.newUrl
          photos[i].size = {width: 0, height: 0}

          switch (photos[i].tag) {
            case 'img':
              photos[i].obj.src = payload.newUrl
              break
            case 'svg':
              photos[i].obj.style.backgroundImage = `url(\"${payload.newUrl}\")`
              break
          }
        }

        resolve()
      })
    }
  },
  modules: {
  }
})
