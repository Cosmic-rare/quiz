import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  applyStage: (stage) => ipcRenderer.send('applyStage', stage),
  onSetStage: (callback) => ipcRenderer.on('setStage', (_, s, r) => callback(s, r)),
  syncStage: (stage) => ipcRenderer.send('syncStage', stage),
  loadFile: () => ipcRenderer.send('loadFile'),
  onLoadState: (callback) => ipcRenderer.on('loadState', (_, d) => callback(d)),
  selectFile: () => ipcRenderer.invoke('selectFile'),
  saveFile: (s) => ipcRenderer.send('saveFile', s),
  applyData: (s) => ipcRenderer.send('applyData', s),
  onLoadScore: (callback) => ipcRenderer.on('loadScore', (_, d) => callback(d)),
  displayQuestion: (q) => ipcRenderer.send('displayQuestion', q),
  hideQuestion: () => ipcRenderer.send('hideQuestion'),
  onSetQuestion: (callback) => ipcRenderer.on('setQuestion', (_, q) => callback(q)),
  setQuestionStatus: (q) => ipcRenderer.send('setQuestionStatus', q),
  onSetQuestionStatus: (callback) => ipcRenderer.on('onSetQuestionStatus', (_, q) => callback(q)),
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
