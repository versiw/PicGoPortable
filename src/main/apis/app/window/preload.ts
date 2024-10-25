// 预加载脚本 preload.js
const { contextBridge, shell } = require('electron')

contextBridge.exposeInMainWorld('electron', {
  openExternal: (url: string) => shell.openExternal(url)
})
