import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { readFileSync, writeFileSync } from 'fs'

let mainWindow
let stage = 1
let settingFilePath: string

function createWindow(): void {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 700,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      nodeIntegration: true,
      contextIsolation: false,
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  let viewerWindow: any = null
  const isViewerWindowOpen = () => !viewerWindow?.isDestroyed() && viewerWindow?.isFocusable()
  let responderWindow: any = null
  const isResponderWindowOpen = () => !responderWindow?.isDestroyed() && responderWindow?.isFocusable()

  ipcMain.on('createWindow', () => {
    if (viewerWindow == null || !isViewerWindowOpen()) {
      viewerWindow = new BrowserWindow({
        title: 'Viewer',
        autoHideMenuBar: true,
        width: 850,
        height: 480,
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          nodeIntegration: true,
          contextIsolation: false,
        }
      })

      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        viewerWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#/viewer')
      } else {
        viewerWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: 'viewer' })
      }
    }

    if (responderWindow == null || !isResponderWindowOpen()) {
      responderWindow = new BrowserWindow({
        title: 'Reponder',
        autoHideMenuBar: true,
        width: 200,
        height: 150,
        webPreferences: {
          preload: join(__dirname, '../preload/index.js'),
          nodeIntegration: true,
          contextIsolation: false,
        }
      })

      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        responderWindow.loadURL(process.env['ELECTRON_RENDERER_URL'] + '#/responder')
      } else {
        responderWindow.loadFile(join(__dirname, '../renderer/index.html'), { hash: 'responder' })
      }
    }

    mainWindow.on("close", () => {
      if (isResponderWindowOpen()) {
        responderWindow.close()
      }
      if (isViewerWindowOpen()) {
        viewerWindow.close()
      }
    })
  })
  

  ipcMain.on('applyStage', (_, s) => {
    stage = s
    const d = JSON.parse(readFileSync(settingFilePath, { encoding: 'utf8', flag: 'r' }))

    if (s == 1 || s == 2 || s == 3) {
      if (isViewerWindowOpen()) {
        viewerWindow.webContents.send('setQuestion', '')
      }
      if (isResponderWindowOpen()) {
        responderWindow.webContents.send('setQuestion', '')
      }
    }
    mainWindow.webContents.send('setStage', s)
    if (isViewerWindowOpen()) {
      viewerWindow.webContents.send('setStage', s, d[`s${stage}`].responder)
    }
    if (isResponderWindowOpen()) {
      responderWindow.webContents.send('setStage', s, d[`s${stage}`].responder)
    }
  })

  ipcMain.handle('selectFile', async () => {
    const p = await dialog
    .showOpenDialogSync(mainWindow, {
      properties: ['openFile'],
      filters: [
        {
          name: 'json',
          extensions: ['json'],
        },
      ],
    })

    settingFilePath = p ? p[0] : ''
    return settingFilePath
  })

  ipcMain.on('loadFile', () => {
    const d = JSON.parse(readFileSync(settingFilePath, { encoding: 'utf8', flag: 'r' }))
    mainWindow.webContents.send('loadState', d[`s${stage}`])
    if (stage == 2 && isViewerWindowOpen()) {
      viewerWindow.webContents.send('setQuestion2', d[`s${stage}`].question[0])
    }
  })

  ipcMain.on('saveFile', (_, s) => {
    let d = JSON.parse(readFileSync(settingFilePath, { encoding: 'utf8', flag: 'r' }))
    d[`s${stage}`] = s
    writeFileSync(settingFilePath, JSON.stringify(d), { encoding: 'utf8' })
  })

  ipcMain.on('applyData', (_, s) => {    
    let sc = new Array(s.responder.length).fill(0)
    s.log.forEach(l => {
      switch (l[0]) {
        case "s":
          sc[l.split(" ")[1]] = parseInt(l.split(" ")[2])
          break
        case "i":
          sc[l.split(" ")[1]]++
          break
        case "d":
          sc[l.split(" ")[1]]--
          break
      }
    })

    if (isViewerWindowOpen()) {
      viewerWindow.webContents.send('loadScore', sc)
    }
    if (isResponderWindowOpen()) {
      responderWindow.webContents.send('loadScore', sc)
    }
  })

  ipcMain.on('displayQuestion', (_, q) => {
    if (isViewerWindowOpen()) {
      viewerWindow.webContents.send('setQuestion', q)
    }
    if (isViewerWindowOpen()) {
      responderWindow.webContents.send('setQuestion', q)
    }
  })

  ipcMain.on('hideQuestion', () => {
    if (isViewerWindowOpen()) {
      viewerWindow.webContents.send('setQuestion', "")
    }
    if (isViewerWindowOpen()) {
      responderWindow.webContents.send('setQuestion', "")
    }
  })

  ipcMain.on('displayQuestion2', (_, q) => {
    if (isViewerWindowOpen()) {
      viewerWindow.webContents.send('setQuestion2', q)
    }
    if (isViewerWindowOpen()) {
      responderWindow.webContents.send('setQuestion2', q)
    }
  })

  ipcMain.on('hideQuestion2', () => {
    if (isViewerWindowOpen()) {
      viewerWindow.webContents.send('setQuestion2', "")
    }
    if (isViewerWindowOpen()) {
      responderWindow.webContents.send('setQuestion2', "")
    }
  })

  ipcMain.on('setQuestionStatus', (_, q) => {
    if (isViewerWindowOpen()) {
      viewerWindow.webContents.send('onSetQuestionStatus', q)
    }
  })

  ipcMain.on('setResponderStatus', (_, p) => {
    if (isViewerWindowOpen()) {
      viewerWindow.webContents.send('onSetResponderStatus', p)
    }
  })

  ipcMain.on('setPenalty', (_, p) => {
    if (isViewerWindowOpen()) {
      viewerWindow.webContents.send('onSetPenalty', p)
    }
    if (isViewerWindowOpen()) {
      responderWindow.webContents.send('onSetPenalty', p)
    }
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
