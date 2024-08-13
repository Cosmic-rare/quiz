import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  applyStage: (stage) => ipcRenderer.send('applyStage', stage),
  onSetStage: (callback) => ipcRenderer.on('setStage', (_, s) => callback(s)),
  syncStage: (stage) => ipcRenderer.send('syncStage', stage),
  loadFile: () => ipcRenderer.send('loadFile'),
  onLoadState: (callback) => ipcRenderer.on('loadState', (_, d) => callback(d)),
  selectFile: () => ipcRenderer.invoke('selectFile'),
  saveFile: (s) => ipcRenderer.send('saveFile', s)
}

if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
