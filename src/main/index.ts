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
        width: 200,
        height: 150,
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
    if (isViewerWindowOpen()) {
      viewerWindow.webContents.send('setStage', s)
    }
    if (isResponderWindowOpen()) {
      responderWindow.webContents.send('setStage', s)
    }
  })

  ipcMain.on('syncStage', () => {
    if (isViewerWindowOpen()) {
      viewerWindow.webContents.send('setStage', stage)
    }
    if (isResponderWindowOpen()) {
      responderWindow.webContents.send('setStage', stage)
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
    console.log(settingFilePath)
    const d = JSON.parse(readFileSync(settingFilePath, { encoding: 'utf8', flag: 'r' }))
    mainWindow.webContents.send('loadState', d[`s${stage}`])
  })

  ipcMain.on('saveFile', (_, s) => {
    let d = JSON.parse(readFileSync(settingFilePath, { encoding: 'utf8', flag: 'r' }))
    d[`s${stage}`] = s
    writeFileSync(settingFilePath, JSON.stringify(d), { encoding: 'utf8' })
  })

  ipcMain.on('applyData', (_, s) => {
    let d = JSON.parse(readFileSync(settingFilePath, { encoding: 'utf8', flag: 'r' }))
    d[`s${stage}`] = s
    writeFileSync(settingFilePath, JSON.stringify(d), { encoding: 'utf8' })
    
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

    mainWindow.webContents.send('loadState', s)
    if (isViewerWindowOpen()) {
      viewerWindow.webContents.send('loadScore', sc)
    }
    if (isResponderWindowOpen()) {
      responderWindow.webContents.send('loadScore', sc)
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
