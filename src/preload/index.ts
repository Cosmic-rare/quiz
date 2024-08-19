import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const api = {
  applyStage: (stage) => ipcRenderer.send('applyStage', stage),
  onSetStage: (callback) => ipcRenderer.on('setStage', (_, s, r) => callback(s, r)),
  loadFile: () => ipcRenderer.send('loadFile'),
  onLoadState: (callback) => ipcRenderer.on('loadState', (_, d) => callback(d)),
  selectFile: () => ipcRenderer.invoke('selectFile'),
  saveFile: (s) => ipcRenderer.send('saveFile', s),
  applyData: (s) => ipcRenderer.send('applyData', s),
  onLoadScore: (callback) => ipcRenderer.on('loadScore', (_, d) => callback(d)),
  displayQuestion: (q) => ipcRenderer.send('displayQuestion', q),
  hideQuestion: () => ipcRenderer.send('hideQuestion'),
  displayQuestion2: (q) => ipcRenderer.send('displayQuestion2', q),
  hideQuestion2: () => ipcRenderer.send('hideQuestion2'),
  onSetQuestion: (callback) => ipcRenderer.on('setQuestion', (_, q) => callback(q)),
  onSetQuestion2: (callback) => ipcRenderer.on('setQuestion2', (_, q) => callback(q)),
  setQuestionStatus: (q) => ipcRenderer.send('setQuestionStatus', q),
  onSetQuestionStatus: (callback) => ipcRenderer.on('onSetQuestionStatus', (_, q) => callback(q)),
  setResponderStatus: (q) => ipcRenderer.send('setResponderStatus', q),
  onSetResponderStatus: (callback) => ipcRenderer.on('onSetResponderStatus', (_, q) => callback(q)),
  setPenalty: (p) => ipcRenderer.send('setPenalty', p),
  onSetPenalty: (callback) => ipcRenderer.on('onSetPenalty', (_, p) => callback(p)),
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
